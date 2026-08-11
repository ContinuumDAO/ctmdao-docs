## Technical analysis

Once you have candlestick OHLCV on a chart (see [AI charting](/ContinuumDAO/MPAWallet/AICharting.md)), the AI agent can run **chart analysis** from a fixed menu — in Agent chat or Telegram (tap an analysis option, or ask for “analysis #N”).

Results can include structured commentary, **PRIMARY trade ideas** for clear setups, and **overlays** you can apply on the interactive chart (trend lines, Fibs, bands, patterns, and so on). How ideas become multi-sign trades (including cron): [Trade ideas](/ContinuumDAO/MPAWallet/TradeIdeas.md). Analysis does not replace your Group’s MPC threshold: any on-chain trade still needs multi-sign agreement (for example your second node’s Accept in a **2/2** human-in-the-loop wallet).

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

Default plot overlays when you first open a chart (before a specific analysis) usually include **EMA(50)**, **RSI(14)**, and **volume** when the OHLCV source provides it. You can then apply or clear analysis overlays from the chart UI.

### Related

- [Trade ideas](/ContinuumDAO/MPAWallet/TradeIdeas.md) — PRIMARY ideas → multi-sign → cron
- [AI charting](/ContinuumDAO/MPAWallet/AICharting.md) — OHLCV sources and interactive charts
- [DeFi protocol support](/ContinuumDAO/MPAWallet/DeFiProtocolSupport.md) — venues that can also execute after analysis
- [AI harness overview](/ContinuumDAO/MPAWallet/AIHarness/Overview.md)
