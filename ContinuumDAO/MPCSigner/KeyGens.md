
## Creating a KeyGen

A key (or KeyGen) contains the information that each node needs to take part in the joint creation of the Private Key to collectively sign transactions. A KeyGen has a *public key* but **NO PRIVATE KEY**. A new KeyGen can be requested by anyone in a Group. If all nodes in the Group agree to Join, then the new KeyGen is created.

**Two roles for KeyGens** (same node software — see [MPA wallet Overview](/ContinuumDAO/MPAWallet/Overview.md)):

1. **MPA wallet custody (multi-agree)** — everyday asset control. The simplest setup is a **2-node Group with threshold 2** (everyday language: **2/2** — both must Accept). Typical pattern: one AI-assisted node + one human circuit-breaker node you control. Larger Groups add loss-of-party resilience or committee control.
2. **Cross-chain Continuum (tx-check)** — optional. Groups that secure C3Caller messaging typically use **five or more independent** operators and **3/5 TSS**; eligibility starts at three nodes with threshold ≥ 3 — see [Joining the Continuum](/ContinuumDAO/MPCSigner/JoinNetwork.md).

### Manual flow

Here is the dialogue to request a new KeyGen on the **Keys** page of the [MPA wallet](https://mpa.continuumdao.org):

<img src="/_media/keygen_new_keygen_dialog.png" alt="KeyGen request dialog in the MPA wallet Keys page"/>

The inputs are explained below.

#### (1) MsgCheck

The user selects either **multi-agree** or **tx-check**.

- **multi-agree** — nodes in the KeyGen choose whether to sign a transaction (Accept) or not (Reject). This is the MPA wallet path: humans and/or AI agents, with Accept as the circuit breaker (including simple **2/2**). Full UI flow: [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md).
- **tx-check** — once a signature request has been received by one of the nodes, the others automatically Accept and signature generation proceeds without a manual agreement step. That suits **C3Caller** cross-chain signatures, where security comes from many **independent** nodes holding shares and signing together, without knowledge of the full Private Key — not from a human Accept click on every message. The relayer calls **`POST /signRequest`** with its own relayer key (not a KeyGen client identity). Creating or joining a tx-check KeyGen via the agent/MCP prefers the on-node **`bootstrap_key`** Ed25519 seed if present, otherwise another allowed Ed25519 private key under **`added_keys/`**.

Creating or joining a KeyGen from the **Keys** page is signed with the **current header management signer** — the Ethereum wallet (`NodeMgtKey`) or an allowed Ed25519 key selected with the header key icon (including a key whose private key is only on your PC). There is no per-KeyGen client identity to enter. The built-in AI agent uses the [preferred Ed25519 signer](/ContinuumDAO/MPAWallet/DefaultEd25519Signer.md) on node API calls for **multi-agree**; for **tx-check** create/join it uses the on-disk bootstrap key when that file exists.

For **EIP-191 (Ethereum injected signer, e.g. MetaMask, Rabby, etc.)**: use a **newly created software wallet address** dedicated to management — **not** a hardware wallet (insufficient memory for large management signatures) and **not** an address used for custody or DeFi. See [Management signing and devices](/ContinuumDAO/MPAWallet/Overview.md#management-signing-and-devices).

#### (2) GroupID

Each KeyGen applies to a single Group that has previously been created. This defines which nodes can partake in the Sign Requests. All nodes in the Group must be in a healthy state before the KeyGen can start. A check is run to make sure this is the case.

If the KeyGen request is blocked, confirm every Group member is healthy on the [Groups](/ContinuumDAO/MPCSigner/Groups.md) page (**Health** section and peer list). Fix peer/MQTT setup or restart from the **Node** page as described there. To create via Agent chat instead of the dialog, see [AI flow](#ai-flow); for diagnostics, ask *"Check why I can't create a KeyGen"* or *"Are all nodes in my Group healthy?"*

#### (3) Threshold

This is the TSS parameter from the **CGGMP24** and **FROST** protocols (Lockness / LF Decentralized Trust). **Signing requires `threshold` Accepts:**

| UI **Threshold** | Accepts needed | Everyday name | Typical use |
|------------------|----------------|---------------|-------------|
| **2** | **2** | **2/2** (with a 2-node Group) | Personal AI + human circuit breaker |
| **3** | **3** | **3/5** (with a 5-node Group), or 3/3, 3/4, … | Cross-chain Continuum Groups; larger committees |
| higher | same as threshold | e.g. 4/7 | Stronger shared custody |

So long as **threshold** nodes have agreed to a Sign Request, that signature may be generated. For **multi-agree**, the signature must be generated only by the node that created the Sign Request. For **tx-check**, the signature is performed by the first node in the Configured Nodes and passed back to the C3Caller Relayer for execution.

#### (4) Key type

This is the cryptographic key type for which a signature is being sought. We currently support three key types:

- **secp256k1** — ECDSA, threshold signing via **CGGMP24**; used by Ethereum, EVMs, and **Bitcoin SegWit (P2WPKH)** (**bc1q…**). One multi-agree secp256k1 KeyGen can custody EVM assets and SegWit BTC together.
- **ed25519** — EdDSA, threshold signing via **FROST**; used by many non-EVM chains (e.g. Solana, NEAR, TON, SUI, APTOS, Algorand, Stellar).
- **bitcoin-taproot** — Schnorr (BIP-340 key-path), threshold signing via **FROST** (via **givre**); used for **Bitcoin Taproot (P2TR)** (**bc1p…**). This is a **separate** KeyGen from secp256k1 and from ed25519 — create a dedicated **multi-agree** KeyGen when you want Taproot custody. See [Bitcoin](/ContinuumDAO/MPAWallet/Bitcoin.md).

**CGGMP24** and **FROST** are maintained by the Lockness project under LF Decentralized Trust (Linux Foundation).

**Note:** Do not confuse the management signature type **Ed25519** with the MPC signature types **ed25519** or **bitcoin-taproot**.

Any number of KeyGens can be created for a Group — both **multi-agree** and **tx-check**, with different thresholds or different key types. Each Group can have its own set of KeyGens.

Each KeyGen will have different public addresses derived from its *public key* depending on the key type and the target blockchain:

- **secp256k1** — a single Ethereum address, plus SegWit **bc1q…** addresses derived automatically for Bitcoin mainnet, testnet, and signet.
- **ed25519** — separate unique public addresses per blockchain (e.g. Solana, NEAR).
- **bitcoin-taproot** — Taproot **bc1p…** addresses for Bitcoin mainnet, testnet, and signet.

SegWit and Taproot are **different addresses** — funds sent to one are not spendable with the other KeyGen type.

### AI flow

Alternative to the **Keys** page dialog — use **Agent chat** on the node that should **originate** the KeyGen request. You need an existing **Group** first ([Groups](/ContinuumDAO/MPCSigner/Groups.md)).

**Before you prompt:**

1. **AI Agent → Provider** — link an LLM provider, model, Base URL, and API key on that tab (not Variables). See [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md) and [For AI agents — Provider](/ContinuumDAO/MPAWallet/AIHarness/Configure.md#for-ai-agents-provider).
2. **Preferred signer** — set the **preferred** Ed25519 management key under **Node → Ed25519 Management Keys** (or when Agent chat prompts). The agent uses this to management-sign the KeyGen request. See [Default Ed25519 signer](/ContinuumDAO/MPAWallet/DefaultEd25519Signer.md).
3. Confirm every node in the Group is **healthy** on the **Groups** page.

Open **Agent chat** from the **cat icon** (bottom-right). Example prompts:

- *"Create a multi-agree secp256k1 KeyGen with threshold 2 for my group."* (typical **2/2** MPA wallet)
- *"Create a KeyGen for group [Group ID] — multi-agree, threshold 2, key type secp256k1."*
- *"Create a bitcoin-taproot multi-agree KeyGen with threshold 2 for my group."* (Taproot custody — separate from SegWit/secp256k1)

Use **tx-check** and higher thresholds only when you intend [cross-chain Continuum](/ContinuumDAO/MPCSigner/JoinNetwork.md) signing — say so in the prompt (for example *"tx-check KeyGen, threshold 3, secp256k1, for group …"*).

To **review** requests instead of creating one:

- *"What active KeyGen requests are pending?"*
- *"List pending KeyGen requests for my groups."*
- *"Are there any KeyGen requests waiting for me to join?"*

After the agent creates the request, each **other** Group member must still **Join** on the **Keys** page (or prompt on their node: *"Show pending KeyGen requests and help me join"*). When the KeyGen appears under **Existing keys**, set **Preferred KeyGen** under **AI Agent → Provider** so compose and wallet actions use that address by default.

---

### KeyGen Agreement

Once the KeyGen request has been submitted, the originator sees their request in the **Pending** table:

<img src="/_media/keygen_pending_from_originator.png" alt="KeyGen pending table on the originator node"/>

Their own Node Key has a green tick (they agree automatically) and other nodes show **waiting** whilst those nodes decide whether to agree.

On one of the other nodes, they will see a **Join** button. Clicking it signs the agreement with the **current header management signer** (Ethereum wallet or the Ed25519 key selected with the key icon). If the header is on Ed25519 and the private key is on that node, click **OK**; if the private key is only on your PC, use **sign-clipboard** and paste the signature (see [Default Ed25519 signer](/ContinuumDAO/MPAWallet/DefaultEd25519Signer.md#ok-vs-sign-clipboard-human-signing)).

<img src="/_media/keygen_pending_from_peer.png" alt="KeyGen Join button on a peer node"/>

Once **every** node in the Group has Joined, the KeyGen will disappear from the **Pending** table. **After a few minutes**, the KeyGen will appear in the **Existing keys** table on each node in the Group.

<img src="/_media/keygen_existing_key.png" alt="KeyGen in the Existing keys table with details expanded"/>

When the record is expanded, it shows that it is of type secp256k1 and multi-agree, with threshold 2 (2 nodes must agree), and its public key and Ethereum address.

You can now use your KeyGen on the **Multi-Sign** page (for **multi-agree** KeyGens), or to sign C3Caller Relayer traffic (for **tx-check** KeyGens).

You can use this KeyGen from the node app alone. Optionally — and recommended for most users on this AI-first wallet — [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md).

If the Group later wants to leave MPC for this key and hold a normal private key (for example to import into MetaMask), use [Eject to Private Key](/ContinuumDAO/MPAWallet/EjectConversion.md).

### Related

- [Groups](/ContinuumDAO/MPCSigner/Groups.md)
- [Configured Nodes](/ContinuumDAO/MPCSigner/ConfiguredNodes.md)
- [Overview](/ContinuumDAO/MPAWallet/Overview.md) — 2/2 vs cross-chain roles
- [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md)
- [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md)
- [Eject to Private Key](/ContinuumDAO/MPAWallet/EjectConversion.md)
- [Joining the Continuum](/ContinuumDAO/MPCSigner/JoinNetwork.md) — tx-check KeyGens for C3Caller
- [Agent provision and configure](/ContinuumDAO/MPAWallet/AgentProvision.md)
- [Bitcoin](/ContinuumDAO/MPAWallet/Bitcoin.md) — SegWit (secp256k1) vs Taproot (bitcoin-taproot)
