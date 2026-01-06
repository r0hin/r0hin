#!/bin/bash

BAR=${BAR_NAME:-sketchybar}

$BAR --set "$NAME" label="$(date '+%H:%M')"
