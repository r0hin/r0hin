#!/bin/bash
set -euo pipefail

STATE_FILE="${HOME}/.config/aerospace/.gap_state"

# Count only tiled windows (ignore floating)
count="$(
aerospace list-windows --workspace focused \
    --format '%{window-parent-container-layout}%{newline}' \
  | awk 'NF && $0 != "floating" {c++} END{print c+0}'
)"


desired="normal"
if [ "${count}" -eq 1 ]; then
  desired="single"
fi

current="none"
if [ -f "${STATE_FILE}" ]; then
  current="$(cat "${STATE_FILE}")"
fi

# Avoid reload loops: only change when state flips
if [ "${desired}" != "${current}" ]; then
  if [ "${desired}" = "single" ]; then
    ln -sf "${HOME}/.config/aerospace/aerospace.single.toml" "${HOME}/.aerospace.toml"
  else
    ln -sf "${HOME}/.config/aerospace/aerospace.normal.toml" "${HOME}/.aerospace.toml"
  fi
  echo "${desired}" > "${STATE_FILE}"
  aerospace reload-config --no-gui
fi
