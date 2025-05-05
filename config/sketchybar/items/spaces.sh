#!/bin/bash

sketchybar --add item aerospace_mode left \
  --subscribe aerospace_mode aerospace_mode_change \
  --set aerospace_mode icon="" \
  script="$CONFIG_DIR/plugins/aerospace_mode.sh" \
  icon.color="$ACCENT_COLOR" \
  icon.padding_left=4 \
  drawing=off

# Clear any existing space items
for sid in $(aerospace list-workspaces --all); do
  sketchybar --remove space."$sid" 2>/dev/null || true
done

# Get all workspaces with windows (spaces with items)
spaces_with_items=()
for sid in $(aerospace list-workspaces --all); do
  has_windows=$(aerospace list-windows --workspace "$sid" | wc -l)
  if [ "$has_windows" -gt 0 ]; then
    spaces_with_items+=("$sid")
  fi
done

# Sort the spaces numerically
IFS=$'\n' sorted_spaces=($(sort -n <<< "${spaces_with_items[*]}"))
unset IFS
spaces_with_items=("${sorted_spaces[@]}")

echo "Spaces with items (sorted): ${spaces_with_items[*]}" >&2
echo "Number of spaces with items: ${#spaces_with_items[@]}" >&2

# Special case handling when exactly 2 spaces have items
if [ ${#spaces_with_items[@]} -eq 2 ]; then
  echo "Handling special case: 2 spaces with items" >&2
  left_space=${spaces_with_items[0]}
  right_space=${spaces_with_items[1]}
  
  # Add left space
  monitor=$(aerospace list-windows --workspace "$left_space" --format "%{monitor-appkit-nsscreen-screens-id}")
  [ -z "$monitor" ] && monitor="1"
  
  sketchybar --add item space."$left_space" left \
    --subscribe space."$left_space" aerospace_workspace_change display_change system_woke mouse.entered mouse.exited \
    --set space."$left_space" \
      display="$monitor" \
      padding_right=0 \
      icon="$left_space" \
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
      click_script="aerospace workspace $left_space" \
      script="$CONFIG_DIR/plugins/aerospace.sh $left_space"
  
  # Add right space
  monitor=$(aerospace list-windows --workspace "$right_space" --format "%{monitor-appkit-nsscreen-screens-id}")
  [ -z "$monitor" ] && monitor="1"
  
  sketchybar --add item space."$right_space" right \
    --subscribe space."$right_space" aerospace_workspace_change display_change system_woke mouse.entered mouse.exited \
    --set space."$right_space" \
      display="$monitor" \
      padding_right=0 \
      icon="$right_space" \
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
      click_script="aerospace workspace $right_space" \
      script="$CONFIG_DIR/plugins/aerospace.sh $right_space"
else
  # Regular handling for non-2-space cases
  echo "Handling regular case: ${#spaces_with_items[@]} spaces with items" >&2
  
  # Divide spaces evenly between left and right
  left_spaces=()
  right_spaces=()
  
  # Calculate the middle point to divide spaces evenly
  total_spaces=${#spaces_with_items[@]}
  middle_index=$(( total_spaces / 2 ))
  
  # If odd number of spaces, add one more to the left side
  echo "Total spaces: $total_spaces, Middle index: $middle_index" >&2
  
  # Split the spaces evenly
  for i in $(seq 0 $(( total_spaces - 1 ))); do
    if [ $i -lt $middle_index ]; then
      left_spaces+=("${spaces_with_items[$i]}")
    else
      right_spaces+=("${spaces_with_items[$i]}")
    fi
  done
  
  echo "Left spaces: ${left_spaces[*]}" >&2
  echo "Right spaces: ${right_spaces[*]}" >&2
  
  # Sort right_spaces in descending order if non-empty
  if [ ${#right_spaces[@]} -gt 0 ]; then
    IFS=$'\n' sorted_right_spaces=($(sort -nr <<< "${right_spaces[*]}"))
    unset IFS
    right_spaces=("${sorted_right_spaces[@]}")
  fi
  
  # Add left spaces
  for sid in "${left_spaces[@]}"; do
    monitor=$(aerospace list-windows --workspace "$sid" --format "%{monitor-appkit-nsscreen-screens-id}")
    [ -z "$monitor" ] && monitor="1"
    
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
  
  # Add right spaces
  for sid in "${right_spaces[@]}"; do
    monitor=$(aerospace list-windows --workspace "$sid" --format "%{monitor-appkit-nsscreen-screens-id}")
    [ -z "$monitor" ] && monitor="1"
    
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
fi

echo "Space configuration complete" >&2