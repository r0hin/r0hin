#!/bin/bash
# auto-switch macos appearance extras based on light/dark mode + focus.
#
#   dark mode:                 tinted-orange icons/folders, city wallpaper, orange borders
#   light mode + focus ON:     clear/glass icons, automatic folders
#   light mode + focus OFF:    default icons (system default), automatic folders
#   light mode (either):       tea gardens wallpaper, blue borders
#
# focus state is written to .focus-state by the focusprobe helper (it can read focus
# via INFocusStatusCenter; a shell cannot). icon style + folder color are the same
# global pref; "default" style = deleting that pref. wallpaper is a snapshot swap.
#
# wallpaper/borders depend only on light/dark; the icon style also depends on focus,
# so the icon is gated on its own computed value (.applied-icon), independent of mode.

CFG="$HOME/.config/icon-appearance"
SNAP="$CFG/wallpaper-snapshots"
STORE="$HOME/Library/Application Support/com.apple.wallpaper/Store"
MODE_STATE="$CFG/.applied-mode"
ICON_STATE="$CFG/.applied-icon"

# light/dark
if [ "$(defaults read -g AppleInterfaceStyle 2>/dev/null)" = "Dark" ]; then
  mode=dark
else
  mode=light
fi
# focus on/off (written by focusprobe; default off if unknown)
focus=$(cat "$CFG/.focus-state" 2>/dev/null)
[ "$focus" = "on" ] || focus=off

# borders + active color depend on mode only
if [ "$mode" = "dark" ]; then
  b_active=0xffc7a17b
else
  b_active=0xff7ba3c7
fi
if pgrep -x borders >/dev/null 2>&1; then
  /opt/homebrew/bin/borders active_color=$b_active inactive_color=0x00000000 >/dev/null 2>&1
fi

# wallpaper depends on mode only -> gate on mode change.
# only record the mode as applied if the snapshot actually existed and was
# copied, so a missing snapshot retries next run instead of silently succeeding.
if [ "$mode" != "$(cat "$MODE_STATE" 2>/dev/null)" ]; then
  if [ -f "$SNAP/$mode/Index.plist" ]; then
    cp "$SNAP/$mode/Index.plist" "$STORE/Index.plist"
    killall WallpaperAgent 2>/dev/null || true
    echo "$mode" > "$MODE_STATE"
  else
    echo "auto-switch: missing wallpaper snapshot $SNAP/$mode/Index.plist" >&2
  fi
fi

# icon style: dark->tinted, light+focus->clear, light+no-focus->default
if [ "$mode" = "dark" ]; then
  icon=tinted
elif [ "$focus" = "on" ]; then
  icon=clear
else
  icon=default
fi

# gate on the icon value; only then write the pref + re-render the icon surfaces
if [ "$icon" != "$(cat "$ICON_STATE" 2>/dev/null)" ]; then
  case "$icon" in
    tinted)
      defaults write -g AppleIconAppearanceTheme TintedAutomatic
      defaults write -g AppleIconAppearanceTintColor Orange ;;
    clear)
      defaults write -g AppleIconAppearanceTheme ClearAutomatic
      defaults write -g AppleIconAppearanceTintColor Automatic ;;
    default)
      defaults delete -g AppleIconAppearanceTheme 2>/dev/null || true
      defaults delete -g AppleIconAppearanceTintColor 2>/dev/null || true ;;
  esac
  # each surface that shows tinted icons is a separate process
  killall Dock 2>/dev/null || true
  killall NotificationCenter 2>/dev/null || true
  killall ControlCenter 2>/dev/null || true
  echo "$icon" > "$ICON_STATE"
fi
