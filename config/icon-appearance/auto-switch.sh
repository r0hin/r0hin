#!/bin/bash
# auto-switch macos appearance extras based on light/dark mode + focus.
#
#   dark mode:                 tinted-orange icons/folders, city wallpaper, orange borders, orange helium
#   light mode + focus ON:     clear/glass icons, automatic folders
#   light mode + focus OFF:    default icons (system default), automatic folders
#   light mode (either):       tea gardens wallpaper, blue borders, light helium theme
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

# sketchybar theme depends on mode only. the bars read their palette from
# colors.sh only at startup, so a mode change means restarting them. kill the
# siblings so the main bar respawns them, then kickstart the brew-managed main
# bar for an immediate restart (kickstart -k skips launchd's ~10s KeepAlive
# respawn throttle, so the bars don't vanish for 10s). gate on a saved mode so
# this fires once per change, not every poll.
SB_STATE="$CFG/.applied-sketchybar-mode"
if [ "$mode" != "$(cat "$SB_STATE" 2>/dev/null)" ]; then
  if pgrep -x sketchybar >/dev/null 2>&1; then
    killall bar2 bar3 bar4 powerbar 2>/dev/null || true
    launchctl kickstart -k "gui/$(id -u)/homebrew.mxcl.sketchybar" >/dev/null 2>&1 || true
  fi
  echo "$mode" > "$SB_STATE"
fi

# helium theme depends on mode only: the recorded light color in light mode,
# orange in dark mode. helium (chromium) only reads Preferences at startup, so
# a color change needs a restart. to keep that unobtrusive: do nothing while
# helium is frontmost (a later poll catches it once the user switches away) and
# relaunch in the background (open -g) so no window steals focus. gate on a
# saved mode so this fires once per change, not every poll.
HELIUM_STATE="$CFG/.applied-helium-mode"
helium_theme() {
  /usr/bin/python3 - "$1" "$mode" <<'PY'
import json, os, sys
prefs_path = os.path.expanduser('~/Library/Application Support/net.imput.helium/Default/Preferences')
targets = {
    'light': {'user_color2': -1714692, 'color_variant2': 1, 'color_scheme2': 0},
    'dark': {'user_color2': -32768, 'color_variant2': 1, 'color_scheme2': 2},
}
action, mode = sys.argv[1], sys.argv[2]
target = targets[mode]
prefs = json.load(open(prefs_path))
if action == 'check':
    theme = prefs.get('browser', {}).get('theme', {})
    sys.exit(0 if all(theme.get(k) == v for k, v in target.items()) else 1)
prefs.setdefault('browser', {}).setdefault('theme', {}).update(target)
json.dump(prefs, open(prefs_path, 'w'), separators=(',', ':'))
PY
}
if [ "$mode" != "$(cat "$HELIUM_STATE" 2>/dev/null)" ]; then
  if helium_theme check; then
    # prefs already match (e.g. set by hand); nothing to do
    echo "$mode" > "$HELIUM_STATE"
  elif ! pgrep -x Helium >/dev/null 2>&1; then
    # not running: safe to edit prefs directly, no restart needed
    helium_theme write
    echo "$mode" > "$HELIUM_STATE"
  elif ! lsappinfo info -only bundleid "$(lsappinfo front)" 2>/dev/null | grep -q 'net.imput.helium'; then
    # remember which aerospace workspaces helium's windows are on; the restored
    # session would otherwise land in whatever workspace is focused
    old_ws=$(/opt/homebrew/bin/aerospace list-windows --all --format '%{app-bundle-id} %{workspace}' 2>/dev/null | awk '$1=="net.imput.helium"{print $2}')
    osascript -e 'tell application "Helium" to quit' >/dev/null 2>&1
    for _ in 1 2 3 4 5 6 7 8 9 10; do
      pgrep -x Helium >/dev/null 2>&1 || break
      sleep 1
    done
    helium_theme write
    open -g -a Helium
    if [ -n "$old_ws" ]; then
      want=$(echo "$old_ws" | wc -l | tr -d ' ')
      # wait for session restore to bring the windows back
      for _ in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15; do
        got=$(/opt/homebrew/bin/aerospace list-windows --all --format '%{app-bundle-id}' 2>/dev/null | grep -c 'net.imput.helium')
        [ "$got" -ge "$want" ] && break
        sleep 1
      done
      # move the restored windows back, pairing them with the saved
      # workspaces in listing order (exact for the usual single window)
      i=1
      for id in $(/opt/homebrew/bin/aerospace list-windows --all --format '%{app-bundle-id} %{window-id}' 2>/dev/null | awk '$1=="net.imput.helium"{print $2}'); do
        ws=$(echo "$old_ws" | sed -n "${i}p")
        [ -n "$ws" ] && /opt/homebrew/bin/aerospace move-node-to-workspace --window-id "$id" "$ws" >/dev/null 2>&1
        i=$((i+1))
      done
    fi
    echo "$mode" > "$HELIUM_STATE"
  fi
  # else: helium is frontmost; leave it for a later poll
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
