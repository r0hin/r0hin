#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Toggle Auto Windows
# @raycast.mode compact

# Optional parameters:
# @raycast.icon 🦋
# @raycast.packageName Utils

# Documentation:
# @raycast.description Also toggles macOS Dock auto-hide feature
# @raycast.author r0hin
# @raycast.authorURL https://raycast.com/r0hin

current_state=$(defaults read com.apple.dock autohide)

if [ "$current_state" = "1" ]; then
  defaults write com.apple.dock autohide -bool false
else
  defaults write com.apple.dock autohide -bool true
fi

echo "Success!"

killall Dock
