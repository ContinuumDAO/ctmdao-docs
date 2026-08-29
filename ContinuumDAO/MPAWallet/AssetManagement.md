## Asset management

After you [configure chains](/ContinuumDAO/MPAWallet/ChainManagement.md) on your node, register the **tokens and NFTs** you want to see and use on the **Assets** tab. Token config is stored **on each node locally** (not propagated to other Group members) — the same model as chain registry. The node app and the AI agent use the management API (`POST /addToken`, `GET /getTokens`). Operator reference: [API Implementation — token config](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/references/API_IMPLEMENTATION.md#local-token-config).

**EVM only for now** — ERC-20, ERC-721 (NFT tokens, including ContinuumDAO veCTM), and Continuum token types (`CTMERC20`, `CTMRWA1`) on configured EVM chains. ContinuumDAO's CTM token is of type CTMERC20, a superset of ERC20 that will allow C3Caller cross-chain transfers. CTMRWA1 is the AssetX permissionless cross-chain RWA. Support for Solana and other non-EVM asset types will follow the same registry pattern as chains when enabled on your node build.

Every on-chain action still runs through your Group’s MPC threshold and the [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md).

---

### Asset rows (Assets tab)

Open the **Assets** tab and select a chain in the [chain selector](/ContinuumDAO/MPAWallet/ChainManagement.md#view-configured-chains-assets-tab). Each **asset row** shows balance, symbol, and **actions** you can take with that token on this node.

| Action | What it does |
|--------|----------------|
| **Transfer** | Opens the [Compose transaction flow](/ContinuumDAO/MPAWallet/ComposeTransactionFlow.md) with this token pre-selected — build an ERC-20 transfer (or equivalent) and submit a multi-sign request |
| **Protocol shortcuts** | One-click entry into a supported [DeFi protocol](/ContinuumDAO/MPAWallet/DeFiProtocolSupport.md) modal for actions that apply to **this** asset |
| **Remove** (bin icon) | Removes this token’s definition from **this node only**. No on-chain assets are lost — the contract and your balances are unchanged; you can re-add the token anytime from the [Tokens dialog](#tokens-dialog-add--remove-assets) or [AI flow](#ai-flow) |

Protocol buttons are **asset-specific**: the wallet only shows integrations that make sense for that row. Examples on Ethereum mainnet:

- **ETH** — **Lido** (stake native ETH; stETH / wstETH flows)
- **USDC** — **Circle CCTP** (cross-chain native USDC burn → mint)
- On **Base**, rows may also expose **Aerodrome** (spot swaps, LP, gauges, Coinbase B20 stocks)
- Other ERC-20 rows may expose **Aave**, **Compound III**, **Euler**, **Morpho**, **Uniswap**, **Curve**, and similar packs when that asset is supported in the protocol UI

That keeps the Assets tab uncluttered: you do not see Lido on USDC or CCTP on ETH.

<img src="/_media/asset-management-assets-rows.png" alt="" />

---

### Protocol modals — unified experience

Click a protocol shortcut on an asset row (for example **Aave** on a **USDC** row) to open that protocol’s modal. Every supported protocol uses the **same interaction pattern**:

1. Choose action (supply, withdraw, swap, bridge, stake, and so on — depends on the pack)
2. Review amounts, slippage, and health-factor or fee previews where the node provides them
3. Confirm — the node builds unsigned transaction(s), often as a **batch**, and creates a multi-sign request
4. Peers **Accept** or **Reject** on **Join**; originator **Execute**s after threshold agreement

Layout, step order, and review screens are consistent across protocols so you can move from **Aave** to **Uniswap** to **Circle CCTP** without relearning the wallet. That unified DeFi surface — direct protocol access under MPC custody — is a core strength of the MPA wallet versus juggling separate dApp tabs and browser wallets.


<img src="/_media/asset-management-aave-usdc-modal.png" alt="" />

Full protocol list and requirements: [DeFi protocol support — unified experience](/ContinuumDAO/MPAWallet/DeFiProtocolSupport.md#protocol-modals--unified-experience) and [supported protocols](/ContinuumDAO/MPAWallet/DeFiProtocolSupport.md#supported-protocols).

---

### Tokens dialog (add / remove assets)

To manage the token registry without starting from an asset row, open the **Tokens** dialog from the icon to the **right of the Assets heading**.

- **Tabs by token type** — **ERC20**, **ERC721**, **CTMERC20**, **CTMRWA1** each have their own tab
- **Configured tokens** for the selected chain appear in the active tab
- **Add** — click the **+** icon (top left) to register a new contract on the current chain
- **Remove** — select a token and delete; management signing required, same as add

Adding a token here makes it appear on the **Assets** tab (once the node can read a balance via RPC). It does not move funds — it only teaches **this node** which contracts to display and which protocol shortcuts to offer.

<img src="/_media/asset-management-tokens-dialog.png" alt="" />

---

### Example — add USDT on Ethereum

1. Select **Ethereum** in the Assets chain selector (chain must exist — see [Chain management](/ContinuumDAO/MPAWallet/ChainManagement.md)).
2. Open **Tokens** (icon beside **Assets**).
3. Open the **ERC20** tab and click **+**.
4. Enter contract details:
   - **Contract address** — USDT on Ethereum mainnet: `0xdAC17F958D2ee523a2206206994597C13D831ec7`
   - **Name / symbol** — e.g. `Tether USD`, `USDT`
   - **Decimals** — **required for correct balances and amounts**. USDT uses **6** decimals (typical for USD stablecoins). Most other ERC-20s use **18**; always verify on the block explorer or token docs if unsure
5. Save (management-signed). USDT appears on the Assets tab for Ethereum when the KeyGen holds a balance.

Wrong decimals show incorrect balances and can cause bad transfer amounts in Compose — double-check for stablecoins (often 6) versus standard 18-decimal tokens.


<img src="/_media/asset-management-add-usdt-ethereum.png" alt="" />

---

### AI flow

With the [AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md) and **continuum** MCP server enabled, you can manage tokens from **Agent chat** instead of the Tokens dialog.

**List assets on a chain:**

> What assets do I have configured on Ethereum?

The agent calls **`get_token_registry`** (optionally filtered by `chainType` / `chain_id`) and lists symbols, contract addresses, and decimals for each entry.

**Add a token by address:**

> Add Chainlink token with address 0x514910771AF9Ca656af840dff83E8264EcF986CA on Ethereum

The agent calls **`add_to_token_registry`** with `chainType: ethereum`, `chainId: 1`, `tokenType: ERC20`, and the contract address. It should set **name**, **symbol**, and **decimals** (LINK uses **18** decimals) — from your message or by looking up metadata.

If you do not know the address, ask the agent to use a **CoinGecko** (or similar) MCP tool you have configured in **AI Agent → MCP Servers** to resolve the contract for the chain, then add it.

Before add/remove, the agent uses your [preferred Ed25519 management signer](/ContinuumDAO/MPAWallet/DefaultEd25519Signer.md) (or Ethereum management key) to sign the management POST. To remove: ask to remove by chain and contract address; the agent uses **`remove_from_token_registry`**.

Configure [chains](/ContinuumDAO/MPAWallet/ChainManagement.md) before adding tokens that depend on RPC balance reads or protocol flows.

---

### Related

- [Contact management](/ContinuumDAO/MPAWallet/ContactManagement.md) — named recipients for Compose transfers
- [Chain management](/ContinuumDAO/MPAWallet/ChainManagement.md) — configure networks before assets
- [DeFi protocol support](/ContinuumDAO/MPAWallet/DeFiProtocolSupport.md) — protocol capabilities and API keys
- [Compose transaction flow](/ContinuumDAO/MPAWallet/ComposeTransactionFlow.md) — Transfer from an asset row
- [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md)
- [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md)
- [Overview](/ContinuumDAO/MPAWallet/Overview.md)
- Operator detail: [API Implementation — token config](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/references/API_IMPLEMENTATION.md#local-token-config)
