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
2. In **Variables**, set **`TELEGRAM_BOT_TOKEN`**, the webhook secret (`WEBHOOK_SECRET_*`), and **`NGROK_AUTHTOKEN`** for the tunnel.
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

1. Upgrade to a [paid ngrok plan](https://dashboard.ngrok.com/billing) and reserve a domain (not `*.ngrok-free.dev`).
2. In @BotFather → your bot → **Bot Settings**, set the **Mini App domain** to that host.
3. Optionally set **`TELEGRAM_WEBAPP_BASE_URL`** in Variables if auto-detection fails.

Otherwise, view interactive charts in the node app Agent chat.

### Using the Mini App

- After a plot / “show chart” with a compatible tunnel, tap **Open chart** to scroll and zoom (live ticks where supported).
- Tap **New chat** on a bot reply, or send **`/new`** / **`new chat`**, to reset the Telegram conversation session (same idea as deleting a conversation under **AI Agent → Conversations**).

### Related

- [AI charting](/ContinuumDAO/MPAWallet/AICharting.md)
- [Technical analysis](/ContinuumDAO/MPAWallet/TechnicalAnalysis.md)
- [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md)
- [Default Ed25519 signer](/ContinuumDAO/MPAWallet/DefaultEd25519Signer.md)
- [Agent hooks](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/AGENT_HOOKS.md)
