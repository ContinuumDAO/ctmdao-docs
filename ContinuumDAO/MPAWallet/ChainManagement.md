## Chain management

Before you can [compose](/ContinuumDAO/MPAWallet/ComposeTransactionFlow.md) transactions, import Foundry batches, or run [DeFi protocol](/ContinuumDAO/MPAWallet/DeFiProtocolSupport.md) flows, your node needs **chain configuration**: RPC endpoints, explorers, and optional gas defaults. Chain config is stored **on each node locally** (not propagated to other Group members). Every node that will simulate, sign, or broadcast for a network should have matching entries.

The node app (**[mpa.continuumdao.org](https://mpa.continuumdao.org)** or your node-hosted app) and the AI agent both talk to the same management API (`POST /postChainDetails` for EVM chains, `POST /postNonEvmChainDetails` for supported non-EVM families). Operator reference: [API Implementation — chain config](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/references/API_IMPLEMENTATION.md#local-evm-chain-config).

---

### View configured chains (Assets tab)

Open the **Assets** tab and use the **chain selector** at the top. It lists every network already configured on **this** node. Balances, token lists, and compose chain pickers all draw from this registry.


<img src="/_media/chain-management-assets-chain-selector.png" alt="" />

---

### Configure blockchains (add, edit, remove)

1. From the header, click **Configure blockchains** using the icon to the right of the wallet connect box.
2. The modal shows **configured chains** on this node and **presets** you can add with one click (most popular EVM mainnets and testnets ship in the app — Arbitrum, Base, Polygon, Linea, and many others).
3. To add a new chain, click the + icon top left.
4. To **add** a preset: select it, check the testnet box if you want to add a textnet and then enter an **RPC gateway** URL (HTTPS). The app may pre-fill a public RPC; you can replace it with your own provider.
5. To **add a custom EVM chain**: use **Add custom chain** (or equivalent), then set at minimum:
   - **Chain name** — human-readable label
   - **Chain ID** — numeric EVM chain id
   - **RPC gateway** — required; used for simulation, nonce lookup, and live fee estimation
   - **Explorer** (optional) — block explorer base URL for links after broadcast
   - **Legacy gas** toggle — off for EIP-1559 networks (default for modern EVMs); on for legacy `gasPrice` chains
   - **Testnet** flag — when the network is not mainnet
5. To **edit** an existing chain: select it in the list (for example **Arbitrum**), change RPC, explorer, or gas fields, and save. Management signing (MetaMask **EIP-191** or **Ed25519**) is required for add, update, and remove — same as other node configuration.
6. To **remove** a chain: open it in the modal and use **Remove** / delete. Removing only affects this node’s local registry.

Here is an example of one node's configured chains:

<img src="/_media/chain-management-configure-blockchains-modal.png" alt="" />

Here we show an example of editing the Arbitrum chain that was already added to our node:

<img src="/_media/chain-management-edit-chain-arbitrum.png" alt="" />

---

### EVM chains — gas fields (optional)

For EIP-1559 chains you do **not** need to fill in optional fee fields such as **Base fee** or **Priority fee** for normal operation. That is the recommended setup: leave them empty and let the node **fetch current gas parameters from the RPC gateway** when building a proposal and again at **Get Sig** on the **Execute** tab.

| Field | Required? | Behaviour when omitted |
|-------|-----------|-------------------------|
| **RPC gateway** | Yes | No simulation, compose import, or broadcast without it |
| **Base fee** / **Priority fee** | No | Live RPC estimates at proposal and Get Sig time |
| **Gas limit** | No | Estimated from simulation / `eth_estimateGas` where possible |
| **Base fee multiplier** | No (default **200**) | EIP-1559 only. Percentage applied to the live base fee for the base component of `maxFeePerGas` — **200 = 2×** the estimated base fee. Ensures headroom so important transactions are more likely to broadcast under congestion |
| **Default Get Sig fee speed** | No (default **normal**) | Default tier on **Execute** (`slow` / `normal` / `fast`) |
| **Legacy: gas price / gas multiplier** | No | Used only when **Legacy gas** is enabled |

**Normal workflow:** configure only name, chain id, and RPC; leave fee fields blank. Setting the Sig fee speed to "Fast" is often a good option to ensure that a transaction is broadcast, or to limit front-running. At **MPC signature generation**, the node queries the RPC for current fees unless you override them.

**When you want saved fee rules:** the originator can enable **Use Custom Gas** when [creating a multi-sign request](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md#creating-a-multi-sign-request) (Compose, Foundry import, DeFi, or agent). With **Use Custom Gas** checked, the proposal uses the chain’s saved **Custom Gas Config** from the registry — including the default **base fee multiplier of 200** (2× base) when hard base-fee values are not set. Configured **base fee** / **priority fee** values act as **floors**, not fixed caps; live RPC still fills gaps. Peers see the same config on **Join**. The originator can adjust gas again on **Execute** before broadcast.

Hard-coded **base fee** / **priority fee** in the chain registry are for operators who want explicit floors or offline defaults; most personal wallets never need them.

---

### Bitcoin (SegWit and Taproot)

Bitcoin custody uses **KeyGen type**, not the EVM chain registry:

| Style | KeyGen type | Address | Chain config |
|-------|-------------|---------|--------------|
| **SegWit (P2WPKH)** | **secp256k1** (same family as EVM) | **bc1q…** mainnet (also testnet / signet variants derived from the same public key) | Select the Bitcoin network in **Compose** / Assets when your node build exposes it; SegWit addresses are derived automatically from the KeyGen |
| **Taproot (P2TR)** | **bitcoin-taproot** (separate KeyGen) | **bc1p…** mainnet | Create a dedicated **multi-agree** KeyGen with `keyType: "bitcoin-taproot"` — see [KeyGens](/ContinuumDAO/MPCSigner/KeyGens.md). Taproot compose is separate from **ed25519** (Solana-style) keys |

You cannot spend Bitcoin from an **ed25519** KeyGen or EVM **Compose** steps meant for ERC-20 transfers. Match KeyGen type to the chain family before adding networks or building sign requests.

---

### Solana and other non-EVM chains

The node stores **non-EVM** network config separately (`POST /postNonEvmChainDetails`). Supported **`chainType`** values include **`solana`**, **`near`**, **`sui`**, **`ton`**, and **`stellar`**. Identity is **`(chainType, chainId)`** — for example Solana mainnet is `chainType: solana`, `chainId: mainnet-beta`.

**Solana (supported now):** add via **Configure blockchains** when the UI exposes non-EVM presets, or via the management API / agent MCP (below). Required fields include **RPC gateway**, **endpoint kind** (`json-rpc`), **native symbol** (`SOL`), and **native decimals** (`9`). Optional **`signingDefaults`** (for example `commitment`, `computeUnitLimit`, `priorityFeeMicroLamports`) fine-tune compose; omit them to use node defaults. Spending requires an **ed25519** multi-agree KeyGen; the wallet derives the **Solana address** from that KeyGen’s public key.

Other ed25519-family chains (NEAR, Sui, TON, Stellar) follow the same non-EVM registry pattern when enabled on your node build.

---

### AI agent flow

With the [AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md)  you can manage chains from **Agent chat** instead of the modal.

**List what is configured:**

> What chains do I have configured on my node?

The agent calls **`get_chain_registry`** and returns name, chain id, RPC, and gas defaults for each EVM entry (and can list non-EVM configs when your build exposes them).

**Add a chain with defaults, e.g. :**

> Add Avalanche mainnet with RPC gateway https://avalanche-c-chain-rpc.publicnode.com and use default settings

The agent calls **`add_to_chain_registry`** with at least **`chainName`**, **`chainId`**, and **`rpcGateway`** (you must supply the RPC URL — the agent will not guess one). “Default settings” means: EIP-1559 mode, no hard **base fee** / **priority fee**, default **base fee multiplier** 200, and default Get Sig speed **normal** — the same as adding a preset in the UI without filling optional gas fields.

Before add/remove, the agent uses your [preferred Ed25519 management signer](/ContinuumDAO/MPAWallet/DefaultEd25519Signer.md) (or Ethereum management key) to sign the management POST. To remove: ask to remove by chain id; the agent uses **`remove_from_chain_registry`**.

For gas behaviour when the agent creates sign requests, it should call **`get_multi_sign_gas_options`** and ask whether **`useCustomGas`** should be **false** (live RPC — default) or **true** (saved Custom Gas Config from the registry, including the 2× base fee multiplier).

---

### Related

- [Asset management](/ContinuumDAO/MPAWallet/AssetManagement.md) — register tokens after chains are configured
- [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md) — **Use Custom Gas** on create and fee override on **Execute**
- [Compose transaction flow](/ContinuumDAO/MPAWallet/ComposeTransactionFlow.md) — chain must exist before compose / Foundry import
- [KeyGens](/ContinuumDAO/MPCSigner/KeyGens.md) — secp256k1, ed25519, bitcoin-taproot
- [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md)
- [Overview](/ContinuumDAO/MPAWallet/Overview.md)
- Operator detail: [API Implementation — chain config](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/references/API_IMPLEMENTATION.md#local-evm-chain-config)
