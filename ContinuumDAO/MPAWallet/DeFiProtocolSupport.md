<!--
agent:
  task: defi-protocol-support
  audience: [human, ai-agent]
  playbook: https://docs.continuumdao.org/ContinuumDAO/MPAWallet/DeFiProtocolSupport
  externalAgentSection: for-ai-agents-defi-protocols
-->

## DeFi protocol support

MPA wallet can interact with selected web3 / DeFi protocols **directly** — through the **node app** multi-sign UI and through the built-in **AI agent** (continuum MCP: load a protocol pack, then use that protocol’s tools).

On-chain actions still go through your Group’s **MPC KeyGen** and multi-agree threshold — the same [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md) as [manual Compose](/ContinuumDAO/MPAWallet/ComposeTransactionFlow.md) or [Foundry scripts](/ContinuumDAO/MPAWallet/ComposeTransactionFlow.md#foundry-script). Protocol flows often submit **batched** multi-transaction sign requests (Join → Execute → History). Protocol builds can set Purpose text and response time limits. ContinuumDAO does not hold keys or custody funds. Configuring the [AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md) is optional; protocol flows in the node app work without an agent.

Market-data-only feeds (for example CoinGecko or CoinMarketCap as optional MCP servers) are **not** listed below — those are chart / price sources, not execution protocols.

### Protocol modals — unified experience

Every supported protocol opens in the **same modal pattern** in the node app. You do not jump out to separate dApp sites or relearn a new layout for each venue — swaps, lending, staking, bridges, perps, options, and prediction markets all follow one wallet-native flow.

**How to open a protocol**

- **Assets tab** — click a **protocol shortcut** on an [asset row](/ContinuumDAO/MPAWallet/AssetManagement.md#asset-rows-assets-tab) when that token supports the integration (for example **Lido** on **ETH**, **Circle CCTP** on **USDC**, **Derive** on fundable ETH / USDC / WETH / WBTC / HYPE rows, **Aerodrome** on **Base**, **Trueo** on Base native ETH / USDC / TYD / TRUE / YES / NO, **Hyperliquid Outcomes** beside Hyperliquid perps on the Hyperliquid native-asset row, **Aave** / **Compound III** on supply/borrow markets for that asset)
- **Multi-sign / protocol UI** — browse available packs for the selected chain and KeyGen when you are not starting from a specific token row

**Shared steps (every pack)**

1. **Choose action** — supply, withdraw, swap, bridge, stake, open/close perp, buy/sell options, bet Yes/No, and so on (depends on the protocol)
2. **Review** — amounts, slippage, routes, health-factor or fee previews where the node provides them
3. **Confirm** — the node builds unsigned transaction(s), often as a **batch**, and creates a multi-sign request
4. **Join → Execute** — peers **Accept** or **Reject** on **Join**; the originator runs MPC signing and broadcast on **Execute** after threshold agreement

Layout, step order, and review screens stay **consistent across protocols**. Moving from **Aave** to **Uniswap** to **Circle CCTP** to **GMX** uses the same mental model: pick action, review, confirm, then the usual MPC custody loop. That unified DeFi surface — direct protocol access under threshold signing, without a browser extension holding a full private key — is a core strength of the MPA wallet.

The agent path mirrors the same packs: load a protocol via continuum MCP (`list_defi_protocols` / `load_defi_protocol`), then call that pack’s tools; built transactions still enter the same [Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md).

See [Asset management — protocol modals](/ContinuumDAO/MPAWallet/AssetManagement.md#protocol-modals--unified-experience) for screenshots and the Assets-tab entry point.

---

### Supported protocols

Current packs: **Uniswap v4**, **Curve**, **Aerodrome** (Base), **Aave v4**, **Compound III**, **Euler v2**, **Morpho**, **Pendle**, **Lido**, **Ethena**, **Maple Syrup**, **Sky**, **GMX**, **Hyperliquid**, **Hyperliquid Outcomes**, **Arcus**, **Derive**, **Trueo**, **Circle CCTP**, **Venice**.

**Permissions / requirements** (human pre-flight): what must be configured before a flow can succeed, and what this integration does not include. Use the same label order when a line applies; omit a label if it does not apply to that protocol.

1. **Networks** — chains or environments where the pack runs in the node app  
2. **Secrets** — [AI Agent → Variables](/ContinuumDAO/MPAWallet/AIHarness/Configure.md#3-variables-mcp-servers-and-default-search) keys, or “None”  
3. **Setup** — one-time wallet, KeyGen, funding, or registration steps  
4. **Rules** — collateral, timing, bridge minimums, and similar product constraints  
5. **Not supported** — explicit out-of-scope for this MPA integration  

Agent tool ids, delivery kinds, and Variable anti-patterns live in [For AI agents — DeFi protocols](#for-ai-agents--defi-protocols), not in this column.

| Protocol         | Capabilities                                                                                                                                                                                                          | Permissions / requirements                                                                                                                                                                                                                                                                 |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Uniswap v4**   | Spot swaps; UniswapX limit orders (Ethereum mainnet); LP mint / increase / decrease / collect; pool OHLCV; agent TP/SL-style monitoring via cron (not a native Uniswap order type)                                    | **Networks:** Supported EVM chains in your node registry with RPC.<br>**Secrets:** `UNISWAP_API_KEY` in Variables for agent-driven quotes; optional `BITQUERY_API_KEY` / `THE_GRAPH_API_KEY` for some OHLCV / indexing paths.<br>**Setup:** Node RPC for swaps and LP.<br>**Rules:** UniswapX limits on Ethereum mainnet; some tokenized / permissioned pools require issuer KYC (check permissions in-app; use the apply link when shown).<br>**Not supported:** Trading permissioned pools without completing issuer KYC when the UI requires it. |
| **Curve**        | Spot swaps (Router NG quote → multi-sign)                                                                                                                                                                             | **Networks:** EVM chains in your node registry with RPC where Curve pools are routable.<br>**Secrets:** None.<br>**Setup:** Node RPC for Router NG quotes.<br>**Rules:** Pool routing is chosen by the node for the selected chain and pair. |
| **Aerodrome**    | Spot swaps (v2 + Slipstream); basic vAMM/sAMM LP add / remove; Slipstream CL mint / increase / decrease / burn; gauge stake / unstake; claim pool fees and AERO emissions; Coinbase B20 tokenized stocks (e.g. AAPLc) | **Networks:** Base (**8453**) only.<br>**Secrets:** None.<br>**Setup:** Node RPC on Base.<br>**Not supported:** veNFT lock / vote, Velodrome Superchain, Pool Launcher. |
| **Aave v4**      | Supply / withdraw, borrow / repay; health-factor previews                                                                                                                                                             | **Networks:** Aave markets on chains enabled in your node build.<br>**Secrets:** None.<br>**Setup:** Node RPC on the target chain; supply collateral before borrowing.<br>**Rules:** Health-factor previews apply to borrow and withdraw.<br>**Not supported:** Markets or chains not enabled on your node. |
| **Compound III** | Isolated Comet markets: supply collateral / base (earn), withdraw / borrow, repay, claim COMP rewards; optional Bulker combined actions; native ETH wrap / unwrap                                                     | **Networks:** Ethereum, Base, Arbitrum, Optimism, Polygon, Mantle, Unichain, Linea — each must be in the node registry with RPC.<br>**Secrets:** None.<br>**Setup:** Node RPC on the Comet’s chain.<br>**Rules:** Collateral before borrow on isolated markets.<br>**Not supported:** Comets on chains you have not configured. |
| **Euler v2**     | Isolated lend / borrow; vault and collateral deposit / withdraw; repay; related claim / unlock flows in UI                                                                                                            | **Networks:** Supported EVM chains only.<br>**Secrets:** None.<br>**Setup:** Node RPC; use vault and asset addresses the UI exposes for that chain.<br>**Not supported:** Vaults or chains outside the node’s Euler integration. |
| **Morpho**       | Earn vault deposit / withdraw (incl. Robinhood Earn-style USDG where supported); Blue collateral / borrow / repay; Midnight fixed-rate lend / borrow / repay (take-only); Merkl claim                                 | **Networks:** Morpho products on chains in your node registry (Earn, Blue, Midnight as enabled in your build).<br>**Secrets:** None (the node calls Morpho APIs as needed).<br>**Setup:** Node RPC on the target chain.<br>**Rules:** Midnight flows are **take-only** — you accept existing offers, not post maker liquidity from this wallet.<br>**Not supported:** Maker posting on Morpho Midnight from this integration. |
| **Pendle**       | PT/YT/SY market browse and search; token ↔ PT/YT swaps (incl. points markets); mint / redeem PT+YT; add / remove AMM LP; redeem on-chain SY/YT/LP rewards; wallet LP reads (incl. matured markets)                    | **Networks:** Pendle-supported EVM chains that are also in your node registry with RPC (Pendle publishes chain lists via Pendle Core).<br>**Secrets:** None (Hosted SDK Convert).<br>**Setup:** Node RPC on the market’s chain.<br>**Not supported:** Pendle chains you have not added to the node registry. |
| **Lido**         | ETH stake; withdrawal request / claim; stETH ↔ wstETH wrap / unwrap                                                                                                                                                   | **Networks:** Primary stake, withdrawal, and wrap/unwrap on **Ethereum mainnet**.<br>**Secrets:** None.<br>**Setup:** Node RPC on mainnet for stake and redeem flows.<br>**Rules:** Other chains may only show **bridged** stETH / wstETH in the Assets tab.<br>**Not supported:** Full native Lido stake lifecycle on L2s where only bridged tokens appear. |
| **Ethena**       | USDe → sUSDe stake; redeem / cooldown / claim                                                                                                                                                                         | **Networks:** Primary stake and redeem on **Ethereum mainnet**.<br>**Secrets:** None.<br>**Setup:** Node RPC on mainnet.<br>**Rules:** Redeem follows Ethena cooldown and claim steps shown in the UI. |
| **Maple Syrup**  | Pool deposit; request redeem                                                                                                                                                                                          | **Networks:** Ethereum mainnet (and test networks where your node build enables them).<br>**Secrets:** None.<br>**Setup:** Pool and asset must be available in the node’s Maple configuration.<br>**Rules:** Redeem may be request-based rather than instant, per pool policy. |
| **Sky**          | Lockstake stake / draw / wipe / close / rewards; sUSDS deposit / redeem                                                                                                                                               | **Networks:** Ethereum mainnet.<br>**Secrets:** None.<br>**Setup:** Node RPC on mainnet. |
| **GMX**          | Perps increase / decrease / cancel (classic); GM deposit / withdraw; GMX stake / unstake; markets, prices, OHLCV, positions                                                                                           | **Networks:** Arbitrum and Avalanche.<br>**Secrets:** None.<br>**Setup:** Node RPC on the GMX chain; fund the GMX account through the pack’s deposit flow.<br>**Rules:** Classic (v1-style) perps and GM pool mechanics only.<br>**Not supported:** Express mode, 1CT subaccounts, GMX spot swaps. |
| **Hyperliquid**  | Perps (limit / close / cancel, leverage, TP/SL); spot ↔ perp USDC transfer; Arbitrum ↔ Hyperliquid bridge; vaults; HYPE stake / delegate; markets, OHLCV, positions                                                   | **Networks:** Hyperliquid mainnet / testnet per your build; **Arbitrum** for the USDC bridge.<br>**Secrets:** None.<br>**Setup:** Your MPC wallet is the executor — no separate Hyperliquid signup or agent approval on Hyperliquid.<br>**Rules:** Bridge minimums and gas rules (for example HYPE on HyperEVM) apply per Hyperliquid product docs.<br>**Not supported:** HIP-4 outcome / prediction markets (use **Hyperliquid Outcomes**). |
| **Hyperliquid Outcomes** | HIP-4 outcome markets: browse and search live markets, Yes/No prices and books, chance chart, settlement rules; limit bet (GTC / IOC / ALO); cancel; split quote into Yes+No; merge Yes+No back to quote; merge a question; negate. Positions and open orders from the info API | **Networks:** Hyperliquid mainnet (**999**) and testnet (**998**); same MPC address as Hyperliquid perps.<br>**Secrets:** None.<br>**Setup:** Shortcut beside Hyperliquid perps on the native asset row; no separate signup, KYC, or agent approval on Hyperliquid. Fund quote **USDC** via the existing Arbitrum USDC bridge (quote asset per market metadata).<br>**Rules:** Yes/No shares are HyperCore balances, not ERC-20s — do not add them to the node token list. Multi-sign requests expire after 30 minutes.<br>**Not supported:** Hyperliquid perps (use the **Hyperliquid** pack). |
| **Arcus**        | Perps place / close / cancel / leverage; spot stock-token RFQ; deposit / withdraw; perp + spot OHLCV; account reads                                                                                                   | **Networks:** Robinhood Chain (**4663**); chain must be in the node registry with RPC.<br>**Secrets:** None (Arcus API access comes from on-chain registration, not Variables).<br>**Setup:** **Paired secp256k1 + ed25519 KeyGens** in the same Group; complete API key registration in-app before first deposit or trade. |
| **Derive**       | Options (calls / puts): expiry ladder, ATM strike/premium ladder, quote, greeks, order book; place / replace / cancel (**limit**, **stop-limit**, **TWAP**); portfolio / positions; fund from Ethereum L1, Socket FAST (ETH / OP / Base / Arb), or HyperEVM **HYPE** vault            | **Networks:** Same MPC KeyGen EOA on every funding chain. Fund from Ethereum, Optimism, Arbitrum, Base, HyperEVM (**999**), or Sepolia (USDC). Derive L2 (**957**) is not an Assets-tab chain.<br>**Secrets:** None.<br>**Setup:** Fund via Assets shortcuts or Socket FAST / HYPE vault; first deposit creates trading and fallback subaccounts (required before orders). Fundable assets: ETH, USDC, WETH, WBTC on Ethereum; USDC, WETH, WBTC on Optimism and Arbitrum; USDC, WETH on Base; HYPE, WHYPE on HyperEVM; USDC on Sepolia.<br>**Rules:** Deposits execute on the source chain you choose; collateral must be in place before trading.<br>**Not supported:** Perps, spot, RFQ, lending; Polygon, Linea, and BSC funding; [Trade ideas](/ContinuumDAO/MPAWallet/TradeIdeas.md) options placement (use the Derive pack in the node app or agent). |
| **Trueo**        | On-chain Yes/No prediction markets: search and trending, chance history, order book; wrap / unwrap USDC ↔ TYD; mint and burn YES+NO; buy or sell Yes/No; limit order and cancel; redeem the winner                                              | **Networks:** Base (**8453**) only.<br>**Secrets:** None.<br>**Setup:** Assets shortcuts on Base ETH, USDC, TYD, TRUE, and YES/NO rows. Collateral is **TYD** (wrap USDC into TYD). After a bet, add that market’s YES or NO token (18 decimals) to the node token list so balances show on the Assets tab.<br>**Rules:** Multi-sign requests expire after 30 minutes. New bets are refused when the market closes within 5 minutes. |
| **Circle CCTP**  | Cross-chain native **USDC** burn → mint (routes, fees, balance, status)                                                                                                                                               | **Networks:** CCTP-supported source and destination chains configured in your node registry.<br>**Secrets:** None.<br>**Setup:** Source-chain RPC; USDC on the source chain.<br>**Rules:** Destination signing and gas follow the forwarding path implemented in your node build.<br>**Not supported:** CCTP routes not implemented on your node yet. |
| **Venice**       | Stake / unstake ladder for VVV / sVVV / DIEM (Base); staking reads; model catalog                                                                                                                                     | **Networks:** Base (**8453**).<br>**Secrets:** **`VENICE_API_KEY`** in Variables for the model catalog and API credits (linked to staked DIEM and your Venice account where applicable).<br>**Setup:** Node RPC on Base for on-chain stake / unstake.<br>**Rules:** Staking ladder applies to VVV, sVVV, and DIEM as shown in the UI. |

### For AI agents — DeFi protocols

Use continuum MCP: `list_defi_protocols`, then `load_defi_protocol` before that pack’s write tools unless the tool docs say otherwise. Built transactions still use the [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md). Prefer `list_defi_protocols` on the node as the source of truth for pack ids and chain lists when it disagrees with this page.

**General**

- Set optional third-party keys under **AI Agent → Variables** — see [Configure — Variables](/ContinuumDAO/MPAWallet/AIHarness/Configure.md#3-variables-mcp-servers-and-default-search).
- Preferred KeyGen and default Ed25519 signer still apply for management-signed steps.
- [Trade ideas](/ContinuumDAO/MPAWallet/TradeIdeas.md) / `build_trade` do not replace protocol-specific placement tools unless a doc explicitly says they target that venue.

**Uniswap v4**

- Load the Uniswap pack before swap / LP / UniswapX write tools.
- Agent quotes that hit Uniswap’s API need **`UNISWAP_API_KEY`** in Variables.
- TP/SL-style monitoring is cron-driven agent logic, not a native Uniswap order type.
- Optional **`BITQUERY_API_KEY`** / **`THE_GRAPH_API_KEY`** only for indexing paths the node uses for some OHLCV flows.

**Derive**

- Load the Derive pack to quote and place options; do not route options tickets through `build_trade`.
- After the first deposit, orders need the wallet’s **`subaccountId`** from Derive account state — never `0`. Do **not** store `subaccountId` as an AI Agent Variable; read it from portfolio / account tools when placing orders.
- Trades use EIP-712 with delivery kind **`derive_exchange`** (no custom gas on those steps). Deposits are on-chain on the funding chain the user selects.

**Hyperliquid Outcomes**

- Separate pack from Hyperliquid perps — load **`hyperliquidOutcome`** (confirm id with `list_defi_protocols`). Perps stay on the **Hyperliquid** pack.
- Exchange actions use EIP-712 with delivery kind **`hyperliquid_exchange`**, then POST **`/exchange`**; no custom gas on those steps.
- Default multi-sign expiry for this pack is **30 minutes**.
- `search_prediction_markets` can include HIP-4 markets; pass a venue filter to restrict to Hyperliquid Outcomes only.

**Arcus**

- Load the Arcus pack before deposit, RFQ, or perp write tools.
- Requires **paired secp256k1 + ed25519 KeyGens** in the same Group; run **`create_api_key`** (or the pack’s registration tool) before deposit or trade.

**Trueo**

- Load pack **`trueo`** before write tools (wrap, mint, trade, cancel, redeem). Search / read tools may work before `load_defi_protocol` depending on node build — prefer loading before any state-changing call.
- `search_prediction_markets` can include Trueo; pass a venue filter to restrict to Base Trueo only.

**Hyperliquid (perps)**

- Load the **Hyperliquid** pack for perps, bridge, vaults, and HYPE stake — not **`hyperliquidOutcome`** (HIP-4 uses that separate pack).

**Morpho**

- Do not attempt **Midnight maker** posting from the agent; this wallet integration is **take-only** on Midnight.

**Pendle**

- Confirm the market’s chain is both Pendle-supported and present in `list_defi_protocols` / the node registry before write tools.

**Venice**

- On-chain stake / unstake does not require Variables; agent **model catalog** and inference credit flows need **`VENICE_API_KEY`** in Variables.

**All other table packs**

- Load the matching pack with `load_defi_protocol` before write tools unless the tool description says otherwise.
- **Networks**, **Secrets**, **Setup**, **Rules**, and **Not supported** in the table are the human summary; prefer `list_defi_protocols` on the node when chain lists or pack ids differ from this page.

### Notes

- **Unified UI first:** prefer protocol shortcuts on the [Assets tab](/ContinuumDAO/MPAWallet/AssetManagement.md) or the shared modal flow above — the supported-protocols table is the capability reference, not a separate product surface per protocol.
- **AI agent:** [For AI agents — DeFi protocols](#for-ai-agents--defi-protocols); configure the harness in [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md).
- **Node app:** open the multi-sign / protocol UI for the same packs (no agent required).
- **Derive:** the Trade tab lists calls / puts from an expiry + ATM strike ladder (not a full-chain dump). Inspectors cover payoff / greeks / ticket / book. Charting Derive OHLCV is optional and does **not** turn a technical-analysis idea into an options ticket — use the Derive pack to quote and place.
- **Prediction markets:** **Trueo** (Base, on-chain YES/NO ERC20s) and **Hyperliquid Outcomes** (HIP-4, HyperCore balances) are separate packs. `search_prediction_markets` can search both; pass a venue to restrict to one. Hyperliquid perps stay on the **Hyperliquid** pack, not Outcomes.
- Support and chains evolve with releases; if a chain or action is missing in the UI or skill, it is not available on your node build yet.

### Related

- [Asset management](/ContinuumDAO/MPAWallet/AssetManagement.md) — protocol shortcuts from the Assets tab
- [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md)
- [Compose transaction flow](/ContinuumDAO/MPAWallet/ComposeTransactionFlow.md)
- [Overview](/ContinuumDAO/MPAWallet/Overview.md)
- [Install a node](/ContinuumDAO/MPAWallet/Install.md)
- [AI harness overview](/ContinuumDAO/MPAWallet/AIHarness/Overview.md)
- [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md)
- [Trade ideas](/ContinuumDAO/MPAWallet/TradeIdeas.md)
- [KeyGens](/ContinuumDAO/MPCSigner/KeyGens.md)
