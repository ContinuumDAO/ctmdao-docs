## AI-managed governance and Forum

**ContinuumDAO is an AI-first DAO managed by both people and AI agents.** veCTM holders — including MPA wallet operators who attach voting power to their node — govern the protocol through the [Forum](https://forum.continuumdao.org/), on-chain proposals, and votes. Agents can research, draft, discuss, and recommend votes; **humans stay in the loop** through MPC threshold signing — an agent cannot move treasury funds or cast an on-chain vote alone unless your Group agrees.

Your MPA wallet agent uses the built-in **`continuum`** MCP (ContinuumDAO protocol tools + Forum API) and optional **skills** under **AI Agent → Skills**. Manual governance in the browser ([Governance app](https://app.continuumdao.org/governance)) is unchanged.

**Prerequisites:** [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md), enough **veCTM voting power** on your KeyGen ([veCTM on your node](/ContinuumDAO/MPAWallet/VeCTMOnYourNode.md)), and **Linea** in [Chain management](/ContinuumDAO/MPAWallet/ChainManagement.md).

Human background: [How To Write a Proposal](/ContinuumDAO/Governance/HowToWriteAProposal.md), [Creating an on-chain Proposal](/ContinuumDAO/Governance/CreatingProposal.md), [Constitution](/ContinuumDAO/Governance/Constitution.md).

Forum and governance tools on **`continuum`**: [MCP servers — Forum and governance](/ContinuumDAO/MPAWallet/AIHarness/McpServers.md#forum-and-governance-on-continuum).

---

### Ask in Agent chat

Describe what you want in plain language — for example:

- “What new proposals are there?” / “What’s voting on ContinuumDAO right now?”
- “Summarize the newest governance proposals I should look at.”
- “Read Forum thread 123 and summarize the debate.”
- “Post this as an Idea in Ideas & Suggestions.”
- “Help me draft a Treasury proposal and open the Governance thread.”
- “Explain proposal 42 and recommend how I should vote.”
- “Vote Against on proposal 42 and say why in Thoughts.”

The agent **discovers and loads** the ContinuumDAO integration when needed (same pattern as [DeFi protocol support](/ContinuumDAO/MPAWallet/DeFiProtocolSupport.md)). You do not run any manual “load protocol” step yourself.

Every on-chain action still requires your Group **threshold** — the agent prepares sign requests; peers **Accept** on **Join**; the originator **Execute**s. See [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md).

For multi-step research before action, use [Plan mode](/ContinuumDAO/MPAWallet/AIHarness/PlanMode.md) (**DAO** starter) — draft a plan, then **Execute in KeyGen** when ready.

---

### Forum — read, reply, and react

The agent can use [forum.continuumdao.org](https://forum.continuumdao.org/) on your behalf through **`continuum`** Forum tools.

#### Reading (no sign-in)

| What you can ask | What the agent does |
|------------------|---------------------|
| Open a thread by URL or id | Fetches the opening post and replies (paginated) |
| Read one post | Fetches that post by id |
| Search or recent posts | Searches keywords or lists recent Forum activity |
| Unread while signed in | Lists NodeBB unread threads; mark read/unread on request |

Reading does **not** need Forum sign-in. The agent presents composer **markdown** when available (not raw HTML).

#### Writing (sign-in required)

To **create a topic**, **reply**, or **react** with emojis, your KeyGen must **sign in to the Forum** first — see [Signing in to the Forum](#signing-in-to-the-forum) below.

| Action | Plain-language examples |
|--------|-------------------------|
| **Idea** (early feedback) | “Post this as an Idea in Ideas & Suggestions.” |
| **Governance thread** (before on-chain) | “Open a Treasury Governance thread with this draft.” |
| **Reply** | “Reply on that thread supporting the budget section.” |
| **React** | “React with +1 on the latest reply.” |

Sign out when finished — only through the agent, not the Compose screen.

---

### Ideas vs formal proposals

| Path | Forum | On-chain propose? |
|------|-------|-------------------|
| **Idea / early feedback** | [Ideas & Suggestions](https://forum.continuumdao.org/category/2/ideas-suggestions) | **No** — discussion only |
| **Formal proposal** | Matching **Governance** category, then on-chain submit | **Yes** — after Temperature Check / vote rules |

Ideas are for brainstorming. A formal on-chain proposal must link to a dedicated **Governance** thread — not an Ideas post, the Forum homepage, or a blank link.

| Proposal type | Governance category | Typical on-chain vote |
|---------------|---------------------|------------------------|
| Decision | Decision | Bravo (For / Against / Abstain) |
| Election | Election | Delta (multi-option + NOTA) |
| Treasury | Treasury | Bravo |
| Constitution | Constitution | Bravo (include full revised Constitution text) |
| Admin | Admin | Bravo |

---

### Signing in to the Forum

Before the agent can **post** on the Forum, your KeyGen must **sign in**. That is an **off-chain signature**, not an on-chain transaction — same [compose sign-request flow](/ContinuumDAO/MPAWallet/ComposeTransactionFlow.md#eip-712-typed-data-signatures) as other typed-data signatures: peers **Accept** on Join, then you **Execute**.

1. Your KeyGen needs enough **veCTM voting power** (from a lock or from veCTM attached to the node).
2. Ask the agent to sign in — for example, “Sign me in to the Forum so I can post.”
3. When finished, ask the agent to sign out.

**Unread in chat:** Ask to list unread threads or mark threads read. Say clearly if you mean **all** unread posts.

---

### Drafting a proposal with the agent

Ask the agent to **help you compose** a proposal — for example, “Walk me through a Treasury proposal to fund X.” Enable skill **`continuum-dao-compose-proposal`** under **AI Agent → Skills** (interactive only — **never** on cron).

Typical flow:

1. **Classify Idea vs proposal** — early feedback → Idea only; ready for Temperature Check + vote → Governance thread + on-chain path.
2. **Interview** — the agent asks for title, type, motivation, scope, on-chain actions, and Treasury fields (budget, timeline, success criteria) per [How To Write a Proposal](/ContinuumDAO/Governance/HowToWriteAProposal.md).
3. **Standards check** — with **`continuum-dao-proposal-standards`**, the agent loads Constitution **Mission & Vision**, **Proposals and Voting** (canonical types), and the how-to format from [docs via MCP](/ContinuumDAO/MPAWallet/AIHarness/McpServers.md#official-docs-on-continuum-search_continuum_docs). It flags:
   - **Red** — does not align with Mission/Vision; wrong proposal type; Ideas URL used as a formal proposal; Constitution change without full new text.
   - **Amber** — missing format sections (Abstract, Motivation, Scope, Treasury budget/timeline, and similar).
4. **Forum post first** — for a formal proposal, the agent opens the matching **Governance** thread (after sign-in). Shortcomings can be **appended to the Forum post** if you insist on proceeding anyway.
5. **On-chain submit** — only after a valid Governance thread URL exists: Accept on Join → Execute → register on the [Governance app](https://app.continuumdao.org/governance).

Full step order: [Submitting an on-chain proposal](#submitting-an-on-chain-proposal) below.

**Vote power to propose:** at least **1000 veCTM** or **0.1% of total voting power**, whichever is higher.

---

### What’s new and what’s voting

You do not need to open the [Governance app](https://app.continuumdao.org/governance) first. Ask in Agent chat (or Telegram) — for example:

- “What new proposals are there?”
- “Which proposals are **Active** and need a vote?”
- “Anything new since last week?”

The agent checks **live on-chain state** (not the backend alone), lists proposals in the current vote window, and can summarize each one — title, type, proposer, Forum link, and what the on-chain actions would do. From there, ask it to **explain** one id in depth or **recommend a vote** ([below](#understanding-proposals-and-vote-recommendations)).

Enable skill **`continuum-dao-proposals`** if the agent needs extra guidance on how to present multi-action briefings.

---

### Understanding proposals and vote recommendations

Ask the agent to **explain** live or past proposals and **recommend a vote** — for example, “Should I vote For on proposal 7?” Enable **`continuum-dao-proposals`** and **`continuum-dao-vote-policy`** (and **`continuum-dao-proposal-standards`** for Constitution checks).

The agent will:

1. **Fetch on-chain detail** — actions, proposer, state, Bravo vs Delta shape.
2. **Read the Forum thread** linked from the proposal (when present) — opening post, section/category, reply count, notable discussion.
3. **Run the standards checklist** — Vision/Mission fit, type vs Forum section, required format; cite every red and amber item.
4. **Apply your vote policy** — edit the `votePolicy:` block in the **`continuum-dao-vote-policy`** skill on your node (trusted/blocked proposers, blocked types, treasury limits, denied function selectors, scam heuristics, default action). Example template: [mpc-config vote policy cron example](https://github.com/ContinuumDAO/mpc-config/blob/main/agent_llm_config.defaults/cron/continuum_dao_vote_policy.example.md).
5. **Recommend** For, Against, Abstain, NOTA (Delta), or skip — with reasons tied to policy and standards. It **waits for your confirmation** before preparing a vote sign request.

Good formatting alone does **not** mean the agent recommends For — policy and substance decide.

**Delegation:** if voting power was delegated away from the KeyGen, return it before propose/vote ([veCTM on your node](/ContinuumDAO/MPAWallet/VeCTMOnYourNode.md#managing-voting-power)).

---

### Submitting an on-chain proposal

1. **Sign in to the Forum** ([above](#signing-in-to-the-forum)) if the agent will create the thread.
2. **Open a Governance thread** in the category matching the proposal type. Keep that thread’s link.
3. **Ask the agent to submit** — title, on-chain actions, Forum link; Bravo for most types, **Delta** for elections/multi-option.
4. **Accept on Join, then Execute.**
5. **Register with the Governance app** after confirmation — ask the agent to retry registration if the API fails; the on-chain proposal is not undone.

**Stay in the discussion:** Once your Forum thread is live, you can get **new replies in Telegram** and **reply from there** too — see [Telegram — Operator notifications](/ContinuumDAO/MPAWallet/AIHarness/TelegramMiniApp.md#operator-notifications-and-cron). On-chain steps still need **Accept** on Join on your node.

**After a vote passes:** Execute from **Succeeded** — no separate queue step.

---

### Governance skills (AI Agent → Skills)

Load per chat or enable **Initial load** only where noted. All are under **`agent_llm_config/Skills/`** in [mpc-config](https://github.com/ContinuumDAO/mpc-config/tree/main/agent_llm_config.defaults/Skills).

| Skill | Use | Cron? |
|-------|-----|-------|
| **`continuum-dao-proposals`** | List/explain live proposals; read Forum threads, posts, search | Read-only in cron |
| **`continuum-dao-proposal-standards`** | Constitution Vision/Mission + type-fit + format checklist | Yes (with vote jobs) |
| **`continuum-dao-vote-policy`** | Vote recommendation; `votePolicy` YAML; governor Join rules | Yes |
| **`continuum-dao-compose-proposal`** | Interactive draft → Idea or Governance thread → on-chain | **Never** |
| **`continuum-dao-forum-inbox`** | Signed-in unread list; mark read/unread in chat | Interactive only |
| **`continuum-dao-forum-replies`** | Watch for replies to **your** posts (Telegram cron) | Read-only cron |

Also useful: **`execution-policy`** (multi-sign confirmation), **`scheduled-automation`** (cron behaviour).

---

### Optional automation (Cron)

Under **AI Agent → Cron**, add jobs from the repository catalog. Governance-related jobs (default **disabled**):

| Job | Purpose |
|-----|---------|
| **`appraise-and-vote-proposals`** | Appraise **Active** proposals; cast votes matching **`votePolicy`**; optional **`telegramNotify`**. Vote only — never propose. |
| **`conditional-accept-governance-vote`** | **Join** tab: Accept/Reject **governor** sign requests (votes only if stance matches policy; **always Reject** propose/execute/cancel). Not the trade Accept job. |
| **`notify-forum-replies`** | Read-only: new replies to your Forum posts → Telegram. Set **`forumWatch.forumUsername`**. |

Setup examples: [forum replies cron](https://github.com/ContinuumDAO/mpc-config/blob/main/agent_llm_config.defaults/cron/forum_replies_cron.example.md), [vote policy cron](https://github.com/ContinuumDAO/mpc-config/blob/main/agent_llm_config.defaults/cron/continuum_dao_vote_policy.example.md).

**Safety:** cron may **vote** or **governor Join Accept/Reject** per policy — it must **not** load **`continuum-dao-compose-proposal`** or create proposals unattended unless you explicitly designed that.

Details: [Telegram — Operator notifications](/ContinuumDAO/MPAWallet/AIHarness/TelegramMiniApp.md#operator-notifications-and-cron).

---

### veCTM and billing

[veCTM on your node](/ContinuumDAO/MPAWallet/VeCTMOnYourNode.md) — lock, attach, delegation, detach through governance.

[MPA billing](/ContinuumDAO/MPAWallet/MpaBilling.md) — withdraw authority and Linea registration before billable governance signatures count correctly.

---

### Related

- [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md)
- [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md)
- [MCP servers](/ContinuumDAO/MPAWallet/AIHarness/McpServers.md)
- [Plan mode](/ContinuumDAO/MPAWallet/AIHarness/PlanMode.md)
- [How To Write a Proposal](/ContinuumDAO/Governance/HowToWriteAProposal.md)
- mpc-config skills: [Skills README](https://github.com/ContinuumDAO/mpc-config/blob/main/agent_llm_config.defaults/Skills/README.md)
