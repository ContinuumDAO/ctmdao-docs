#!/usr/bin/env bash
#
# ctmdao-docs — run before every git push
#
# Regenerates search-index.json and AI discovery files (llm-index.json, llms.txt,
# sitemap.xml, robots.txt), then stages them with git add. Published to
# docs.continuumdao.org and fetched live by Continuum node AI agents
# (search_continuum_docs / get_continuum_doc).
#
# Usage (from repo root):
#   ./scripts/before-git-push.sh
#   npm run before-git-push
#
# Also runs automatically via the pre-push git hook (see install-git-hooks.sh).
#
# If this script exits non-zero, fix the reported issue before pushing.
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

GENERATED_FILES=(
	search-index.json
	well-known/llm-index.json
	llms.txt
	sitemap.xml
	robots.txt
)

echo "============================================================"
echo " ctmdao-docs: before-git-push"
echo "============================================================"
echo ""
echo "This step runs automatically on git push (pre-push hook)."
echo "It rebuilds the search index and AI discovery files, then stages them."
echo ""

node scripts/build-search-index.mjs
node scripts/build-ai-discovery.mjs

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
	echo ""
	echo "OK: generated files rebuilt (not a git repo — skipping git add)."
	exit 0
fi

for INDEX in "${GENERATED_FILES[@]}"; do
	if [[ ! -f "$INDEX" ]]; then
		echo ""
		echo "ERROR: $INDEX was not produced. Fix the build scripts before pushing."
		exit 1
	fi
done

git add -- "${GENERATED_FILES[@]}"
echo ""
echo "Staged: ${GENERATED_FILES[*]}"

if git diff --cached --quiet -- "${GENERATED_FILES[@]}"; then
	echo ""
	echo "OK: all generated files are up to date and ready to push."
	exit 0
fi

echo ""
echo "Index files were updated and staged. Commit before push:"
echo ""
echo "  git commit -m \"Update docs indexes and AI discovery files\""
echo "  git push"
exit 1
