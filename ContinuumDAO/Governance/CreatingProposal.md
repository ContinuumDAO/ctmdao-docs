# Creating a Proposal on ContinuumDAO

This guide covers:

- **Proposal types** and **configurations** (Bravo vs Delta)
- How to **create** a proposal in the [Governance app](https://app.continuumdao.org/governance/create-proposal)
- How to share the proposal on the forum
- How to **vote** and **execute** proposals

All governance actions — **create**, **vote**, and **execute** — are available at [app.continuumdao.org/governance](https://app.continuumdao.org/governance). The create flow is implemented in the open-source [continuumdao-app](https://github.com/ContinuumDAO/continuumdao-app); on-chain proposals are submitted to the **ContinuumDAO Governor** contract ([veCTM](https://github.com/ContinuumDAO/vectm) codebase).

Before you start, read [How to Write a Proposal](/ContinuumDAO/Governance/HowToWriteAProposal.md) for the discussion phase, proposal template, and vote-power requirements.

## Proposal types

When you create a proposal, choose the **type** that best matches its purpose (as defined in the [Constitution](/ContinuumDAO/Governance/Constitution.md)):

| Type | Use for | Examples |
| ---- | ------- | -------- |
| **Decision** | General governance decisions; may or may not include on-chain actions | Join RAKDAO; replace a Committee member; add or remove a chain from C3Caller |
| **Election** | Multi-choice elections | Committee elections |
| **Treasury** | Transfers or spending from the DAO Treasury | Core contributor funding; grants; operational budgets |
| **Constitution** | Changes to the ContinuumDAO Constitution | Amend Mission & Vision, governance rules, or procedures — must include the full revised Constitution text if the document changes |
| **Admin** | Protocol and contract administration (`onlyGov`) | Proxy upgrades; re-deploy core contracts; governor or protocol parameter changes |

<img src="/_media/governance-proposal-type.png" alt=""/>

These types label proposals in the Governance app and on the [Forum](https://forum.continuumdao.org/). Match your forum post category to the subject (e.g. [Proposals - Treasury](https://forum.continuumdao.org/category/7/proposals-treasury), [Proposals - Constitution](https://forum.continuumdao.org/category/6/proposals-constitution)).

## Proposal configurations

Choose how votes are counted:

### Bravo (For / Against / Abstain)

Standard **yes / no / abstain** voting on a **single set of on-chain actions**. If the proposal passes, those actions execute.

Use Bravo for most **Treasury**, **Admin**, and **Decision** proposals with one clear outcome.

<img src="/_media/governance-proposal-config-bravo.png" alt=""/>

Each **action** specifies:

- **Network** — target chain (Governor / C3Caller network)
- **Target** — contract address (or recipient for a value transfer)
- **Value** — native token sent with the call (`0` if none)
- **Signature** — function selector, e.g. `transfer(address,uint256)` (ABI auto-fetch is available in the app)
- **Inputs** — typed parameters for the call

Use **Validate** / **Simulate** on each action before submitting. The app encodes calldata and calls `propose(targets, values, calldatas, description)` on the Governor.

### Delta (Multiple-option)

**Weighted multi-option** voting: voters distribute vote power across **options** using coefficients. Each option has a **label** and its own list of **actions**. You set **number of options** and **number of winners** (winners ≥ 1 and &lt; options).

Use Delta for **Elections** and any vote where several mutually exclusive (or ranked) outcomes each imply different on-chain execution — e.g. three Treasury allocation plans, or Committee slates.

<img src="/_media/governance-proposal-config-delta.png" alt=""/>

Delta proposals use the same `propose` interface; the first slot carries **metadata** (option count, winner count, action index boundaries) and options are flattened into the targets/values/calldatas arrays. See [propose_instructions.md](https://github.com/ContinuumDAO/continuumdao-app/blob/main/propose_instructions.md) in continuumdao-app for encoding details.

## Create a proposal (step by step)

1. Open **[Create Proposal](https://app.continuumdao.org/governance/create-proposal)**.

<img src="/_media/governance-create-proposal-page.png" alt=""/>

2. **Connect your wallet** — the address must hold at least **0.1% of total vote power** or **1000 veCTM vote power**, whichever is higher (including delegation).

3. **Title** (up to **128** characters) — accurate summary; **do not** include the proposal number (the app assigns enumeration).

4. **Description** (up to **1024** characters) — full context: motivation, scope, off-chain outcomes, and what on-chain actions do.

5. **Proposal type** — Decision, Election, Treasury, Constitution, or Admin (see table above).

6. **Forum link** — URL to the Forum discussion for this proposal (required). Start discussion in [Ideas & Suggestions](https://forum.continuumdao.org/category/2/ideas-suggestions) before submitting. For **agent-assisted** flows, open a **Governance** thread first (not an Ideas URL), then use that link on-chain. See [AI-managed governance](/ContinuumDAO/MPAWallet/AIHarness/AgentGovernance.md).

7. **Proposal configuration** — **Bravo** or **Delta** (see above).

8. **Proposal actions** — add one or more actions (Bravo) or configure each option’s actions (Delta). For Delta, set **No. of Options** and **No. of Winners**, then paginate between options and add actions per option.

9. Click **Propose & Submit** — confirm the on-chain transaction (gas from your wallet). The app registers the proposal with the backend using the returned **on-chain proposal ID**.

Once confirmed, the proposal appears on [Governance](https://app.continuumdao.org/governance). It enters **Temperature Check** (5 days), then **Formal Vote** (10 days).

### Example — Treasury transfer (Bravo)

Transfer **CTM** from the Treasury to a recipient:

| Field | Example |
| ----- | ------- |
| Network | Linea (or chain where CTM/Treasury lives) |
| Target | CTM token contract |
| Value | `0` |
| Signature | `transfer(address,uint256)` |
| Inputs | recipient address; amount (with unit, e.g. Ether) |

Validate/simulate in the app, then submit.

## Share the proposal

Post on the [Forum](https://forum.continuumdao.org/) with:

- Proposal **title** and **type**
- Link to the proposal on [app.continuumdao.org/governance](https://app.continuumdao.org/governance)
- Full proposal text from the [template](/ContinuumDAO/Governance/HowToWriteAProposal.md)

A Committee member can post on your behalf if needed. Community discussion continues during Temperature Check; Formal Vote opens automatically after 5 days.

## Vote and execute

Open the [Governance app](https://app.continuumdao.org/governance), connect the wallet that holds veCTM (or delegated power), and open the proposal.

### Bravo proposals

Vote **For**, **Against**, or **Abstain**.

*Screenshot placeholder — add `/_media/governance-vote-bravo.png` when ready (Bravo vote For/Against/Abstain).*

### Delta proposals

Allocate vote power across options with **coefficients** (weighted split). The app builds the `castVoteWithReasonAndParams` payload.

*Screenshot placeholder — add `/_media/governance-vote-delta.png` when ready (Delta multi-option weighted vote).*

If a proposal **passes**, anyone can **Execute** it from the same app once voting completes (or sooner if Super Quorum is reached). Execution runs the winning on-chain actions automatically.
