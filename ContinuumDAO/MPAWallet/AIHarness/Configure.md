<!--
agent:
  task: configure-ai-harness-provider
  audience: [ai-agent, human]
  playbook: https://docs.continuumdao.org/ContinuumDAO/MPAWallet/AIHarness/Configure
  externalAgentSection: for-ai-agents-provider
  keywords: [AI Agent Provider, LLM, provider, model, baseUrl, API key, deepseek, deepseek-flash, ollama, openai, openrouter, other, venice, grok]
-->

## Configure the AI harness

This checklist is **optional**. You can run an MPA wallet entirely from the node app (Groups, KeyGens, [multi-sign](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md)) without an AI agent. The MPA wallet is **AI-first**, though, so most users will want to complete these steps once a KeyGen exists.

Use this flow **after** you have Configured Nodes, a Group, and at least one **multi-agree** KeyGen. The simplest AI setup is **2/2** (AI-assisted node + human Accept node). See [KeyGens](/ContinuumDAO/MPCSigner/KeyGens.md) and [MPA wallet Overview](/ContinuumDAO/MPAWallet/Overview.md) if you are not there yet.

What the harness is: [AI harness overview](/ContinuumDAO/MPAWallet/AIHarness/Overview.md).

All settings below are under **Node → AI Agent** unless noted.

### 1. Link an LLM (required for the agent)

1. Open **AI Agent → Provider**.
2. Choose a **Provider** value from the dropdown (exact ids below). There is no `deepseek` row — use **`other`** for DeepSeek and any other OpenAI-compatible host.
3. Set **Model** to that vendor’s current model id (not a display name).
4. Set **Base URL** when the table says it is required. The grey `https://api.example.com/v1` text is a **placeholder**, not a working API. Do not save it.
5. Paste the vendor **API key** on this same Provider tab, then **Save** (management signature). Cloud keys are stored on the node and never shown in full. MCP secrets go under **Variables**, not here.

Without a working LLM, Agent chat, Telegram, cron, and webhooks cannot run turns.

| Provider | Base URL | Example model | API key |
|----------|----------|---------------|---------|
| `openai` | Optional. Empty → `https://api.openai.com/v1` | `gpt-4.1` | Required |
| `ollama` | Optional. Cloud default `https://ollama.com/api`. Local node: `http://host.docker.internal:11434/api` | Your pulled tag | Not required for a local host |
| `openrouter` | Required. `https://openrouter.ai/api/v1` | `anthropic/claude-sonnet-4` | Required ([keys](https://openrouter.ai/keys)) |
| `nvidia` | Required. `https://integrate.api.nvidia.com/v1` | `meta/llama-3.1-8b-instruct` | Required |
| `huggingface` | Required. `https://router.huggingface.co/v1` | `Qwen/Qwen3.6-27B` | Required (HF token) |
| `anthropic` | Required. No built-in default. Prefer `openrouter` for Claude, or an OpenAI-compatible Anthropic gateway | Vendor model id | Required |
| `google` | Required. `https://generativelanguage.googleapis.com/v1beta/openai` | `gemini-2.0-flash` | Required |
| `meta` | Required. `https://llama-api.meta.com/compat/v1` | `Llama-3.3-70B-Instruct` | Required |
| `grok` | Required. `https://api.x.ai/v1` | `grok-4` | Required |
| `venice` | Required. `https://api.venice.ai/api/v1` | `venice-uncensored` | Required ([venice.ai/settings/api](https://venice.ai/settings/api)) |
| `other` | **Required.** Real OpenAI-compatible root, not the example.com placeholder | That host’s model id | Required unless the host is local |

**DeepSeek (common `other` setup):** Provider `other`, Base URL `https://api.deepseek.com` or `https://api.deepseek.com/v1`, Model `deepseek-flash`, API key from [platform.deepseek.com](https://platform.deepseek.com). Do **not** use `deepseek-chat` (retired 24 July 2026).

The node appends `/chat/completions` to a custom Base URL (or `/chat` for Ollama) unless you already pasted that suffix. Paste the vendor **root** (with `/v1` when the vendor documents it), not a made-up host.

**Preferred KeyGen** on this same tab is the MPC wallet the agent spends from. It is not the LLM key. “No successful KeyGens on this node yet” only means you still need a KeyGen — it does not block saving Provider.

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
3. Add catalog or third-party MCP servers as needed (market data, DeFi, browser / search tools, and so on). Repository-hosted servers (**coinmarketcap-public**, **coinbase-public**, **business-latest**, **world-affairs**, **technical-indicators**, **vpn**, and the rest of the catalog) are summarized in [MCP servers](/ContinuumDAO/MPAWallet/AIHarness/McpServers.md).
4. Open **AI Agent → Variables** and enter API keys and secrets for those servers. Listings show names and “configured” flags — not secret values. The LLM key itself is on **Provider**, not Variables.
5. For research or Plan mode flows that need the web, pick a default search engine: add a search / browser MCP from the catalog (for example **`duckduckgo`**, **`brave-search`**, or **`google-search`**), mark it AI Ready, then set **`AGENT_DEFAULT_SEARCH_MCP`** in **Variables** to that server’s catalog id (example: `duckduckgo`). Without this, Plan research can block on a missing search path even if other MCPs are enabled.

Pattern: enable the MCP row → set the matching Variable names (including **`AGENT_DEFAULT_SEARCH_MCP`** for search) → confirm they show as configured.

### 4. Optional — Telegram on your phone

To chat with the same harness from Telegram:

1. Add the Telegram webhook from **AI Agent → Webhooks**.
2. Put **`TELEGRAM_BOT_TOKEN`**, the webhook secret, and **`NGROK_AUTHTOKEN`** in **Variables** as the UI requires. For a paid ngrok subscription (Mini App charts), also set **`NGROK_PAID_PLAN=true`**.
3. Enable an ngrok tunnel (subscription / account as needed).

Full steps, free vs paid ngrok, and Mini App charts: [Telegram Mini App](/ContinuumDAO/MPAWallet/AIHarness/TelegramMiniApp.md).

### 5. Optional next

- **Skills** — steer agent behaviour (**AI Agent → Skills**). For DAO: proposal drafting, standards checks, vote policy, Forum inbox — see [Governance skills](/ContinuumDAO/MPAWallet/AIHarness/AgentGovernance.md#governance-skills-ai-agent--skills). For KeyGen discovery and mail on the live Forum: enable **`continuum-dao-mpa-wallet-chat`** — [MPA to MPA Chat](/ContinuumDAO/MPAWallet/MpaToMpaChat.md).
- **Cron** — scheduled agent turns (**AI Agent → Cron**). Governance jobs (vote appraisal, governor Join Accept/Reject, Forum reply Telegram) — [Optional automation](/ContinuumDAO/MPAWallet/AIHarness/AgentGovernance.md#optional-automation-cron). Enable **`telegramNotify`** on a job to DM the final assistant message to Telegram after each successful run (requires **`TELEGRAM_OPERATOR_CHAT_ID`** — see [Telegram Mini App — Operator notifications](/ContinuumDAO/MPAWallet/AIHarness/TelegramMiniApp.md#operator-notifications-and-cron)).
- **Other webhooks** — GitHub, Stripe, and similar (**AI Agent → Webhooks**).
- **Workspace** — upload or edit files on the node (**AI Agent → Workspace**); Foundry projects live under **`evm/`** — see [Foundry script](/ContinuumDAO/MPAWallet/ComposeTransactionFlow.md#foundry-script).
- **Plan mode** — multi-step research / trade / **`dao`** plans → [Plan mode](/ContinuumDAO/MPAWallet/AIHarness/PlanMode.md).
- **AI-managed governance** — Forum, draft proposals, vote recommendations, on-chain flows — [AI-managed governance](/ContinuumDAO/MPAWallet/AIHarness/AgentGovernance.md).

### For AI agents — Provider

**Audience:** external AI agents (Claude, Cursor, Claude Code, Grok, and similar) helping an operator fill **AI Agent → Provider**. This is a **coaching** task. Discover it with `search_continuum_docs` (`AI Agent Provider` / `LLM provider` / `deepseek`) then `get_continuum_doc` path `ContinuumDAO/MPAWallet/AIHarness/Configure`. Crawlers: [llms.txt](https://docs.continuumdao.org/llms.txt) and [llm-index.json](https://docs.continuumdao.org/well-known/llm-index.json) task `configure-ai-harness-provider`.

There is **no MCP write tool** for provider, model, Base URL, or the LLM API key. Path A (`continuum-mcp` on `127.0.0.1:8446`) does not set these. Do **not** invent a POST, edit `agent-llm-config.json` on the host, or put the LLM key in **Variables**. Tell the operator the exact UI values; they **Save** in the node app (management signature).

Preferred KeyGen on the same tab **is** a Path A tool (`post_preferred_key_gen`) — see [Agent provision](/ContinuumDAO/MPAWallet/AgentProvision.md). Do not mix that up with the LLM fields.

**When to use this section**

- After Group + KeyGen exist, when the operator wants Agent chat / Telegram / cron / webhooks.
- When they say Provider “did not work”, chat will not start, or they picked DeepSeek / a custom host.

**Ask first:** which vendor they have a key for (OpenAI, OpenRouter, Ollama, DeepSeek, Venice, …). Then give one row from the table in [§1](#1-link-an-llm-required-for-the-agent). Do not guess a Base URL.

**Field rules the node actually enforces**

| Field | Rule |
|-------|------|
| `provider` | One of: `openai`, `ollama`, `openrouter`, `nvidia`, `huggingface`, `anthropic`, `google`, `meta`, `grok`, `venice`, `other`. Case-insensitive. Not a free-text vendor name. |
| `model` | Required. Vendor model id. Save succeeds with provider + model even if Base URL is empty. |
| `baseUrl` | Required at **chat time** for every provider except `openai` and `ollama` (those have defaults). Empty `other` → error `provider "other" requires baseUrl in agent LLM settings`. |
| Placeholder | `https://api.example.com/v1` is UI hint only. Saving it posts to a fake host. |
| URL shape | Trim trailing `/`. If the value already ends with `/chat/completions` or `/chat`, the node uses it as-is. Otherwise it appends `/chat/completions` (`/chat` for `ollama`). |
| API key | Required unless the resolved host is loopback, `host.docker.internal`, `*.local`, or RFC1918. Cloud DeepSeek / OpenAI / OpenRouter always need a key. |
| Ready for chat | `configured` (provider + model) and (`apiKeyPresent` if `apiKeyRequired`). Cat icon at bottom-right. |

**DeepSeek checklist (if that is the vendor)**

```
Provider: other
Model:    deepseek-flash
Base URL: https://api.deepseek.com
API key:  the operator’s DeepSeek key (sk-…)
```

`https://api.deepseek.com/v1` is also valid. Do not use `deepseek-chat` or `deepseek-reasoner` (retired 24 July 2026). Do not use `http://example.com/v1`.

**Typical user prompts**

- *“Help me set the AI Agent Provider so chat works.”*
- *“I set Provider to other and model deepseek-chat — it does not work.”*
- *“What Base URL do I put for DeepSeek / OpenRouter / local Ollama?”*

**Agent workflow**

1. Confirm they are in the node app, attached, **Node → AI Agent → Provider**.
2. Map their vendor to a dropdown id + Base URL + current model id (table in §1).
3. Tell them to type the Base URL (not leave the placeholder) and paste the key on **Provider**, then **Save**.
4. If chat still fails, ask what the UI shows: save error, “Agent LLM is not fully configured yet”, “No API key stored”, or a chat-time error such as `provider "other" requires baseUrl`.
5. Preferred KeyGen empty is unrelated to LLM HTTP. If they also need a default wallet, use `post_preferred_key_gen` or the picker on this tab.

**Do not**

- Pick `openai` and leave Base URL empty when the key is for DeepSeek or another host (that hits `api.openai.com`).
- Treat `other` Base URL as optional because the label says “(optional)”.
- Put the LLM key in **Variables**.
- Call this done during VPS provision — [Agent provision](/ContinuumDAO/MPAWallet/AgentProvision.md) is first; Provider is a later human step.

### Related

- [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md)
- [AI harness overview](/ContinuumDAO/MPAWallet/AIHarness/Overview.md)
- [MCP servers](/ContinuumDAO/MPAWallet/AIHarness/McpServers.md)
- [Plan mode](/ContinuumDAO/MPAWallet/AIHarness/PlanMode.md)
- [AI-managed governance](/ContinuumDAO/MPAWallet/AIHarness/AgentGovernance.md)
- [Default Ed25519 signer](/ContinuumDAO/MPAWallet/DefaultEd25519Signer.md)
- [Telegram Mini App](/ContinuumDAO/MPAWallet/AIHarness/TelegramMiniApp.md)
- [KeyGens](/ContinuumDAO/MPCSigner/KeyGens.md)
- [Trade ideas](/ContinuumDAO/MPAWallet/TradeIdeas.md)
- [Overview](/ContinuumDAO/MPAWallet/Overview.md)
- [Agent provision and configure](/ContinuumDAO/MPAWallet/AgentProvision.md) — Path A; LLM key is later
- Operator detail: [Agent hooks](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/AGENT_HOOKS.md)
