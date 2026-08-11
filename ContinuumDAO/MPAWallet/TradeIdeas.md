## Trade ideas

[Technical analysis](/ContinuumDAO/MPAWallet/TechnicalAnalysis.md) does more than describe the chart. When an analysis finds a clear setup, the node can turn it into one or more **trade ideas** — concrete long/short (or spot) levels the AI agent can use to build a real **multi-sign request** for agreement by the other nodes in your KeyGen.

### From analysis to PRIMARY trade ideas

1. Load OHLCV and optionally open a chart ([AI charting](/ContinuumDAO/MPAWallet/AICharting.md)).
2. Run an analysis from the chart analysis menu (for example momentum, key levels, classic patterns).
3. For each analysis **category**, the product ranks candidates and surfaces a **PRIMARY** trade idea when the setup is clear — the main actionable idea for that analysis (secondary matches may be listed but PRIMARY drives the default bias and build path).
4. Trade ideas appear as a numbered menu (for example **Build #N**) in Agent chat or Telegram.
5. Clear setups can also be **overlaid on the candlestick chart** (entry, target, invalidation / related levels from that analysis) in Agent chat and the [Telegram Mini App](/ContinuumDAO/MPAWallet/AIHarness/TelegramMiniApp.md), alongside other chart overlays.

PRIMARY ideas are tied to the analysis that produced them (trend structure, Fib levels, divergence, Bollinger, Donchian, classic patterns, and so on). Prices and invalidation come from that analysis — the agent should not invent levels.

### From a trade idea to a multi-sign request

1. Choose a trade idea (**Build #N**, or ask the agent to build a specific idea).
2. Confirm sizing and execution venue when prompted (for example Hyperliquid, GMX, Arcus, or Uniswap — see [DeFi protocol support](/ContinuumDAO/MPAWallet/DeFiProtocolSupport.md)).
3. The agent builds a **multi-sign request** (management-signed by your node’s default Ed25519 signer) for your preferred KeyGen.
4. Other nodes in the KeyGen **Accept** or **Reject** as usual. Only after threshold agreement can the originator complete MPC signing and execution. In a typical **2/2** personal wallet, that “other node” is your human circuit breaker — the AI node cannot spend alone. Larger Groups need more Accepts per their KeyGen threshold.

You can still compose trades by hand in the node app; trade ideas are the AI-assisted path from chart → levels → proposal.

### Scheduling with cron

The same loop — fetch OHLCV, run analyses, evaluate trade ideas, and optionally build trades — can run on a **schedule** via **AI Agent → Cron** (and related orchestration / trade cron templates).

On each run the agent can:

- Refresh candles and re-run selected analyses
- Rank or pick among **PRIMARY** (and related) trade ideas
- Propose or build multi-sign requests for the best options under your threshold rules

That lets the wallet watch markets periodically without you sitting in chat, while humans (or other nodes) still control Accept / Reject on real trades — the MPC threshold is the circuit breaker against unauthorized AI spends. Cron setup: [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md) (optional Cron tab) and the AI Agent Cron UI.

### Related

- [Technical analysis](/ContinuumDAO/MPAWallet/TechnicalAnalysis.md)
- [AI charting](/ContinuumDAO/MPAWallet/AICharting.md)
- [DeFi protocol support](/ContinuumDAO/MPAWallet/DeFiProtocolSupport.md)
- [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md)
