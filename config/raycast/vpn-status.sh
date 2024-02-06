#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title VPN Status
# @raycast.mode compact

# Optional parameters:
# @raycast.icon ℹ️
# @raycast.packageName Utils

# Documentation:
# @raycast.description Gets my USA VPN status
# @raycast.author r0hin
# @raycast.authorURL https://raycast.com/r0hin

# if ./vpnutil status USA contains "Connected", then disconnect, else connect
if [[ $(./vpnutil status USA) == *"Connected"* ]]; then
  echo "🔒 Currently connected ‼️"
else
  echo "🔓 Currently disconnected ‼️"
fi