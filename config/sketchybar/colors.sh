#!/bin/bash

# palette follows the macos light/dark appearance. every bar instance sources
# this at startup, so a mode change is applied by restarting the bars (the
# appearance poller in ~/.config/icon-appearance/auto-switch.sh does that on a
# flip; brew's KeepAlive respawns the main bar, which respawns the siblings).

export WHITE=0xffffffff
export BLACK=0xff000000
export TRANSPARENT=0x00000000

# semantic roles, resolved per appearance:
#   SEL_BG / SEL_TEXT  = accent surfaces (selected space + powerbar) and their text
#   ITEM_TEXT          = unselected space text/icons
#   ITEM_BG            = item surface behind a space (mostly transparent in use)
if [ "$(defaults read -g AppleInterfaceStyle 2>/dev/null)" = "Dark" ]; then
  # dark: orange accent, near-black text on it
  export SEL_BG=0xffE8943A
  export SEL_TEXT=0xff101314
  export ITEM_TEXT=0xffE8943A
  export ITEM_BG=0xff101314
else
  # light: white accent with black text; unselected space text is white
  export SEL_BG=0xffffffff
  export SEL_TEXT=0xff000000
  export ITEM_TEXT=0xffffffff
  export ITEM_BG=0xffffffff
fi

# back-compat aliases for files that still use the old names (defaults.sh,
# spaces_row.sh, sketchybarrc): ACCENT_COLOR = unselected item text,
# BACKGROUND = item surface.
export ACCENT_COLOR="$ITEM_TEXT"
export BACKGROUND="$ITEM_BG"
export BAR_COLOR=0x00000000
export ITEM_BG_COLOR=0xff353c3f

# -- top bar palette (currently unused: items/top_bar.sh is not sourced) --
export TOP_BAR_COLOR=0x00000000
export TOP_ACCENT=0xffF97316
export TOP_ACCENT_SECONDARY=0xffFB923C
export TOP_HIGHLIGHT=0xffFDBA74
export TOP_GREEN=0xff22C55E
export TOP_YELLOW=0xffFACC15
export TOP_RED=0xffEF4444
export TOP_TEXT=0xffffffff
export TOP_TEXT_DIM=0x99ffffff
