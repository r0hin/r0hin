#!/bin/bash

BAR=${BAR_NAME:-sketchybar}

$BAR --set "$NAME" label="$(date '+%m/%d/%y')"
