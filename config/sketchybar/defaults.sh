#!/bin/bash

default=(
  padding_left=5
  padding_right=5
  icon.font="Hack Nerd Font:Bold:17.0"
  label.font="Hack Nerd Font:Bold:14.0"
  icon.color="$ACCENT_COLOR"
  label.color="$ACCENT_COLOR"
  icon.padding_left=4
  icon.padding_right=4
  label.padding_left=4
  label.padding_right=4
  background.color="$ITEM_BG_COLOR"
  background.corner_radius=5
  background.height=24
  background.drawing=off
)

${BAR_NAME:-sketchybar} --default "${default[@]}"

${BAR_NAME:-sketchybar} --add event aerospace_workspace_change
${BAR_NAME:-sketchybar} --add event aerospace_mode_change
${BAR_NAME:-sketchybar} --add event display_volume_change
