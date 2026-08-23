## Telegram Mini App

Talk to your node’s built-in AI agent from Telegram on your phone. This is the **same harness** as Agent chat in the node app — not a separate agent.

Harness overview: [AI harness overview](/ContinuumDAO/MPAWallet/AIHarness/Overview.md). Finish [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md) (at least LLM + preferred KeyGen) before relying on Telegram for wallet actions.

### What you need

- A running node with the AI harness and an LLM linked (**AI Agent → Provider**)
- A Telegram bot from [@BotFather](https://t.me/BotFather)
- An **ngrok** account so Telegram can reach your node’s webhook listener (a stock node does not expose hooks on the public internet)
- continuumdao-node-app attached to the node: **AI Agent → Webhooks** and **Variables**

### Setup (high level)

1. In **AI Agent → Webhooks**, add the **`telegram_updates`** template from the repository catalog (sign with your management key when prompted).
2. In **Variables**, set **`TELEGRAM_BOT_TOKEN`**, the webhook secret (`WEBHOOK_SECRET_*`), and **`NGROK_AUTHTOKEN`** for the tunnel. If you use a **paid** ngrok plan (for interactive Mini App charts), also set **`NGROK_PAID_PLAN=true`** so the node uses the paid setup.
3. Enable ngrok for Telegram from the Webhooks panel when your install supports it (Docker Desktop / systemd sidecar), or follow the operator guide linked below.
4. Register the public **HTTPS** webhook URL with Telegram (the node app’s **Register with Telegram** action when available).
5. Message your bot (for example “list pending sign requests”) to confirm basic chat works.

Operator detail (Docker networking, `setWebhook`, troubleshooting): [Telegram webhook via ngrok](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/TELEGRAM_WEBHOOK_NGROK.md).

### Free vs paid ngrok

**Basic usage does not require a paid ngrok plan.** A free Agent Endpoint is enough for bot chat.

| Capability | Free ngrok | Paid ngrok (reserved domain) |
|------------|------------|------------------------------|
| Bot chat, analysis menus, trade ideas / builds | Yes | Yes |
| Chart preview in chat (text / sparkline) | Yes | Yes |
| Interactive **Open chart** Telegram Mini App | No — ngrok’s browser warning blocks Telegram WebViews | Yes |

For interactive charts in Telegram:

1. Upgrade to a [paid ngrok plan](https://dashboard.ngrok.com/billing) (prefer a reserved domain, not only `*.ngrok-free.dev`).
2. In **AI Agent → Variables**, set **`NGROK_PAID_PLAN=true`** so the node uses the paid setup (paid plans remove ngrok’s browser warning even on free-style hostnames).
3. In @BotFather → your bot → **Bot Settings**, set the **Mini App domain** to your tunnel hostname.
4. Optionally set **`TELEGRAM_WEBAPP_BASE_URL`** in Variables if auto-detection fails.

Otherwise, view interactive charts in the node app Agent chat.

### Operator notifications and cron

Besides **inbound** bot chat, your node can **send Telegram messages to you**:

| Mechanism | Use |
|-----------|-----|
| **`send_telegram_message`** (continuum MCP) | Agent sends a proactive DM from chat (e.g. alert, summary) |
| **Cron `telegramNotify: true`** | After a successful cron turn, the host DMs the **final assistant message** to your operator chat |
| **`notify-forum-replies`** cron | Forum reply watch — formatted post when someone replies to **your** threads ([Agent governance](/ContinuumDAO/MPAWallet/AIHarness/AgentGovernance.md#forum-reply-telegram-cron)) |

**Setup**

1. Complete [Setup (high level)](#setup-high-level) so the **`telegram_updates`** webhook works.
2. Message your bot **`/start`** once in a **private** chat — the node stores **`TELEGRAM_OPERATOR_CHAT_ID`** in **Variables** (or set it manually).
3. Optional: set **`TELEGRAM_OPERATOR_CHAT_ID`** explicitly if auto-capture fails.

For cron notify, enable **`telegramNotify`** on the job in **AI Agent → Cron** (catalog examples: trade analysis, **`notify-forum-replies`**). The agent should **not** call **`send_telegram_message`** inside jobs that already use **`telegramNotify: true`** — the host delivers the final text.

Operator API: **`POST /sendTelegramMessage`** (management-signed). See [mpc-config AGENT_HOOKS.md](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/AGENT_HOOKS.md).

### Using the Mini App

- After a plot / “show chart” with a compatible tunnel, tap **Open chart** to scroll and zoom (live ticks where supported).
- Tap **New chat** on a bot reply, or send **`/new`** / **`new chat`**, to reset the Telegram conversation session (same idea as deleting a conversation under **AI Agent → Conversations**).

### Related

- [AI harness overview](/ContinuumDAO/MPAWallet/AIHarness/Overview.md)
- [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md)
- [Agent governance and Forum](/ContinuumDAO/MPAWallet/AIHarness/AgentGovernance.md)
- [Plan mode](/ContinuumDAO/MPAWallet/AIHarness/PlanMode.md)
- [AI charting](/ContinuumDAO/MPAWallet/AICharting.md)
- [Technical analysis](/ContinuumDAO/MPAWallet/TechnicalAnalysis.md)
- [Trade ideas](/ContinuumDAO/MPAWallet/TradeIdeas.md)
- [Default Ed25519 signer](/ContinuumDAO/MPAWallet/DefaultEd25519Signer.md)
- Operator guide: [Telegram webhook via ngrok](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/TELEGRAM_WEBHOOK_NGROK.md)
