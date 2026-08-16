## AI harness overview

The MPA wallet is **AI-first**, and every node includes a dedicated **AI agent harness**. You do not install a separate agent product — the harness is part of the node.

Configuring it is **optional**. You can control Groups, KeyGens, and signing entirely from the node app UI. For most users, linking an LLM and using Agent chat (or Telegram) is the desirable path.

### When to configure

If you want the agent path, configure the harness **after** you have Configured Nodes, a Group, and at least one KeyGen. The agent needs a preferred KeyGen to act on the shared wallet.

Optional next step: [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md).

If you still need a second node, Group, or KeyGen, start with [Install a node](/ContinuumDAO/MPAWallet/Install.md) (Post install steps) and [KeyGens](/ContinuumDAO/MPCSigner/KeyGens.md).

### How you talk to it

- **Node app** — Agent chat in continuumdao-node-app / [MPA wallet](https://mpa.continuumdao.org)
- **Telegram** (optional) — same harness via a webhook; see [Telegram Mini App](/ContinuumDAO/MPAWallet/AIHarness/TelegramMiniApp.md)

Both channels use the same tools, preferred KeyGen, and default Ed25519 management signer.

### What it can do

#### Chat and Plan modes

Interactive chat for questions and actions. **Plan mode** lets the agent propose multi-step work, then execute when you approve.

#### Built-in MCP (wallet)

The built-in **continuum** MCP server exposes wallet and node tools: groups, KeyGens, sign requests, messaging, and related management actions.

#### Built-in DeFi / web3 protocols

Protocol interactions (swaps, lending, perps, bridges, and similar) run through the node’s DeFi / MCP stack — still under your Group’s MPC threshold for on-chain signing via the [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md). Full list, capabilities, and KYC / API-key requirements: [DeFi protocol support](/ContinuumDAO/MPAWallet/DeFiProtocolSupport.md).

#### Charting and technical analysis

Candlestick charts with live updates, interactive overlays, analysis menus, and PRIMARY trade ideas (Agent chat and Telegram Mini App): [AI charting](/ContinuumDAO/MPAWallet/AICharting.md), [Technical analysis](/ContinuumDAO/MPAWallet/TechnicalAnalysis.md), and [Trade ideas](/ContinuumDAO/MPAWallet/TradeIdeas.md).

#### Third-party MCP servers

Add other MCP servers under **Node → AI Agent → MCP Servers** (catalog or custom). Store their API keys in **Variables**.

#### Skill files

Bundled and custom skills steer how the agent behaves for common tasks.

#### Workspace (scripts and data)

**Node → AI Agent → Workspace** lets you browse and manage the node **`user_folder`**: create directories, add or edit files, and download copies locally. Use it to upload **Foundry scripts**, JSON inputs, and other artefacts the agent or Foundry MCP can run — see [Foundry script — Workspace tab](/ContinuumDAO/MPAWallet/ComposeTransactionFlow.md#upload-scripts-and-data-workspace-tab).

#### Cron (scheduled jobs)

Run agent turns on a schedule from **AI Agent → Cron**.

#### Webhooks

Inbound HTTP hooks wake the same agent. Telegram is the usual phone path — see [Telegram Mini App](/ContinuumDAO/MPAWallet/AIHarness/TelegramMiniApp.md).

### Signing and safety

- **Management actions** (calling the node API) use the node’s [default Ed25519 signer](/ContinuumDAO/MPAWallet/DefaultEd25519Signer.md).
- **On-chain control** still uses **MPC**. The node never holds the full wallet private key — only threshold shares.
- **Human-in-the-loop circuit breaker** — in the usual personal setup, pair an AI-assisted node with a second node you control under **2/2** multi-agree TSS so the agent can propose trades but cannot complete a signature alone. Larger Groups use higher thresholds for shared custody. See [MPA wallet Overview](/ContinuumDAO/MPAWallet/Overview.md) and [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md).

### Related

- [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md)
- [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md)
- [Telegram Mini App](/ContinuumDAO/MPAWallet/AIHarness/TelegramMiniApp.md)
- [Default Ed25519 signer](/ContinuumDAO/MPAWallet/DefaultEd25519Signer.md)
- [Trade ideas](/ContinuumDAO/MPAWallet/TradeIdeas.md)
- [Overview](/ContinuumDAO/MPAWallet/Overview.md)
- Operator detail: [Agent hooks](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/AGENT_HOOKS.md)
