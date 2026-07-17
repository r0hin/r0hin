#!/bin/bash

# shared bootstrap for the stacked bottom-left space rows
# usage: BAR_NAME=<name> Y_OFFSET=<px> row_bar.sh <space> [<space> ...]

export PATH="$HOME/.local/bin:$PATH"
export CONFIG_DIR="$HOME/.config/sketchybar"
export PLUGIN_DIR="$CONFIG_DIR/plugins"
export ITEM_DIR="$CONFIG_DIR/items"

source "$CONFIG_DIR/colors.sh"
source "$CONFIG_DIR/bar.sh"
source "$CONFIG_DIR/defaults.sh"
source "$ITEM_DIR/spaces_row.sh" "$@"

$BAR_NAME --update
