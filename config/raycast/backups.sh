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

rsync -av --exclude='.git' ~/.config/kitty/ '/Users/rohin/GitHub/r0hin/config/kitty'

rsync -av --exclude='.git' ~/.config/linearmouse/ '/Users/rohin/GitHub/r0hin/config/linearmouse'

rsync -av --exclude='.git' ~/.config/borders/ '/Users/rohin/GitHub/r0hin/config/borders'

rsync -av --exclude='.git' ~/.config/sketchybar/ '/Users/rohin/GitHub/r0hin/config/sketchybar'

cp ~/.aerospace.toml '/Users/rohin/GitHub/r0hin/config/.aerospace.toml'

cp /users/rohin/.ssh/config /Users/rohin/GitHub/r0hin/config/.ssh/config