#!/bin/bash

BAR=${BAR_NAME:-sketchybar}

if [ "$SENDER" = "front_app_switched" ]; then
  $BAR --set "$NAME" label="$INFO"
fi
