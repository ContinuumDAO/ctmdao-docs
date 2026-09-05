
## Creating a KeyGen

A key (or KeyGen) contains the information that each node needs to take part in the joint creation of the Private Key to collectively sign transactions. A KeyGen has a *public key* but **NO PRIVATE KEY**. A new KeyGen can be requested by anyone in a Group. If all nodes in the Group agree to Join, then the new KeyGen is created.

**Two roles for KeyGens** (same node software — see [MPA wallet Overview](/ContinuumDAO/MPAWallet/Overview.md)):

1. **MPA wallet custody (multi-agree)** — everyday asset control. The simplest setup is a **2-node Group with threshold 2** (everyday language: **2/2** — both must Accept). Typical pattern: one AI-assisted node + one human circuit-breaker node you control. Larger Groups add loss-of-party resilience or committee control.
2. **Cross-chain Continuum (tx-check)** — optional. Groups that secure C3Caller messaging typically use **five or more independent** operators and **3/5 TSS**; eligibility starts at three nodes with threshold ≥ 3 — see [Joining the Continuum](/ContinuumDAO/MPCSigner/JoinNetwork.md).

Here is the dialogue to request a new KeyGen in the Keys page of the [MPA wallet](https://mpa.continuumdao.org)

<img src="/_media/KeyGen_request.png"  alt=""/>

We can go through each of the inputs here -

(1) MsgCheck

The user selects either "multi-agree", or "tx-check". The **multi-agree** option allows the nodes in the KeyGen to choose whether to sign a transaction (Accept), or not (Reject). This is the MPA wallet path: humans and/or AI agents, with Accept as the circuit breaker (including simple **2/2**). Full UI flow: [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md). The other option is **tx-check**, where once a signature request has been received by one of the nodes, the others automatically Accept and signature generation proceeds without a manual agreement step. That suits **C3Caller** cross-chain signatures, where security comes from many **independent** nodes holding shares and signing together, without knowledge of the full Private Key — not from a human Accept click on every message.

(2) Multi-sign client auth

When **creating** or **joining** this KeyGen, choose how **your node** registers its client identity for multi-sign rounds. The dialog offers **EIP-191 (Ethereum signatures, e.g. MetaMask)** or **Ed25519** (a key from **Node → Ed25519 Management Keys**). This choice is stored in the KeyGen’s **`ClientKeys`** map for your node — it mainly drives **browser** Compose and Accept/Reject (MetaMask prompts vs an Ed25519 sign-and-paste panel). It is **not** how the built-in AI agent authenticates; the agent uses the [preferred Ed25519 signer](/ContinuumDAO/MPAWallet/DefaultEd25519Signer.md) on node API calls regardless.

**Recommendation:** Choose **EIP-191** for most setups. Browser users then approve with their injected software wallet when the app prompts for a management signature. Reserve **Ed25519** client auth for nodes that will take part in multi-sign rounds **without** a browser wallet (for example headless automation on that node only).

For **EIP-191 (MetaMask)**: use a **newly created software wallet address** dedicated to management — **not** a hardware wallet (insufficient memory for large management signatures) and **not** an address used for custody or DeFi. See [Management signing and devices](/ContinuumDAO/MPAWallet/Overview.md#management-signing-and-devices).

Other nodes choose their own auth when they Join — for example one node can use MetaMask for a human operator and another can use Ed25519 on a headless node.

(3) Client Key

At create/join time, the **Client Key** is the value stored in **`ClientKeys`** for your node (visible when you expand the key under **Existing keys**). For **EIP-191 (MetaMask)** it is your node’s **Ethereum management address** (`NodeMgtKey` — the address the app uses when it prompts for a management signature). For **Ed25519**, pick a key from **Node → Ed25519 Management Keys** — typically **Bootstrap (config)** from install, or an added key you created there. See [Default Ed25519 signer](/ContinuumDAO/MPAWallet/DefaultEd25519Signer.md) and [Management signing and devices](/ContinuumDAO/MPAWallet/Overview.md#management-signing-and-devices).

**With an AI agent:** set the [preferred Ed25519 signer](/ContinuumDAO/MPAWallet/DefaultEd25519Signer.md) under **Node → Ed25519 Management Keys** (or ask the agent to add one and set it preferred) — see [Agent provision and configure](/ContinuumDAO/MPAWallet/AgentProvision.md) if you need mesh setup first. That is separate from the EIP-191 vs Ed25519 choice in this dialog.

(4) GroupID

Each KeyGen applies to a single Group that has previously been created, This defines which nodes can partake in the Sign Requests. All nodes in the Group must be in a healthy state before the KeyGen can start. A check is run to make sure this is the case.

If the KeyGen request is blocked, confirm every Group member is healthy on the [Groups](/ContinuumDAO/MPCSigner/Groups.md) page (**Health** section and peer list). Fix peer/MQTT setup or restart from the **Node** page as described there.

**With an AI agent:** ask for example *"Check why I can't create a KeyGen"*, *"Are all nodes in my Group healthy?"*, or follow [Agent provision and configure](/ContinuumDAO/MPAWallet/AgentProvision.md) for mesh fixes.

(5) Threshold

This is the TSS parameter from the **CGGMP24** and **FROST** protocols (Lockness / LF Decentralized Trust). **Signing requires `threshold` Accepts** :

| UI **Threshold** | Accepts needed | Everyday name | Typical use |
|------------------|----------------|---------------|-------------|
| **2** | **2** | **2/2** (with a 2-node Group) | Personal AI + human circuit breaker |
| **3** | **3** | **3/5** (with a 5-node Group), or 3/3, 3/4, … | Cross-chain Continuum Groups; larger committees |
| higher | same as threshold | e.g. 4/7 | Stronger shared custody |

So long as **threshold** nodes have agreed to a Sign Request, that signature may be generated. For **multi-agree**, the signature must be generated only by the node that created the Sign Request. For **tx-check**, the signature is performed by the first node in the Configured Nodes and passed back to the C3Caller Relayer for execution.

(6) Key type

This is the cryptographic key type for which a signature is being sought. We currently support three key types:

- **secp256k1** — ECDSA, threshold signing via **CGGMP24**; used by Ethereum, EVMs, and **Bitcoin SegWit (P2WPKH)** (**bc1q…**). One multi-agree secp256k1 KeyGen can custody EVM assets and SegWit BTC together.
- **ed25519** — EdDSA, threshold signing via **FROST**; used by many non-EVM chains (e.g. Solana, NEAR, TON, SUI, APTOS, Algorand, Stellar)
- **bitcoin-taproot** — Schnorr (BIP-340 key-path), threshold signing via **FROST** (via **givre**); used for **Bitcoin Taproot (P2TR)** (**bc1p…**). This is a **separate** KeyGen from secp256k1 and from ed25519 — create a dedicated **multi-agree** KeyGen when you want Taproot custody. See [Bitcoin](/ContinuumDAO/MPAWallet/Bitcoin.md).

**CGGMP24** and **FROST** are maintained by the Lockness project under LF Decentralized Trust (Linux Foundation).

NOTE *don't confuse the management signature type Ed25519 with the MPC signature types **ed25519** or **bitcoin-taproot***


Any number of KeyGens can be created for a Group, of both types "multi-agree", or "tx-check", with different client-auth choices per node, different thresholds, or different Key types. Each Group can have its own set of KeyGens.

Each KeyGen will have different public addresses derived from its *public key* depending on the Key type and the target blockchain:

- **secp256k1** — a single Ethereum address, plus SegWit **bc1q…** addresses derived automatically for Bitcoin mainnet, testnet, and signet
- **ed25519** — separate unique public addresses per blockchain (e.g. Solana, NEAR)
- **bitcoin-taproot** — Taproot **bc1p…** addresses for Bitcoin mainnet, testnet, and signet

SegWit and Taproot are **different addresses** — funds sent to one are not spendable with the other KeyGen type.


### KeyGen Agreement 

Once the KeyGen Request has been submitted the originator sees their request in their Pending table

<img src="/_media/KeyGen_pending_creator.png"  alt=""/>

Their own Node Key has a green tick (they agree automatically) and other nodes show 'waiting' whilst these other nodes decide if they want to agree or not to the request.

On one of the other nodes, they will see a Join button. If they click it, they can choose their own client auth (EIP-191 MetaMask, or Ed25519). Human-operated nodes usually pick **EIP-191**; headless or agent-only nodes may pick **Ed25519**.

<img src="/_media/KeyGen_pending_client.png"  alt=""/>

</br>
</br>

<img src="/_media/KeyGen_join_select_signature.png"  alt=""/>

Once EVERY node in the Group has Joined, the KeyGen will disappear from the Pending table and **after a few minutes**  of patiently waiting, the KeyGen will appear in the Existing keys table in each node in the Group.

<img src="/_media/KeyGen_existing_signing.png"  alt=""/>

You can see when the record is expanded that it shows the **client auth** recorded for this node (MetaMask EIP-191 in this example), that it is of type secp256k1 and multi-agree, with threshold 2 (2 nodes must agree), and you see its public key and its Ethereum address.

You can now use your KeyGen for either use in the Multi-Sign page (for "multi-agree" KeyGens), or you use it to sign C3Caller Relayer traffic (for "tx-check" KeyGens).

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

