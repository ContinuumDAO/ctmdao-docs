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
- [Telegram Mini App](/ContinuumDAO/MPAWallet/AIHarness/TelegramMiniApp.md)
- [DeFi protocol support](/ContinuumDAO/MPAWallet/DeFiProtocolSupport.md)
