#!/usr/bin/env bash
set -euo pipefail

presentation_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
port="${1:-8000}"

if [[ ! -f "$presentation_dir/index.html" ]]; then
    echo "Run this script from the extracted static presentation archive." >&2
    exit 1
fi

if ! command -v python3 >/dev/null 2>&1; then
    echo "Installing Python 3 for the local presentation server (requires internet and sudo)."
    sudo apt-get update
    sudo apt-get install -y python3
fi

echo "Open http://127.0.0.1:$port/ in your browser to present."
echo "Keep this terminal open. Press Ctrl+C to stop the server."
exec python3 -m http.server "$port" --bind 127.0.0.1 --directory "$presentation_dir"
