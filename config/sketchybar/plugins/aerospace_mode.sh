#!/bin/bash

BAR=${BAR_NAME:-sketchybar}
CURRENT_MODE=$(aerospace list-modes --current)

if [ "$CURRENT_MODE" == "main" ]; then
  $BAR --set "$NAME" \
    drawing=off
else
  $BAR --set "$NAME" \
    drawing=on
fi
