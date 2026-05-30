#!/bin/bash
# reconcile screen sessions with ~/GitHub folder contents
# each direct subfolder gets a detached screen running `claude rc`
# pre-accepts the workspace trust dialog so the tui can render immediately

set -u

# single-instance lock. with watchpaths + 30s polling + manual `gh-screen sync`,
# multiple copies can run at once and race to spawn duplicate screens. mkdir is
# atomic (macos has no flock). a concurrent run just exits; the next tick covers it.
LOCK="/tmp/gh-screen-sync.lock"
if ! mkdir "$LOCK" 2>/dev/null; then
  exit 0
fi
trap 'rmdir "$LOCK" 2>/dev/null' EXIT INT TERM

GITHUB_DIR="$HOME/GitHub"
PREFIX="gh-"
CLAUDE="$HOME/.local/bin/claude"
SCREEN="/usr/bin/screen"
CLAUDE_JSON="$HOME/.claude.json"

# pin hasTrustDialogAccepted=true and remoteControlSpawnMode=worktree for the
# given absolute path. claude rc honors the saved spawn mode over the cli flag
# when both are present, so we pin worktree explicitly to avoid drift from
# manual 'w' toggles persisting across restarts.
# uses atomic rename so we don't corrupt ~/.claude.json if claude is also writing
trust_folder() {
  /usr/bin/python3 - "$1" "$CLAUDE_JSON" <<'PY'
import json, os, sys, tempfile
path, home_json = sys.argv[1], sys.argv[2]
try:
    with open(home_json) as f:
        d = json.load(f)
except FileNotFoundError:
    d = {}
projs = d.setdefault("projects", {})
entry = projs.setdefault(path, {})
desired = {"hasTrustDialogAccepted": True, "remoteControlSpawnMode": "worktree"}
if all(entry.get(k) == v for k, v in desired.items()):
    sys.exit(0)
entry.update(desired)
fd, tmp = tempfile.mkstemp(dir=os.path.dirname(home_json), prefix=".claude.json.tmp.")
os.close(fd)
with open(tmp, "w") as f:
    json.dump(d, f, indent=2)
os.replace(tmp, home_json)
PY
}

# collect current folder basenames, skipping git worktrees (which have .git as
# a file pointing back to the main repo). worktrees ride their parent's claude rc
# session instead of spawning their own.
folders=()
for d in "$GITHUB_DIR"/*/; do
  [ -d "$d" ] || continue
  [ -f "${d}.git" ] && continue
  folders+=("$(basename "$d")")
done

contains() {
  local needle="$1"; shift
  local x
  for x in "$@"; do
    [ "$x" = "$needle" ] && return 0
  done
  return 1
}

# kill the screen + any orphaned login/claude processes whose cwd was that folder.
# on macos, screen wraps the inner shell with `login`, which becomes a new session
# leader, so `screen -X quit` leaves the inner pipeline orphaned to init.
# we send SIGTERM and wait briefly so `claude rc` has a chance to deregister its
# environment from claude.ai before exit (ungraceful kills leak duplicate entries
# into the mobile/web Choose environment list). SIGKILL is the fallback.
kill_session_and_orphans() {
  local sess="$1" folder_path="$2"
  "$SCREEN" -S "$sess" -X quit 2>/dev/null
  # collect login wrappers + descendants
  local pids=()
  while IFS= read -r pid; do
    [ -z "$pid" ] && continue
    local kids
    kids=$(pgrep -P "$pid" 2>/dev/null)
    pids+=($pid $kids)
  done < <(pgrep -f "login -pflq .* /bin/bash -c cd \"${folder_path}\"" 2>/dev/null || true)
  [ "${#pids[@]}" -eq 0 ] && return 0
  kill -TERM "${pids[@]}" 2>/dev/null || true
  # wait up to ~2s for graceful exit
  local i
  for i in 1 2 3 4 5 6 7 8 9 10; do
    local alive=0
    for pid in "${pids[@]}"; do
      kill -0 "$pid" 2>/dev/null && alive=1 && break
    done
    [ "$alive" -eq 0 ] && return 0
    sleep 0.2
  done
  kill -KILL "${pids[@]}" 2>/dev/null || true
}

while IFS= read -r line; do
  sess=$(echo "$line" | awk '{print $1}')
  [ -z "$sess" ] && continue
  case "$sess" in
    *.${PREFIX}*) ;;
    *) continue ;;
  esac
  name="${sess#*.${PREFIX}}"
  if [ "${#folders[@]}" -eq 0 ] || ! contains "$name" "${folders[@]}"; then
    kill_session_and_orphans "$sess" "$GITHUB_DIR/$name"
  fi
done < <("$SCREEN" -ls 2>/dev/null | grep -E "\.${PREFIX}" || true)

# start sessions for folders that don't have one
for name in "${folders[@]+"${folders[@]}"}"; do
  sess_name="${PREFIX}${name}"
  if ! "$SCREEN" -ls 2>/dev/null | grep -qE "\.${sess_name}[[:space:]]"; then
    trust_folder "$GITHUB_DIR/$name"
    "$SCREEN" -dmS "$sess_name" bash -c "cd \"$GITHUB_DIR/$name\" && exec \"$CLAUDE\" rc --name \"$name\" --spawn=worktree --permission-mode bypassPermissions"
  fi
done
