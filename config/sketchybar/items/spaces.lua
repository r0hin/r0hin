local colors = require("colors")
local icons = require("icons")
local settings = require("settings")
local app_icons = require("helpers.app_icons")

local spaces = {}

local BASE_PADDING = 130
local ITEM_WIDTH = 20

local space_app_counts = {
    [1] = 0,
    [2] = 0
}

for i = 1, 2, 1 do
  local space = sbar.add("space", "space." .. i, {
    position = "center",
    space = i,
    icon = {
      font = { family = settings.font.numbers },
      string = i,
      padding_left = 15,
      padding_right = 8,
      color = colors.magenta,
      highlight_color = colors.blue,
    },
    label = {
      padding_right = 20,
      color = colors.magenta,
      highlight_color = colors.blue,
      font = "sketchybar-app-font:Regular:16.0",
      y_offset = -1,
    },
    padding_right = 200,
    padding_left = 200,
    background = {
      color = colors.bg,
      border_width = 0,
      height = 26,
      border_color = colors.black,
    },
    align = i == 1 and "right" or "left",
  })

  spaces[i] = space

  space:subscribe("space_change", function(env)
    local selected = env.SELECTED == "true"
    local color = selected and colors.blue or colors.magenta
    space:set({
      icon = { highlight = selected, color = color },
      label = { highlight = selected, color = color },
      background = { border_color = selected and colors.black or colors.bg2 }
    })
  end)
end

local space_window_observer = sbar.add("item", {
  drawing = false,
  updates = true,
})

space_window_observer:subscribe("space_windows_change", function(env)
  -- Safety check for current_space
  local current_space = env.INFO.space
  if not current_space or not spaces[current_space] then
      print("Warning: Invalid space number:", current_space)
      return
  end

  -- Count apps for current space
  local app_count = 0
  for app, count in pairs(env.INFO.apps) do
      app_count = app_count + 1
      if app_count >= 2 then
          break
      end
  end
  space_app_counts[current_space] = app_count

  -- Calculate padding based on our formula
  local left_space_padding = BASE_PADDING + (space_app_counts[1] * ITEM_WIDTH / 2)

  -- Apply padding to both spaces
  spaces[1]:set({
      padding_left = left_space_padding,
      padding_right = BASE_PADDING
  })
  spaces[2]:set({
      padding_left = BASE_PADDING,
      padding_right = left_space_padding  -- This pushes space 2 right as space 1 grows
  })

  -- Update icon line for current space
  local icon_line = ""
  local no_app = true
  app_count = 0

  for app, count in pairs(env.INFO.apps) do
      no_app = false
      local lookup = app_icons[app]
      local icon = ((lookup == nil) and app_icons["Default"] or lookup)
      icon_line = icon_line .. icon
      app_count = app_count + 1

      if app_count >= 3 then
          break
      end
  end

  if no_app then
      icon_line = " —"
  end

  sbar.animate("tanh", 10, function()
      if spaces[current_space] then
          spaces[current_space]:set({ label = icon_line })
      end
  end)
end)