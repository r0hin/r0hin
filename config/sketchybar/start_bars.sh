#!/bin/bash

# Kill existing bar instances
killall sketchybar 2>/dev/null
killall bottom_bar 2>/dev/null
sleep 0.5

# Start top bar (sketchybar)
sketchybar &

# Start bottom bar (bottom_bar symlink)
bottom_bar &

echo "Both bars started!"
echo ""
echo "To enable auto-start on login:"
echo "  brew services start sketchybar"
echo "  launchctl load ~/Library/LaunchAgents/com.felixkratz.bottom_bar.plist"
echo ""
echo "To stop services:"
echo "  brew services stop sketchybar"
echo "  launchctl unload ~/Library/LaunchAgents/com.felixkratz.bottom_bar.plist"
