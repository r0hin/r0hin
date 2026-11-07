#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Fix Kitty Icon
# @raycast.mode compact

# Optional parameters:
# @raycast.icon 🐱
# @raycast.packageName Utilities

# Documentation:
# @raycast.description Re-apply the custom rose-pine kitty icon (run after a kitty update resets it)
# @raycast.author r0hin
# @raycast.authorURL https://raycast.com/r0hin

SCRIPT_DIR="$(cd -- "$(dirname -- "$0")" && pwd)"
if [ -f "$SCRIPT_DIR/../kitty/fix-icon.sh" ]; then
  bash "$SCRIPT_DIR/../kitty/fix-icon.sh"
else
  bash "$HOME/.config/kitty/fix-icon.sh"
fi
