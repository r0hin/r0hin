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

# wallpaper depends on mode only. the swap = copy the mode's snapshot over the
# live store (Store/Index.plist), then relaunch WallpaperAgent so it re-reads.
# two wrinkles on this macos:
#   1. WallpaperAgent re-serializes Index.plist on every relaunch, so an exact
#      byte compare against the snapshot always reads "different" even when the
#      swap worked. instead we tell light vs dark apart by file size (the two
#      snapshots differ by ~185 bytes, far more than the agent's re-serialize
#      drift of ~10), so "closest snapshot by size" = the currently live mode.
#   2. during an appearance transition the relaunching agent briefly re-derives
#      the wallpaper from its own store and can clobber our copy a moment later.
# so: apply only when the live wallpaper isn't already the wanted mode. that
# gives no flicker in steady state, and it self-heals: if a transition clobbers
# our copy, the next poll (15s) simply detects the mismatch and reapplies. the
# extra re-assert after a short settle wins the race in the common case.
snap="$SNAP/$mode/Index.plist"
[ "$mode" = dark ] && osnap="$SNAP/light/Index.plist" || osnap="$SNAP/dark/Index.plist"
if [ -f "$snap" ]; then
  live=$(stat -f %z "$STORE/Index.plist" 2>/dev/null || echo 0)
  want=$(stat -f %z "$snap")
  d_want=$(( live > want ? live - want : want - live ))
  if [ -f "$osnap" ]; then
    o=$(stat -f %z "$osnap")
    d_other=$(( live > o ? live - o : o - live ))
  else
    d_other=999999
  fi
  # live wallpaper is closer in size to the other mode -> it's wrong, (re)apply
  if [ "$d_want" -gt "$d_other" ]; then
    cp "$snap" "$STORE/Index.plist"
    killall WallpaperAgent 2>/dev/null || true
    sleep 3
    cp "$snap" "$STORE/Index.plist"
    killall WallpaperAgent 2>/dev/null || true
  fi
else
  echo "auto-switch: missing wallpaper snapshot $snap" >&2
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
