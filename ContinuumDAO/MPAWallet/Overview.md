
## An Overview of the Multi-party Agent Wallet

[The MPA wallet](https://mpa.continuumdao.org) is an **AI-first** wallet: people and AI agents jointly control a single wallet address using Multi Party Computation (MPC). Every node ships with a built-in **AI agent harness** — the natural way to propose trades, run analysis, and drive DeFi flows — while a **rich frontend** ([mpa.continuumdao.org](https://mpa.continuumdao.org) or the node-hosted app) gives you **full manual control** without an agent: Groups, KeyGens, [multi-sign](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md), DeFi protocol actions, charts, and node management in one interface. There is **no full on-chain private key** on any machine — only threshold shares — until a Group deliberately [ejects](/ContinuumDAO/MPAWallet/EjectConversion.md) a KeyGen.

ContinuumDAO's MPA wallet is **fully decentralized**: unlike many MPC wallets that store key shares in vendor-controlled **databases**, custody lives **only on nodes you deploy**. There is no custodial recovery service and no ContinuumDAO-held backup of your shares. You choose the Group size and TSS threshold yourself.

Unlike a **multi-sig** wallet, agreement and MPC signing happen **off-chain** among your nodes through the [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md). What lands on the blockchain is a normal single signature from the shared public key — not a trail of who proposed, who Accepted, or who Rejected. There is **no on-chain record** of the encrypted communications between nodes, or of which nodes signed in reaching agreement or rejection of any proposition. That preserves privacy for the Group’s decision process; only the resulting transaction (if any) is public.

### Why create an MPA wallet (two roles)

The same node software supports two related purposes. You can use the first alone; the second is optional.

#### 1. Secure, decentralized asset custody (MPA wallet)

Use MPC for **fully decentralized self-custody** of **Bitcoin** (SegWit and Taproot), **Ethereum and other EVM-compatible assets**, and — as support rolls out — **Ed25519 chains** (e.g. Solana, NEAR). Assets are held **without a single Private Key**, with:

- **Loss safeguard** — extra nodes (and a suitable threshold) so one lost party, offline machine, or death does not strand the wallet forever; relatives or friends can hold shares as co-custodians.
- **No hardware-wallet vendor dependency** — no recovery tied to email addresses, home addresses, or a single manufacturer’s cloud.
- **Human-in-the-loop circuit breaker against unauthorized AI spends** — typically a simple **2/2** setup: one node runs (or is driven by) an AI agent; another node you control must **Accept** on the **Join** tab before a signature can complete. See [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md).
- **Direct web3 protocol access** — the node app and optional AI agent connect **directly** to major DeFi protocols (Uniswap, Aave, Curve, GMX, Hyperliquid, Lido, and others) for **secure Private-Key-less trading** — swaps, lending, staking, perps, and bridges — always through your MPC KeyGen and the same [Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md). Full list: [DeFi protocol support](/ContinuumDAO/MPAWallet/DeFiProtocolSupport.md).

You can also run larger personal or committee Groups (DAO treasury, investment club, family) with higher thresholds. The **simplest** useful configuration for someone who wants to control their own AI agent is **2/2**.

#### 2. Optional — secure cross-chain transactions (Continuum / C3Caller)

The **same** nodes can join larger **Groups** that secure Continuum **cross-chain** messaging. For that role, Groups are typically **five or more** nodes with **3/5 TSS** MPC, and ideally each node is run by a **completely independent operator**. Eligibility and proposal steps: [Joining the Continuum](/ContinuumDAO/MPCSigner/JoinNetwork.md).

| Role | Typical Group | TSS (everyday language) | Operators | KeyGen style |
|------|---------------|-------------------------|-----------|--------------|
| Personal / AI-controlled wallet | **2** nodes | **2/2** (both must agree) | Often the same person (AI node + human circuit-breaker node) | **multi-agree** |
| Shared custody / committee | 3+ nodes | e.g. 2/3, 3/5 | People / orgs you choose | **multi-agree** |
| Cross-chain Continuum signer | **5+** nodes (ideal) | **3/5** typical | **Independent** operators | **tx-check** (auto-agree for relayer traffic) |

Install a node: [Install a node](/ContinuumDAO/MPAWallet/Install.md) (node-map **`+`**). Back up bootstrap keys and the encrypted node database early: [Backup and restoration](/ContinuumDAO/MPAWallet/BackupAndRestoration.md). Advanced / manual shell steps: [Running an MPC Node](/ContinuumDAO/RunningInstructions/NodeRunningInstruction.md).

### Using the wallet — AI-first, rich frontend always

The MPA wallet is **AI-first by design**: the built-in [AI agent harness](/ContinuumDAO/MPAWallet/AIHarness/Overview.md) is the recommended path for market analysis, trade ideas, and protocol workflows — with your threshold still bounding every signature. **You do not need the agent to use the wallet.** The **rich frontend** (hosted at [mpa.continuumdao.org](https://mpa.continuumdao.org) or the node-hosted app on your machine) is a **complete wallet UI**: create Groups and KeyGens, review and **Accept** or **Reject** pending transactions on the **Join** tab, complete MPC signing and broadcast on **Execute**, audit rounds on **History**, compose DeFi actions by hand, manage backups, and operate every custody feature without enabling AI. Flow details: [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md).

Most users will want both — agent-assisted flows plus the frontend as human circuit breaker and manual override. Configuring the harness is **optional** — see [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md).

Direct **web3 / DeFi protocol** integrations built into the node (no separate browser wallet or key export): [DeFi protocol support](/ContinuumDAO/MPAWallet/DeFiProtocolSupport.md) — Uniswap, Aave, Curve, GMX, Hyperliquid, and other major protocols for **Private-Key-less trading** from the node app or AI agent MCP. Interactive candlesticks, analysis, and trade ideas: [AI charting](/ContinuumDAO/MPAWallet/AICharting.md), [Technical analysis](/ContinuumDAO/MPAWallet/TechnicalAnalysis.md), and [Trade ideas](/ContinuumDAO/MPAWallet/TradeIdeas.md).

A Group can also **eject** a multi-agree KeyGen — threshold agreement reconstructs a normal private key for import into MetaMask or another browser wallet: [Eject to Private Key](/ContinuumDAO/MPAWallet/EjectConversion.md).

All communications between the AI agent and people is stored on the nodes, so that this context is owned by the MPA wallet group and can be accessed by all future agents. It won't be forgotten; you own the data and it is encrypted. The data includes both transaction data, scripts and text messages between all nodes.

The MPA wallet can be fully configured and controlled via a Restful API and a built-in MCP server on your node. Your browser attaches to **your** node — ContinuumDAO does not proxy day-to-day control of it. Common attach paths:

1. **Node hosted app (local PC)** — node on the same machine; the hosted SPA opens `http://127.0.0.1:3333` and you attach over plain HTTP locally.
2. **Node hosted app (SSH tunnel)** — remote VPS; SSH tunnel from your PC, then attach via the local node app. Encryption on the path is SSH.
3. **Browser HTTPS with a self-signed cert** — direct TLS from the hosted SPA. Attach via a Node hosted app option first to fetch **`browser.crt`** (**Fetch Self-Signed Web Cert**), import it, then reconnect with Browser HTTPS and short-lived read JWT access.

MPA wallet is completely decentralized. Each node can run its own node-app container, so you can use a ContinuumDAO-hosted UI such as [mpa.continuumdao.org](https://mpa.continuumdao.org) if you wish, or the node-hosted app on your machine. Either way, management traffic goes to your node (via Node hosted app or Browser HTTPS), not through a ContinuumDAO custody service.

### Fully decentralized custody

The MPA wallet is designed so that **custody stays in your hands**, not on ContinuumDAO infrastructure:

- **No key shares in databases** — unlike many other MPC wallets, threshold shares are **not** stored in vendor-controlled databases. Shares, Group state, and encrypted wallet context live **only on the nodes you run**.
- **Self-contained node software** — the code that operates your wallet runs **entirely on your nodes**. The only on-chain dependency for protocol fees is a **DAO-governed smart contract**; there is no central service that holds or reconstructs your keys.
- **Recovery and hardware switching** — you can save **encrypted node data** (together with your bootstrap keys) to storage you control, then restore on new hardware or a new VPS while keeping the same node identity. See [Backup and restoration](/ContinuumDAO/MPAWallet/BackupAndRestoration.md).
- **Eject to a standard wallet** — if the Group agrees, a KeyGen can be **ejected**: threshold MPC reconstructs a normal private key for import into MetaMask or another conventional wallet. See [Eject to Private Key](/ContinuumDAO/MPAWallet/EjectConversion.md).
- **Continuity without ContinuumDAO** — even if ContinuumDAO ceased operations, your MPA wallet would **continue to work** from your deployed nodes and backups (without further updates from the DAO).

### Management signing and devices

When you attach to a node, you **management-sign** sensitive actions: [Accept/Reject on multi-sign](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md), KeyGen flows, bootstrap and database backup operations, and other node API calls (MetaMask **EIP-191** or **Ed25519** — see [KeyGens](/ContinuumDAO/MPCSigner/KeyGens.md)).

- **Prefer a device not used for general internet use** — a machine you do not browse, email, or install casual software on reduces exposure to malware, malicious extensions, and phishing on the device that authorizes node control.
- **Strongest setup: one dedicated device per node** — attach and sign management requests for each node from **separate** hardware (or at least separate user accounts and browsers with no shared daily-use profile). If one everyday laptop is compromised, the others in your Group should not be trivially reachable from the same environment.

**Ethereum (EIP-191 / MetaMask) management signers:**

- **Do not use hardware wallets** — devices such as Ledger or Trezor often lack enough memory to sign the **large EIP-191 management payloads** the node app produces. Use a **software wallet** in the browser instead.
- **Use a newly created, dedicated address** — generate a fresh wallet for **management signing only**. Set that address as your node’s **`NodeMgtKey`**. Do **not** reuse addresses that hold custody funds, DeFi positions, or everyday assets; management keys authenticate node control, not your MPC wallet balances.
- **One management address per node** — each node should have its **own** Ethereum management address, separate from other nodes and from any KeyGen custody addresses.

This complements [backup storage separation](/ContinuumDAO/MPAWallet/BackupAndRestoration.md): keep recovery material split, and keep **signing environments** split too.

### Subscription through staking

MPA wallet access can be paid via a **monthly subscription**, or — for node operators who **stake veCTM on their node** — through **subscription through staking**: **free use of the wallet up to a governance-set free signature limit**. Attach veCTM from the staking panel after your node is running; limits and any overage fees are set by DAO voting. This rewards long-term participants who help secure the network while keeping personal custody affordable.

### Related

- [Attach your node](/ContinuumDAO/MPAWallet/AttachYourNode.md)
- [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md)
- [Install a node](/ContinuumDAO/MPAWallet/Install.md)
- [Backup and restoration](/ContinuumDAO/MPAWallet/BackupAndRestoration.md)
- [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md)
- [KeyGens](/ContinuumDAO/MPCSigner/KeyGens.md)
- [Eject to Private Key](/ContinuumDAO/MPAWallet/EjectConversion.md)
- [Joining the Continuum](/ContinuumDAO/MPCSigner/JoinNetwork.md) — optional cross-chain signer role
