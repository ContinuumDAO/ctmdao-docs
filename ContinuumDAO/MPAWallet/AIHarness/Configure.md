## Configure the AI harness

This checklist is **optional**. You can run an MPA wallet entirely from the node app (Groups, KeyGens, multi-sign) without an AI agent. The MPA wallet is **AI-first**, though, so most users will want to complete these steps once a KeyGen exists.

Use this flow **after** you have Configured Nodes, a Group, and at least one **multi-agree** KeyGen. The simplest AI setup is **2/2** (AI-assisted node + human Accept node). See [KeyGens](/ContinuumDAO/MPCSigner/KeyGens.md) and [MPA wallet Overview](/ContinuumDAO/MPAWallet/Overview.md) if you are not there yet.

What the harness is: [AI harness overview](/ContinuumDAO/MPAWallet/AIHarness/Overview.md).

All settings below are under **Node → AI Agent** unless noted.

### 1. Link an LLM (required for the agent)

1. Open **AI Agent → Provider**.
2. Choose a provider and model.
3. Set the API key (stored via **Variables** when the UI prompts you).

Without an LLM, Agent chat, Telegram, cron, and webhooks cannot run turns.

### 2. Set preferred KeyGen and default signer

**Preferred KeyGen** — which multi-agree KeyGen the agent uses by default for compose, plan, and wallet actions.

- Set it under **AI Agent → Provider**, or
- Set it from the **Agent chat** window when the UI asks you to pick one.

**Preferred / default Ed25519 signer** — which management key the harness uses to authenticate node API calls (not the MPC wallet key).

- Set it from Agent chat and/or **Node → Ed25519 Management Keys**.
- Details: [Default Ed25519 signer](/ContinuumDAO/MPAWallet/DefaultEd25519Signer.md).

Preferred KeyGen and preferred signer are different: one selects the shared wallet; the other authenticates the node’s management API.

### 3. Variables, MCP servers, and default search

1. Open **AI Agent → MCP Servers**.
2. Ensure the built-in **continuum** (wallet) server is enabled.
3. Add catalog or third-party MCP servers as needed (market data, DeFi, browser / search tools, and so on).
4. Open **AI Agent → Variables** and enter API keys and secrets for those servers (and the LLM if prompted). Listings show names and “configured” flags — not secret values.
5. For research or Plan mode flows that need the web, pick a default search engine: add a search / browser MCP from the catalog (for example **`duckduckgo`**, **`brave-search`**, or **`google-search`**), mark it AI Ready, then set **`AGENT_DEFAULT_SEARCH_MCP`** in **Variables** to that server’s catalog id (example: `duckduckgo`). Without this, Plan research can block on a missing search path even if other MCPs are enabled.

Pattern: enable the MCP row → set the matching Variable names (including **`AGENT_DEFAULT_SEARCH_MCP`** for search) → confirm they show as configured.

### 4. Optional — Telegram on your phone

To chat with the same harness from Telegram:

1. Add the Telegram webhook from **AI Agent → Webhooks**.
2. Put **`TELEGRAM_BOT_TOKEN`**, the webhook secret, and **`NGROK_AUTHTOKEN`** in **Variables** as the UI requires. For a paid ngrok subscription (Mini App charts), also set **`NGROK_PAID_PLAN=true`**.
3. Enable an ngrok tunnel (subscription / account as needed).

Full steps, free vs paid ngrok, and Mini App charts: [Telegram Mini App](/ContinuumDAO/MPAWallet/AIHarness/TelegramMiniApp.md).

### 5. Optional next

- **Skills** — steer agent behaviour (**AI Agent → Skills**).
- **Cron** — scheduled agent turns (**AI Agent → Cron**).
- **Other webhooks** — GitHub, Stripe, and similar (**AI Agent → Webhooks**).

### Related

- [AI harness overview](/ContinuumDAO/MPAWallet/AIHarness/Overview.md)
- [Default Ed25519 signer](/ContinuumDAO/MPAWallet/DefaultEd25519Signer.md)
- [Telegram Mini App](/ContinuumDAO/MPAWallet/AIHarness/TelegramMiniApp.md)
- [KeyGens](/ContinuumDAO/MPCSigner/KeyGens.md)
- [Trade ideas](/ContinuumDAO/MPAWallet/TradeIdeas.md)
- [Overview](/ContinuumDAO/MPAWallet/Overview.md)
- Operator detail: [Agent hooks](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/AGENT_HOOKS.md)
