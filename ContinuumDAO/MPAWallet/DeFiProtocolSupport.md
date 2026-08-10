## DeFi protocol support

MPA wallet can interact with selected web3 / DeFi protocols **directly** — through the **node app** multi-sign UI and through the built-in **AI agent** (continuum MCP: load a protocol pack, then use that protocol’s tools).

On-chain actions still go through your Group’s **MPC KeyGen** and multi-agree threshold. ContinuumDAO does not hold keys or custody funds. Configuring the [AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md) is optional; protocol flows in the node app work without an agent.

Market-data-only feeds (for example CoinGecko or CoinMarketCap as optional MCP servers) are **not** listed below — those are chart / price sources, not execution protocols.

### Supported protocols

| Protocol | Capabilities | Permissions / requirements |
|----------|--------------|----------------------------|
| **Uniswap v4** | Spot swaps; UniswapX limit orders (Ethereum mainnet); LP mint / increase / decrease / collect; pool OHLCV; agent TP/SL-style monitoring via cron (not a native Uniswap order type) | **`UNISWAP_API_KEY`** in **AI Agent → Variables** (and for agent quotes). Some **tokenized / permissioned** pools require issuer **KYC** (check permissions in-app; KYC apply link when shown). Optional **`BITQUERY_API_KEY`** / **`THE_GRAPH_API_KEY`** for some OHLCV / indexing paths. |
| **Curve** | Spot swaps (Router NG quote → multi-sign) | Node RPC and pool routing; no Curve API key. |
| **Aave v4** | Supply / withdraw, borrow / repay; health-factor previews | Collateral before borrow; chain / market must be supported. |
| **Euler v2** | Isolated lend / borrow; vault and collateral deposit / withdraw; repay; related claim / unlock flows in UI | Vault and asset addresses; supported chains only. |
| **Morpho** | Earn vault deposit / withdraw (incl. Robinhood Earn-style USDG where supported); Blue collateral / borrow / repay; Midnight fixed-rate lend / borrow / repay (take-only); Merkl claim | Morpho APIs as used by the node; Midnight: take-only (no maker posting from this wallet). |
| **Lido** | ETH stake; withdrawal request / claim; stETH ↔ wstETH wrap / unwrap | Primary stake / redeem on Ethereum mainnet; other chains may only recognize bridged assets. |
| **Ethena** | USDe → sUSDe stake; redeem / cooldown / claim | Primary stake / redeem on Ethereum mainnet. |
| **Maple Syrup** | Pool deposit; request redeem | Pool / asset configuration; mainnet (and test networks where enabled). |
| **Sky** | Lockstake stake / draw / wipe / close / rewards; sUSDS deposit / redeem | Ethereum mainnet. |
| **GMX** | Perps increase / decrease / cancel (classic); GM deposit / withdraw; GMX stake / unstake; markets, prices, OHLCV, positions | Arbitrum and Avalanche. **No** express mode, **no** 1CT subaccounts, **no** GMX spot swaps in this integration. |
| **Hyperliquid** | Perps (limit / close / cancel, leverage, TP/SL); spot ↔ perp USDC transfer; Arbitrum ↔ Hyperliquid bridge; vaults; HYPE stake / delegate; markets, OHLCV, positions | Uses your MPC wallet as executor (no separate Hyperliquid signup). Bridge minimums and gas (e.g. HYPE on HyperEVM) apply per product rules. |
| **Arcus** | Perps place / close / cancel / leverage; spot stock-token RFQ; deposit / withdraw; perp + spot OHLCV; account reads | Robinhood Chain (**4663**). Needs **paired secp256k1 + ed25519 KeyGens** (same Group) and **API key registration** (`create_api_key`) before deposit / trade. |
| **Circle CCTP** | Cross-chain native **USDC** burn → mint (routes, fees, balance, status) | Source-chain RPC; forwarding path as implemented (destination signing / gas rules per product). |
| **Venice** | Stake / unstake ladder for VVV / sVVV / DIEM (Base); staking reads; model catalog | Base (**8453**). Model list / API credits: **`VENICE_API_KEY`** in Variables (tied to staked DIEM + Venice key where applicable). |

### Notes

- **AI agent:** load a protocol with continuum MCP (`list_defi_protocols` / `load_defi_protocol`), then use that pack’s tools. Preferred KeyGen and default Ed25519 signer still apply for management-signed steps — see [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md).
- **Node app:** open the multi-sign / protocol UI for the same packs (no agent required).
- Support and chains evolve with releases; if a chain or action is missing in the UI or skill, it is not available on your node build yet.

### Related

- [Install a node](/ContinuumDAO/MPAWallet/Install.md)
- [AI harness overview](/ContinuumDAO/MPAWallet/AIHarness/Overview.md)
- [KeyGens](/ContinuumDAO/MPCSigner/KeyGens.md)
