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


# Delete .DS_Store
find /Users/rohin/Downloads/ -name .DS_Store -type f -delete

# Move all png and jpg files to screenshots
find /Users/rohin/Downloads/ -type f -name "*.png" -exec mv -nv {} /Users/rohin/Documents/Screenshots/ \;
find /Users/rohin/Downloads/ -type f -name "*.jpg" -exec mv -nv {} /Users/rohin/Documents/Screenshots/ \;
find /Users/rohin/Downloads/ -type f -name "*.jpeg" -exec mv -nv {} /Users/rohin/Documents/Screenshots/ \;

# Move all big files into Working
find /Users/rohin/Downloads/ -type f -size +30M -exec mv -nv {} /Users/rohin/Working/ \;

# Move the remaining files to Downloads (iCloud)
find /Users/rohin/Downloads/ -type f -exec mv -nv {} "/Users/rohin/Library/Mobile Documents/com~apple~CloudDocs/Downloads/" \;