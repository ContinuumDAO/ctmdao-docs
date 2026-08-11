
## An Overview of the Multi-party Agent Wallet

[The MPA wallet](https://mpa.continuumdao.org) is an **AI-first** wallet: people and AI agents jointly control a single wallet address using Multi Party Computation (MPC). There is **no full on-chain private key** on any machine — only threshold shares — until a Group deliberately [ejects](/ContinuumDAO/MPAWallet/EjectConversion.md) a KeyGen.

ContinuumDAO's MPA wallet is truly decentralized: no custodial recovery service holds a backup of your key. You choose the Group size and TSS threshold yourself.

Unlike a **multi-sig** wallet, agreement and MPC signing happen **off-chain** among your nodes. What lands on the blockchain is a normal single signature from the shared public key — not a trail of who proposed, who Accepted, or who Rejected. There is **no on-chain record** of the encrypted communications between nodes, or of which nodes signed in reaching agreement or rejection of any proposition. That preserves privacy for the Group’s decision process; only the resulting transaction (if any) is public.

### Why create an MPA wallet (two roles)

The same node software supports two related purposes. You can use the first alone; the second is optional.

#### 1. Secure, decentralized asset custody (MPA wallet)

Use MPC so digital assets are held **without a single Private Key**, with:

- **Loss safeguard** — extra nodes (and a suitable threshold) so one lost party or offline machine does not strand the wallet forever.
- **Human-in-the-loop circuit breaker against unauthorized AI spends** — typically a simple **2/2** setup: one node runs (or is driven by) an AI agent; another node you control must **Accept** before a signature can complete. The AI can propose and compose; it cannot spend alone.

You can also run larger personal or committee Groups (DAO treasury, investment club, family) with higher thresholds. The **simplest** useful configuration for someone who wants to control their own AI agent is **2/2**.

#### 2. Optional — secure cross-chain transactions (Continuum / C3Caller)

The **same** nodes can join larger **Groups** that secure Continuum **cross-chain** messaging. For that role, Groups are typically **five or more** nodes with **3/5 TSS** MPC, and ideally each node is run by a **completely independent operator**. Eligibility and proposal steps: [Joining the Continuum](/ContinuumDAO/MPCSigner/JoinNetwork.md).

| Role | Typical Group | TSS (everyday language) | Operators | KeyGen style |
|------|---------------|-------------------------|-----------|--------------|
| Personal / AI-controlled wallet | **2** nodes | **2/2** (both must agree) | Often the same person (AI node + human circuit-breaker node) | **multi-agree** |
| Shared custody / committee | 3+ nodes | e.g. 2/3, 3/5 | People / orgs you choose | **multi-agree** |
| Cross-chain Continuum signer | **5+** nodes (ideal) | **3/5** typical | **Independent** operators | **tx-check** (auto-agree for relayer traffic) |

Install a node: [Install a node](/ContinuumDAO/MPAWallet/Install.md) (node-map **`+`**). Back up bootstrap keys and the encrypted node database early: [Backup and restoration](/ContinuumDAO/MPAWallet/BackupAndRestoration.md). Advanced / manual shell steps: [Running an MPC Node](/ContinuumDAO/RunningInstructions/NodeRunningInstruction.md).

### Using the wallet

You can operate entirely from the **node app** UI (Groups, KeyGens, multi-sign) without enabling the AI agent. For most users it is desirable to also use the built-in [AI agent harness](/ContinuumDAO/MPAWallet/AIHarness/Overview.md): one or more nodes can be agent-assisted, agents and people can message each other, and your threshold still bounds what can be signed. Configuring the harness is **optional** — see [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md).

Direct DeFi / web3 protocol integrations (node app and agent MCP): [DeFi protocol support](/ContinuumDAO/MPAWallet/DeFiProtocolSupport.md). Interactive candlesticks, analysis, and trade ideas: [AI charting](/ContinuumDAO/MPAWallet/AICharting.md), [Technical analysis](/ContinuumDAO/MPAWallet/TechnicalAnalysis.md), and [Trade ideas](/ContinuumDAO/MPAWallet/TradeIdeas.md).

A Group can also **eject** a multi-agree KeyGen — threshold agreement reconstructs a normal private key for import into MetaMask or another browser wallet: [Eject conversion to standard wallet](/ContinuumDAO/MPAWallet/EjectConversion.md).

All communications between the AI agent and people is stored on the nodes, so that this context is owned by the MPA wallet group and can be accessed by all future agents. It won't be forgotten; you own the data and it is encrypted. The data includes both transaction data, scripts and text messages between all nodes.

The MPA wallet can be fully configured and controlled via a Restful API and a built-in MCP server on your node. Your browser attaches to **your** node — ContinuumDAO does not proxy day-to-day control of it. Two common attach paths:

1. **SSH tunnel (often the simplest)** — open an SSH tunnel from your PC to the node, then attach over localhost. Encryption is provided by SSH. This needs no ContinuumDAO service, no public CA certificate, and no ContinuumDAO-hosted frontend. Many operators prefer this for remote VPS nodes.
2. **Browser HTTPS with a self-signed cert** — talk to the node over TLS using the node’s own certificate and short-lived token (JWT) access, without registering a certificate with a public Certification Authority. You trust the cert in your browser (for example via **Fetch Self-Signed Web Cert** in the app).

MPA wallet is completely decentralized. Each node can run its own node-app container, so you can use a ContinuumDAO-hosted UI such as [mpa.continuumdao.org](https://mpa.continuumdao.org) if you wish, or the node-hosted app on your machine. Either way, management traffic goes to your node (via SSH tunnel or Browser HTTPS), not through a ContinuumDAO custody service. Even if ContinuumDAO ceases to exist, the MPA wallet will continue to function (with no further updates of course).
