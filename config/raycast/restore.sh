#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Restore from Backup
# @raycast.mode compact

# Optional parameters:
# @raycast.icon 🔒
# @raycast.packageName Utilities

# Documentation:
# @raycast.author r0hin
# @raycast.authorURL https://raycast.com/r0hin

cp "${HOME}/GitHub/r0hin/config/.ssh/config" "${HOME}/.ssh/config"

cp "${HOME}/GitHub/r0hin/config/.aerospace.toml" "${HOME}/.aerospace.toml"

rsync -av --exclude='.git' "${HOME}/GitHub/r0hin/config/bat/" "${HOME}/.config/bat"

rsync -av --exclude='.git' "${HOME}/GitHub/r0hin/config/sketchybar/" "${HOME}/.config/sketchybar"

rsync -av --exclude='.git' "${HOME}/GitHub/r0hin/config/borders/" "${HOME}/.config/borders"

rsync -av --exclude='.git' "${HOME}/GitHub/r0hin/config/linearmouse/" "${HOME}/.config/linearmouse"

rsync -av --exclude='.git' "${HOME}/GitHub/r0hin/config/kitty/" "${HOME}/.config/kitty"

cp -r "${HOME}/GitHub/r0hin/config/fish" "${HOME}/.config/"