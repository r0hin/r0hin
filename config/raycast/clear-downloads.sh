#!/bin/bash
# @raycast.schemaVersion 1
# @raycast.title Clear Downloads
# @raycast.mode compact
# @raycast.icon 🗑️
# @raycast.packageName Utilities
set -euo pipefail
exec /usr/bin/python3 "$(cd -- "$(dirname -- "$0")" && pwd)/lib/setup.py" clear
