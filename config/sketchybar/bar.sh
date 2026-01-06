#!/bin/bash

bar=(
  position=bottom
  height=37
  margin=0
  y_offset=12
  corner_radius=32
  blur_radius=0
  color="$BAR_COLOR"
)

${BAR_NAME:-sketchybar} --bar "${bar[@]}"
