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
rsync -av --exclude='.git' ~/.config/fish/ '/Users/rohin/GitHub/r0hin/config/fish' --delete

rsync -av --exclude='.git' ~/.config/kitty/ '/Users/rohin/GitHub/r0hin/config/kitty' --delete

rsync -av --exclude='.git' ~/.config/linearmouse/ '/Users/rohin/GitHub/r0hin/config/linearmouse' --delete

rsync -av --exclude='.git' ~/.config/borders/ '/Users/rohin/GitHub/r0hin/config/borders' --delete

rsync -av --exclude='.git' ~/.config/sketchybar/ '/Users/rohin/GitHub/r0hin/config/sketchybar' --delete

rsync -av --exclude='.git' ~/.config/bat/ '/Users/rohin/GitHub/r0hin/config/bat' --delete

cp ~/.aerospace.toml '/Users/rohin/GitHub/r0hin/config/.aerospace.toml'

cp /users/rohin/.ssh/config /Users/rohin/GitHub/r0hin/config/.ssh/config