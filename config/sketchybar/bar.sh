#!/bin/bash

bar=(
  position=bottom
  height=37
  margin=0
  y_offset=12
  corner_radius=32
  blur_radius=30
  color="$BAR_COLOR"
)

sketchybar --bar "${bar[@]}"
