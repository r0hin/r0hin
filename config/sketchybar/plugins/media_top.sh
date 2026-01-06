#!/bin/bash

BAR=${BAR_NAME:-sketchybar}

STATE="$(echo "$INFO" | jq -r '.state')"

if [ "$STATE" = "playing" ]; then
  MEDIA="$(echo "$INFO" | jq -r '.title + " - " + .artist')"
  $BAR --set "$NAME" label="$MEDIA" drawing=on
elif [ "$STATE" = "paused" ]; then
  MEDIA="$(echo "$INFO" | jq -r '.title + " - " + .artist')"
  $BAR --set "$NAME" label="$MEDIA (paused)" drawing=on
else
  $BAR --set "$NAME" drawing=off
fi
