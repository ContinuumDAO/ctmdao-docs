## Creating smart contracts

Ask the agent in chat to write a Solidity contract. The harness puts the project in the node’s `evm/` folder, compiles it with Foundry, and runs it on a fork of a chain you already configured. Deployment is a [multi-sign request](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md). Group members Accept or Reject before anything is broadcast. Foundry itself does not send the transaction.

You can ask for a new contract, tests, and a deploy script, or for a change to a contract that already exists. After the contract is on chain, the agent can verify the source with the official Etherscan server.

After you create and deploy a contract, a [plugin](/ContinuumDAO/MPAWallet/AIHarness/Plugins.md#plugin-coding) can call it. The plugin’s program uses ethers.js to read the contract or to encode the call, then your group signs. The plugin does not hold a private key.

Manual Foundry batches that you write yourself are a different path: [Foundry script](/ContinuumDAO/MPAWallet/ComposeTransactionFlow.md#foundry-script).

---

### What you can do

- Describe the contract in chat. The agent writes the Solidity, the tests, and a deploy script under **AI Agent → Workspace**, in `evm/`.
- Run that project on a fork of one chain this node already has, so you see whether it works before anyone signs.
- See whether the preferred KeyGen holds enough of that chain’s native coin to cover the gas estimate.
- Accept a QuillShield audit once, after the dry run. Skipping the audit still leaves the deployment request available.
- Open the deployment as a multi-sign request from the dry-run file. You can ask for that request in the same chat, or later.
- After the group has executed the request and the contract is on chain, verify the source on Etherscan.
- When the task changes an existing contract, compare the old on-chain bytecode with the new one.

A source file on its own is not a finished contract. The harness treats the work as finished when the fork run has succeeded, the gas check has passed, and the deployment request exists.

---

### What it checks

Before any code is written, the harness stops until three things are true.

1. The **official Etherscan** server is enabled, with an API key in **Variables**. The community Etherscan server does not stand in for it.
2. This node has at least one EVM chain with an RPC. You pick one of those chains. The fork and the gas check use that RPC.
3. You confirm a compiler profile: the Solidity version, whether the optimizer is on, how many optimizer runs, whether via IR is on, and the gas limit. The form starts with the optimizer on, 200 runs, via IR on, and a gas limit of 10,000,000,000. Change any of those before you submit. After you confirm, those settings are saved in `evm/foundry.toml` and the agent keeps them. If that Solidity version is not on the node yet, the harness downloads it.

When the agent says the work is done, the harness also checks the run.

| Check | What passes |
|-------|-------------|
| **Fork run** | `forge test` or a dry-run `forge script`, from the `evm/` folder, against that chain’s RPC |
| **No broadcast from Foundry** | The script run has no broadcast flag. Signing and sending happen later, in the Accept/Reject loop |
| **A failed run** | The agent quotes the revert reason from that output |
| **Gas** | The preferred KeyGen’s native balance on that chain covers the dry-run estimate |
| **A rewrite** | The agent reports the old bytecode, or an old call, beside the new one |
| **Deployment** | A multi-sign request built from the dry-run file `run-latest.json` |

Compiling, or saving a `.sol` file, does not pass these checks.

---

### What you need

| Requirement | Why |
|-------------|-----|
| **A linked model and a preferred KeyGen** | The agent runs in the harness, and the gas check and the deployment use that KeyGen. [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md) |
| **An EVM chain with an RPC** | The fork and the balance check use it. [Chain management](/ContinuumDAO/MPAWallet/ChainManagement.md) |
| **Official Etherscan, with `ETHERSCAN_API_KEY`** | Required before coding, and used again to verify source after the contract is on chain. Add **`etherscan`** under **AI Agent → MCP Servers** and set the key under **Variables**. [MCP servers](/ContinuumDAO/MPAWallet/AIHarness/McpServers.md#other-repository-catalog-entries-third-party-runtimes) |
| **Foundry on the node** | `forge`, `cast`, and `anvil` ship in the node image. You do not install them |
| **Native coin on the preferred KeyGen** | Enough to cover the dry-run gas estimate on the chain you picked |
| **The compiler profile** | You confirm it when the agent asks. The Solidity compiler is downloaded into the node’s `.svm/` cache when that version is missing |

Contract libraries the source imports are installed into `evm/lib/` with Foundry. They are not preinstalled.

QuillShield is optional. Add **`quillshield`** from the MCP catalog and set **`QUILLSHIELD_API_KEY`**. That server runs through `npx`. An accepted audit uploads `evm/` and shows a price before it runs. You pay any top-up on the QuillShield dashboard, by card or crypto. This node does not take that payment. If QuillShield cannot run, the agent can still do a local scan when the `aderyn` program is already on the node. The harness does not install `aderyn`. A local scan is not a QuillShield audit. [QuillShield on MCP servers](/ContinuumDAO/MPAWallet/AIHarness/McpServers.md#other-repository-catalog-entries-third-party-runtimes).

---

### Where the project lives

| Path | What it holds |
|------|----------------|
| **`evm/`** | The Foundry project. `foundry.toml` is seeded here |
| **`evm/src/`** | Contract source |
| **`evm/test/`** | Tests |
| **`evm/script/`** | Deploy scripts |
| **`evm/lib/`** | Libraries installed for this project |
| **`evm/broadcast/.../dry-run/run-latest.json`** | The dry-run the deployment request is built from |
| **`.svm/`** | Solidity compilers the harness has downloaded |

Open these under **AI Agent → Workspace**. Layout rules and the manual import path: [Upload scripts and data](/ContinuumDAO/MPAWallet/ComposeTransactionFlow.md#upload-scripts-and-data-workspace-tab).

---

### For AI agents — creating smart contracts

`search_continuum_docs` (`creating smart contracts` / `solidity` / `evm-foundry`) then `get_continuum_doc` path `ContinuumDAO/MPAWallet/AIHarness/CreatingSmartContracts` section `for-ai-agents-creating-smart-contracts`.

Load **`evm-foundry`** when the operator asks for a Solidity contract, a Foundry test, or a forge script under `evm/`. Load **`evm-audit`** when they ask for an audit, or once after the dry run. Both skills ship with `initialLoad: false`. Host checks live in `agent_llm_config.defaults/work-checks.yaml` (`id: evm_command`). Intent routing is `agent-intent-rules.yaml` (`evm_forge`, `evm_audit`).

**Before coding.** The host blocks until the operator confirms elicitation `solidity_compiler` and one configured chain.

- Official Etherscan MCP must be enabled: server id `etherscan`, URL contains `https://mcp.etherscan.io/mcp`, variable `ETHERSCAN_API_KEY`. `etherscan-community` does not satisfy this.
- The chain must already be on this node and must have an RPC. Fork and gas check use that RPC.
- Pin `[profile.default]` in `evm/foundry.toml`. Form defaults: `optimizer` true, `optimizer_runs` 200, `via_ir` true, `gas_limit` 10000000000. `solc_version` is required (example `0.8.26`). Use that version in the source pragma. Do not change the pinned settings.
- A missing compiler is downloaded from `https://binaries.soliditylang.org` into `.svm/` as `solc-{version}`.

**Done.** `agent_bash` with **cwd** `evm/`:

1. `forge test --fork-url` with that chain’s RPC, or
2. `forge script` with `--rpc-url` or `--fork-url` set to that RPC, and no `--broadcast`.

On revert, quote the reason from that output. Read the preferred KeyGen native balance on that chain (`agent_get_balance` or `cast balance`) and compare it with the dry-run estimate. A short balance stops the deploy. Do not pass `--broadcast` to discover the cost.

A `.sol` file, `forge build`, or `forge --broadcast` is not the deployment. On a rewrite only, compare old bytecode (`cast code`) or an old `cast call` with the new one and report both.

**Deploy.** After the dry run, offer QuillShield once. A decline still calls `continuum__deploy_built_contract_multi_sign_request` with the dry-run `run-latest.json`. That tool is group `compose:deploy`. It is not in the forge bundle. Find it with `continuum__search_continuum_tools` or call it by name. Input matches `import_forge_dry_run_multi_sign_request`: `keyGenId` and exactly one of `dryRunFilePath` or `dryRunJson`. Native forge writes `evm/broadcast/<Script>.s.sol/<chainId>/dry-run/run-latest.json`. Report `requestId`. The operator can call the same tool later. After Execute has put the contract on chain, verify the source with the official Etherscan server.

**QuillShield.** Catalog id `quillshield`, `npx -y @quillaudits/mcp`, variable `QUILLSHIELD_API_KEY`. Do not auto-load. Say that accepting uploads `evm/` before you quote. When the key is set and they accept: `get_wallet`, `submit_audit` with `pay: false`, show the quote, `pay_quote` with `confirm: true` only after they agree. A covered quote (`final_price_cents` is 0) spends the wallet. On `wallet_topup_required`, stop and give the dashboard Billing link. Do not start a payment from this node. Then `watch_audit`, `list_findings`, and `get_report`. Findings do not block the deploy tool. No key, a declined quote, a short wallet they will not top up, or an API error is a local scan, not a QuillShield audit. Run `aderyn .` with cwd `evm/` only when that binary is already on `PATH`. Do not install it. Do not run Slither.

**Call from a plugin.** After the contract is on chain, a plugin entrypoint calls it by importing `ethers` to encode the call or read the contract, then `pi.signRequest`. See [For AI agents — plugins](/ContinuumDAO/MPAWallet/AIHarness/Plugins.md#entrypoint-and-libraries). `Wallet`, `HDNodeWallet`, and `SigningKey` throw.

---

### Related

- [Plugins](/ContinuumDAO/MPAWallet/AIHarness/Plugins.md)
- [AI harness overview](/ContinuumDAO/MPAWallet/AIHarness/Overview.md)
- [MCP servers](/ContinuumDAO/MPAWallet/AIHarness/McpServers.md)
- [Foundry script](/ContinuumDAO/MPAWallet/ComposeTransactionFlow.md#foundry-script)
- [Chain management](/ContinuumDAO/MPAWallet/ChainManagement.md)
- [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md)
