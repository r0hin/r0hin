#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Toggle Vivid
# @raycast.mode compact

# Optional parameters:
# @raycast.icon 🔆
# @raycast.packageName Utils

# Documentation:
# @raycast.description Toggles Vivid
# @raycast.author r0hin
# @raycast.authorURL https://raycast.com/r0hin

APP_NAME="Vivid"
APP_PATH="/Applications/Vivid.app"

if pgrep -x "$APP_NAME" > /dev/null; then
    osascript -e "quit app \"$APP_NAME\""
else
    open "$APP_PATH"
    sleep 1  # Wait for the app to open
fi