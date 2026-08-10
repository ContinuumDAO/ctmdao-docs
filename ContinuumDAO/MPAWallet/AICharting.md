## AI charting

MPA wallet can plot **candlestick (OHLCV)** charts from the built-in [AI agent](/ContinuumDAO/MPAWallet/AIHarness/Overview.md) — in the node app Agent chat and on phones via the [Telegram Mini App](/ContinuumDAO/MPAWallet/AIHarness/TelegramMiniApp.md).

### What you can do

- Ask the agent to load a market (for example “plot ETH 4H for the last 30 days”) and open an interactive chart.
- **Scroll and zoom** the candles; default overlays typically include a moving average (EMA), RSI, and a volume pane when the source provides volume.
- After analysis, **add or remove indicators and drawings** on the chart (trend lines, Fibonacci / key levels, Bollinger bands, classic patterns, and other overlays the analysis menu supports).
- On supported sources, the chart can **update live** (price ticks refresh on a short poll, about every few seconds) without refetching the full candle history for every tick.
- On Telegram: after a plot, tap **Open chart** to use the same interactive Mini App on your phone. Basic bot chat and text chart previews work on free ngrok; the interactive Mini App needs a paid ngrok reserved domain — see [Telegram Mini App](/ContinuumDAO/MPAWallet/AIHarness/TelegramMiniApp.md).

Charts are driven by the agent’s continuum MCP tools (`prepare_chart_from_rows` and related). You choose the OHLCV source; the agent should not silently pick one for you.

### OHLCV data sources

| Source | Kind | How it is loaded | Notes / keys |
|--------|------|------------------|--------------|
| **Hyperliquid** | Perp | DeFi protocol pack (`hyperliquid`) | Live mid prices when chart live-binding is enabled. No API key for read/chart. |
| **Arcus** | Perp | DeFi protocol pack (`arcus`) | Robinhood Chain. Live mids when enabled. |
| **Arcus spot (stock tokens)** | Spot | Same `arcus` pack (spot OHLCV tools) | Spot RFQ markets on Arcus. |
| **GMX** | Perp / index-style | DeFi protocol pack (`gmx`) | Live mark price when enabled. Volume may be absent on rows. |
| **Uniswap v4** | DEX pool spot | DeFi protocol pack (`uniswap-v4`) | Pool OHLCV via pool list / presets. Optional **`THE_GRAPH_API_KEY`**; some Robinhood-chain paths need **`BITQUERY_API_KEY`**. |
| **CoinGecko (public)** | Spot index | MCP server `coingecko` | No key. Live simple price when enabled; Mini App live ticks may be limited. |
| **CoinGecko Pro** | Spot | MCP server `coingecko-pro` | **`COINGECKO_API_KEY`** in Variables. Finer intervals (e.g. hourly) where supported. |
| **CoinMarketCap (public)** | Spot / DEX klines | MCP server `coinmarketcap-public` | Keyless klines; historical CEX OHLCV with volume may need **`COINMARKETCAP_API_KEY`**. |
| **Coinbase Advanced Trade (public)** | Spot CEX | MCP server `coinbase-public` | Keyless candles by default; optional Coinbase CDP keys for higher limits. Live product ticker when enabled. |
| **Binance (public)** | Spot CEX | MCP server `binance` | Public klines. Live ticker when enabled. |

DeFi venues are loaded with continuum **`load_defi_protocol`**. Catalog market-data servers are loaded under **AI Agent → MCP Servers** / Variables as needed. Execution protocols (swaps, perps, etc.) are listed separately under [DeFi protocol support](/ContinuumDAO/MPAWallet/DeFiProtocolSupport.md).

### Related

- [Technical analysis](/ContinuumDAO/MPAWallet/TechnicalAnalysis.md) — analysis menu on OHLCV candles
- [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md)
- [Telegram Mini App](/ContinuumDAO/MPAWallet/AIHarness/TelegramMiniApp.md)
