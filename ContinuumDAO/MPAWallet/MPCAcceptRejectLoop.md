## MPC Accept/Reject loop

Every on-chain spend from a **multi-agree** KeyGen runs through the same **multi-sign request** flow: one node (the **originator**) proposes one or more transactions; the other KeyGen nodes **Accept** or **Reject** until the KeyGen **threshold** is met or the round times out. Only then does the originator run MPC signing and optionally broadcast.

This is the normal custody path for manual actions in the node app, agent-built trades, and [DeFi protocol](/ContinuumDAO/MPAWallet/DeFiProtocolSupport.md) interactions — all still bounded by your Group’s TSS threshold. See [KeyGens](/ContinuumDAO/MPCSigner/KeyGens.md) for threshold semantics and [Overview](/ContinuumDAO/MPAWallet/Overview.md) for why agreement stays off-chain.

### Creating a multi-sign request

The **originator** is whichever node (or attached user / AI agent on that node) creates the sign request. A request may contain **one transaction or a batched set** of steps; peers always Accept/Reject the **whole** proposal on **Join** (see [Batching multiple signatures](#batching-multiple-signatures)).

**Ways to create a request** (all enter the same loop after creation):

| Path | Details |
|------|---------|
| **[Compose transaction flow](/ContinuumDAO/MPAWallet/ComposeTransactionFlow.md)** | Manual node-app UI: pick KeyGen and chain, add/edit steps, Validate/Simulate, then OK |
| **[DeFi protocol support](/ContinuumDAO/MPAWallet/DeFiProtocolSupport.md)** | Protocol UI or agent MCP builds the unsigned transaction(s) — often a multi-step batch (approve + swap, bridge legs, and similar) |
| **[Trade ideas](/ContinuumDAO/MPAWallet/TradeIdeas.md) / AI agent** | Agent proposes or builds from chart analysis, cron, or chat |
| **Foundry script automation** | Scripts submit batches via the node API — *documentation forthcoming* |

Regardless of path, the originator can usually attach:

- **Purpose text** — free-form context for the other nodes (human-readable summary, trade rationale, protocol action name, cron job id, and so on). Peers read this on the **Join** tab before Accepting or Rejecting.
- **Custom Chain config (optional)** — instead of the node’s default chain settings, the originator can attach per-request RPC / gas overrides. Example fields:
  - **Gas profile** — Normal vs Fast (or equivalent presets for the chain)
  - **RPC gateway** — URL or named gateway the originator wants used when building and simulating this request
  - **Gas multiplier** — scalar applied to estimated gas limits or fees for this round

Custom Chain config applies to **this** multi-sign request only. Other nodes see the same config when reviewing; the originator can change gas again later on the **Execute** tab (see below).

Each action is **management-signed** by the originator (MetaMask **EIP-191** or **Ed25519** — see [Default Ed25519 signer](/ContinuumDAO/MPAWallet/DefaultEd25519Signer.md) and [KeyGens](/ContinuumDAO/MPCSigner/KeyGens.md)).

### Join — threshold Accept / Reject

Open the **Join** tab on any node in the KeyGen. Pending multi-sign requests appear there for both the **originator** and **non-originator** nodes.

The **originator** see the Join request that they created in their own Join tab. In this example, they created an ERC20 transfer sign request of some USDC, which is marked as Pending. You can see details of which KeyGen was used, the signature, contract address, and the parameter values (in this case the amount and the destination address the USDC is being sent to). Also shown are the default gas params and the Purpose text

<img src="/_media/mpc-accept-reject-join-originator.png" alt="" />

Non-originator nodes see the proposed transaction(s), the **Purpose** text, any **Custom Chain config**, and enough detail to decide (for a simple ERC20 transfer: token, recipient, amount, chain, and fee hints). They can **Accept** or **Reject**, optionally add **Thoughts** text (short notes visible to the Group, e.g. “looks good”, “wrong recipient”, “wait for better gas”), and management-sign their choice.

On a **non-originator** node the UI is oriented toward review: transaction details, Purpose, remaining time, Accept / Reject controls, and the Thoughts field.


<img src="/_media/mpc-accept-reject-join-non-originator.png" alt="" />

**Time limit** — each round is **time limited**. The deadline depends on the action (manual compose vs protocol-driven build). [DeFi protocol](/ContinuumDAO/MPAWallet/DeFiProtocolSupport.md) interactions can set or suggest the response window when they construct the request. If not enough **Accepts** arrive before expiry, the round fails or stalls according to the product rules for that request type; the outcome is still recorded in **History**. In our example, you see that the nodes still have 6 days 23 hours to Accept/Reject, which is OK for a simple ERC20 transfer, but in a typical DeFi time sensitive transaction, this could be 30 minutes (the default), or less.

Signing requires **`threshold` Accepts** for that KeyGen (e.g. **2/2** both nodes, **2/3** two of three). **Reject** responses count toward the decision; once it is clear the proposal cannot reach threshold Accepts, the round does not proceed to execution.

### Execute — MPC signing and broadcast

When enough nodes have **Accepted** within the time limit, the **originator** node shows the completed sign-request round on the **Execute** tab.

The originator can then:

1. **Shelve** — park the approved request without generating signatures yet (useful if market conditions or gas changed since the Accept phase).
2. **Get signatures** — run the MPC signing protocol with the KeyGen nodes that hold shares. The originator may **override gas parameters** here, replacing defaults (including any Custom Chain config used when the request was created).


<img src="/_media/mpc-accept-reject-execute-tab.png" alt="" />

After MPC produces valid signature(s) using the participating KeyGen nodes, the **Execute** (broadcast) control becomes available. The originator submits the signed transaction(s) to the chain. What appears on-chain is a normal single-party signature from the shared KeyGen address — not an on-chain list of who Accepted (see [Overview](/ContinuumDAO/MPAWallet/Overview.md)). The block explorer link is immediately available and also can be found in the History tab for this finished sign request.

<img src="/_media/mpc-execute-result.png" alt="" />

### AI agent flow

Note that this ERC20 transfer could have been done in the AI agent chat (in the node app, or in the Telegram bot) e.g. the originator says "Send John 0.1 USDC on Linea using the custom gas and with the Purpose text 'Test transfer before sending monthly revenue to the staker'" and then on a non-orginator node "What sign requests are pending?" and when the AI agent shows this pending sign request "Accept the sign request with the Thoughts text  'Yes, go ahead'". The originator then asks "What sign requests are ready to sign?". The originator than says "Go ahead and get signatures and execute" when the AI agent has identified the sign request that has passed the threshold. The AI agent on the originator node could also have had a live *auto-sign-and-broadcast* cron job and the other nodes could have had a live *auto-accept-sign-request* , or *conditional-accept-sign-request* cron job and then everything would have happened automatically after the originator's sign request was created.

### History — audit on each node

Whatever happens to a multi-sign request — pending on **Join**, approved then shelved, signatures generated, broadcast success or failure, timeout, or Reject — the outcome is stored on **each node** and listed on the **History** tab. Use History for post-mortem review: who originated, Purpose / Thoughts, Accept / Reject votes, timing, execution result, and errors. This can provide useful context for the AI agent when creating future multi-sign requests.

### Batching multiple signatures

Several distinct signatures (multiple transactions, or multiple steps in one workflow) can be **batched into a single multi-sign request**. Batches are **not** limited to the Compose UI — [DeFi protocol](/ContinuumDAO/MPAWallet/DeFiProtocolSupport.md) actions and (when documented) **Foundry script** automation often create batched requests too. The Group treats every batch as **one** proposal in the Accept/Reject loop — peers cannot Accept some items and Reject others:

- **Join** — peers review the **whole batch** once. Each node casts **one** Accept or **one** Reject (with optional Thoughts) for the entire batch. There is no per-transaction vote inside a batch.
- **Threshold** — the same KeyGen **threshold** applies to the batch as a unit. Partial agreement across items is not supported: either the batch passes or it does not.
- **Execute** — after approval, MPC signing runs for **all** items in the batch. The originator may then **broadcast the entire batch as one** — not a subset. You cannot shelve, sign, or execute individual transactions from an approved batch while leaving the rest behind; the batch moves through Get Sigs and Execute together.

Batching is useful when a DeFi action, [Compose](/ContinuumDAO/MPAWallet/ComposeTransactionFlow.md) workflow, or agent/Foundry script needs several chained transactions (approve + swap, bridge steps, collateral + borrow, and similar) while keeping one human or committee decision — and one atomic execution step — for the entire operation.

### Related

- [Compose transaction flow](/ContinuumDAO/MPAWallet/ComposeTransactionFlow.md)
- [Overview](/ContinuumDAO/MPAWallet/Overview.md)
- [KeyGens](/ContinuumDAO/MPCSigner/KeyGens.md)
- [DeFi protocol support](/ContinuumDAO/MPAWallet/DeFiProtocolSupport.md)
- [Trade ideas](/ContinuumDAO/MPAWallet/TradeIdeas.md)
- [Default Ed25519 signer](/ContinuumDAO/MPAWallet/DefaultEd25519Signer.md)
- [Eject to Private Key](/ContinuumDAO/MPAWallet/EjectConversion.md)
