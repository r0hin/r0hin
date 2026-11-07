#!/bin/bash

# required parameters:
# @raycast.schemaVersion 1
# @raycast.title ChatGPT Companion
# @raycast.mode silent

# optional parameters:
# @raycast.packageName Utilities

# documentation:
# @raycast.description opens the ChatGPT companion window using control+space
# @raycast.author r0hin
# @raycast.authorURL https://raycast.com/r0hin

osascript -e 'delay 0.1' -e 'tell application "System Events" to key code 49 using control down'
