#!/bin/bash
# reconcile screen sessions with ~/GitHub folder contents
# each direct subfolder gets a detached screen running `claude rc`
# pre-accepts the workspace trust dialog so the tui can render immediately

set -u

GITHUB_DIR="$HOME/GitHub"
PREFIX="gh-"
CLAUDE="$HOME/.local/bin/claude"
SCREEN="/usr/bin/screen"
CLAUDE_JSON="$HOME/.claude.json"

# write hasTrustDialogAccepted=true for the given absolute path
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
if entry.get("hasTrustDialogAccepted") is True:
    sys.exit(0)
entry["hasTrustDialogAccepted"] = True
fd, tmp = tempfile.mkstemp(dir=os.path.dirname(home_json), prefix=".claude.json.tmp.")
os.close(fd)
with open(tmp, "w") as f:
    json.dump(d, f, indent=2)
os.replace(tmp, home_json)
PY
}

# collect current folder basenames
folders=()
for d in "$GITHUB_DIR"/*/; do
  [ -d "$d" ] || continue
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
kill_session_and_orphans() {
  local sess="$1" folder_path="$2"
  "$SCREEN" -S "$sess" -X quit 2>/dev/null
  # find login wrappers whose argv references the folder path and kill them + descendants
  while IFS= read -r pid; do
    [ -z "$pid" ] && continue
    # collect descendants via pgrep -P recursively (one level is enough here)
    local kids
    kids=$(pgrep -P "$pid" 2>/dev/null)
    kill -TERM $pid $kids 2>/dev/null || true
  done < <(pgrep -f "login -pflq .* /bin/bash -c cd \"${folder_path}\"" 2>/dev/null || true)
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
    "$SCREEN" -dmS "$sess_name" bash -c "cd \"$GITHUB_DIR/$name\" && exec \"$CLAUDE\" rc --name \"$name\" --spawn=same-dir"
  fi
done
