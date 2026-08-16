# ctmdao-docs — maintainer workflow

## Before git push

Run from the repo root:

```bash
./scripts/before-git-push.sh
# or
npm run before-git-push
```

This rebuilds `search-index.json` and fails if the index is missing or not committed. That file is required so [docs.continuumdao.org](https://docs.continuumdao.org) and Continuum node AI doc tools (`search_continuum_docs` / `get_continuum_doc`) stay in sync.

## Deploy

Publish the whole site including `search-index.json` at the site root:

`https://docs.continuumdao.org/search-index.json`

The Continuum MCP server fetches that URL at runtime (with a bundled fallback in the SDK).
