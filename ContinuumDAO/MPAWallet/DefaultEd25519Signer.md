## Default Ed25519 signer

Every node needs at least one management key; **Ed25519** (`PublicMgtKey` and optional added keys) is enough — you do **not** need an Ethereum injected signer (e.g. MetaMask, Rabby, etc.) or **`NodeMgtKey`**. The built-in AI agent (Agent chat and Telegram, if configured) and human operators in the node app both use allowed Ed25519 keys for management API calls.

The **default signer** (also called **preferred signer** in the UI) is which allowed management key the **AI harness** uses automatically. Humans pick the active key with the **header key icon** (same allowed keys; the Ethereum signer is optional if configured).

This is **not** the shared MPC wallet key. On-chain control still uses MPC — the node never holds the full on-chain private key. In a typical **2/2** AI setup, the agent’s management signer lives on the AI node; your human circuit-breaker node still must **Accept** the multi-sign on **Join** before funds move. Flow: [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md).

### OK vs sign-clipboard (human signing)

When the header management signer is Ed25519, the app checks whether the selected key’s **private file is on the node** (`bootstrap_key/ed25519_private.hex` or `added_keys/added_key_<N>`):

| Private key location | Typical flow |
| -------------------- | ------------ |
| **On the node** | Click **OK** — the node signs locally and submits (no clipboard). |
| **Only on your PC** | Copy the message → **`sign-clipboard --key-file <path>`** on your PC → paste 128-hex signature → **Submit**. Expand **Sign on this PC** when both options are available. |
| **Attach / SSH tunnel** | Always **sign-clipboard on your PC** to prove ownership at attach time, even if the same key’s private copy also exists on the node. After attach, day-to-day actions follow the table above. |

<!-- Screenshot placeholder: replace _media/ed25519-management-ok-vs-sign-on-pc.png -->
<img src="/_media/ed25519-management-ok-vs-sign-on-pc.png" alt="Ed25519 management dialog — OK vs Sign on this PC — screenshot pending" />

Tooling: **`sign-clipboard`** lives in [mpc-config](https://github.com/ContinuumDAO/mpc-config) under **`tools/sign-clipboard`** (clone the repo and `go build` there if you do not have the binary on your PC). Build and usage: [`tools/sign-clipboard/README.md`](https://github.com/ContinuumDAO/mpc-config/blob/main/tools/sign-clipboard/README.md). The same tool is also bundled in continuumdao-node-app. See [Attach your node](/ContinuumDAO/MPAWallet/AttachYourNode.md) and [Overview — Management signing](/ContinuumDAO/MPAWallet/Overview.md#management-signing-and-devices).

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

<img src="/_media/preferred_signer_selection.png"  alt=""/>


Common choices:

- Keep or select **bootstrap** if you want the install-time key.
- Create an added key (see the **+** icon above) and prefer that if you want a dedicated agent management key.

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
| Human operator, key on node | Header Ed25519 signer + **OK** for most management actions |
| Human operator, key on PC only | **sign-clipboard** + paste; or store private key on node if you accept that trade-off |
| SSH tunnel attach | **sign-clipboard on PC** at attach; then OK or clipboard for later actions |
| Recreated node | Restore the original bootstrap private key (same PublicMgtKey) — see [Backup and restoration](/ContinuumDAO/MPAWallet/BackupAndRestoration.md) |
| Telegram bot | Same default signer as Agent chat |
| Want more detail | Technical lifecycle: [CONFIGURING_ED25519_KEYS.md](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/CONFIGURING_ED25519_KEYS.md) |

### Related

- [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md)
- [Backup and restoration](/ContinuumDAO/MPAWallet/BackupAndRestoration.md)
- [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md)
- [AI harness overview](/ContinuumDAO/MPAWallet/AIHarness/Overview.md)
- [Telegram Mini App](/ContinuumDAO/MPAWallet/AIHarness/TelegramMiniApp.md)
- Technical: [CONFIGURING_ED25519_KEYS.md](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/CONFIGURING_ED25519_KEYS.md)
