## Plan mode

**Plan mode** is for work that takes several steps — research a market, compare yield options, sketch a trade idea, design a hedge from live inventory, review a portfolio, or explore a governance topic — before anything runs on your wallet.

You and the agent **draft the plan together** in a private Plan chat. When you are happy with it, you **Execute in KeyGen** so your Group can see the proposal on the KeyGen channel and agree (or reject) like any other multi-sign flow.

Plan mode is optional. You need a configured [AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md) (LLM, preferred KeyGen, and any MCP servers the plan will use).

---

### Plan mode vs ordinary chat

You can ask the agent to do almost anything in **ordinary Agent chat** — including work that spans **multiple sessions**, each with its **own context**. For example, you might say “research this today and we’ll pick it up tomorrow in a new chat,” or ask the agent to split a large task into separate threads. That is flexible, but the steps live mainly in conversation history until you act on them.

**Plan mode is more structured.** You and the agent build a **Plan document** — a readable outline you can open with **View plan** — and you **agree on it before execution**. Refinement happens against that document, not only as back-and-forth messages. When you **Execute in KeyGen**, peers see a defined proposal tied to that plan, not an open-ended chat thread.

Use ordinary chat for quick questions and one-off actions. Use Plan mode when you want multi-step work **written down and reviewed** before anything hits your wallet.

---

### What it is good for

| Plan type | Examples |
|-----------|----------|
| **Market / trade** | “Research ETH perps and draft a trade suggestion with risk notes.” |
| **Yield** | “Compare lending venues for USDC on Linea and outline steps.” |
| **Research** | “Summarize recent news and chart context before we decide.” |
| **Portfolio** | “Review positions and suggest rebalancing themes.” |
| **Hedging strategies** | “Keep my ETH; cut crash risk for two weeks without selling.” |
| **DAO** | “Read live proposals and Forum threads; prepare a vote recommendation.” |
| **Create a plugin** | “Write a plugin for this node, try it here, and leave publishing for later.” |
| **Custom** | Anything multi-step you want written down before action |

While you are still drafting, nothing is sent to your KeyGen peers. Execution only happens after you approve **Execute in KeyGen**.

---

### How to use it

1. **Start a plan** — in Agent chat, choose **New plan** and pick a starter (market, yield, research, portfolio, **Hedging strategies**, DAO, **Create a plugin**, or custom). On Telegram, **New plan** beside **New chat** offers the same modes.
2. **Describe the goal** — talk through what you want in plain language. The agent turns that into a readable plan you can review (**View plan** in the UI).
3. **Refine** — ask for changes, extra research, or clearer risks until the plan matches what you want.
4. **Execute plan** — when ready, run the plan on your preferred KeyGen. Other nodes in the Group see it on their KeyGen channel and can Accept or Reject any wallet actions the plan triggers. **Create a plugin** is the exception: Execute writes the plugin on this node and does not post it to KeyGen.

Set **preferred KeyGen** under **AI Agent → Provider** (or Settings) before executing so the plan posts to the right wallet.

Any on-chain step still goes through the normal [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md). Plan mode does not bypass your threshold.

---

### Hedging strategies

Use **Hedging strategies** when you want to cut directional risk **without dumping core coins**. The agent interviews first (what to keep, what to cut, ratio, horizon, budget, venue, unwind), then writes the plan from **live MPA inventory** — spot, LP (Uniswap / Curve / Aerodrome / Pendle), lending, Morpho/Euler Earn, Pendle PT/YT, open perps, or Derive options.

Typical overlays: isolated perp short, Derive put/collar when you need a defined max loss, a stable sleeve, a basis book, a hedged LP, or Pendle PT/YT. Morpho Earn and Euler curated Earn (including RWA / reinsurance vaults) are **diversification** and opt-in — default is crypto-lending only.

**First Execute is research only** (inventory, venue, protocol risk). Compose / MultiSign is a **follow-on** or **Continue in Orchestrator**. After the hedge is live, the **`hedging-monitor`** skill watches unwind triggers (cron can Telegram you); it does **not** auto-Accept. Skills: **`hedging-trade`** (design) and **`hedging-monitor`** (watch + unwind) under **AI Agent → Skills**.

---

### Create a plugin

Use **Create a plugin** when you want a plugin written for this node, especially one with a program or a library import. A plugin that is only instructions and a `/` command can still be written in ordinary chat. If that chat finds the plugin needs a library or a program, it sends you here.

The agent asks what the plugin should do, in your own words. It does not assume a market, a chart, or a protocol. You confirm a short hyphenated name. It asks once what the plugin must not do. If you skip that, the plan records the skip and continues.

Your words stay under **Goal**. Separately, the agent drafts one or two sentences under **What this plugin should do**. That is the description people would see if you later publish the plugin, and you can edit it. The plugin uses this node’s preferred KeyGen address unless your goal names a different address.

A specialist then looks up the library functions the plugin needs and returns only the questions still open. You answer those one at a time.

Before you execute, the plan includes a **Smoke check**: one or two sample calls. Each call names the tool, the arguments, and the fields the result must contain. Execute freezes that section.

**Execute plan** writes the plugin on this node and runs that smoke check. Nothing is posted to the KeyGen channel. The plugin stays off until you review its permissions and turn it on. When the run has finished, **Publish follow-on** is available. Publishing is refused unless this KeyGen’s group has veCTM. See [Plugins](/ContinuumDAO/MPAWallet/AIHarness/Plugins.md).

---

### After a plan runs

- **Continue the conversation** — use **After orchestration → Continue in Orchestrator chat** to follow up on the same run (for example adjust gas, sign, or schedule the next step).
- **Plan follow-on** — start a **new** plan that builds on an earlier run without re-explaining everything from scratch.
- **Find past runs** — **AI Agent → Conversations** lists orchestrator threads titled **`[Orchestrator] …`**.

For DAO-related plans, see [AI-managed governance](/ContinuumDAO/MPAWallet/AIHarness/AgentGovernance.md). For charts and data sources during research plans, see [AI charting](/ContinuumDAO/MPAWallet/AICharting.md). For installing and publishing the plugin this plan writes, see [Plugins](/ContinuumDAO/MPAWallet/AIHarness/Plugins.md).

---

### For AI agents — create a plugin

`search_continuum_docs` (`create a plugin` / `plan mode plugin`) then `get_continuum_doc` path `ContinuumDAO/MPAWallet/AIHarness/PlanMode` section `for-ai-agents-create-a-plugin`.

Plan mode id is `plugin`. The starter is **New plan → Create a plugin**.

In ordinary chat, a skill and a prompt with no library import and no entrypoint stay in that chat: `agent_create_plugin`, then install that local path, then `agent_smoke_plugin`. If the plugin needs `find_library_function`, a library export, or an entrypoint import, stop. Do not call `find_library_function` there. Tell the operator to open this plan. The host loads `mpa-plugin-author` and `mpa-plugin-review`. It loads `mpa-plugin-libraries` when the ask names DeFi, an indicator, or an import.

In the plan thread, do not call `find_library_function`. Spawn one specialist with `agent_spawn_sub_agent` (skills `mpa-plugin-libraries` and `mpa-plugin-author`) and join it. Ask only the open questions it returns, one at a time. A second spawn is allowed only after those answers, and only if the card is still incomplete. Do not run a parallel wave.

Write the operator’s words once under **Goal**. Draft **What this plugin should do** as one or two sentences they can edit. Do not copy Goal into that section. The name line starts with `- Name:`. Must-not is its own line. If they do not answer the must-not question, write `Must not: skipped` and do not ask again. Do not paste an address into the plan. Unless Goal names a different address, the entrypoint calls `pi.preferredKeyGenAddress()`. Do not import `@continuumdao/continuum-node-sdk`.

Before Execute, write `## Smoke check` with one or two calls. Each call is **Tool**, **Arguments** as one JSON object, and **Expect** as the field names that must appear in the result. Use the tool name from the card. Leave no placeholders. Execute freezes that section. The author specialist must not edit it.

Execute writes the plugin on this node and smokes the locked check. It does not post to KeyGen, enable the plugin, or publish. `agent_smoke_plugin` runs the files in `user_folder/plugins/<name>`. A missing Expect field is not finished: edit the plugin and smoke again with the locked Tool and Arguments. A missing permission or Variable is not a code edit. The smoke tool asks the operator, stores each Variable without showing the value, and smokes again. A decline stops the plan. The plugin stays off. Show the `mpa-plugin-review` recommendation and wait.

**Publish follow-on** appears when the plan status is complete. Publish only if the operator asks and the KeyGen group has veCTM.

---

### Related

- [Plugins](/ContinuumDAO/MPAWallet/AIHarness/Plugins.md)
- [AI harness overview](/ContinuumDAO/MPAWallet/AIHarness/Overview.md)
- [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md)
- [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md)
- [AI-managed governance](/ContinuumDAO/MPAWallet/AIHarness/AgentGovernance.md)
- [Telegram Mini App](/ContinuumDAO/MPAWallet/AIHarness/TelegramMiniApp.md)
