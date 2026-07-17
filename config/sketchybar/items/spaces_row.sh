#!/bin/bash

# adds one row of fixed workspace items to the current bar
# usage: source spaces_row.sh <space> [<space> ...]

BAR=${BAR_NAME:-sketchybar}

for sid in "$@"; do
  $BAR --add item space."$sid" left \
    --subscribe space."$sid" aerospace_workspace_change display_change system_woke mouse.entered mouse.exited \
    --set space."$sid" \
      padding_right=0 \
      icon="$sid" \
      label.padding_right=7 \
      icon.padding_left=7 \
      icon.padding_right=4 \
      background.drawing=on \
      label.font="sketchybar-app-font:Regular:16.0" \
      background.color="$BACKGROUND" \
      icon.color="$ACCENT_COLOR" \
      label.color="$ACCENT_COLOR" \
      background.corner_radius=5 \
      background.height=25 \
      label.drawing=on \
      click_script="aerospace workspace $sid" \
      script="$CONFIG_DIR/plugins/aerospace.sh $sid"
done
