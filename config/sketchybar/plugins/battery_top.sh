#!/bin/bash

SKETCHYBAR_CONFIG="$HOME/.config/sketchybar"
source "$SKETCHYBAR_CONFIG/colors.sh"

BAR=${BAR_NAME:-sketchybar}

PERCENTAGE="$(pmset -g batt | grep -Eo "\d+%" | cut -d% -f1)"
CHARGING="$(pmset -g batt | grep 'AC Power')"

if [ "$PERCENTAGE" = "" ]; then
  exit 0
fi

case "${PERCENTAGE}" in
  9[0-9]|100) ICON="" COLOR="$TOP_GREEN"
  ;;
  [6-8][0-9]) ICON="" COLOR="$TOP_TEXT"
  ;;
  [3-5][0-9]) ICON="" COLOR="$TOP_YELLOW"
  ;;
  [1-2][0-9]) ICON="" COLOR="$TOP_ACCENT"
  ;;
  *) ICON="" COLOR="$TOP_RED"
esac

if [[ "$CHARGING" != "" ]]; then
  ICON="" COLOR="$TOP_GREEN"
fi

$BAR --set "$NAME" icon="$ICON" label="${PERCENTAGE}%" icon.color="$COLOR"
