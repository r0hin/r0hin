local colors = require("colors")
local icons = require("icons")
local settings = require("settings")

-- Padding item required because of bracket
sbar.add("item", { width = 5 })

local apple = sbar.add("item", {
  icon = {
    font = { size = 16.0 },
    string = "🥝",
    padding_right = 4,
    padding_left = 4,
  },
  label = { drawing = false },
  background = {
    color = colors.bg,
    border_color = colors.bg,
    border_width = 0
  },
  padding_left = 5,
  padding_right = 5,
  click_script = "$CONFIG_DIR/helpers/menus/bin/menus -s 0"
})