#!/bin/bash

SKETCHYBAR_CONFIG="$HOME/.config/sketchybar"
source "$SKETCHYBAR_CONFIG/colors.sh"

BAR=${BAR_NAME:-sketchybar}

# Fetch VTI data from Yahoo Finance
DATA=$(curl -s "https://query1.finance.yahoo.com/v8/finance/chart/VTI?interval=1d&range=1d" 2>/dev/null)

if [ -z "$DATA" ]; then
  $BAR --set "$NAME" label="--"
  exit 0
fi

PREV_CLOSE=$(echo "$DATA" | jq -r '.chart.result[0].meta.previousClose // empty' 2>/dev/null)
CURRENT=$(echo "$DATA" | jq -r '.chart.result[0].meta.regularMarketPrice // empty' 2>/dev/null)

if [ -z "$PREV_CLOSE" ] || [ -z "$CURRENT" ]; then
  $BAR --set "$NAME" label="--"
  exit 0
fi

CHANGE=$(echo "scale=2; (($CURRENT - $PREV_CLOSE) / $PREV_CLOSE) * 100" | bc 2>/dev/null)

if [ -z "$CHANGE" ]; then
  $BAR --set "$NAME" label="--"
  exit 0
fi

# Determine color based on change
if (( $(echo "$CHANGE >= 0" | bc -l) )); then
  COLOR="$TOP_GREEN"
  SIGN="+"
else
  COLOR="$TOP_RED"
  SIGN=""
fi

$BAR --set "$NAME" label="${SIGN}${CHANGE}%" icon.color="$COLOR"
