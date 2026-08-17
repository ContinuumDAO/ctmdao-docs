#!/usr/bin/env bash
#
# Install ctmdao-docs git hooks (pre-push → before-git-push.sh).
#
# Usage:
#   ./scripts/install-git-hooks.sh
#   npm run prepare
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
HOOK_SRC="$ROOT/scripts/git-hooks/pre-push"
HOOK_DST="$ROOT/.git/hooks/pre-push"

if [[ ! -d "$ROOT/.git" ]]; then
	echo "Skipping git hook install: not a git repository."
	exit 0
fi

chmod +x "$HOOK_SRC"
mkdir -p "$(dirname "$HOOK_DST")"
ln -sf "../../scripts/git-hooks/pre-push" "$HOOK_DST"
chmod +x "$HOOK_DST"

echo "Installed pre-push hook → scripts/before-git-push.sh"
