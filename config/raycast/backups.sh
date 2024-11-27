#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Backups
# @raycast.mode compact

# Optional parameters:
# @raycast.icon 🔒
# @raycast.packageName Utilities

# Documentation:
# @raycast.author r0hin
# @raycast.authorURL https://raycast.com/r0hin

# Copy local config files into GitHub
cp -r ~/.config/fish '/Users/rohin/GitHub/r0hin/config/'
cp /users/rohin/.ssh/config /Users/rohin/GitHub/r0hin/config/.ssh/config