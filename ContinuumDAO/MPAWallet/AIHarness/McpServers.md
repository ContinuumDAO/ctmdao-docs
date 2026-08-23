## MCP servers

Every MPC node ships an **AI agent harness** that can call **MCP servers** — tool packs the agent loads for wallet actions, charts, research, Foundry, and more.

This page covers **ContinuumDAO repository MCP servers** (built into the node image). Third-party catalog entries (Brave Search, Tavily, Alpaca, and similar) use the same UI pattern; see [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md#3-variables-mcp-servers-and-default-search).

All settings are under **Node → AI Agent → MCP Servers** and **Variables** unless noted.

---

### How MCP servers work on your node

| Layer | What it is |
|-------|------------|
| **Built-in `continuum`** | Wallet and node MCP on the management API (`/mcp`). Always available; **`initialLoad: true`** at chat startup. |
| **Repository catalog** | Templates from [mpc-config `MCP_servers.json`](https://github.com/ContinuumDAO/mpc-config/blob/main/agent_llm_config.defaults/MCP_servers.json). Add with **Add from repository** in the UI. |
| **Default active** | [mpc-config `MCP_default_servers.json`](https://github.com/ContinuumDAO/mpc-config/blob/main/agent_llm_config.defaults/MCP_default_servers.json) seeds **`continuum`**, **`coinmarketcap-public`**, and **`coinbase-public`** on new nodes (each with **`initialLoad: false`** except **`continuum`**). |
| **Custom** | Operator-defined STDIO or HTTP servers you add manually. |

**Typical workflow**

1. Open **AI Agent → MCP Servers** — confirm **`continuum`** is enabled.
2. **Add from repository** for optional servers (Foundry, CoinGecko, business news, and so on).
3. Set **Variables** for any `apiKeyEnvVar` / `envVars` the listing shows.
4. Toggle **Initial load** if you want that server’s tools in **every new chat**; otherwise the agent loads them per conversation with **`agent_load_mcp_server`** (or you enable Initial load and start a fresh chat).

Non-**continuum** tools appear prefixed as **`{serverId}__{toolName}`** (for example **`coinbase-public__get_product_candles`**).

For Plan mode / web research, set **`AGENT_DEFAULT_SEARCH_MCP`** in **Variables** to a search-capable catalog id (for example **`duckduckgo`**, **`exa`**, **`tavily`**) after that server is **AI Ready**.

---

### Official docs on **`continuum`** (`search_continuum_docs`)

The built-in **`continuum`** MCP server can read **this documentation site** (docs.continuumdao.org) — the same content you are reading now.

| Tool | Use |
|------|-----|
| **`search_continuum_docs`** | Ranked search by keyword (returns `path`, optional `sectionId`, excerpt, public URL) |
| **`get_continuum_doc`** | Fetch markdown for a path (e.g. `ContinuumDAO/MPAWallet/AgentProvision`); pass **`sectionId`** from search for in-page sections |

Agents use this for provision playbooks, governance Constitution sections, chart skills, and operator workflows without guessing. Humans browse the site directly; agents discover via search then fetch.

Example paths: **`ContinuumDAO/MPAWallet/AgentProvision`**, **`ContinuumDAO/Governance/Constitution`** with **`sectionId`** `continuumdao-proposals-and-voting`.

---

### Built-in `continuum` MCP (wallet + node)

The **`continuum`** server is the agent’s primary wallet interface. It is **not** on the separate **continuum-mcp** HTTP sidecar — it runs on your node’s management MCP endpoint.

**Always-on capabilities**

- Groups, KeyGens, contacts, chain registry
- Multi-sign lifecycle: list / agree / Get Sig / Execute / History
- DeFi protocol packs (`list_defi_protocols`, `load_defi_protocol`, protocol-specific build tools)
- Charting and analysis (`prepare_chart_from_rows`, liquidity depth, trade ideas)
- MPA billing, veCTM attach, VPN billing multisign (**`claim_node_withdraw_authority`** before first Linea register — see [MPA billing](/ContinuumDAO/MPAWallet/MpaBilling.md#withdraw-authority); register / deposit / sync — not WireGuard admin; see **`vpn`** below)

**Compose-related tools** (same custody loop as the node app — see [Compose transaction flow](/ContinuumDAO/MPAWallet/ComposeTransactionFlow.md)):

| Tool | Use |
|------|-----|
| **`create_compose_multi_sign_request`** | Custom contract calls and transfers from compose **`actions[]`** |
| **`create_compose_eip712_multi_sign_request`** | One or more [EIP-712 typed-data signatures](/ContinuumDAO/MPAWallet/ComposeTransactionFlow.md#eip-712-typed-data-signatures) — Hyperliquid `/exchange`, Permit2, custom typed data; no unsigned tx calldata |
| **`import_forge_dry_run_multi_sign_request`** | Import Foundry **`run-latest.json`** (same as Compose **Import from Foundry broadcast**) |
| **`create_forge_multi_sign_request`** | Inline Foundry broadcast JSON |
| **`create_joined_multi_sign_request`** | Merge compatible compose / Foundry batches on the same KeyGen and chain |
| **`transfer_native_gas`**, **`transfer_erc20`**, **`transfer_erc721`**, **`transfer_ctm_erc20`**, **`transfer_ctm_erc20_cross_chain`** | Common transfer shortcuts |

EIP-712 compose batches use **`signRequestKind: eip712`**. Get Sig omits transaction gas params; Execute delivers each leg per its **`delivery.kind`** (`none`, `hyperliquid_exchange`, `permit2_submit`, …).

Operator detail for agents: [continuum-node-sdk `mpc.md`](https://github.com/ContinuumDAO/continuum-node-sdk/blob/main/src/mcp/resources/mpc.md).

---

### Forum and governance on **`continuum`**

ContinuumDAO protocol tools load through **`load_defi_protocol`** with **`continuum-dao`** (the agent does this automatically when you ask about governance). They cover [forum.continuumdao.org](https://forum.continuumdao.org/) and Linea governance — same MPC loop as DeFi.

Operator guide (plain language): [AI-managed governance and Forum](/ContinuumDAO/MPAWallet/AIHarness/AgentGovernance.md).

| Area | Capabilities (via agent) |
|------|---------------------------|
| **Forum — read** | Resolve URLs; fetch threads and individual posts; search; recent posts; reply counts; list a user’s posts |
| **Forum — write** | Sign in / sign out (EIP-712); create **Ideas** or **Governance** topics; reply; emoji react; unread inbox (interactive) |
| **Proposals — read** | Live proposals; explain/deconstruct on-chain actions; proposal state |
| **Proposals — write** | Propose (Bravo/Delta); register with Governance app; cast vote; execute; cancel |
| **Docs** | **`search_continuum_docs`** / **`get_continuum_doc`** — Constitution, how-to, operator pages (used by **`continuum-dao-proposal-standards`**) |

Pair with **skills** under **AI Agent → Skills** — see [Governance skills](/ContinuumDAO/MPAWallet/AIHarness/AgentGovernance.md#governance-skills-ai-agent--skills) in the governance page.

Protocol reference (tool names): [ctm-mpc-defi continuum-dao skill](https://github.com/ContinuumDAO/ctm-mpc-defi/blob/main/src/agent/skills/continuum-dao/SKILL.md).

---

### Repository servers on **continuum-mcp**

These MCP servers are **implemented in [continuum-node-sdk](https://github.com/ContinuumDAO/continuum-node-sdk)** and run in the **`continuum-mcp`** sidecar inside the node app image (`http://continuum-mcp:8446/...`). Catalog ids match **`MCP_servers.json`** / **`MCP_default_servers.json`**.

| Catalog id | Endpoint | API key | Typical use |
|------------|----------|---------|-------------|
| **`coinmarketcap-public`** | `/mcp/cmc-public` | None for keyless tools; optional **`COINMARKETCAP_API_KEY`** unlocks CEX historical OHLCV on the **same** server | DEX pool klines, market snapshots, Fear & Greed; default when operator picks CoinMarketCap for charts |
| **`coinbase-public`** | `/mcp/coinbase-public` | None for public market data; optional **`COINBASE_CDP_API_KEY_NAME`** + **`COINBASE_CDP_API_PRIVATE_KEY`** for authenticated routes | Spot CEX OHLCV (`BTC-USD`-style products), product search, ticker, order book |
| **`business-latest`** | `/mcp/business-latest` | None | Free business RSS (BBC, CNBC, MarketWatch, Forbes, Reuters via Google News, RT Business) |
| **`world-affairs`** | `/mcp/world-affairs` | None | Free world-news RSS (BBC, Al Jazeera, Guardian, DW, France 24, NPR, CNN, RT) |
| **`technical-indicators`** | `/mcp/ta` | None | SMA, RSI, MACD, Bollinger, Fibonacci, and 100+ indicators over OHLCV series ( **`initialLoad: false`**, **`aiReady: false`** in catalog — enable Initial load or load per chat) |
| **`vpn`** | `/mcp/vpn` | None (uses Ed25519 management signing for writes) | WireGuard admin VPN and egress client configs; MPA VPN **billing** stays on **`continuum`** |

**Chart sources:** **`coinmarketcap-public`**, **`coinbase-public`**, FMP, Alpaca, Equibles, and other OHLCV MCPs are listed in [AI charting — OHLCV data sources](/ContinuumDAO/MPAWallet/AICharting.md#ohlcv-data-sources). The agent should call **`list_ohlcv_sources`** when you ask what chart providers exist, and load a provider **only when you choose it** — not auto-picked for generic “chart ETH” requests (skill **`chart-ohlcv-sources`**).

**News / research:** **`business-latest`** and **`world-affairs`** are not OHLCV sources. Load per chat when you want headline scans or RSS search.

**Technical analysis:** After loading **`technical-indicators`**, the agent calls **`list_technical_indicators`** then **`calculate_technical_indicator`** with series or candle input. See [Technical analysis](/ContinuumDAO/MPAWallet/TechnicalAnalysis.md).

**VPN:** **`vpn`** tools configure WireGuard on the node and download configs to **`user_folder/data/vpn/`**. Register and pay VPN billing months through **`continuum`** (`register_vpn_on_linea`, deposit / sync tools).

---

### Other repository catalog entries (third-party runtimes)

The same **Add from repository** flow activates servers defined in **`MCP_servers.json`** that call **external** or **npx/uv** runtimes — for example:

| Category | Example catalog ids |
|----------|---------------------|
| Search / browser | **`duckduckgo`**, **`brave-search`**, **`google-search`**, **`exa`**, **`tavily`**, **`kagi`**, **`serpapi`**, **`perplexity`**, **`mullvad-browser`**, **`gecko`**, **`firefox`** |
| Market data | **`coingecko`**, **`coingecko-pro`**, **`coinmarketcap`** (full official MCP), **`financial-modeling-prep`**, **`alpaca`**, **`equibles`**, **`binance`**, **`alphavantage`**, **`dune`**, **`messari`**, **`altfins`**, **`whale-tracker`** |
| On-chain / dev | **`foundry`**, **`etherscan`** |
| News / macro | **`gdelt-cloud`**, **`finance-news`**, **`edgartools`** |
| Other | **`venice`**, **`x`** (Twitter) |

Each row may require **Variables** (API keys, OAuth tokens, or **`EDGAR_IDENTITY`**). The UI shows env var **names** and configured flags — never secret values.

**Foundry MCP** (`foundry`) runs **`forge`**, **`cast`**, and **`anvil`** with **`user_folder`** as workspace — pairs with [Foundry script](/ContinuumDAO/MPAWallet/ComposeTransactionFlow.md#foundry-script) compose import on **`continuum`**.

Catalog maintenance for operators adding new servers: [mpc-config `CATALOG.md`](https://github.com/ContinuumDAO/mpc-config/blob/main/agent_llm_config.defaults/CATALOG.md).

---

### Related

- [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md)
- [AI harness overview](/ContinuumDAO/MPAWallet/AIHarness/Overview.md)
- [Compose transaction flow](/ContinuumDAO/MPAWallet/ComposeTransactionFlow.md)
- [DeFi protocol support](/ContinuumDAO/MPAWallet/DeFiProtocolSupport.md)
- [AI charting](/ContinuumDAO/MPAWallet/AICharting.md)
- [Plan mode](/ContinuumDAO/MPAWallet/AIHarness/PlanMode.md)
- [AI-managed governance](/ContinuumDAO/MPAWallet/AIHarness/AgentGovernance.md)
- Agent-facing server reference: [continuum-node-sdk `agent-mcp-servers.md`](https://github.com/ContinuumDAO/continuum-node-sdk/blob/main/src/mcp/resources/agent-mcp-servers.md)
