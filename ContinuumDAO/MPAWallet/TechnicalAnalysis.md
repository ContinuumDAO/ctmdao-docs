## Technical analysis

Once you have candlestick OHLCV on a chart (see [AI charting](/ContinuumDAO/MPAWallet/AICharting.md)), the AI agent can run **chart analysis** from a fixed menu — in Agent chat or Telegram (tap an analysis option, or ask for “analysis #N”).

Results can include structured commentary, **PRIMARY trade ideas** for clear setups, and **overlays** you can apply on the interactive chart (trend lines, Fibs, bands, patterns, and so on). How ideas become multi-sign trades (including cron): [Trade ideas](/ContinuumDAO/MPAWallet/TradeIdeas.md). Analysis does not replace your Group’s MPC threshold: any on-chain trade still needs [multi-sign agreement](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md) (for example your second node’s Accept on **Join** in a **2/2** human-in-the-loop wallet).

### Analysis options

| Analysis | What it does |
|----------|----------------|
| **Trend structure** | Maps swing highs/lows and trend phases (higher highs / higher lows, etc.), bias, and drawable trend lines. |
| **Elliott Wave** | Fib-guided impulse / correction wave count with projections, labels, and invalidation. |
| **Key levels (level to level)** | Nearest support below and resistance above the last close (bounce / rejection focus; no Fib targets). |
| **Key level Fibonacci** | Strong levels around price with 0.618-style retracement entry and range-leg targets. |
| **Momentum** | RSI and MACD state — overbought / oversold and crossover context. |
| **Liquidity depth** | Averaged spot order-book walls (e.g. Binance or Coinbase) as a depth summary — not a trade idea by itself. |
| **Divergence detector** | Regular / hidden RSI and Stochastic RSI divergences with pivot-based levels. |
| **Range / volatility** | Range bounds, compression vs expansion, ATR-style volatility stats. |
| **Bollinger analysis** | Bollinger bands and %B; band-to-band fade ideas when price is near an outer band. |
| **Donchian breakout** | N-bar high/low channel; retest or immediate breakout style entries. |
| **Supertrend** | ATR trailing stop / flip signals (classic period and multiplier defaults). |
| **Ichimoku cloud** | Tenkan / Kijun and cloud position (classic 9/26/52 settings). |
| **Z-score mean reversion** | Fade stretched moves when \|Z\| is large; target toward the mean with an ATR-style stop. |
| **Moving averages** | Fast / slow MA crossover and proximity / retest (e.g. SMA 50/200 defaults). |
| **Candlestick patterns** | Short 1–3 bar patterns (doji, hammer, engulfing, and similar) with buy / sell / hold lean. |
| **Classic chart patterns** | Multi-bar geometry (head & shoulders, doubles, triangles, cup & handle, and similar) with classification and draw options. |

Default plot overlays when you first open a chart (before a specific analysis) usually include **EMA(50)**, **RSI(14)**, and **volume** when the OHLCV source provides it. You can then apply or clear analysis overlays from the chart UI. To change those plot defaults, see [AI charting — Default chart](/ContinuumDAO/MPAWallet/AICharting.md#default-chart).

### Default settings

Many analysis parameters — indicator periods, proximity gates for **clear** vs **unclear** setups, and depth sampling — are read from **`trade-desk.yaml`** on the node. Edit it under **Node → AI Agent → Skills** → **Trade desk** (runtime: `agent_llm_config/trade-desk.yaml`, seeded from `agent_llm_config.defaults/trade-desk.yaml`).

The same file also drives **Build Trade** prefill when you pick an idea; policy the LLM uses on that path lives in the separate **`trade-defaults`** skill — see [Trade ideas — Default settings](/ContinuumDAO/MPAWallet/TradeIdeas.md#default-settings).

#### Price % vs ATR

Several desk knobs accept either **price %** or **ATR** scaling. They use the same field names but mean different things depending on mode — do not copy a price-mode number into ATR mode (or vice versa).

**ATR (Average True Range)** is a volatility measure: over the last *N* bars (default **14**, set by `entryProximityAtrPeriod`), the node averages each bar’s *true range* (high − low, extended when a gap exceeds the prior close). The result is a typical move size in **price units** — for example **$40** on ETH — not a percentage.

| Mode | Used on | What the number means | Typical values |
|------|---------|------------------------|----------------|
| **`price`** (default) | `entryProximityMode`, Bollinger `bollingerEntryProximityMode: bandWidth` | **% of price** — proximity to entry, or % of Bollinger band width | **0.5–2** for entry proximity; **5** default for Bollinger fade gate |
| **`atr`** | `entryProximityMode`, Bollinger `bollingerEntryProximityMode: atr` | **% of one ATR bar** — distance allowed in dollar (or quote) terms, scaled to current volatility | **15–50** for entry proximity |

**Entry proximity** (`entryProximityMode` / `entryProximityPct`) decides whether last close is close enough to the setup entry for a **clear** trade idea:

- **Price mode:** `|lastClose − entry| / |entry| × 100 ≤ entryProximityPct`. Example: entry **$3000**, `entryProximityPct: 1` → within **1%** (**$30**).
- **ATR mode:** `|lastClose − entry| ≤ (ATR × entryProximityPct / 100)`. Example: ATR **$40**, `entryProximityPct: 25` → within **$10** (25% of one ATR bar). Volatile symbols often need **larger** numbers in ATR mode than in price mode.

**ATR multiples** (separate from proximity %) set target distance for some analyses — for example `donchianTargetAtrMultiple: 3` means take-profit **3 × ATR** away from entry. That is a multiple of volatility, not a percentage of price.

Bollinger fade gates use their own pair: `bollingerEntryProximityMode` / `bollingerEntryProximityPct` (`bandWidth` = % of upper−lower width, or `atr` = % of one ATR bar). Universal `entryProximityMode` does **not** apply to Bollinger fades.

#### Settings by analysis type

| Analysis | Desk keys (`trade-desk.yaml`) |
|----------|-------------------------------|
| **Trend structure** | Universal proximity, `minTradeRatio` |
| **Elliott Wave** | Universal proximity (bar-count guidance is in the analysis skill) |
| **Key levels** | Universal proximity |
| **Key level Fibonacci** | `fibKeyLevelMinConfidence` (default **0.35**), universal proximity |
| **Momentum** | — (confirmation only; not a standalone trade idea) |
| **Liquidity depth** | `depthExchangeId`, `depthSampleIntervalSec`, `depthAverageWindowSec`, `depthLimit`, `depthLevelCount` |
| **Divergence** | `divergenceOscillator` (`rsi` \| `stochasticrsi` \| `both`), `divergenceMaxLag` |
| **Range / volatility** | Shared `entryProximityAtrPeriod` when other setups use ATR proximity |
| **Bollinger analysis** | `bollingerPeriod` (**20**), `bollingerStdDev` (**2**), `bollingerEntryProximityMode` / `bollingerEntryProximityPct` |
| **Donchian breakout** | `donchianPeriod` (**20**), `donchianEntryMode` (`retest` \| `immediate`), `donchianTargetAtrMultiple` (**3**) |
| **Supertrend** | `supertrendPeriod` (**10**), `supertrendMultiplier` (**3**), `supertrendEntryMode` (`flip` \| `retest`), `supertrendTargetAtrMultiple` (**3**) |
| **Ichimoku cloud** | `ichimokuConversionPeriod` / `ichimokuBasePeriod` / `ichimokuSpanPeriod` / `ichimokuDisplacement` (**9/26/52/26**), `ichimokuTargetAtrMultiple` (**3**) |
| **Z-score mean reversion** | `zScorePeriod` (**20**), `zScoreEntry` (**2**), `zScoreExit` (**0.5**), `zScoreStopAtrMultiple` (**2**), `zScoreAtrFilter` (`none` \| `contracting`) |
| **Moving averages** | `maFastPeriod` (**50**), `maSlowPeriod` (**200**), `maType` (`sma`), `maFreshCrossoverMaxBars` (**5**), universal proximity |
| **Candlestick patterns** | Universal proximity |
| **Classic chart patterns** | Universal proximity |

Universal proximity lives under `universal:` — see **Price % vs ATR** above for how `entryProximityMode`, `entryProximityPct`, and `entryProximityAtrPeriod` interact. `minTradeRatio` (default **3**) filters ideas with poor reward/risk.

#### Examples

**Tighter proximity on volatile alts (ATR-based gate):**

```yaml
universal:
  entryProximityMode: atr
  entryProximityPct: 25      # within 25% of one 14-bar ATR
  entryProximityAtrPeriod: 14
```

**Donchian — immediate breakout instead of retest:**

```yaml
universal:
  donchianPeriod: 20
  donchianEntryMode: immediate   # dc-brk instead of default dc-ret
  donchianTargetAtrMultiple: 3
```

**Bollinger — wider fade gate near the outer band:**

```yaml
universal:
  bollingerPeriod: 20
  bollingerStdDev: 2
  bollingerEntryProximityMode: bandWidth
  bollingerEntryProximityPct: 8    # default is 5 (% of band width)
```

**Fibonacci — require stronger key levels in the bracket:**

```yaml
universal:
  fibKeyLevelMinConfidence: 0.45   # default is 0.35 (strength/100 per leg)
```

### Related

- [Trade ideas](/ContinuumDAO/MPAWallet/TradeIdeas.md) — PRIMARY ideas → multi-sign → cron
- [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md)
- [AI charting](/ContinuumDAO/MPAWallet/AICharting.md) — OHLCV sources and interactive charts
- [DeFi protocol support](/ContinuumDAO/MPAWallet/DeFiProtocolSupport.md) — venues that can also execute after analysis
- [AI harness overview](/ContinuumDAO/MPAWallet/AIHarness/Overview.md)
- [Telegram Mini App](/ContinuumDAO/MPAWallet/AIHarness/TelegramMiniApp.md)
