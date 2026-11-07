#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Toggle VPN
# @raycast.mode compact

# Optional parameters:
# @raycast.icon 🛜
# @raycast.packageName Utils

# Documentation:
# @raycast.description Toggles my USA VPN
# @raycast.author r0hin
# @raycast.authorURL https://raycast.com/r0hin

# resolve the script's own directory so vpnutil is found regardless of cwd
cd "$(dirname "$0")" || exit 1

# if ./vpnutil status USA contains "Connected", then disconnect, else connect
if [[ $(./vpnutil status USA) == *"Connected"* ]]; then
  ./vpnutil stop USA && echo "🔓 Disconnected ‼️"
else
  ./vpnutil start USA && echo "🔒 Connected ‼️"
fi