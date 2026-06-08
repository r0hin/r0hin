#!/bin/bash
# re-apply the custom rose-pine kitty icon after a kitty update.
# bakes a tahoe layered icon (Assets.car) into the app bundle so it
# persists when the app is closed AND respects macos dock tinting.
#
# how it works: the background is a fill (lavender in light mode, dark in
# tinted mode) and the foreground glyph is the navy squircle + cursor.
# macos tints the foreground glyph (cursor -> accent color) and darkens
# the fill, exactly like stock app icons. an image background would instead
# get filled solid with the tint color, which is the bug we are avoiding.
#
# usage: bash ~/.config/kitty/fix-icon.sh

set -e

APP=/Applications/kitty.app
SRC="$HOME/.config/kitty/icon-src/glyph.png"
LIGHT_FILL="display-p3:0.945,0.910,0.960,1.0"   # soft lavender
DARK_FILL="display-p3:0.205,0.205,0.205,1.0"    # neutral dark

TMP=$(mktemp -d)
ICON="$TMP/kitty.icon"          # name must be 'kitty' to match CFBundleIconName
mkdir -p "$ICON/Assets"
cp "$SRC" "$ICON/Assets/glyph.png"

cat > "$ICON/icon.json" << JSON
{
  "fill-specializations": [
    { "value": { "automatic-gradient": "$LIGHT_FILL" } },
    { "appearance": "dark", "value": { "automatic-gradient": "$DARK_FILL" } }
  ],
  "supported-platforms": { "circles": ["watchOS"], "squares": "shared" },
  "groups": [
    { "layers": [ { "image-name": "glyph.png", "name": "kitty", "blend-mode": "normal", "glass": false, "opacity": 1 } ],
      "shadow": { "kind": "neutral", "opacity": 0.5 },
      "translucency": { "enabled": true, "value": 0.5 } }
  ]
}
JSON

OUT="$TMP/out"; mkdir -p "$OUT"
xcrun actool --platform macosx --compile "$OUT" \
  --minimum-deployment-target 15.0 \
  --output-partial-info-plist /dev/null \
  --app-icon kitty "$ICON" >/dev/null 2>&1

cp "$OUT/Assets.car" "$APP/Contents/Resources/Assets.car"
[ -f "$OUT/kitty.icns" ] && cp "$OUT/kitty.icns" "$APP/Contents/Resources/kitty.icns"

# re-sign (replacing the car breaks the adhoc signature) and refresh caches
codesign --force --deep --sign - "$APP" >/dev/null 2>&1
/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister -f "$APP"
touch "$APP"
killall Dock 2>/dev/null || true
rm -rf "$TMP"

echo "kitty icon re-applied"
