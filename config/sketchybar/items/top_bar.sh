#!/bin/bash

# ========================================
# TOP BAR ITEMS - All left-aligned
# ========================================

BAR=${BAR_NAME:-sketchybar}

# D E F A U L T S  for top bar items
top_defaults=(
  padding_left=4
  padding_right=4
  icon.font="Hack Nerd Font:Bold:14.0"
  label.font="Hack Nerd Font:Bold:12.0"
  icon.color="$TOP_TEXT"
  label.color="$TOP_TEXT"
  icon.align=center
  label.align=center
  icon.padding_left=4
  icon.padding_right=2
  label.padding_left=2
  label.padding_right=4
)
$BAR --default "${top_defaults[@]}"

# M O D E  I N D I C A T O R
$BAR --add item mode left \
  --set mode \
    icon.drawing=off \
    background.color="$TOP_ACCENT" \
    background.corner_radius=4 \
    background.height=20 \
    label.padding_left=6 \
    label.padding_right=6 \
    label.color="$BLACK" \
    label="N"

# S E P A R A T O R
$BAR --add item sep1 left \
  --set sep1 \
    icon=│ \
    icon.color="$TOP_TEXT_DIM" \
    icon.padding_left=6 \
    icon.padding_right=6 \
    label.drawing=off \
    background.drawing=off

# F R O N T  A P P
$BAR --add item front_app left \
  --set front_app \
    icon.drawing=off \
    label.color="$TOP_ACCENT" \
    label.font="Hack Nerd Font:Bold Italic:12.0" \
    script="$PLUGIN_DIR/front_app.sh" \
  --subscribe front_app front_app_switched

# S E P A R A T O R
$BAR --add item sep2 left \
  --set sep2 \
    icon=│ \
    icon.color="$TOP_TEXT_DIM" \
    icon.padding_left=6 \
    icon.padding_right=6 \
    label.drawing=off \
    background.drawing=off

# M E D I A
$BAR --add item media left \
  --set media \
    icon=󰲑 \
    icon.color="$TOP_ACCENT" \
    label.color="$TOP_TEXT" \
    label.max_chars=25 \
    scroll_texts=on \
    updates=on \
    script="$PLUGIN_DIR/media_top.sh" \
  --subscribe media media_change

# S E P A R A T O R
$BAR --add item sep3 left \
  --set sep3 \
    icon=│ \
    icon.color="$TOP_TEXT_DIM" \
    icon.padding_left=6 \
    icon.padding_right=6 \
    label.drawing=off \
    background.drawing=off

# S T O C K S  (VTI)
$BAR --add item stocks left \
  --set stocks \
    icon=VTI \
    icon.color="$TOP_ACCENT" \
    icon.font="Hack Nerd Font:Bold:11.0" \
    label.font="Hack Nerd Font:Bold:11.0" \
    update_freq=60 \
    script="$PLUGIN_DIR/stocks_top.sh"

# S E P A R A T O R
$BAR --add item sep4 left \
  --set sep4 \
    icon=│ \
    icon.color="$TOP_TEXT_DIM" \
    icon.padding_left=6 \
    icon.padding_right=6 \
    label.drawing=off \
    background.drawing=off

# B A T T E R Y
$BAR --add item battery left \
  --set battery \
    icon.color="$TOP_TEXT" \
    update_freq=120 \
    script="$PLUGIN_DIR/battery_top.sh" \
  --subscribe battery system_woke power_source_change

# S E P A R A T O R
$BAR --add item sep5 left \
  --set sep5 \
    icon=│ \
    icon.color="$TOP_TEXT_DIM" \
    icon.padding_left=6 \
    icon.padding_right=6 \
    label.drawing=off \
    background.drawing=off

# C A L E N D A R / D A T E
$BAR --add item calendar left \
  --set calendar \
    icon= \
    icon.color="$TOP_ACCENT" \
    update_freq=3600 \
    script="$PLUGIN_DIR/calendar_top.sh"

# S E P A R A T O R
$BAR --add item sep6 left \
  --set sep6 \
    icon=│ \
    icon.color="$TOP_TEXT_DIM" \
    icon.padding_left=6 \
    icon.padding_right=6 \
    label.drawing=off \
    background.drawing=off

# C L O C K
$BAR --add item clock left \
  --set clock \
    icon= \
    icon.color="$TOP_ACCENT" \
    update_freq=10 \
    script="$PLUGIN_DIR/clock_top.sh"

# S E P A R A T O R
$BAR --add item sep7 left \
  --set sep7 \
    icon=│ \
    icon.color="$TOP_TEXT_DIM" \
    icon.padding_left=6 \
    icon.padding_right=6 \
    label.drawing=off \
    background.drawing=off

