## Plan mode

**Plan mode** is for work that takes several steps — research a market, compare yield options, sketch a trade idea, review a portfolio, or explore a governance topic — before anything runs on your wallet.

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
| **DAO** | “Read live proposals and Forum threads; prepare a vote recommendation.” |
| **Custom** | Anything multi-step you want written down before action |

While you are still drafting, nothing is sent to your KeyGen peers. Execution only happens after you approve **Execute in KeyGen**.

---

### How to use it

1. **Start a plan** — in Agent chat, choose **New plan** and pick a starter (market, yield, research, portfolio, DAO, or custom). On Telegram you can start a plan from **New plan** beside **New chat**.
2. **Describe the goal** — talk through what you want in plain language. The agent turns that into a readable plan you can review (**View plan** in the UI).
3. **Refine** — ask for changes, extra research, or clearer risks until the plan matches what you want.
4. **Execute in KeyGen** — when ready, run the plan on your preferred KeyGen. Other nodes in the Group see it on their KeyGen channel and can Accept or Reject any wallet actions the plan triggers.

Set **preferred KeyGen** under **AI Agent → Provider** (or Settings) before executing so the plan posts to the right wallet.

Any on-chain step still goes through the normal [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md). Plan mode does not bypass your threshold.

---

### After a plan runs

- **Continue the conversation** — use **After orchestration → Continue in Orchestrator chat** to follow up on the same run (for example adjust gas, sign, or schedule the next step).
- **Plan follow-on** — start a **new** plan that builds on an earlier run without re-explaining everything from scratch.
- **Find past runs** — **AI Agent → Conversations** lists orchestrator threads titled **`[Orchestrator] …`**.

For DAO-related plans, see [Agent governance and Forum](/ContinuumDAO/MPAWallet/AIHarness/AgentGovernance.md). For charts and data sources during research plans, see [AI charting](/ContinuumDAO/MPAWallet/AICharting.md).

---

### Related

- [AI harness overview](/ContinuumDAO/MPAWallet/AIHarness/Overview.md)
- [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md)
- [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md)
- [Agent governance and Forum](/ContinuumDAO/MPAWallet/AIHarness/AgentGovernance.md)
- [Telegram Mini App](/ContinuumDAO/MPAWallet/AIHarness/TelegramMiniApp.md)
