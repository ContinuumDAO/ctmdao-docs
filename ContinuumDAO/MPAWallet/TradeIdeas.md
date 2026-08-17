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
4. Other nodes in the KeyGen **Accept** or **Reject** as usual on the **Join** tab (Purpose, Thoughts, time limits, **Execute**, and **History** — see [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md)). Only after threshold agreement can the originator complete MPC signing and execution. In a typical **2/2** personal wallet, that “other node” is your human circuit breaker — the AI node cannot spend alone. Larger Groups need more Accepts per their KeyGen threshold.

You can still build trades manually ([Compose](/ContinuumDAO/MPAWallet/ComposeTransactionFlow.md) or [DeFi protocol](/ContinuumDAO/MPAWallet/DeFiProtocolSupport.md) UI); trade ideas are the AI-assisted path from chart → levels → proposal.

### Scheduling with cron

The same loop — fetch OHLCV, run analyses, evaluate trade ideas, and optionally build trades — can run on a **schedule** via **AI Agent → Cron** (and related orchestration / trade cron templates).

On each run the agent can:

- Refresh candles and re-run selected analyses
- Rank or pick among **PRIMARY** (and related) trade ideas
- Propose or build multi-sign requests for the best options under your threshold rules

That lets the wallet watch markets periodically without you sitting in chat, while humans (or other nodes) still control Accept / Reject on real trades — the MPC threshold is the circuit breaker against unauthorized AI spends. Cron setup: [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md) (optional Cron tab) and the AI Agent Cron UI.

### Default settings

When you pick a trade idea (**Build #N**), the node pre-fills the Build Trade form from two related sources:

| File | Type | Role |
|------|------|------|
| **`trade-desk.yaml`** | Machine-readable YAML | Numeric defaults on a **deterministic fast path** — entry/stop offsets, proximity, per-protocol sizing, bracket TP/SL, and when to skip the fast path (`llmFallback`). |
| **`trade-defaults`** skill (`Skills/trade-defaults/SKILL.md`) | Agent skill (policy prose) | Rules the LLM follows when the fast path **cannot** decide — break+retest alternates, Donchian / Supertrend primary vs nested alternate, unclear ideas with a clear alternate, discretionary purpose text, and per-protocol build policies. |

**Where to edit:** **Node → AI Agent → Skills** — **Trade desk** for `trade-desk.yaml`, or the bundled **`trade-defaults`** skill. Runtime file: `agent_llm_config/trade-desk.yaml`. Cron jobs can also override build fields in a fenced **`tradeBuild`** YAML block inside a scheduled job message.

**How they work together:** the node loads `trade-desk.yaml` first. If the idea is **clear** and no LLM-fallback rule matches, desk numbers prefill the form instantly — no extra LLM turn. Otherwise the **`trade-defaults`** skill guides the agent (for example choosing **`kl-ret`** break+retest over a bounce, or picking Donchian **`dc-ret`** vs **`dc-brk`**). Repeatable numbers stay in the YAML; discretionary policy stays in the skill.

Analysis-time indicator periods and clear/unclear gates in the same YAML file are documented under [Technical analysis — Default settings](/ContinuumDAO/MPAWallet/TechnicalAnalysis.md#default-settings).

#### Build prefill (`trade-desk.yaml`)

Universal build fields under `universal:`:

| Setting | What it controls |
|---------|------------------|
| `entryOffsetPct` | Resting limit band beyond the analysis entry (always a **price %**). |
| `invalidationOffsetPct` / `invalidationOffsetMode` | Stop / pattern-failure band beyond invalidation (`price` or `atr`). |
| `entryProximityMode` / `entryProximityPct` | Same proximity gate as analysis — also checked at build on spot venues. |
| `minTradeRatio` | Minimum reward/risk for a clear idea (default **3**). |
| `assumedLeverage` | Isolated leverage for perp liquidation estimates (default **10**). |
| `autoSubmitMultisign` | Allow cron/automation to submit without operator review (default **false**). |

Protocol blocks under `protocols:` (`hyperliquid`, `arcus`, `gmx`, `uniswap`) set default sizing, time-in-force, collateral, and Hyperliquid/Arcus bracket TP offsets (`targetOffsetPct`, `targetOffsetMode`, `tpslExecMode`). Optional `purposeSuffix` per analysis kind appends to multisign Purpose text.

**`llmFallback:`** skips the fast path and loads **`trade-defaults`** — for example when `status` is **unclear**, when a clear break+retest alternate exists, or always for setup code **`kl-ret`**.

#### Skill policy (`trade-defaults`)

| Analysis kind | What the skill decides |
|---------------|------------------------|
| **Trend structure** | Always **retest** entry mode; default TP = impulse measured move (`takeProfitSource: impulse_leg`). |
| **Elliott Wave** | Wave menu selection; corrective counts stay unclear. |
| **Key levels** | Primary bounce/rejection vs nested **`kl-ret`** break+retest alternate. |
| **Key level Fibonacci** | Inside-range 0.618 fade only; bracket leg quoting. |
| **Momentum / candlestick / divergence** | Cron confirmation alongside structural primaries; divergence uses setup code **`div`**. |
| **Bollinger / Donchian / Supertrend / Ichimoku / Z-score / MAs** | Primary vs nested alternate setups (`bb-fade`, `dc-ret`/`dc-brk`, `st-flip`/`st-ret`, `ichi-tk`/`ichi-cloud`, `zs-fade`, `ma-cross`/`ma-ret`). |
| **Classic chart patterns** | Bounce vs retest from pattern geometry; Purpose uses compact `ctm1` pipe meta. |

Purpose text for multisign uses a compact `ctm1` prefix (protocol, side, setup code, effective entry/stop prices) so cron and peer nodes can scan side, setup code, and pattern-failure levels.

#### Examples

**Default build offsets (1% entry and stop bands):**

```yaml
universal:
  entryOffsetPct: 1
  invalidationOffsetMode: price
  invalidationOffsetPct: 1
```

**Hyperliquid — conservative take-profit inside the analysis target:**

```yaml
protocols:
  hyperliquid:
    targetOffsetMode: price
    targetOffsetPct: 0.1           # TP slightly inside full target (long: below; short: above)
    tpslExecMode: limit_at_trigger
    sizing:
      mode: marginPct
      marginPct: 10
```

**Disable LLM fallback for unclear ideas (fast path only when status is clear):**

```yaml
llmFallback:
  whenStatusUnclear: false
  whenBreakRetestAlternateEligible: false
  setupPurposeCodes: []
```

When the fast path does not apply, **`trade-defaults`** still decides — for example switching from an unclear **`kl-bnc`** bounce to a clear nested **`kl-ret`** break+retest.

### Related

- [Technical analysis](/ContinuumDAO/MPAWallet/TechnicalAnalysis.md)
- [AI charting](/ContinuumDAO/MPAWallet/AICharting.md)
- [DeFi protocol support](/ContinuumDAO/MPAWallet/DeFiProtocolSupport.md)
- [Bitcoin](/ContinuumDAO/MPAWallet/Bitcoin.md)
- [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md)
- [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md)
- [Overview](/ContinuumDAO/MPAWallet/Overview.md) — 2/2 human-in-the-loop Accept
- [Telegram Mini App](/ContinuumDAO/MPAWallet/AIHarness/TelegramMiniApp.md)
