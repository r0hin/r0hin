#!/bin/bash

# kill existing bar instances
killall sketchybar bar2 bar3 bar4 powerbar 2>/dev/null
sleep 0.5

# main bar spawns the sibling rows from its rc
sketchybar &

echo "bars started (sketchybar + bar2/bar3/bar4/powerbar)"
echo "auto-start on login: brew services start sketchybar"
