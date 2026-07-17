#!/bin/bash

# power distribution widget: live watts from the smc via the power cli

BAR=${BAR_NAME:-powerbar}

j=$("$HOME/.local/bin/power" --json 2>/dev/null)
[ -z "$j" ] && exit 0

read -r src in_w sys_w batt_w pct state t < <(echo "$j" | jq -r \
  '[.source, (.in|round), (.sys|round), (.batt|round), .pct, .state, (.time // "-")] | join(" ")')

if [ "$src" = "ac" ]; then
  label="${in_w}W in · ${sys_w}W sys"
  if [ "$state" = "charging" ]; then
    label+=" · ${batt_w}W batt"
    [ "$t" != "-" ] && label+=" · ${t}"
  fi
  label+=" · ${pct}%"
else
  label="${sys_w}W out · ${pct}%"
  [ "$t" != "-" ] && label+=" · ${t}"
fi

$BAR --set "$NAME" label="$label"
