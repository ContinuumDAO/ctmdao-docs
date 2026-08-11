## Default Ed25519 signer

The built-in AI agent (Agent chat and Telegram, if configured) needs an **Ed25519 management key** to call your node’s API. The **default signer** (also called **preferred signer** in the UI) is which allowed management key it uses.

This is **not** the shared MPC wallet key. On-chain control still uses MPC — the node never holds the full on-chain private key. In a typical **2/2** AI setup, the agent’s management signer lives on the AI node; your human circuit-breaker node still must **Accept** the multi-sign before funds move.

### What “default signer” means

- **Management key** — authenticates HTTP actions on **this** node (sign requests, messages, KeyGen flows, and so on).
- **Preferred KeyGen** (under **AI Agent → Provider**) selects which shared wallet the agent works on. That is separate from the default signer.

Agent chat and Telegram use the **same** default signer.

### Where your keys come from

**Bootstrap (config)** — created when the node was installed, or when you recreated the node and restored or regenerated bootstrap material. Shown in the app as something like **Bootstrap (config)**.

**Extra (added) keys** — created under **Node → Ed25519 Management Keys** (Add signer). Management private material for these keys lives on the node for the built-in agent. That is still not the MPC wallet key.

### How to set the default signer

1. Open **Node → Ed25519 Management Keys**.
2. Find the preferred / crown indicator on the signer table.
3. Set preferred on an **active** allowed key.

Common choices:

- Keep or select **bootstrap** if you want the install-time key.
- Create an added key and prefer that if you want a dedicated agent management key.

You can also set preferred signer from the **Agent chat** window when the UI offers it.

If you remove an added key that was preferred, pick another preferred key before expecting the agent to sign again.

### How the AI agent uses it

1. If a preferred signer is set and still allowed, the agent uses that key.
2. Otherwise it falls back to an allowed key that has local signing material (usually bootstrap on a normal Docker install).
3. You do not paste signatures or manage `~/.ssh` keys for the built-in harness path.

### Checklist

| Situation | What to do |
|-----------|------------|
| Fresh install | Bootstrap is enough unless you want a separate preferred key |
| Recreated node | Restore the original bootstrap private key (same PublicMgtKey) — see [Backup and restoration](/ContinuumDAO/MPAWallet/BackupAndRestoration.md) |
| Telegram bot | Same default signer as Agent chat |
| Want more detail | Technical lifecycle: [CONFIGURING_ED25519_KEYS.md](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/CONFIGURING_ED25519_KEYS.md) |

### Related

- [Backup and restoration](/ContinuumDAO/MPAWallet/BackupAndRestoration.md)
- [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md)
- [AI harness overview](/ContinuumDAO/MPAWallet/AIHarness/Overview.md)
- [Telegram Mini App](/ContinuumDAO/MPAWallet/AIHarness/TelegramMiniApp.md)
- Technical: [CONFIGURING_ED25519_KEYS.md](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/CONFIGURING_ED25519_KEYS.md)
