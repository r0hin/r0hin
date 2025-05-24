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

# Debug: List all workspaces
echo "DEBUG: All workspaces: $(aerospace list-workspaces --all)" >&2

for sid in $(aerospace list-workspaces --all); do
  echo "DEBUG: Checking space $sid for windows" >&2
  window_output=$(aerospace list-windows --workspace "$sid")
  has_windows=$(echo "$window_output" | grep -v '^$' | wc -l)
  echo "DEBUG: Space $sid has $has_windows non-empty lines of window output" >&2
  echo "DEBUG: Window output for space $sid: $window_output" >&2
  
  # Special handling for all spaces
  if [ "$sid" -eq 0 ] || [ "$sid" -eq 4 ] || [ "$sid" -eq 5 ] || [ "$sid" -eq 1 ] || [ "$sid" -eq 2 ] || [ "$sid" -eq 3 ]; then
    echo "DEBUG: Special handling for space $sid - forcing it to be included" >&2
    spaces_with_items+=("$sid")
  elif [ "$has_windows" -gt 0 ]; then
    echo "DEBUG: Adding space $sid to spaces_with_items" >&2
    spaces_with_items+=("$sid")
  else
    echo "DEBUG: Space $sid has no windows, not adding" >&2
  fi
done

# Sort the spaces numerically
echo "DEBUG: Before sorting: ${spaces_with_items[*]}" >&2
IFS=$'\n' sorted_spaces=($(sort -n <<< "${spaces_with_items[*]}"))
unset IFS
spaces_with_items=("${sorted_spaces[@]}")
echo "DEBUG: After sorting: ${spaces_with_items[*]}" >&2

# Calculate the middle point for dividing spaces
total_spaces=${#spaces_with_items[@]}
middle_index=$(( (total_spaces + 1) / 2 )) # This ensures odd numbers favor the left side
echo "DEBUG: Total spaces: $total_spaces, Middle index: $middle_index" >&2

# Split the spaces
left_spaces=()
right_spaces=()

for i in $(seq 0 $(( total_spaces - 1 ))); do
  current_space=${spaces_with_items[$i]}
  echo "DEBUG: Processing space $current_space at index $i" >&2
  if [ $i -lt $middle_index ]; then
    left_spaces+=("$current_space")
    echo "DEBUG: Added space $current_space to left_spaces" >&2
  else
    right_spaces+=("$current_space")
    echo "DEBUG: Added space $current_space to right_spaces" >&2
  fi
done

echo "DEBUG: Left spaces before sorting: ${left_spaces[*]}" >&2
echo "DEBUG: Right spaces before sorting: ${right_spaces[*]}" >&2

# Sort right_spaces in descending order
if [ ${#right_spaces[@]} -gt 0 ]; then
  IFS=$'\n' sorted_right_spaces=($(sort -nr <<< "${right_spaces[*]}"))
  unset IFS
  right_spaces=("${sorted_right_spaces[@]}")
  echo "DEBUG: Right spaces after reverse sorting: ${right_spaces[*]}" >&2
fi

echo "DEBUG: Starting to add left spaces: ${left_spaces[*]}" >&2

# Add left spaces
for sid in "${left_spaces[@]}"; do
  echo "DEBUG: Adding left space $sid" >&2
  monitor=$(aerospace list-windows --workspace "$sid" --format "%{monitor-appkit-nsscreen-screens-id}")
  [ -z "$monitor" ] && monitor="1"
  echo "DEBUG: Left space $sid using monitor $monitor" >&2
  
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
  
  echo "DEBUG: Finished adding left space $sid" >&2
done

echo "DEBUG: Starting to add right spaces: ${right_spaces[*]}" >&2

# Add right spaces (already in descending order)
for sid in "${right_spaces[@]}"; do
  echo "DEBUG: Adding right space $sid" >&2
  monitor=$(aerospace list-windows --workspace "$sid" --format "%{monitor-appkit-nsscreen-screens-id}")
  [ -z "$monitor" ] && monitor="1"
  echo "DEBUG: Right space $sid using monitor $monitor" >&2
  
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
      
  echo "DEBUG: Finished adding right space $sid" >&2
done

echo "DEBUG: All spaces have been added to sketchybar" >&2
