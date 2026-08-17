# ctmdao-docs — maintainer workflow

## Git push (automatic)

A **pre-push hook** rebuilds indexes, stages them, and blocks the push if they still need committing. It is installed automatically on `npm install` (`npm run prepare`).

You can still run it manually:

```bash
npm run before-git-push
```

Typical flow after editing docs:

```bash
git add ContinuumDAO/...   # your markdown changes only
git commit -m "Update docs"
git push                   # hook rebuilds indexes; blocks if a second commit is needed
git commit -m "Update docs indexes and AI discovery files"   # only when the hook says so
git push
```

If indexes are already up to date, `git push` goes through with no extra steps.

To install the hook on an existing clone without reinstalling packages:

```bash
./scripts/install-git-hooks.sh
```

| File | URL | Purpose |
|------|-----|---------|
| `search-index.json` | `/search-index.json` | Searchable index for MCP doc tools and AI agents |
| `well-known/llm-index.json` | `/well-known/llm-index.json` | LLMLD discovery index grouped by section; includes `llmld:getStarted` install routing from `Install.md` |
| `llms.txt` | `/llms.txt` | Standard AI crawler discovery file; install decision tree pinned at top |
| `sitemap.xml` | `/sitemap.xml` | Sitemap of all documentation pages |
| `robots.txt` | `/robots.txt` | Crawler directives pointing to sitemap |

The search index and AI discovery files are **auto-generated from markdown** — you never edit or stage them by hand. When you add or change docs, only update the `.md` files and `_sidebar.md` (if adding nav entries), then run `before-git-push` and commit if prompted.

## Deploy

Publish the whole site including all generated files at the site root. The Continuum MCP server fetches `search-index.json` at runtime (with a bundled fallback in the SDK). AI crawlers should prefer:

1. `https://docs.continuumdao.org/search-index.json` — full searchable index
2. `https://docs.continuumdao.org/well-known/llm-index.json` — LLMLD grouped index (includes install routing)
3. `https://docs.continuumdao.org/llms.txt` — human/agent-readable link list (install section at top)
4. `https://continuumdao.org/well-known/install-node.json` — machine-readable install decision tree for external agents

Raw markdown for any page: append `.md` to the page URL.

## continuumdao.org

The marketing site at `continuumdao.org` **links to** these docs URLs and does not duplicate the page list. When docs change, only this repo needs updating — not `continuum-home`.
