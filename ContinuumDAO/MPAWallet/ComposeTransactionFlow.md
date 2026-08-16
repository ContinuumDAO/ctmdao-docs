## Compose transaction flow

This page documents the **manual Compose UI** in the node app — one way to build a multi-sign request before it enters the [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md). The same loop applies no matter how the request was created.

| How the originator creates the request | Typical use |
|----------------------------------------|-------------|
| **Compose UI** (this page) | Hand-built transfers, custom contract calls, multi-step batches you edit step by step |
| **[DeFi protocol](/ContinuumDAO/MPAWallet/DeFiProtocolSupport.md) interaction** | Swaps, lending, perps, bridges, and similar — node app protocol UI or AI agent MCP; often builds **batched** multi-transaction requests automatically |
| **[Trade ideas](/ContinuumDAO/MPAWallet/TradeIdeas.md) / AI agent** | Agent chat or cron turns analysis into a sign request for your preferred KeyGen |
| **Foundry script automation** | Programmatic batch creation from scripts run against the node API — *documentation forthcoming* |

Every path ends the same way: the originator publishes a multi-sign request (single step or batch), peers **Accept** or **Reject** on **Join**, then the originator **Execute**s after threshold agreement. See [Creating a multi-sign request](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md#creating-a-multi-sign-request) and [Batching multiple signatures](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md#batching-multiple-signatures).

The sections below apply to the **Compose UI** only. Validate/Simulate and step-by-step editing are features of that screen; DeFi and agent builds perform their own quoting and simulation before creating the request.

### Select KeyGen and chain

1. Choose the **KeyGen** that will sign (must be **multi-agree** for MPA custody).
2. Choose the **blockchain** (network) for this request.
3. Optionally set **Purpose** text and **Custom Chain config** (gas profile, RPC gateway, gas multiplier) — peers see these on **Join**; see [Creating a multi-sign request](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md#creating-a-multi-sign-request).

### Add one or more transaction steps

Each step is one transaction (one signature) in the eventual batch.

**Single step** — the simplest case is an **ERC20 transfer**: token contract, recipient, amount. That is the same example used in [Join — threshold Accept / Reject](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md#join--threshold-accept--reject) and [Execute — MPC signing and broadcast](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md#execute--mpc-signing-and-broadcast).

**Multiple steps** — add further steps to build a **batch sign request**. Steps run **in order** when the originator later broadcasts on **Execute** (see [Batching multiple signatures](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md#batching-multiple-signatures)): the whole batch is Accepted/Rejected as one unit and broadcast as one.

Typical multi-step examples:

- ERC20 **approve**, then **swap**
- Sequential contract calls that depend on earlier steps in the same nonce sequence
- Several transfers or protocol actions you want one committee decision for

Use **Add step** (or equivalent) to grow the batch. Remove or reorder steps before you submit if the UI allows.

### Edit and cycle through steps

The compose screen lists every step in the batch. Select a step to edit its fields (contract, method, parameters, value, gas hints for that step). **Cycle** through steps with previous/next controls so you can review each transaction before submitting.

Fix errors on any step before **Validate** — later steps may depend on state changes from earlier ones (for example an approve before a transferFrom-style call).

### Validate and Simulate

Before **OK** creates the multi-sign request, run checks on the **current step** or on the **whole batch** (as the UI offers):

| Action | What it does |
|--------|----------------|
| **Validate** | Local and node-side checks without broadcasting: required fields present, addresses and amounts well-formed, KeyGen type matches the chain, nonce sequence consistent across steps, balance and allowance sufficient where the node can infer them, and no obvious configuration errors. Surfaces validation messages you can fix in the editor. |
| **Simulate** | Sends the transaction(s) to the chain RPC as a **simulation** (no mempool broadcast): executes against current chain state via `eth_call` / trace-style simulation where supported. Shows expected success or **revert** reason, refined **gas estimates**, and sometimes balance or log diffs. Use this to catch on-chain failures (wrong recipient, insufficient funds, slippage, paused contract) before peers Accept. |

Run **Validate** first for fast feedback; use **Simulate** when you need confidence the step will succeed on-chain. For multi-step batches, simulate steps in order when possible — step 2 may only succeed if step 1’s state change is applied (simulation may model this depending on the product).

### Submit — OK creates the multi-sign request

When every step looks correct, confirm **OK** (or **Create sign request**). The originator **management-signs** the submission. The node creates the **multi-sign request** and publishes it to the KeyGen.

From here the flow continues on [Join](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md#join--threshold-accept--reject): non-originator nodes Accept or Reject the whole batch, then the originator **Execute**s after threshold agreement.


<img src="/_media/mpc-compose-transaction-flow.png" alt="" />

### Bump / remove — mempool transactions

Separate from composing a **new** sign request, the node app supports **bump** and **remove** for transactions this KeyGen has **already signed and broadcast** that are still **pending in the mempool** (not yet mined).

These actions apply to an existing outbound tx (by hash or from History / pending list), not to a draft on the Compose screen.

#### Bump

**Bump** replaces a stuck or slow pending transaction with a **replacement** transaction:

- Same **nonce** as the pending tx (required for replacement on EVM chains).
- **Higher** max fee / priority fee (or equivalent) so miners or the sequencer pick it up sooner.
- Same intent in most cases (same recipient and value, or same contract call), unless you are deliberately replacing with a cancel tx.

The wallet builds a new unsigned transaction, runs it through the normal [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md) if your setup requires agreement for spends, then signs and broadcasts the replacement. Only one pending tx per nonce should remain after a successful bump.

#### Remove

**Remove** tries to **drop or cancel** a pending transaction still in the mempool:

- On EVM chains this is usually a **cancel** replacement: same nonce, **zero-value** self-transfer or empty call to yourself, with fees high enough to outbid the pending tx.
- If the original tx confirms first, remove/cancel is no longer possible — check **History** and the block explorer.

Use remove when you no longer want the pending action to execute (wrong amount, wrong chain, superseded by a new compose batch, and similar). Use bump when you still want the action but need it mined faster.

Outcomes for bump and remove rounds are recorded on **History** like any other multi-sign request.

### Related

- [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md)
- [DeFi protocol support](/ContinuumDAO/MPAWallet/DeFiProtocolSupport.md)
- [KeyGens](/ContinuumDAO/MPCSigner/KeyGens.md)
- [Overview](/ContinuumDAO/MPAWallet/Overview.md)
- [Default Ed25519 signer](/ContinuumDAO/MPAWallet/DefaultEd25519Signer.md)
