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

REPO="$HOME/GitHub/r0hin"
RSYNC=(rsync -a --delete --exclude=.git --exclude=.DS_Store)

# config dirs mirrored 1:1 from the repo
# fish_variables is never in the backup (secrets), so protect the local copy
DIRS=(fish kitty linearmouse borders bat sketchybar bar2 bar3 bar4 powerbar aerospace)

for d in "${DIRS[@]}"; do
  "${RSYNC[@]}" --exclude=fish_variables "$REPO/config/$d/" "$HOME/.config/$d"
done

# led/icon daemon (venv is machine-local, rebuild it if missing)
"${RSYNC[@]}" "$REPO/config/icon-appearance/" "$HOME/.config/icon-appearance"

# zed (extensions dir is machine-local, protect it from --delete)
"${RSYNC[@]}" --exclude=extensions "$REPO/config/zed/" "$HOME/.config/zed"

# home dotfiles
cp "$REPO/config/home/.gitconfig" "$HOME/.gitconfig"
cp "$REPO/config/home/.zshrc" "$HOME/.zshrc"
cp "$REPO/config/home/.hushlogin" "$HOME/.hushlogin"
if [ ! -d "$HOME/.config/icon-appearance/.venv" ]; then
  echo "note: rebuild led daemon venv: cd ~/.config/icon-appearance && uv venv && uv pip install pyserial"
fi

# recreate the active aerospace config symlink
active=$(cat "$REPO/config/aerospace-active" 2>/dev/null)
ln -sf "$HOME/.config/aerospace/${active:-aerospace.single.toml}" "$HOME/.aerospace.toml"

# personal cli scripts + sketchybar sibling instances
mkdir -p "$HOME/.local/bin"
install -m 755 "$REPO/config/bin/power" "$HOME/.local/bin/power"
for b in bar2 bar3 bar4 powerbar; do
  ln -sf /opt/homebrew/opt/sketchybar/bin/sketchybar "$HOME/.local/bin/$b"
done

# custom launch agents
cp "$REPO/config/launchagents/"*.plist "$HOME/Library/LaunchAgents/" 2>/dev/null
for p in "$REPO/config/launchagents/"*.plist; do
  launchctl load -w "$HOME/Library/LaunchAgents/$(basename "$p")" 2>/dev/null
done

# ssh config
mkdir -p "$HOME/.ssh"
cp "$REPO/config/.ssh/config" "$HOME/.ssh/config"

# packages: report drift, install manually (can be slow)
if ! brew bundle check --file="$REPO/config/Brewfile" >/dev/null 2>&1; then
  echo "note: packages missing, run: brew bundle --file=$REPO/config/Brewfile"
fi

# restart the ui services on the restored configs
brew services restart sketchybar >/dev/null 2>&1
brew services restart borders >/dev/null 2>&1
aerospace reload-config 2>/dev/null

echo "restore: done"
