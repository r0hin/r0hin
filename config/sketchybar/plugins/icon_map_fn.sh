#!/bin/bash

# App icon mapping using sketchybar-app-font
# Returns the icon glyph for the given app name

case "$1" in
  "Finder") echo ":finder:" ;;
  "Safari") echo ":safari:" ;;
  "Firefox") echo ":firefox:" ;;
  "Google Chrome") echo ":google_chrome:" ;;
  "Arc") echo ":arc:" ;;
  "Terminal") echo ":terminal:" ;;
  "iTerm2") echo ":iterm:" ;;
  "Warp") echo ":warp:" ;;
  "WezTerm") echo ":wezterm:" ;;
  "Alacritty") echo ":alacritty:" ;;
  "kitty") echo ":kitty:" ;;
  "Code") echo ":code:" ;;
  "Visual Studio Code") echo ":code:" ;;
  "Cursor") echo ":cursor:" ;;
  "Xcode") echo ":xcode:" ;;
  "Slack") echo ":slack:" ;;
  "Discord") echo ":discord:" ;;
  "Messages") echo ":messages:" ;;
  "Mail") echo ":mail:" ;;
  "Spark") echo ":spark:" ;;
  "Spotify") echo ":spotify:" ;;
  "Music") echo ":music:" ;;
  "Notes") echo ":notes:" ;;
  "Notion") echo ":notion:" ;;
  "Obsidian") echo ":obsidian:" ;;
  "Calendar") echo ":calendar:" ;;
  "Preview") echo ":preview:" ;;
  "Photos") echo ":photos:" ;;
  "System Preferences") echo ":system_preferences:" ;;
  "System Settings") echo ":system_preferences:" ;;
  "App Store") echo ":app_store:" ;;
  "Activity Monitor") echo ":activity_monitor:" ;;
  "Reminders") echo ":reminders:" ;;
  "FaceTime") echo ":facetime:" ;;
  "Zoom") echo ":zoom:" ;;
  "Teams") echo ":microsoft_teams:" ;;
  "Microsoft Teams") echo ":microsoft_teams:" ;;
  "Word") echo ":microsoft_word:" ;;
  "Microsoft Word") echo ":microsoft_word:" ;;
  "Excel") echo ":microsoft_excel:" ;;
  "Microsoft Excel") echo ":microsoft_excel:" ;;
  "PowerPoint") echo ":microsoft_power_point:" ;;
  "Microsoft PowerPoint") echo ":microsoft_power_point:" ;;
  "Figma") echo ":figma:" ;;
  "Sketch") echo ":sketch:" ;;
  "Adobe Photoshop"*) echo ":adobe_photoshop:" ;;
  "Adobe Illustrator"*) echo ":adobe_illustrator:" ;;
  "Docker Desktop") echo ":docker:" ;;
  "TablePlus") echo ":tableplus:" ;;
  "Postman") echo ":postman:" ;;
  "1Password"*) echo ":1password:" ;;
  "Bitwarden") echo ":bitwarden:" ;;
  "Raycast") echo ":raycast:" ;;
  "Alfred") echo ":alfred:" ;;
  "Linear") echo ":linear:" ;;
  "GitHub Desktop") echo ":github:" ;;
  "Tower") echo ":tower:" ;;
  "Transmit") echo ":transmit:" ;;
  "Bear") echo ":bear:" ;;
  "Things") echo ":things:" ;;
  "Todoist") echo ":todoist:" ;;
  "Trello") echo ":trello:" ;;
  *) echo ":default:" ;;
esac

