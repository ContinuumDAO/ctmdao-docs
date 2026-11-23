## AI harness

Every MPC node ships an **AI agent harness**: one LLM, one set of tools, and the threads, schedules, and inbound hooks that use them. Wallet spends still go through the [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md). The harness is optional — the node app can run Groups, KeyGens, and multi-sign without it.

Link a model first: [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md). Open chat from the **cat icon** (bottom-right). Composer features (`/` commands, prompts, files, paste, skills, any language, microphone): [Agent chat](/ContinuumDAO/MPAWallet/AIHarness/AgentChat.md). The same agent from a terminal on your computer: [Terminal chat](/ContinuumDAO/MPAWallet/AIHarness/TerminalChat.md). Extra skill and prompt packages: [Plugins](/ContinuumDAO/MPAWallet/AIHarness/Plugins.md). Solidity from chat: [Creating smart contracts](/ContinuumDAO/MPAWallet/AIHarness/CreatingSmartContracts.md).

---

### AI Agent tabs

All of these are under **Node → AI Agent**, in this order.

| Tab | What it is |
|-----|------------|
| **Provider** | Provider, model, Base URL, API key, and preferred KeyGen. [Link an LLM](/ContinuumDAO/MPAWallet/AIHarness/Configure.md#1-link-an-llm-required-for-the-agent). |
| **Variables** | Names of MCP and webhook secrets. Values stay on the node. [Variables](/ContinuumDAO/MPAWallet/AIHarness/Configure.md#3-variables-mcp-servers-and-default-search). |
| **MCP Servers** | Tool packs (wallet, charts, search, Foundry). [MCP servers](/ContinuumDAO/MPAWallet/AIHarness/McpServers.md). |
| **Skills** | Markdown guidance. **Initial load** injects a catalog skill into every new chat. Skills saved from chat are load-on-demand. [Skills from chat](/ContinuumDAO/MPAWallet/AIHarness/AgentChat.md#skills-from-chat). |
| **Prompts** | Your own `/` commands. [Custom prompts](/ContinuumDAO/MPAWallet/AIHarness/AgentChat.md#custom-prompts). |
| **Plugins** | Skill and prompt packages, plus an optional entrypoint. [Plugins](/ContinuumDAO/MPAWallet/AIHarness/Plugins.md). |
| **Workspace** | Files on the node. [Workspace](#workspace). |
| **Conversations** | Stored threads. [Conversations](#conversations). |
| **Cron** | Scheduled turns. [Cron](#cron). |
| **Webhooks** | Inbound events that start a turn. [Webhooks](#webhooks). |

---

### Conversations

**AI Agent → Conversations** keeps up to **256** threads on this node. Closing the chat window leaves them here.

| Mode | Meaning |
|------|---------|
| **Chat** | Ordinary Agent chat |
| **Plan** / **Plan (follow-on)** | A [Plan mode](/ContinuumDAO/MPAWallet/AIHarness/PlanMode.md) draft |
| **Orchestrator** / **Sub-agent** | The run after **Execute in KeyGen** |
| **Cron** | One scheduled job’s thread |

Click a title to read the transcript. **Orchestrator** and **Cron** rows have **Chat** to reopen that thread. Delete one row, or tick several and delete the selection.

Telegram **`/new`** starts a fresh session in the same way. See [Telegram Mini App](/ContinuumDAO/MPAWallet/AIHarness/TelegramMiniApp.md).

---

### Cron

**AI Agent → Cron** runs the harness on a schedule. Adding or editing a job needs a **management signature**.

- **Add from catalog**, or write your own message and schedule.
- **Run** tries the job once.
- Turn on **`telegramNotify`** to DM the final reply. Needs **`TELEGRAM_OPERATOR_CHAT_ID`**. See [Operator notifications](/ContinuumDAO/MPAWallet/AIHarness/TelegramMiniApp.md#operator-notifications-and-cron).
- **Instant** runs one cron job off its timer. Only one job can hold it. Join jobs run when a sign request arrives: **`reject-all-sign-request`** rejects every pending request, **`auto-accept-sign-request`** accepts every pending request, **`conditional-accept-sign-request`** accepts or rejects from the policy in the job message, and **`conditional-accept-governance-vote`** uses the same switch for governor Join rows. **`auto-sign-and-broadcast`** runs when a sign request this node originated reaches quorum, then gets the signature and broadcasts. Turning it on needs a management signature. Accept hooks weaken the MPC security model: this node agrees without a person reviewing each request. Signing still uses threshold shares, and no private key is required. Beware of **`auto-accept-sign-request`**, **`conditional-accept-sign-request`**, and **`conditional-accept-governance-vote`**. A Join row shows **On arrival**. Auto-sign-and-broadcast shows **When ready**. The schedule stays off.

Examples already documented: trade-desk schedules in [Trade ideas](/ContinuumDAO/MPAWallet/TradeIdeas.md), and governance jobs (vote appraisal, Forum reply notify) in [Optional automation](/ContinuumDAO/MPAWallet/AIHarness/AgentGovernance.md#optional-automation-cron).

---

### Webhooks

**AI Agent → Webhooks** starts an agent turn when another system POSTs to the node. Add a **catalog** hook or a custom one (management signature).

| Type | Typical use |
|------|-------------|
| **Telegram** | Phone chat with this harness. [Telegram Mini App](/ContinuumDAO/MPAWallet/AIHarness/TelegramMiniApp.md). |
| **GitHub** | Push or issue events (`X-Hub-Signature-256`). |
| **Stripe** | `Stripe-Signature` against the `whsec_…` secret. |
| **Slack** | `X-Slack-Signature`. |
| **Gmail** / **Proton** | Forwarded mail JSON (those providers do not call the node directly). |
| **Generic** | Any JSON or text POST with a bearer or `X-Mpc-Auth-Hook-Token`. |

Put signing secrets in **Variables** (`WEBHOOK_SECRET_*`, and **`TELEGRAM_BOT_TOKEN`** for Telegram). The agent does not receive those values. After **Restore defaults**, restart the node so the listener reloads.

---

### Workspace

**AI Agent → Workspace** is the node’s `user_folder`. Foundry layout and the write rules (no loose files at the root, management signature on save): [Upload scripts and data](/ContinuumDAO/MPAWallet/ComposeTransactionFlow.md#upload-scripts-and-data-workspace-tab).

| Path | Role |
|------|------|
| **`prompts/<name>.md`** | A custom `/` command |
| **`plugins/<name>/`** | An installed plugin (`mpa-plugin.json`, skills, prompts). [Plugins](/ContinuumDAO/MPAWallet/AIHarness/Plugins.md) |
| **`skills/<name>/SKILL.md`** | A workspace skill (from chat or the Skills tab) |
| **`plans/`** | Plan-mode documents |
| **`data/chat-uploads/`** | Image and PDF copies from chat |
| **`evm/`** | Foundry / Solidity. [Creating smart contracts](/ContinuumDAO/MPAWallet/AIHarness/CreatingSmartContracts.md) |

Catalog skills (the ones with **Initial load**) live under `agent_llm_config/Skills/` and are edited on the **Skills** tab. That tab can also upload a `.md`, `.txt`, or a text-layer PDF. A scanned PDF is rejected.

---

### For AI agents — AI Agent tabs

Discover this page with `search_continuum_docs` (`AI Agent tabs` / `AI harness`) then `get_continuum_doc` path `ContinuumDAO/MPAWallet/AIHarness/Overview`.

| Tab | What you can do |
|-----|-----------------|
| **Provider** | Coach the operator. There is no write tool for provider, model, Base URL, or the LLM key. [For AI agents — Provider](/ContinuumDAO/MPAWallet/AIHarness/Configure.md#for-ai-agents-provider). |
| **Preferred KeyGen** | `post_preferred_key_gen` on Path A. |
| **Variables / Webhooks** | The operator signs these in the UI. Leave secrets out of chat. |
| **MCP Servers** | `agent_load_mcp_server` / `agent_unload_mcp_server` for this conversation. A new server is an elicitation the operator signs. [MCP servers](/ContinuumDAO/MPAWallet/AIHarness/McpServers.md). |
| **Skills / Prompts** | [Agent chat — For AI agents](/ContinuumDAO/MPAWallet/AIHarness/AgentChat.md#for-ai-agents-slash-commands). |
| **Plugins** | `agent_search_plugins`, `agent_install_plugin`, `agent_enable_plugin`. Show the review before `confirmPermissions`. [For AI agents — plugins](/ContinuumDAO/MPAWallet/AIHarness/Plugins.md#for-ai-agents-plugins). |
| **Workspace** | Native file tools, under an allowed subtree. `agent_write_user_skill` for `skills/<name>/SKILL.md`. |
| **Conversations** | The operator opens and deletes threads in the UI. |
| **Terminal chat** | The operator runs `mpa-chat` on their computer. You cannot type into it. Coach them from [Terminal chat](/ContinuumDAO/MPAWallet/AIHarness/TerminalChat.md#for-ai-agents-terminal-chat). |
| **Cron** | The operator signs jobs on the Cron tab, including **Instant** on one job (`reject-all-sign-request`, `auto-accept-sign-request`, `conditional-accept-sign-request`, or `auto-sign-and-broadcast`). There is no chat tool for that switch. Accept Instant hooks weaken the MPC review on this node; signing still uses threshold shares and no private key. Warn the operator before they enable an accept hook. `auto-sign-and-broadcast` does not use that warning. Governance examples: [Optional automation](/ContinuumDAO/MPAWallet/AIHarness/AgentGovernance.md#optional-automation-cron). |

### Related

- [Agent chat](/ContinuumDAO/MPAWallet/AIHarness/AgentChat.md)
- [Terminal chat](/ContinuumDAO/MPAWallet/AIHarness/TerminalChat.md)
- [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md)
- [MCP servers](/ContinuumDAO/MPAWallet/AIHarness/McpServers.md)
- [Creating smart contracts](/ContinuumDAO/MPAWallet/AIHarness/CreatingSmartContracts.md)
- [Plugins](/ContinuumDAO/MPAWallet/AIHarness/Plugins.md)
- [Plan mode](/ContinuumDAO/MPAWallet/AIHarness/PlanMode.md)
- [AI-managed governance](/ContinuumDAO/MPAWallet/AIHarness/AgentGovernance.md)
- [Telegram Mini App](/ContinuumDAO/MPAWallet/AIHarness/TelegramMiniApp.md)
- [MPA wallet overview](/ContinuumDAO/MPAWallet/Overview.md)
