## Compose transaction flow

This page describes how an **originator** builds a multi-sign request (single transaction or **batch**) before it enters the [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md). The same loop applies no matter how the request was created.

| How the originator creates the request | Typical use |
|----------------------------------------|-------------|
| **[Manual compose](#manual-compose)** | Hand-built transfers, custom contract calls, multi-step batches you edit step by step in the node app |
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

**Node → AI Agent → Workspace** manages the node’s writable **`user_folder`** (on the host this is the `user_folder/` directory beside your node config; in the container it is `/app/user_folder`). Use it to add or edit **scripts** and **data** on the node without SSH:

- **Browse** — `skills/`, `scripts/`, `data/`, `plans/`, and other workspace paths
- **Mkdir** / **New file** — create directories and files (for example `scripts/Deploy.s.sol`, `data/recipients.json`)
- **Edit and Save** — paste or type content in the editor; **Save** writes to the node (requires **management signature**, same as other node control actions)
- **Download** — copy a file back to your PC (for example `broadcast/.../dry-run/run-latest.json` after running `forge script` on the node)

Typical layout for Foundry workflows:

| Path under `user_folder` | Use |
|--------------------------|-----|
| **`scripts/`** | Cross-cutting `.s.sol` scripts and small helpers |
| **`data/`** | JSON or CSV inputs your script reads with `vm.readFile` / `stdJson` |
| **`skills/<name>/scripts/`** | Scripts tied to a workspace skill (optional organisation) |

Foundry MCP (when enabled) also uses **`user_folder`** as its working **`HOME`**, so agent-driven `forge` runs persist project output there. You can upload files yourself on **Workspace**, or have the agent create them in chat.

Operator catalog skills stay under **AI Agent → Skills** — **Workspace** is for your node-local scripts, data, and plans, not the bundled skill library.

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

For JSON-driven batches, place the JSON under **`data/`** on **Workspace**, then read it in `run()` (for example `vm.readFile` with the path relative to the project, or `stdJson`) and loop — the dry-run file will contain one entry per broadcasted transaction.

#### 2. Dry-run with forge (no broadcast)

Run the script against a **live RPC** for the target chain. Set **`--sender`** to the KeyGen’s **Ethereum address** (shown on the Compose tab). **Do not** pass **`--broadcast`** — MPC signing and broadcast happen later on **Execute**, not from Foundry.

```bash
export MPC_ADDRESS=0xYourKeyGenEthereumAddress

forge script script/DeployAndConfigure.s.sol:DeployAndConfigure \
  --rpc-url https://your-chain-rpc.example \
  --sender "$MPC_ADDRESS"
```

Foundry writes the simulation output to:

`broadcast/<ScriptFile>/<chainId>/dry-run/run-latest.json`

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

The AI agent can skip the upload dialog and call the continuum MCP tool **`create_forge_multi_sign_request`** with the parsed **`broadcast`** JSON, KeyGen id, purpose, and optional **`overrideSender`** / **`startingNonce`**. Longer sequences can be merged with **`create_joined_multi_sign_request`** (chain Foundry output with manual compose or prior batches on the same chain and KeyGen).

#### Example command summary

```bash
# KeyGen address from Compose tab; RPC from Configure blockchains
forge script script/MyScript.s.sol:MyScript \
  --rpc-url <RPC> \
  --sender <KeyGen Eth address>
# No --broadcast → import broadcast/.../dry-run/run-latest.json in the node app
```

In this example, the script sends USDC to 94 addresses. The script has been used before, so the initial nonce and those that follow must be set to the new nonce value:

<img src="/_media/mpc-compose-foundry-import-1.png" alt="" />

And now you see that in this example, there are 94 transactions imported into the Compose flow:

<img src="/_media/mpc-compose-foundry-import-2.png" alt="" />

The user then enters Purpose text, selects Custom Gas (or not) and validates and clicks OK to create the batch multi-sign request as normal.

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
