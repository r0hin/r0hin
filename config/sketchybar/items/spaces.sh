#!/bin/bash

sketchybar --add item aerospace_mode left \
  --subscribe aerospace_mode aerospace_mode_change \
  --set aerospace_mode icon="" \
  script="$CONFIG_DIR/plugins/aerospace_mode.sh" \
  icon.color="$ACCENT_COLOR" \
  icon.padding_left=4 \
  drawing=off

# Get all workspaces and sort them
left_spaces=()
right_spaces=()

for sid in $(aerospace list-workspaces --all); do
  if [ "$sid" -lt 3 ]; then
    left_spaces+=("$sid")
  else
    right_spaces+=("$sid")
  fi
done

# Sort right_spaces in descending order
IFS=$'\n' right_spaces=($(sort -nr <<< "${right_spaces[*]}"))
unset IFS

# Process left-side spaces first (in ascending order)
for sid in "${left_spaces[@]}"; do
  monitor=$(aerospace list-windows --workspace "$sid" --format "%{monitor-appkit-nsscreen-screens-id}")

  if [ -z "$monitor" ]; then
    monitor="1"
  fi

  sketchybar --add item space."$sid" left \
    --subscribe space."$sid" aerospace_workspace_change display_change system_woke mouse.entered mouse.exited \
    --set space."$sid" \
    display="$monitor" \
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

# Process right-side spaces in descending order
for sid in "${right_spaces[@]}"; do
  monitor=$(aerospace list-windows --workspace "$sid" --format "%{monitor-appkit-nsscreen-screens-id}")

  if [ -z "$monitor" ]; then
    monitor="1"
  fi

  sketchybar --add item space."$sid" right \
    --subscribe space."$sid" aerospace_workspace_change display_change system_woke mouse.entered mouse.exited \
    --set space."$sid" \
    display="$monitor" \
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