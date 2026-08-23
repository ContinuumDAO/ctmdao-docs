## Compose transaction flow

This page describes how an **originator** builds a multi-sign request (single transaction or **batch**) before it enters the [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md). The same loop applies no matter how the request was created.

| How the originator creates the request | Typical use |
|----------------------------------------|-------------|
| **[Manual compose](#manual-compose)** | Hand-built transfers, custom contract calls, multi-step batches you edit step by step in the node app |
| **[EIP-712 typed-data signatures](#eip-712-typed-data-signatures)** | Off-chain typed-data digests — Hyperliquid `/exchange`, Permit2 permits, custom structured messages; one or more signatures per batch |
| **[Foundry script](#foundry-script)** | Solidity scripts that emit an ordered batch (deploy + admin calls, logic, JSON-driven bulk actions) |
| **[DeFi protocol](/ContinuumDAO/MPAWallet/DeFiProtocolSupport.md) interaction** | Swaps, lending, perps, bridges — node app protocol UI or AI agent MCP |
| **[Trade ideas](/ContinuumDAO/MPAWallet/TradeIdeas.md) / AI agent** | Agent chat or cron turns analysis into a sign request for your preferred KeyGen |

Every path ends the same way: the originator publishes a multi-sign request, peers **Accept** or **Reject** the **whole batch** on **Join**, then the originator **Execute**s after threshold agreement. See [Creating a multi-sign request](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md#creating-a-multi-sign-request) and [Batching multiple signatures](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md#batching-multiple-signatures).

---

### Manual compose

Use the node app **Compose** tab when you want to build transactions field-by-field in the UI.

#### Select KeyGen and chain

1. Choose the **KeyGen** that will sign (must be **multi-agree** for MPA custody).
2. Choose the **blockchain** (network) for this request.
3. Optionally set **Purpose** text and **Custom Chain config** (gas profile, RPC gateway, gas multiplier) — peers see these on **Join**; see [Creating a multi-sign request](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md#creating-a-multi-sign-request).

For transfers and contract calls, use the **contact picker** to select a saved [contact](/ContinuumDAO/MPAWallet/ContactManagement.md) instead of pasting a raw address.

#### Add one or more transaction steps

Each step is one transaction (one signature) in the eventual batch.

**Single step** — the simplest case is an **ERC20 transfer**: token contract, recipient, amount. That is the same example used in [Join — threshold Accept / Reject](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md#join--threshold-accept--reject) and [Execute — MPC signing and broadcast](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md#execute--mpc-signing-and-broadcast).

**Multiple steps** — add further steps to build a **batch sign request**. Steps run **in order** when the originator later broadcasts on **Execute**: the whole batch is Accepted/Rejected as one unit and broadcast as one.

Typical multi-step examples:

- ERC20 **approve**, then **swap**
- Sequential contract calls that depend on earlier steps in the same nonce sequence
- Several transfers or protocol actions you want one committee decision for

Use **Add step** to grow the batch. Remove or reorder steps before you submit if the UI allows.

#### Edit and cycle through steps

The compose screen lists every step in the batch. Select a step to edit its fields (contract, method, parameters, value, gas hints for that step). **Cycle** through steps with previous/next controls so you can review each transaction before submitting.

Fix errors on any step before **Validate** — later steps may depend on state changes from earlier ones (for example an approve before a transferFrom-style call).

#### Validate and Simulate

Before **OK** creates the multi-sign request, run checks on the **current step** or on the **whole batch** (as the UI offers):

| Action | What it does |
|--------|----------------|
| **Validate** | Local and node-side checks without broadcasting: required fields present, addresses and amounts well-formed, KeyGen type matches the chain, nonce sequence consistent across steps, balance and allowance sufficient where the node can infer them, and no obvious configuration errors. Surfaces validation messages you can fix in the editor. |
| **Simulate** | Sends the transaction(s) to the chain RPC as a **simulation** (no mempool broadcast): executes against current chain state via `eth_call` / trace-style simulation where supported. Shows expected success or **revert** reason, refined **gas estimates**, and sometimes balance or log diffs. Use this to catch on-chain failures before peers Accept. |

Run **Validate** first for fast feedback; use **Simulate** when you need confidence the step will succeed on-chain. For multi-step batches, simulate steps in order when possible — step 2 may only succeed if step 1’s state change is applied.

#### Submit — OK creates the multi-sign request

When every step looks correct, confirm **OK** (or **Create sign request**). The originator **management-signs** the submission. The node creates the **multi-sign request** and publishes it to the KeyGen.

From here the flow continues on [Join](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md#join--threshold-accept--reject).

<!-- Screenshot placeholder: replace _media/mpc-compose-transaction-flow.png -->
<img src="/_media/mpc-compose-transaction-flow.png" alt="Manual compose — KeyGen, chain, multi-step batch, Validate/Simulate, OK (screenshot pending)" />

---

### Foundry script

Use a **Foundry script** when the batch is easier to express in Solidity than in the Compose form — for example:

- **Deploy a contract** with the KeyGen as owner/admin, then call **admin-only functions** in the same batch
- **Conditional logic** in `run()` (read on-chain state, branch, build different calldata)
- **Bulk operations** driven by a **JSON input file** (addresses, amounts, roles) parsed inside the script with `vm.readFile` / `stdJson` and looped into many transactions

Every MPC node ships with **Foundry** (`forge`, `cast`, `anvil`) in the app image. Put Solidity scripts, Foundry project files, and JSON inputs on the node via **Node → AI Agent → Workspace** (see [Upload scripts and data](#upload-scripts-and-data-workspace-tab) below), run `forge script` there (or on your PC), then import the dry-run into Compose — or ask the [AI agent](/ContinuumDAO/MPAWallet/AIHarness/Overview.md) to author and run scripts via the **Foundry MCP** server (**Node → AI Agent → MCP Servers**).

#### Upload scripts and data (Workspace tab)

**Node → AI Agent → Workspace** manages the node’s writable **`user_folder`** (on the host this is the `user_folder/` directory beside your node config; in the container it is `/app/user_folder`). Use it to add or edit files on the node without SSH. **Do not** put loose files at the `user_folder` root — writes must land in a subtree below (see [Workspace rules](#workspace-rules)).

- **Browse** — agent workspace (`skills/`, `scripts/`, `plans/`, `data/`), chain roots (`evm/`, `solana/`, `near/`, …), and toolchain folders. Directories show **recursive size** where the UI can compute it (partial totals may warn when a subtree is unreadable).
- **Mkdir** / **New file** — create directories and files **inside** a subtree (for example `evm/script/Deploy.s.sol`, `evm/data/recipients.json`)
- **Edit and Save** — paste or type content in the editor; **Save** writes to the node (requires **management signature**, same as other node control actions). Seeded layout **README.md** files and top-level directory entries are **protected** from delete/overwrite (inactive trash icon).
- **Download** — copy a file back to your PC (for example `evm/broadcast/.../dry-run/run-latest.json` after running `forge script` on the node)

Typical layout:

| Path under `user_folder` | Use |
|--------------------------|-----|
| **`evm/`** | Foundry / Solidity project (`foundry.toml` is seeded here). Run `forge` with **cwd** `evm/` |
| **`evm/src/`**, **`evm/script/`**, **`evm/test/`** | Contract sources (`.sol`), deployment scripts (`.s.sol`), tests (`.t.sol`) |
| **`evm/lib/`** | Foundry dependencies (`forge install`) |
| **`evm/out/`** | Compiled artifacts (ABI, bytecode) |
| **`evm/broadcast/`** | `forge script` logs, including dry-run `run-latest.json` |
| **`data/`** | Offloads, artifacts, cron state, VPN client configs (`data/vpn/`) |
| **`scripts/`**, **`skills/<name>/scripts/`** | Cross-cutting shell helpers (not Solidity) |
| **`solana/`**, **`near/`**, **`stellar/`**, **`ton/`**, **`sui/`** | Other chain projects (placeholders until those toolchains land) |
| **`.foundry/`**, **`.svm/`** | Foundry toolchain binaries and solc cache (`HOME` is `user_folder`) |
| **`.mcp-foundry-workspace/`** | Foundry MCP’s own project when that server is enabled |

Foundry MCP (when enabled) uses **`user_folder`** as **`HOME`**, so agent-driven `foundry__forge_script` persists under **`.mcp-foundry-workspace/broadcast/`**. Native `forge` (agent bash or a shell on the node) belongs under **`evm/`**. You can upload files yourself on **Workspace**, or have the agent create them in chat.

Operator catalog skills stay under **AI Agent → Skills** — **Workspace** is for your node-local files, not the bundled skill library.

#### Workspace rules

The node **jails** all agent and UI writes to allowed subtrees under **`user_folder`**:

| Rule | Detail |
|------|--------|
| **No root files** | Paths must be under `skills/`, `scripts/`, `plans/`, `data/`, `memory/`, `evm/`, `solana/`, `near/`, `stellar/`, `ton/`, `sui/`, `.foundry/`, `.svm/`, or `.mcp-foundry-workspace/` — not loose files at `user_folder/` root |
| **Protected layout** | Seeded **`README.md`** index files and top-level directory entries (e.g. **`evm/`**, **`evm/README.md`**) cannot be deleted or overwritten from the UI |
| **Protected prefixes** | **`.foundry/bin`** and **`.mcp-runtime`** — delete/write blocked (toolchain / MCP runtime) |
| **Agent bash / forge** | Mutating shell **`cwd`** must be a subtree (typically **`evm/`** for native **`forge script`**) |
| **Management sign** | Create, edit, save, and mkdir require the same management signature as other node control actions |

**`.svm/`** holds Foundry **`svm-rs`** solc versions ( **`HOME`** is **`user_folder`** when Foundry MCP runs). Contract sources under **`evm/src/`** are yours to edit; protected entries guard the layout skeleton, not your project files.

Plan-mode drafts live under **`plans/`**. VPN client configs download to **`data/vpn/`**. See also [Plan mode](/ContinuumDAO/MPAWallet/AIHarness/PlanMode.md).

#### 1. Write the script

Create a standard Foundry **`Script`** (see [Foundry Book — Scripts](https://book.getfoundry.sh/scripting/solidity-scripts)). Use the KeyGen’s **Ethereum address** as the on-chain **`from`** / broadcast sender:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";

contract DeployAndConfigure is Script {
    function run() external {
        address mpc = vm.envAddress("MPC_ADDRESS"); // KeyGen ethereum address
        vm.startBroadcast(mpc);
        // MyContract c = new MyContract();
        // c.grantRole(...);
        // ... more calls in order ...
        vm.stopBroadcast();
    }
}
```

Each transaction emitted between `vm.startBroadcast` / `vm.stopBroadcast` becomes **one step** in the imported batch, in order. A two-step fee deposit (approve + deposit) is a real pattern in the node codebase — multiple `CALL`s in one `run()`.

For JSON-driven batches, place the JSON under **`evm/`** (for example `evm/data/recipients.json`) so `vm.readFile` paths are relative to the Foundry project root, then loop — the dry-run file will contain one entry per broadcasted transaction.

#### 2. Dry-run with forge (no broadcast)

Run the script against a **live RPC** for the target chain. Set **`--sender`** to the KeyGen’s **Ethereum address** (shown on the Compose tab). **Do not** pass **`--broadcast`** — MPC signing and broadcast happen later on **Execute**, not from Foundry.

```bash
export MPC_ADDRESS=0xYourKeyGenEthereumAddress

# From user_folder/evm/ (or: forge script … with cwd evm/)
cd evm
forge script script/DeployAndConfigure.s.sol:DeployAndConfigure \
  --rpc-url https://your-chain-rpc.example \
  --sender "$MPC_ADDRESS"
```

Foundry writes the simulation output to:

`evm/broadcast/<ScriptFile>/<chainId>/dry-run/run-latest.json`

(Foundry MCP writes the same shape under `.mcp-foundry-workspace/broadcast/...`.)

Requirements checked by the node app on import:

- The file must be named **`run-latest.json`** (from that `dry-run/` folder).
- The JSON must include **`.chain`** and a non-empty **`transactions[]`** array with **`from`** set to your KeyGen address.
- The chain must already be configured under **Configure blockchains** with an **RPC gateway** (the importer reads live fees/nonces from that RPC). See [Chain management](/ContinuumDAO/MPAWallet/ChainManagement.md).
- If the dry-run used Foundry’s default **simulation chain id** (`364865`), re-run with a real **`--rpc-url`** for your network.

Optional forge flags (for example `--with-gas-price`, `--priority-gas-price`) can bake higher fees into the dry-run; if gas moves before **Execute**, re-run `forge script` and import the fresh `run-latest.json`.

#### 3. Import into Compose

On the Compose tab (with the correct KeyGen selected):

1. Click **Import from Foundry broadcast**.
2. Select **`run-latest.json`** from the path above.
3. If nonces in the file are **stale** (lower than the KeyGen’s pending nonce on-chain), confirm **Yes** to refresh nonces from the chain, or re-run the script.
4. Optionally enable **Use Custom Gas Config** (same meaning as manual compose — chain-configured gas vs live RPC estimates).
5. Click **OK** in the dialog — the batch loads into Compose.

You can **cycle** through imported transactions (Transaction *N* of *M*), review decoded function names and arguments, add or edit **Purpose** text, then click **OK** on the main Compose screen to **management-sign** and create the **multi-sign request** for the Group.

The imported batch then follows the normal [Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md) — peers Accept/Reject the **entire** script output as one proposal; the originator signs and broadcasts **all** steps together on **Execute**.

#### Agent / API path (no file upload)

The AI agent can skip the upload dialog and call the continuum MCP tool **`import_forge_dry_run_multi_sign_request`** with `dryRunFilePath` under `evm/broadcast/.../dry-run/run-latest.json` (or `.mcp-foundry-workspace/broadcast/...` when Foundry MCP ran the script). Prefer that file-import tool over **`create_forge_multi_sign_request`**. Longer sequences can be merged with **`create_joined_multi_sign_request`** (chain Foundry output with manual compose or prior batches on the same chain and KeyGen).

#### Example command summary

```bash
# From user_folder/evm/ — KeyGen address from Compose tab; RPC from Configure blockchains
forge script script/MyScript.s.sol:MyScript \
  --rpc-url <RPC> \
  --sender <KeyGen Eth address>
# No --broadcast → import evm/broadcast/.../dry-run/run-latest.json in the node app
```

In this example, the script sends USDC to 94 addresses. The script has been used before, so the initial nonce and those that follow must be set to the new nonce value:

<img src="/_media/mpc-compose-foundry-import-1.png" alt="" />

And now you see that in this example, there are 94 transactions imported into the Compose flow:

<img src="/_media/mpc-compose-foundry-import-2.png" alt="" />

The user then enters Purpose text, selects Custom Gas (or not) and validates and clicks OK to create the batch multi-sign request as normal.

---

### EIP-712 typed-data signatures

Some protocols authorize actions with an **EIP-712 typed-data signature** instead of an unsigned EVM transaction at sign time. The MPC KeyGen signs a **32-byte digest** derived from structured data (`domain`, `types`, `primaryType`, `message`). Delivery to the protocol or chain happens later on **Execute** — or not at all when you only need the signature bytes.

Typical uses:

- **Hyperliquid** L1 `/exchange` actions (`updateLeverage`, orders, cancels, and similar) — phantom-agent `Agent` typed data, domain `Exchange`
- **Permit2** `PermitSingle` — signed allowance, then an optional on-chain `permit` call at Execute
- **Custom typed data** you build in Compose or via agent/script

Use the Compose tab **EIP-712** path when the action is “sign this structured message” rather than “sign and broadcast this RLP transaction.” [DeFi protocol](/ContinuumDAO/MPAWallet/DeFiProtocolSupport.md) packs (for example Hyperliquid) can also build EIP-712 sign requests through the protocol UI or agent MCP; those enter the same [Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md).

#### Select KeyGen and chain

Same starting point as [manual compose](#manual-compose):

1. Choose the **KeyGen** that will sign (must be **multi-agree** for MPA custody; EIP-712 uses the KeyGen’s secp256k1 / Ethereum address).
2. Choose the **blockchain** (network) for context and delivery.
3. Optionally set **Purpose** text — peers see this on **Join** alongside a human-readable summary of the typed data (`primaryType`, domain name, protocol label).

The chain selector sets which network context peers see in the UI. The typed-data **domain** (especially `chainId` and `verifyingContract`) defines what MPC actually signs — it must match the protocol you are targeting (Hyperliquid uses domain chainId `1337` even when your custody address lives on Arbitrum).

#### Add one or more EIP-712 steps

Each step is **one typed-data digest** (one MPC signature) in the eventual batch — not an unsigned transaction with calldata and gas fields.

**Single step** — one permit, one Hyperliquid action, one governance typed message, and similar.

**Multiple steps** — add further steps to batch several EIP-712 signatures under **one** Accept/Reject decision. Steps are reviewed and signed **in order**; each leg carries its own typed-data payload and an optional **delivery** hint for Execute.

Typical multi-step examples:

- Several Hyperliquid `/exchange` actions you want one committee decision for
- Multiple Permit2 or custom typed-data authorizations from a script or agent workflow
- Mixed custody rounds where every leg is still typed-data (not RLP calldata)

Use **Add step** to grow the batch. **Cycle** through steps with previous/next controls to review each typed-data payload before submitting.

The compose screen lists every leg and shows enough detail for peers to understand what they are agreeing to sign — domain summary, `primaryType`, and message fields — without exposing a transaction `to` / `data` pair.

#### Validate

Before **OK** creates the multi-sign request, run checks on the **current step** or on the **whole batch** (as the UI offers):

| Action | What it does |
|--------|----------------|
| **Validate** | Local and node-side checks: required typed-data fields present, well-formed JSON, digest recomputation matches the stored hash, KeyGen type matches the chain, batch hash count matches step count, and no mixed-in transaction params on an EIP-712 proposal. Surfaces validation messages you can fix in the editor. |

EIP-712 requests **do not** use **Simulate** the same way as transaction compose — there is no unsigned tx calldata to send as an `eth_call`. Use protocol-specific previews where the UI or agent provides them (for example Hyperliquid action previews from the DeFi pack).

#### Submit — OK creates the multi-sign request

When every step validates, confirm **OK** (or **Create sign request**). The originator **management-signs** the submission. The node creates a **multi-sign request** with `signRequestKind: eip712` and publishes it to the KeyGen.

From here the flow continues on [Join](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md#join--threshold-accept--reject). Peers review the **whole batch** once. On agree, each node **recomputes every digest** from the typed data stored in the proposal and rejects mismatched hashes — so tampering with domain, types, or message after creation fails closed.

<img src="/_media/mpc-compose-eip712.png" alt="" />

#### Execute — deliver signatures

After threshold **Accept** and MPC signing on **Execute**, the originator **delivers** each signature according to that step’s **delivery** hint (the delivery block is **not** part of the signed payload):

| Delivery kind | What Execute does |
|---------------|-------------------|
| **`none`** | Export or copy the signature — no automatic POST or broadcast |
| **`hyperliquid_exchange`** | POST the action plus `{r,s,v}` and `nonce` to Hyperliquid `/exchange` |
| **`permit2_submit`** | Broadcast `Permit2.permit(owner, permitSingle, signature)` on-chain |

EIP-712 rounds omit transaction **txParams**, fee-bump controls, and gas overrides on trigger — MPC signs the digest(s) only. On-chain gas applies only when a delivery kind submits a transaction (for example Permit2).

Outcomes are recorded on **History** like any other multi-sign request.

#### Agent / API path

The AI agent can call **`create_compose_eip712_multi_sign_request`** (continuum MCP, `mpc_compose` group) with typed-data legs built by `@continuumdao/ctm-mpc-defi` (`buildEip712Multisign` and protocol adapters). Prefer that over hand-rolling digests when a protocol adapter exists. See [MCP servers — built-in continuum](/ContinuumDAO/MPAWallet/AIHarness/McpServers.md#built-in-continuum-mcp-wallet--node).

For workflows that combine EIP-712 legs with standard transaction compose steps, **`create_joined_multi_sign_request`** can merge compatible batches on the same KeyGen and chain when your node build supports it.

---

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
- [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md)
- [KeyGens](/ContinuumDAO/MPCSigner/KeyGens.md)
- [Overview](/ContinuumDAO/MPAWallet/Overview.md)
- [Default Ed25519 signer](/ContinuumDAO/MPAWallet/DefaultEd25519Signer.md)
