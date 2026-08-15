#!/usr/bin/env bash
#
# ctmdao-docs — run before every git push
#
# Regenerates search-index.json at the repo root. That file is published to
# https://docs.continuumdao.org/search-index.json and is fetched live by Continuum
# node AI agents (search_continuum_docs / get_continuum_doc on the built-in MCP server).
#
# Usage (from repo root):
#   ./scripts/before-git-push.sh
#   npm run before-git-push
#
# If this script exits non-zero, fix the reported issue before pushing.
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "============================================================"
echo " ctmdao-docs: before-git-push"
echo "============================================================"
echo ""
echo "This step is REQUIRED before git push."
echo "It rebuilds search-index.json for docs.continuumdao.org and node AI doc tools."
echo ""

node scripts/build-search-index.mjs

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
	echo ""
	echo "OK: search-index.json regenerated (not a git repo — skipping commit check)."
	exit 0
fi

INDEX="search-index.json"
if [[ ! -f "$INDEX" ]]; then
	echo ""
	echo "ERROR: $INDEX was not produced. Fix build-search-index.mjs before pushing."
	exit 1
fi

# Untracked index must be added when pushing doc changes.
if ! git ls-files --error-unmatch "$INDEX" >/dev/null 2>&1; then
	echo ""
	echo "ERROR: $INDEX is not tracked yet."
	echo ""
	echo "  git add $INDEX"
	echo "  git commit -m \"Update docs search index\""
	echo "  git push"
	exit 1
fi

# Regenerated index differs from the index — commit before push.
if ! git diff --quiet -- "$INDEX"; then
	echo ""
	echo "ERROR: $INDEX is out of date (rebuilt above but not committed)."
	echo ""
	echo "  git add $INDEX"
	echo "  git commit -m \"Update docs search index\""
	echo "  git push"
	exit 1
fi

# Staged index differs from working tree (forgot to rebuild after staging old index).
if ! git diff --cached --quiet -- "$INDEX" 2>/dev/null; then
	if git diff --quiet -- "$INDEX"; then
		echo ""
		echo "ERROR: staged $INDEX does not match the file on disk."
		echo "       Re-run this script, then stage the fresh index:"
		echo ""
		echo "  npm run before-git-push"
		echo "  git add $INDEX"
		exit 1
	fi
fi

echo ""
echo "OK: $INDEX is up to date and ready to push."
