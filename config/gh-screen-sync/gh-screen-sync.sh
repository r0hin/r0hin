#!/bin/bash
# reconcile screen sessions with ~/GitHub folder contents
# each direct subfolder gets a detached screen running `claude rc`

set -u

GITHUB_DIR="$HOME/GitHub"
PREFIX="gh-"
CLAUDE="$HOME/.local/bin/claude"
SCREEN="/usr/bin/screen"

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

# kill sessions whose folder no longer exists
while IFS= read -r line; do
  sess=$(echo "$line" | awk '{print $1}')
  [ -z "$sess" ] && continue
  case "$sess" in
    *.${PREFIX}*) ;;
    *) continue ;;
  esac
  name="${sess#*.${PREFIX}}"
  if [ "${#folders[@]}" -eq 0 ] || ! contains "$name" "${folders[@]}"; then
    "$SCREEN" -S "$sess" -X quit
  fi
done < <("$SCREEN" -ls 2>/dev/null | grep -E "\.${PREFIX}" || true)

# start sessions for folders that don't have one
for name in "${folders[@]+"${folders[@]}"}"; do
  sess_name="${PREFIX}${name}"
  if ! "$SCREEN" -ls 2>/dev/null | grep -qE "\.${sess_name}[[:space:]]"; then
    "$SCREEN" -dmS "$sess_name" bash -c "cd \"$GITHUB_DIR/$name\" && exec \"$CLAUDE\" rc"
  fi
done
