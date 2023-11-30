#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Move Downloads
# @raycast.mode compact

# Optional parameters:
# @raycast.icon 🛺
# @raycast.packageName Utilities

# Documentation:
# @raycast.author r0hin
# @raycast.authorURL https://raycast.com/r0hin

# Move all .png into screenshots

find /Users/rohin/Downloads/ -name .DS_Store -type f -delete

find /Users/rohin/Downloads/ -type f -name "*.png" -exec mv -nv {} /Users/rohin/Desktop/Folders/Files/Screenshots/ \;
find /Users/rohin/Downloads/ -type f -name "*.jpg" -exec mv -nv {} /Users/rohin/Desktop/Folders/Files/Screenshots/ \;
find /Users/rohin/Downloads/ -type f -name "*.jpeg" -exec mv -nv {} /Users/rohin/Desktop/Folders/Files/Screenshots/ \;

find /Users/rohin/Downloads/ -type f -size +30M -exec mv -nv {} /Users/rohin/Working/ \;

find /Users/rohin/Downloads/ -type f -exec mv -nv {} "/Users/rohin/Library/Mobile Documents/com~apple~CloudDocs/Downloads/" \;