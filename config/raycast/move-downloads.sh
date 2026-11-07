#!/bin/bash
# @raycast.schemaVersion 1
# @raycast.title Move Downloads
# @raycast.mode compact
# @raycast.icon 🛺
# @raycast.packageName Utilities
set -euo pipefail
exec /usr/bin/python3 "$(cd -- "$(dirname -- "$0")" && pwd)/lib/setup.py" downloads
