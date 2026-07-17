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

REPO="$HOME/GitHub/r0hin"
RSYNC=(rsync -a --delete --exclude=.git --exclude=.DS_Store)

# config dirs mirrored 1:1 into the repo
# fish_variables is excluded everywhere: it holds exported secrets
DIRS=(fish kitty linearmouse borders bat sketchybar bar2 bar3 bar4 powerbar aerospace)

for d in "${DIRS[@]}"; do
  "${RSYNC[@]}" --exclude=fish_variables "$HOME/.config/$d/" "$REPO/config/$d"
done

# led/icon daemon (venv, logs and snapshots are machine-local)
"${RSYNC[@]}" --exclude=.venv --exclude='*.log' --exclude=wallpaper-snapshots \
  "$HOME/.config/icon-appearance/" "$REPO/config/icon-appearance"

# which aerospace config the ~/.aerospace.toml symlink points at
readlink "$HOME/.aerospace.toml" | xargs basename > "$REPO/config/aerospace-active"

# custom launch agents
mkdir -p "$REPO/config/launchagents"
cp "$HOME"/Library/LaunchAgents/in.r0h.*.plist "$REPO/config/launchagents/"

# personal cli scripts (bar2/bar3/bar4/powerbar are symlinks, recreated on restore)
mkdir -p "$REPO/config/bin"
cp "$HOME/.local/bin/power" "$REPO/config/bin/power"

# ssh config
mkdir -p "$REPO/config/.ssh"
cp "$HOME/.ssh/config" "$REPO/config/.ssh/config"

# installed packages
brew bundle dump --force --file="$REPO/config/Brewfile" 2>/dev/null

# commit and push
cd "$REPO" || exit 1
git add -A
if git diff --cached --quiet; then
  echo "backup: nothing changed"
else
  git commit -q -m "chore: backup $(date '+%Y-%m-%d %H:%M')"
  if git push -q 2>/dev/null; then
    echo "backup: committed and pushed"
  else
    echo "backup: committed, push failed"
  fi
fi
