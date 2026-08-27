## AI charting

MPA wallet can plot **candlestick (OHLCV)** charts from the built-in [AI agent](/ContinuumDAO/MPAWallet/AIHarness/Overview.md) — in the node app Agent chat and on phones via the [Telegram Mini App](/ContinuumDAO/MPAWallet/AIHarness/TelegramMiniApp.md).

### What you can do

- Ask the agent to load a market (for example “plot ETH 4H for the last 30 days”) and open an interactive chart.
- **Scroll and zoom** the candles; default overlays typically include a moving average (EMA), RSI, and a volume pane when the source provides volume.
- After analysis, **add or remove indicators and drawings** on the chart (trend lines, Fibonacci / key levels, Bollinger bands, classic patterns, and other overlays the analysis menu supports).
- On supported sources, the chart can **update live** (price ticks refresh on a short poll, about every few seconds) without refetching the full candle history for every tick.
- On Telegram: after a plot, tap **Open chart** to use the same interactive Mini App on your phone. Basic bot chat and text chart previews work on free ngrok; the interactive Mini App needs a paid ngrok reserved domain — see [Telegram Mini App](/ContinuumDAO/MPAWallet/AIHarness/TelegramMiniApp.md).

Charts are driven by the agent’s continuum MCP tools (`prepare_chart_from_rows` and related). You choose the OHLCV source; the agent should not silently pick one for you.

Ask **“what OHLCV sources are available?”** — the agent calls **`list_ohlcv_sources`**, which lists **active** providers on your node and **repository** catalog entries you can add. That is narrower than **`list_mcp_servers`** (full MCP catalog). See [MCP servers](/ContinuumDAO/MPAWallet/AIHarness/McpServers.md).

### OHLCV data sources

Chartable sources are what **`list_ohlcv_sources`** returns — **active** (on your node or a loaded DeFi pack) vs **repository** (catalog MCP you still need to **Add from repository**). That list is narrower than **`list_mcp_servers`** (search, news, social, and other non-OHLCV tools). See [MCP servers](/ContinuumDAO/MPAWallet/AIHarness/McpServers.md).

New nodes seed **`coinmarketcap-public`** and **`coinbase-public`** in the catalog ( **`initialLoad: false`** ) — add or enable them when you want those providers; the agent should still ask which source to use.

#### DeFi protocol packs (via `load_defi_protocol`)

| Source | Kind | How it is loaded | Notes / keys |
|--------|------|------------------|--------------|
| **Hyperliquid** | Perp | DeFi protocol pack (`hyperliquid`) | Live mid prices when chart live-binding is enabled. No API key for read/chart. |
| **Arcus** | Perp | DeFi protocol pack (`arcus`) | Robinhood Chain. Live mids when enabled. |
| **Arcus spot (stock tokens)** | Spot | Same `arcus` pack (spot OHLCV tools) | Spot RFQ markets on Arcus. |
| **GMX** | Perp / index-style | DeFi protocol pack (`gmx`) | Live mark price when enabled. Volume may be absent on rows. |
| **Uniswap v4** | DEX pool spot | DeFi protocol pack (`uniswap-v4`) | Pool OHLCV via pool list / presets. Optional **`THE_GRAPH_API_KEY`**; some Robinhood-chain paths need **`BITQUERY_API_KEY`**. |

#### Built-in **continuum-mcp** catalog servers

These run in the node image sidecar. Activate with **Add from repository** (or use the default seed for **`coinmarketcap-public`** / **`coinbase-public`**), set **Variables** if noted, then **`agent_load_mcp_server`** after you pick a provider.

| Source | Kind | Catalog id | Notes / keys |
|--------|------|------------|--------------|
| **CoinMarketCap (public)** | Spot index, **DEX pool** klines, sentiment | `coinmarketcap-public` | **Keyless:** DEX **`get_kline_candles`**, global metrics, Fear & Greed, CMC100, altcoin season, DEX token/pool search. **With `COINMARKETCAP_API_KEY`:** CEX aggregate **`get_crypto_ohlcv_historical`** (hourly/daily + volume) on the **same** server. Prefer this over catalog **`coinmarketcap`** for charts — call **`resolve_coinmarketcap_mcp_server`** first. |
| **Coinbase Advanced Trade (public)** | Spot CEX | `coinbase-public` | Keyless **`get_product_candles`** (`BTC-USD`-style products). Optional **`COINBASE_CDP_API_KEY_NAME`** + **`COINBASE_CDP_API_PRIVATE_KEY`** for authenticated routes. **`get_product_book`** feeds [liquidity depth](/ContinuumDAO/MPAWallet/TechnicalAnalysis.md) analysis. Live product ticker when enabled. |
| **Business Latest RSS** | Headlines (not candles) | `business-latest` | Free business RSS — research only, not OHLCV. |
| **World Affairs RSS** | Headlines (not candles) | `world-affairs` | Free world-news RSS — research only, not OHLCV. |
| **Technical indicators** | Indicators on fetched series | `technical-indicators` | SMA, RSI, MACD, Bollinger, Fibonacci, 100+ indicators — **after** you have OHLCV bars. See [Technical analysis](/ContinuumDAO/MPAWallet/TechnicalAnalysis.md). Not a candle source. |

#### Other catalog MCP servers (chartable OHLCV)

Load under **AI Agent → MCP Servers** / **Variables** as needed.

| Source | Kind | Catalog id | Notes / keys |
|--------|------|------------|--------------|
| **CoinGecko (public)** | Spot index | `coingecko` | No key. Live simple price when enabled; Mini App live ticks may be limited. Volume often absent on public spot feeds. |
| **CoinGecko Pro** | Spot | `coingecko-pro` | **`COINGECKO_API_KEY`**. Finer intervals (e.g. hourly) where supported. |
| **Binance (public)** | Spot CEX | `binance` | Public klines (`binance_get_klines`, **`response_format: "json"`**). Live ticker when enabled. |
| **Financial Modeling Prep** | Equities EOD / intraday | `financial-modeling-prep` | **`FMP_API_KEY`**. Keep vendor **`date`** fields when charting. Live quote via **`fmp.quote`**. |
| **Alpaca (v2)** | US equities / crypto bars | `alpaca` | **`ALPACA_API_KEY`** + **`ALPACA_SECRET_KEY`**. Pin v2 server. Live via **`alpaca.latestTrade`**. |
| **Equibles** | US equities (daily OHLCV) | `equibles` | **`EQUIBLES_API_KEY`**. Pass full **`GetStockPrices`** result to the chart tool. No live tick poller — use **`GetLatestPrices`** for snapshots. |
| **Alpha Vantage** | Stocks / forex / crypto | `alphavantage` | **`ALPHA_VANTAGE_API_KEY`**. Time-series via MCP **`TOOL_CALL`**. Static chart — no live tick poller. |

#### Related market data (not primary OHLCV chart sources)

These catalog MCPs add context the agent can load for research, TA, or macro — but they are **not** in **`list_ohlcv_sources`** and do not replace a candle fetch:

| Catalog id | Typical use |
|------------|-------------|
| **`coinmarketcap`** (full official MCP) | TA, news, narratives, on-chain metrics — requires **`COINMARKETCAP_API_KEY`**. Optional alongside **`coinmarketcap-public`**; not the default for DEX/Uniswap pool charts. |
| **`messari`** | Crypto intelligence (**`MESSARI_SDK_API_KEY`**) |
| **`altfins`** | Crypto analytics (**`ALTFINS_API_KEY`**) |
| **`dune`** | On-chain analytics queries (**`DUNE_API_KEY`**) |
| **`whale-tracker`** | Large transfer alerts (**`WHALE_ALERT_API_KEY`**) |
| **`gdelt-cloud`** | Macro / world-event search (**`GDELT_API_KEY`**) |

For Telegram, Discord, and Reddit channel search (sentiment, not candles), use built-in **`continuum`** social tools — [MCP servers — Social media search](/ContinuumDAO/MPAWallet/AIHarness/McpServers.md#social-media-search-on-continuum).

DeFi venues are loaded with continuum **`load_defi_protocol`**. Catalog market-data servers are loaded with **`agent_load_mcp_server`** after you choose a provider — see [MCP servers](/ContinuumDAO/MPAWallet/AIHarness/McpServers.md). Execution protocols (swaps, perps, etc.) are listed separately under [DeFi protocol support](/ContinuumDAO/MPAWallet/DeFiProtocolSupport.md).

#### Live chart updates

When the OHLCV source supports it, the interactive chart can refresh the last price on a short poll without refetching full history:

| Source | Live binding |
|--------|----------------|
| **CoinGecko** / **CoinGecko Pro** | **`coinId`** + bucket from execute output |
| **Binance** | Full klines JSON → **`binance.tickerPrice`** |
| **Coinbase (public)** | Full candles JSON → **`coinbase.productTicker`** |
| **Financial Modeling Prep** | Full chart JSON → **`fmp.quote`** |
| **Alpaca** | Full bars JSON → **`alpaca.latestTrade`** |
| **Hyperliquid**, **Arcus**, **GMX**, other DeFi | Full fetch JSON; node may bind perp live |
| **Equibles**, **Alpha Vantage** | Static series — snapshots via provider tools, no chart poller |
| **CoinMarketCap (public)** DEX klines | Often static; Pro CEX historical may lag — offer another source if stale |

### Default chart

When the agent opens a candlestick chart with **`prepare_chart_from_rows`** and you have not asked for custom indicators, the node applies these **built-in defaults**:

| Pane | Indicator | Default |
|------|-----------|---------|
| Main (price) | **EMA** | period **50** |
| Below price | **Volume** | histogram when the OHLCV rows include volume |
| Below volume | **RSI** | period **14** |

EMA needs **≥50 bars** in the loaded window; RSI needs **>14 bars**. Shorter lookbacks still plot candles (and volume when present) but may omit the EMA line until you extend the range. CoinGecko public spot feeds omit volume — the volume pane is skipped automatically.

**Where to change defaults:** edit the bundled **`chart-defaults`** skill on the node — **Node → AI Agent → Skills** → **`chart-defaults`** (`Skills/chart-defaults/SKILL.md`). That skill steers the agent whenever you ask to plot or refresh a chart. It is **plotting only**; trade-idea build defaults live in **`trade-desk.yaml`** / **`trade-defaults`** ([Trade ideas — Default settings](/ContinuumDAO/MPAWallet/TradeIdeas.md#default-settings)). Analysis indicator periods shared with `trade-desk.yaml` are listed under [Technical analysis — Default settings](/ContinuumDAO/MPAWallet/TechnicalAnalysis.md#default-settings).

Related skills you can tune alongside it:

| Skill | What it controls |
|-------|------------------|
| **`chart-defaults`** | Default EMA/RSI/volume, optional overlay examples, skip-defaults behaviour |
| **`chart-periods`** | Default lookback when you do not specify a range (for example 1h → 7–30 days, 4h → 30–90 days) |
| **`chart-ohlcv-sources`** | Which provider to prefer or ask for when you say “chart ETH” without naming a venue |

You can also override for a single chart in chat (for example “plot ETH 4H with SMA 20 and MACD, no RSI”) — the agent passes explicit **`overlays`** or **`options.skipDefaultOverlays`** on the chart tool call.

#### Common customizations

**Candles and volume only (no EMA or RSI):**

Tell the agent, or add to **`chart-defaults`** under the built-in defaults section:

```json
{
  "title": "ETH-PERP 1H — last 7d",
  "toolResult": { "... full OHLCV fetch ..." },
  "options": { "skipDefaultOverlays": true }
}
```

**Replace defaults with SMA 20 on price and MACD below:**

Pass a non-empty **`overlays`** array — this **replaces** EMA(50) and RSI(14) entirely:

```json
{
  "overlays": [
    { "type": "sma", "sourceSeriesId": "primary", "period": 20 },
    { "type": "macd", "sourceSeriesId": "primary", "fastPeriod": 12, "slowPeriod": 26, "signalPeriod": 9 }
  ]
}
```

**Keep defaults and add Bollinger bands** (merge into **`prepareReplay.overlays`** on a chart refresh — does not remove EMA/RSI unless you pass a full replacement array):

```json
{
  "type": "bollinger",
  "sourceSeriesId": "primary",
  "period": 20,
  "stdDev": 2,
  "fill": true
}
```

**Prefer SMA 50/200 instead of EMA(50)** — document in **`chart-defaults`** so the agent merges these on plot:

```json
[
  { "type": "sma", "sourceSeriesId": "primary", "period": 50 },
  { "type": "sma", "sourceSeriesId": "primary", "period": 200 }
]
```

Requires **≥200 bars** for the slow MA. Pair with **`chart-periods`** so default lookbacks are long enough (for example 1h with at least 30 days).

**Default spot source for “chart ETH”** — note in **`chart-defaults`** or **`chart-ohlcv-sources`** that undifferentiated spot requests should use **`coingecko`** when loaded, or ask you to pick a provider. Perp / venue-specific requests still use the named DeFi pack (Hyperliquid, GMX, Arcus, and so on).

#### Analysis overlays vs default chart

Running [technical analysis](/ContinuumDAO/MPAWallet/TechnicalAnalysis.md) does not redraw the default chart automatically. After analysis, you can apply overlays from the chart UI or ask the agent to merge analysis-specific overlays (Donchian channels, Supertrend trail, Ichimoku cloud, Z-score pane, and similar). Periods for those overlays often come from **`trade-desk.yaml`**; shapes and merge behaviour are documented in **`chart-defaults`**.

### Related

- [Technical analysis](/ContinuumDAO/MPAWallet/TechnicalAnalysis.md) — analysis menu on OHLCV candles
- [Trade ideas](/ContinuumDAO/MPAWallet/TradeIdeas.md)
- [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md)
- [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md)
- [MCP servers](/ContinuumDAO/MPAWallet/AIHarness/McpServers.md)
- [Telegram Mini App](/ContinuumDAO/MPAWallet/AIHarness/TelegramMiniApp.md)
- [DeFi protocol support](/ContinuumDAO/MPAWallet/DeFiProtocolSupport.md)
