#!/bin/bash
# rebuild focusprobe.app from source.
#
# it must be an .app bundle, not a bare binary: TCC reads the usage description
# from the *responsible* process, and a binary run from a shell is attributed to
# the parent terminal (which has no NSFocusStatusUsageDescription and is killed
# with SIGABRT). an embedded __TEXT,__info_plist section is not enough either --
# it is present and valid but TCC ignores it for non-bundled tools on macOS 26.
#
# usage: bash build.sh   (from this directory)
set -e
cd "$(dirname "$0")"
APP="$(cd .. && pwd)/focusprobe.app"
rm -rf "$APP"
mkdir -p "$APP/Contents/MacOS"
cp Info.plist "$APP/Contents/Info.plist"
swiftc -O focusprobe.swift -o "$APP/Contents/MacOS/focusprobe"
codesign --force --deep --sign - "$APP"
echo "built $APP"
