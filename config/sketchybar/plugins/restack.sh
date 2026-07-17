#!/bin/bash

# stack the bottom-left rows bottom-up, hiding rows whose workspaces
# are all empty and unfocused

export PATH="$HOME/.local/bin:/opt/homebrew/bin:$PATH"

PITCH=29
Y=12

occupied=" $(aerospace list-windows --all --format '%{workspace}' | sort -u | tr '\n' ' ')$(aerospace list-workspaces --focused) "

row_visible() {
  for ws in $1; do
    case "$occupied" in *" $ws "*) return 0 ;; esac
  done
  return 1
}

place() {
  local bar=$1 spaces=$2
  if row_visible "$spaces"; then
    "$bar" --bar hidden=off y_offset=$Y
    Y=$((Y + PITCH))
  else
    "$bar" --bar hidden=on
  fi
}

place bar4 "Z X"
place bar3 "A"
place bar2 "Q W"
place sketchybar "1 2 3 4 5 6"
