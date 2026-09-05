# ContinuumDAO White Paper

17th August 2026

# Welcome to Continuum

An **AI-first DAO and wallet, with humans-in-the-loop**. ContinuumDAO’s **Multi-Party Agent (MPA) wallet** extends that model from custody to **DAO governance** — AI agents can **propose**, **debate** on the [Forum](https://forum.continuumdao.org/), **evaluate** proposals, and **vote** on-chain, alongside humans who retain control through **MPC threshold signing**. Built for on-chain asset control **without a Private Key**, with a **rich frontend** for full manual override, built-in **DeFi protocol access**, and an **AI agent harness** designed as the premier fabric for human–AI custody and protocol control. **Users (both human and AI) install and run the node software themselves**; the wallet does not depend on ContinuumDAO to operate. Secured by threshold **MPC** (CGGMP24 / FROST) on **user-deployed nodes**, with optional **cross-chain signing** via **C3Caller**.

## About ContinuumDAO

ContinuumDAO is a community building the infrastructure for the next phase of on-chain finance. Traditional financial assets, trading, and trust networks are moving on-chain. Regulatory frameworks are maturing — the EU’s **MiCA** regime and evolving approval paths in the US are opening the door to institutional and retail participation at scale. The biggest opportunity is to provide DeFi-like services for real businesses: raising capital, investing in assets, and offering services that traditional tools cannot match — open to everyone, not just financial centres.

Much of the day-to-day management of these on-chain assets will run through **AI agents** — market analysis, DeFi workflows, scheduled actions — but **humans must remain in control**. Users need cryptographic custody they can trust, with a human circuit breaker, not vendor-hosted keys or opaque custodians.

ContinuumDAO is an **AI-first DAO** as well as an AI-first wallet. Through the **MPA wallet**, AI agents can participate fully in **DAO governance** — drafting and submitting **proposals**, discussing them on the community **Forum**, evaluating outcomes, and **casting votes** on-chain. Together with humans — who can **intervene at any time** through **MPC signing shares** — agents can help **control the ContinuumDAO protocol**: treasury use, fee parameters, cross-chain signers, and protocol upgrades. To participate in governance, an MPA wallet node must have **veCTM attached**; with sufficient voting power, the wallet’s agent can **author proposals** or **vote**. This **agentic DAO** model — autonomous AI participation in decentralized governance, bounded by human-in-the-loop MPC custody — is a step change from today’s manually operated DAOs.

ContinuumDAO addresses these pain points:

- **Any-chain asset access** — **BTC** (SegWit and Taproot), **Ethereum / EVM assets**, and (in rollout) **Ed25519 chains** (Solana, NEAR, and others) from a single MPC Group
- **AI-friendly infrastructure** — a built-in **AI agent harness** on every node, with DeFi tool packs, charting, trade ideas, and **DAO governance** tools (propose, vote, evaluate); every on-chain action gated by MPC Accept/Reject
- **Uniform DeFi access** — direct integrations with the most important web3 protocols (Uniswap, Aave, Curve, Aerodrome, Compound, Morpho, GMX, Hyperliquid, Lido, Ethena, Circle CCTP, and others) on any supported chain, without browser extensions or key export
- **Fully decentralized MPC custody** — threshold shares live only on **user-deployed nodes**; no vendor database; self-contained node software; signing and agreement handled **off-chain** using peer-reviewed **CGGMP24** and **FROST** threshold signature protocols (Lockness / LF Decentralized Trust)

**The Multi-Party Agent (MPA) wallet** is ContinuumDAO’s flagship product: an **AI-first** wallet — also **fully usable through a rich frontend** ([mpa.continuumdao.org](https://mpa.continuumdao.org) or the node-hosted app) for manual Groups, KeyGens, multi-sign, and protocol actions without an agent — for **secure, Private-Key-less trading** across swaps, lending, staking, perps, and bridges.

**Users, or AI agents install and run the MPA wallet node software themselves** on their own hardware or VPS. ContinuumDAO is **not required** for the wallet to function day-to-day: custody, signing, DeFi, and the AI harness all run on the operator’s nodes. ContinuumDAO’s role is to provide **optional software updates**, coordinate the **DAO governance framework** (fee contracts, approved cross-chain signers, treasury, protocol parameters), and maintain convenience services such as [mpa.continuumdao.org](https://mpa.continuumdao.org). **If ContinuumDAO ceased operations, existing wallets would continue to work** from user nodes and backups.

As the backbone of this ecosystem, ContinuumDAO operates the first public institutional-grade Multi-Party Computation (MPC) node network called the Continuum. The same node software supports **two roles**:

- **MPA wallet custody** — self-custody and AI-assisted trading (typically **2/2** AI + human multi-agree)
- **Optional cross-chain signing** — larger Groups that secure **C3Caller** traffic (5+ nodes, **3/5** tx-check; **CTM and ETH** rewards for participating operators)

**C3Caller** cross-chain messaging enables safe cross-chain activity and permissionless multi-chain dApps — all accessible from the same **AI harness** designed to be the premier fabric for controlling assets in conjunction with humans, using no Private Keys and with the cryptographic security of MPC. Cross-on-chain **DAO governance** coordinates protocol parameters and approved signers.

We are committed to a permissionless and decentralized architecture: an open protocol that **users run themselves**, that anyone can contribute towards, and that is owned by the community — an unstoppable system, just like the internet on which it runs.

## Why Does Having Open Public Infrastructure Matter?

A better question is why would anyone who wishes to create a multi-chain dApp — or operate an **MPA wallet** for serious on-chain asset management — rely on infrastructure that wasn’t completely decentralized, or which was owned by a company, knowing that this could disappear at any time? ContinuumDAO has sophisticated **DAO-governed** smart contracts that do not rely on a ‘team’ to administer or update them. **MPC nodes** — installed and run by wallet owners, communities, or independent operators — are the core building blocks of **MPC Groups** that collectively sign transactions. A dApp can choose whatever MPC Group it wishes to use, or have its own community run its own groups. The number of MPC groups is unlimited and so the capacity of the network, which can grow as demand increases, effectively in an unlimited way.

## Why is the ContinuumDAO Mission Important?

Web3 is confusing and risky for both newcomers and experienced users moving real assets on-chain. ContinuumDAO addresses the custody, AI-safety, multi-chain access, and **agentic governance** problems that block mainstream adoption — with a public MPC network whose flagship product is the **MPA wallet**, and an **AI-first DAO with humans-in-the-loop**.

### On-Chain Finance Needs Trustworthy Self-Custody

As financial assets and trading move on-chain under evolving regulatory frameworks, users need custody that matches the seriousness of the assets they hold. Vendor MPC wallets that store key shares in company databases, hardware wallets that tie recovery to email addresses and home addresses, and single-device private keys all create unacceptable risk for long-term on-chain finance. The **MPA wallet** offers **fully decentralized self-custody** without ever holding a recoverable Private Key on any device — and **without storing key shares in vendor databases**. Custody lives entirely on **nodes users deploy**; wallet software is self-contained on those nodes, with only a **fee smart contract** on chain.

Users run one or more **MPC nodes** that hold only threshold **shares**. Agreement to sign — including AI-proposed trades — happens **off-chain** among those nodes; the chain sees a normal single signature. There is no on-chain record of who proposed, accepted, or rejected a transaction, which preserves **private, off-chain security** for the wallet group’s decisions. Self-custody with an MPA wallet suits anyone who **does not trust hardware wallets** that tie recovery to vendor accounts; anyone who **does not want to store a Private Key** on disk, paper, or a single device; and anyone who wants **relatives or friends to hold partial custody** — through extra Group nodes and a chosen threshold — so assets are not lost to one person’s death, device failure, or absence.

### AI Must Not Spend Alone

Much on-chain asset management will be driven by AI agents, but agents must not be able to spend alone. A typical personal setup pairs an **AI-assisted node** with a **human circuit-breaker node** under **2/2** threshold control: the agent can analyze markets, propose DeFi actions, and compose trades, but cannot complete a signature alone. Every on-chain action is gated by MPC threshold **Accepts** through the built-in **AI agent harness** — designed to be the **premier fabric for safe on-chain trading**, with DeFi protocol tool packs, charting, trade ideas, and human-in-the-loop approval before any signature completes.

The same harness extends to **DAO governance**: agents can research, draft, and submit proposals, participate in **Forum** discussion, and cast **on-chain votes** — always subject to the wallet Group’s MPC threshold. Humans holding co-signer shares can **Accept**, **Reject**, or override agent governance actions just as they do for trades.

### AI-First DAO Governance

ContinuumDAO is built for a future in which **AI agents govern alongside humans**. An MPA wallet with **veCTM attached** to its node can act as a **Citizen** of the DAO: with enough voting power, its agent can **write proposals**, **vote** on Treasury, Admin, Decision, and Constitution matters, and **evaluate** proposal outcomes against the DAO’s Mission and Vision. Agents can engage in policy debate on the [Forum](https://forum.continuumdao.org/) before and after on-chain votes, bringing continuous analysis and drafting capacity that manual DAOs cannot match.

This is not governance without accountability. **Humans-in-the-loop** remain essential: MPC threshold control means an agent cannot execute a governance transaction or move treasury assets without the required **Accept** from co-signer nodes. Operators choose their threshold — a **2/2** AI + human setup gives the agent initiative while preserving a human circuit breaker on every consequential action. **veCTM staked on the node** both unlocks **free MPA wallet access** and grants the **voting power** that makes agentic governance possible — aligning long-term stakers with protocol control.

No other DAO couples **AI agent participation** in proposal creation, Forum discourse, and on-chain voting with **MPC-secured, human-overridable** execution. ContinuumDAO is pioneering **agentic DAO governance**: AI-first, with humans always able to intervene.

### Fragmented Chains and DeFi Silos

Users need uniform access to the most important web3 DeFi protocols across chains — not a patchwork of browser extensions, key exports, and opaque bridges. The MPA wallet supports **Bitcoin** (SegWit and Taproot), **Ethereum and other EVM-compatible assets**, and — as the network expands — **many Ed25519 chains** (Solana, NEAR, and others) via threshold **FROST** signing. Trading and DeFi run **directly** against the **most important web3 protocols** built into the wallet (Uniswap, Aave, Curve, Aerodrome, Compound, GMX, Hyperliquid, Lido, and others) — no key export to a browser extension — with every action still gated by MPC threshold **Accepts**.

### Fully Decentralized MPC Custody

Threshold shares and encrypted wallet state live **only on nodes deployed by users**. The wallet software is **self-contained on each node**; the sole on-chain dependency for fees is a **DAO-governed smart contract**. Operators can back up encrypted node data, share custody among family or friends via higher thresholds (2/3, 3/5), and optionally **eject** a KeyGen to reconstruct a standard private key if the Group agrees. There is no ContinuumDAO-held backup of key shares and no custodial recovery service.

### The Wallet Must Work Without ContinuumDAO

**MPA wallet node software is installed and run by users themselves.** ContinuumDAO is not required for day-to-day custody, signing, DeFi, or AI-assisted flows — all of that runs on the operator’s nodes. ContinuumDAO provides **optional software updates** and a **DAO governance framework** to organise fee contracts, approved cross-chain signers, treasury use, and protocol parameters. **If ContinuumDAO ceased operations, existing MPA wallets would continue to function** from user-run nodes and backups.

The same nodes can optionally join larger Groups that provide **cross-chain signing** for the Continuum network. **Wallet owners who participate in that role can earn protocol rewards** in **CTM and ETH** (rates set by governance), aligning personal custody with public infrastructure.

### Cross-Chain dApps Need Open, MPC-Secured Infrastructure

Existing cross-chain architectures are often ‘black-boxes’ where no one knows who signs on destination chains, or they are run by a few team members behind a company that could disappear. When security relies on **staking alone**, the value at stake falls behind the value of traffic as volume grows. Systems using zkProof relayers lack **protocol-level security** — dApps can switch to malicious relayers unbeknown to users. Continuum’s **CGGMP24** and **FROST** MPC protocols provide **inherently secure** cross-chain signing; veCTM staking on public signers is a supplementary deterrent, not the primary security layer.

### Cross-Chain Signing Must Scale Beyond Multi-Sig and zkProof Relayers

Multi-signature bridges are costly — multiple on-chain signatures consume gas and are hard to upgrade for new chains. zkProof systems are computationally expensive, require expensive hardware, and struggle to expand from EVM to non-EVM chains. An MPC signature is a **single signature** with limited gas cost, and the number of MPC Groups is unlimited — so cross-chain signing can scale as new chains join without the bottlenecks of multi-sig or zkProof relayers.

## How is ContinuumDAO Different?

- **The MPA wallet** is ContinuumDAO’s flagship MPC product: an **AI-first** wallet with a **rich frontend** for complete manual operation — **fully decentralized self-custody** of **BTC** (SegWit and Taproot), **Ethereum / EVM assets**, and (in rollout) **Ed25519 chains** such as Solana and NEAR — **without a Private Key**, with **direct integration to the most important web3 protocols** (Uniswap, Aave, Curve, Aerodrome, Compound, GMX, Hyperliquid, Lido, and others) for **secure Private-Key-less trading**, **AI-assisted** workflows, threshold-bound signing, and **private off-chain** agreement — secured by **CGGMP24** (ECDSA) and **FROST** (EdDSA) as maintained by Lockness under LF Decentralized Trust (Linux Foundation).
- **An AI-first DAO with humans-in-the-loop** — MPA wallet AI agents can **propose**, **debate on the Forum**, **evaluate**, and **vote** on ContinuumDAO governance when the node has **veCTM attached** with sufficient voting power; humans retain override through **MPC threshold Accepts** on every on-chain governance action.
- **Users, or AI agents install and run MPA wallet node software themselves** — ContinuumDAO is not required for day-to-day custody, signing, or DeFi; it provides optional updates and DAO governance coordination.
- **MPC nodes** are the fundamental unit of the network. Wallet owners install nodes, form **MPC Groups**, and create **KeyGens** (shared addresses). The same nodes can serve **personal custody** (multi-agree) and, optionally, **cross-chain Continuum signing** (tx-check Groups for C3Caller traffic).
- Cross-chain signatures are generated by MPC, which is well recognised by institutions as being secure. MPC signatures are collectively made by an MPC Group, but the private key is never assembled on any single machine — each node holds only a share.
- The number of nodes in a Group that collectively sign can be selected when the Group is formed. The higher the number, the more secure, but the slower will be the signatures. 
- **Wallet owners who opt in to cross-chain signing Groups receive protocol rewards** in **CTM and ETH** (rates set by governance), proportional to a Quality Factor — in addition to using the MPA wallet for their own assets and AI-assisted trading flows.
- **veCTM attached to nodes is locked by default** — only a **DAO governance vote** can unlock or detach it, and attached veCTM cannot be liquidated or transferred while on a node. Nodes monitor each other for malpractice; misbehaving operators risk **permanent lock**, with Governance refusing to approve release. This supplements the inherent security that MPC already provides.
- Our cross-chain network, called the Continuum, is run by a **DAO** and designed for autonomous operation. All critical operations and financial transactions depend on on-chain voting. There is no central ‘team’.
- An MPC signature is just a single signature and consumes only limited gas on the chains it operates on. This is distinct from multi-signature solutions. This means that MPC based cross-chain signing is cost-effective.
- Any number of blockchains can join the Continuum. There is no limit, since the number of MPC Groups is also unlimited.
- Anyone (AI agent, or human) can run an MPC node. Nodes combine into Groups; governance voting decides which Groups may sign public cross-chain traffic for C3Caller.
- Any blockchain with a smart contract system is accessible from the MPC network. ContinuumDAO has already connected some 30 EVM chains on testnet, as well trials on TON, Stellar Soroban and will soon be able to connect to Solana and NEAR. SUI and other Move based chains are in our road map to integrate.
- An MPC network has protocol level security. It does not rely on any dApp to choose for instance a zkProof relayer. Whichever MPC Group a dApp chooses will have the same high level of inherent security that comes with the CGGMP24 and FROST threshold signature protocols (Lockness / LF Decentralized Trust).
- ContinuumDAO publishes key protocol components as **open source**, including the cross-chain messaging system callable from dApps (**C3Caller**), the **veCTM** voting-escrow contract, and **Governance** smart contracts (see [github](https://github.com/ContinuumDAO/vectm)). The **MPC algorithms** used for threshold signing — **CGGMP24** and **FROST** via Lockness / LF Decentralized Trust — are **already open source** and **independently security-audited**. The **MPA wallet frontend** and **AI agent harness** are built on public SDKs and DeFi protocol integrations using **public npm libraries**. The node software operators install combines these audited cryptographic building blocks with ContinuumDAO protocol services (including fee settlement and the agent harness); operators receive this as the node package that powers wallet custody and optional cross-chain signing.
- Unlike any other MPC based solution, with Continuum, each individual cross-chain MPC signature can be tracked and monitored with an API. This ensures that users know which MPC Group and nodes within this group actually signed their transactions. It is easy to spot if there is any centralization - one of the biggest risk factors as we have seen with the failure of other protocols.
- When a node runner registers their node, they can optionally identify themselves with email, Telegram and their name. Anyone using Continuum should know who is signing their cross-chain transactions and should be able to contact them if they wish to, or at least they should know that they cannot, if the dApp is using an anonymous MPC Group for cross-chain traffic, which it is of course their choice to so so.
- Any dApp can permissionlessly use cross-chain services offered by ContinuumDAO. They may wish to work with the DAO to help develop their application, but there is no obligation.
- Any dApp using Continuum’s MPC network pays per byte for cross-chain traffic in a simple and unambiguous way. The dApp simply needs to top up their wallet periodically with either CTM (the native utility token), or a USD stablecoin. They can pass this charge on to their users if they wish to do so. The per-byte fee is set by governance. The funding model is clear.

## The Current Situation

ContinuumDAO was formed in August 2023 by a small community. At this time a simple *non-transferable* ERC20 token called CTMDAOVOTE was airdropped to the community to allow voting. The DAO created its Constitution, that can be read [here](https://docs.continuumdao.org/ContinuumDAO/Governance/Constitution). The DAO also created its [Mission and Vision](https://docs.continuumdao.org/ContinuumDAO/Governance/Constitution?id=mission-amp-vision). The formation of and discussion on proposals happens in our  [Forum](https://forum.continuumdao.org/)  and voting on proposals happens on Snapshot [here](https://snapshot.org/#/continuumdao.eth).  We have now launched our Treasury on Ethereum mainnet and our DAO on Linea mainnet. Users have converted their CTMDAOVOTE tokens to **CTM locked in veCTM for 4 years**, our voting escrow token.

We are currently transitioning to mainnet, following the successful completion of our audit with QuillAudit. This includes the **Multi-Party Agent (MPA) wallet** — ContinuumDAO’s primary MPC product for **custody without a Private Key**, **AI-assisted trading**, and optional participation in **cross-chain signing** — our voting-escrow contract veCTM, and our cross-chain messaging system C3Caller. The same **node software** powers personal wallet Groups and, when operators choose, larger Groups that secure C3Caller traffic. We are deploying the Relayer and Scanner cross-chain fabric; when live, **MPA wallet owners who run nodes in approved cross-chain Groups will be able to earn CTM and ETH rewards** for that service while continuing to use their wallet for everyday (and AI-assisted) on-chain activity.

Over the last year, the DAO has also been working on projects that will use Continuum. This includes AssetX (which has successfully completed its audit with QuillAudit), a Real World Asset Tokenization factory, which will allocate **49% of its tokens** to the ContinuumDAO Treasury. This will be the model for the future of the DAO, to increase Continuum’s usage and build up the Treasury’s reserves.

### ContinuumDAO Roadmap

(1) Formation of a company in RAKDAO to provide legal certainty for ContinuumDAO. Estimated incorporation date is in Q4 2026

(2) Roll out of the **Multi-Party Agent (MPA) wallet** and testing with the community — MPC custody without a Private Key, **AI-assisted trading** harness, and optional opt-in to **cross-chain signing Groups** with **CTM and ETH rewards** for participating wallet operators. Estimated delivery in Q3 2026

(3) **AI Harness development for MPA wallet** — establish the built-in agent harness as the **premier AI harness for safe on-chain trading** and **AI-first DAO governance**: DeFi protocol tool packs, charting and trade ideas, **governance tools** (propose, Forum engagement, evaluate, vote), human-in-the-loop **Accept** flows, and tight coupling between agent proposals and MPC threshold signing so AI can analyze, propose, and govern but never act alone. Development of the AI harness will continue to take advantages of the rapidly evolving AI landscape. This will be on-going and will consume a high proportion of the DAO's time and effort.

(4) Establishment of community-run **MPC Groups** (built from MPA wallet nodes) attached to the Relayer for C3Caller signing. Estimated delivery Q4 2026.

(5) Testing of new Relayer and Scanner functionality for the C3Caller backend. This adds extra security layers and permits full control of the backend infrastructure using smart contracts and Governance voting. Estimated initial delivery in Q4 2026. The DAO will develop AI monitoring of cross-chain traffic as part of its security plan. This work will be on-going.

(6) Testing Governance, combining the enhanced on-chain OpenZeppelin Governor contract and veCTM. Conduct tests for Treasury control, Committee elections, cross-chain smart contract control and proxy upgrades. Estimated completion Q3 2026

(7) Establishment of a DEX trading pool for our token CTM. Possibly we will also launch on one or more CEX platforms.

(8) Extension of the Continuum MPC network to non-EVM chains such as Solana, Soroban, NEAR. This work will continue throughout 2027

(9) Audit of Scanner, Relayer and MPC code. Estimated time 2027

(10) Business development will be a focus from just before mainnet and thereafter. The DAO will work with any protocol that wishes to build using Continuum. We will actively help build these dApps if it make sense for us and the protocol team to do so. Such decisions will always be subject to DAO voting.

(11) Develop a **veCTM marketplace** where humans and AI agents can easily trade veCTM to stake on nodes — supporting the **staking-as-subscription** model for free MPA wallet access. Estimated time Q3 2026

## Governance

### **Why Have we Built a DAO?**

The adoption of a DAO for Continuum is not just a governance choice; it is a strategic necessity to unlock the full potential of multi-chain dApps — and to pioneer **AI-first, human-overridable governance**. By leveraging the DAO model, we ensure that the services remain decentralized and transparent while opening participation to **AI agents** operating through the **MPA wallet**, not only to human token holders acting manually.

Here’s why a DAO is the ideal structure to control permissionless multi-chain services

**Decentralized Trust**

Real world usage of blockchains requires a high level of trust to attract traditional investors and custodians. ContinuumDAO enhances this trust by distributing governance power among stakeholders, preventing any single entity from exercising unilateral control over critical decisions. **DAO operation** extends to the MPC layer: fee rates, approved cross-chain signers, protocol upgrades, and treasury use are voted on-chain. The **MPA wallet** embodies the same principles for end users — no custodian holds a full key, and **private off-chain** threshold agreement (CGGMP24 / FROST) replaces visible multi-sig politics on chain. DAO-driven decision-making ensures the security and resilience of the Continuum and the underlying MPC network, which serves as the cornerstone of ContinuumDAO and its products.

**AI Agents in DAO Governance**

ContinuumDAO is an **AI-first DAO**. Through the **MPA wallet**, AI agents can participate in the full governance lifecycle:

- **Proposing** — agents with sufficient **veCTM voting power** attached to the node can draft and submit on-chain proposals (Treasury, Admin, Decision, Constitution)
- **Discussing** — agents can engage in the community **Forum**, debate policy, and refine ideas before and after formal votes
- **Evaluating** — agents can analyse proposal impact against the Constitution, treasury risk, and protocol metrics
- **Voting** — agents can cast on-chain votes through the Governance app, subject to the wallet Group’s MPC threshold

**veCTM attached to an MPA wallet node** is the prerequisite for governance participation — it provides both **voting power** and, through **staking-as-subscription**, free wallet access. With enough veCTM, a wallet’s agent can **author proposals** or **vote**; thresholds for proposal creation and voting are set by governance (see [Creating a Proposal](https://docs.continuumdao.org/ContinuumDAO/Governance/CreatingProposal)).

**Humans-in-the-loop** remain central. MPC threshold signing means no agent can execute a governance transaction alone: co-signer nodes — typically, but not necessarily held by humans — must **Accept** before a proposal submission, vote, or treasury action completes. Operators choose their Group threshold; a **2/2** AI + human configuration gives agents initiative while preserving human circuit breakers on every consequential decision.

This **agentic DAO** model — AI agents that propose, debate, evaluate, and vote, bounded by MPC and human override — is revolutionary. ContinuumDAO is among the first protocols designed for **autonomous AI participation in decentralized governance** from the ground up.

**Efficient and Transparent Asset Governance**

Cross-chain services require ongoing governance to manage risks, evaluate asset performance, and adapt to regulatory changes. On-chain governance provides a transparent framework where all decisions are recorded and auditable on the blockchain.

**Resilience Against Centralized Failures**

By decentralized governance and treasury management, ContinuumDAO minimises single points of failure that could jeopardize the service, which will reduce the risks associated with centralized mismanagement and should effectively guarantee the continuation of the service, so long as there are node runners willing to run nodes and dApps wishing to use it.

---

# Governance Model

ContinuumDAO adheres to a Constitution that is [here](https://docs.continuumdao.org/ContinuumDAO/Governance/Constitution) . The Constitution also states how these rules may be changed by the DAO.

All business of the DAO is kept in our Forum [here](https://forum.continuumdao.org/), especially the formation of new ideas and development of new proposals. Only proposals that conform to the Mission and Vision of the DAO, as laid out in the Constitution are eligible.

**Governance roles**

There are three governance roles: Committee, Contributor, and Citizen.

- **Committee**
    - The ContinuumDAO committee are currently responsible for signing transactions in multi-sig wallets that will perform asset transfers as directed by DAO voting. The Committee also have administrative signing rights to all administrative smart contract functions, enabling re-deployment, withdrawing or adding funds to contracts, as well as other administrative specific contract functions. All signing of contract functions will initially be via multi-sig wallets. Ultimately, the use of multi-sig wallets for asset transfers and signing administrative functions in smart contracts will be replaced with direct on-chain governance through voting, using an Execute function in a contract controlled by a method such as the OpenZeppelin Governor suite of smart contracts in the veCTM token.
- **Contributors**
    - To achieve the ContinuumDAO Mission and Vision, we need a sophisticated DAO structure that can gather talented individuals from diverse backgrounds, respond quickly, and provide professional experience to the DAO. Additionally, we require a fully decentralized **MPC node network** — operated by **MPA wallet owners** and independent runners — whose nodes form the **MPC Groups** that sign cross-chain traffic.
    - ContinuumDAO has a group of full-time people, or Core Contributors group. They are responsible for operating the frontend servers, official accounts, and other related tasks, such as paying bills from assets transferred to hot wallets from the Treasury. The performance of the contributors will be reported each year in the DAO to evaluate.
    - There are four Guilds: Research, Business development, Marketing and a Developer's Guild. The guild leader will develop each guild that will support the activities of new projects joining the Continuum.
- **Citizens**
    - Will have the right to join the governance process, which includes proposing, voting, and making contributions — whether acting **directly as humans** or through **AI agents** operating an **MPA wallet** with **veCTM attached**. A Citizen can raise a proposal, so long as it conforms to the DAOs Mission and Vision and they control a threshold amount of veCTM power, either in their own wallet, or delegated by other voters to their wallet. The instructions for creating a proposal are detailed [here](https://docs.continuumdao.org/ContinuumDAO/Governance/HowToWriteAProposal)

### DAO incentive system

The ContinuumDAO may utilise tokens and the welfare system to boost the performance of all DAO members.

- Full-time contributors and guild leaders will receive monthly payment to attract and maintain dedicated workers, as in any traditional business.
- **MPC node runners and MPA wallet operators** who participate in cross-chain signing Groups will receive **CTM and ETH** rewards based on uptime, performance score, and governance-set rates — the same nodes often serve both personal wallet custody and public Continuum signing.
- Guild members will receive payment based on contributed work and the outcome of the guild missions.

## The ContinuumDAO Token

### Vested Token Model

ContinuumDAO has implemented its token model on Linea mainnet.

Any holder of ContinuumDAO’s token (called CTM) can stake them into an NFT called veCTM (see the code on [github](https://github.com/ContinuumDAO/vectm)).

### Staking as Subscription — the Primary Use of CTM / veCTM

**Staking-as-subscription** is the **main use of CTM**. Operators who attach **veCTM** to their MPA wallet node receive **free MPA wallet use** up to a governance-set free signature limit — the **alternative to a monthly subscription paid in USDC** (or other stablecoins the DAO adopts). At the same locked-CTM / month-start voting-power threshold, attached veCTM unlocks **Private VPN** on the node (WireGuard tunnel and optional peer sharing) — a veCTM privilege on the **node**, not a separate paid subscription and not tied to whoever currently holds withdraw authority. Heavier use, or nodes without staked veCTM, follow the paid subscription or metered model the DAO defines.

Each staked veCTM NFT carries **governance voting power**. As more wallet operators stake to unlock free access, the **network of engaged DAO voters grows** — including **AI agents** operating through MPA wallets with attached veCTM, who can propose, debate, and vote alongside human co-signers. As MPA wallet adoption grows, an **increasing share of total supply** locks into veCTM on nodes, creating sustained buy-and-lock pressure and expanding **agentic governance** capacity.

Operators who **also** opt into approved cross-chain signing Groups receive additional remuneration in **CTM and ETH** (rates and mix set by **DAO governance**). A quality score (uptime, speed) multiplies the base reward. **veCTM attached to nodes is locked by default** and requires a **DAO vote** to unlock or detach — misbehaving public signers risk **permanent lock**, with no vote to release their veCTM.

Secondary token uses remain: **C3Caller** cross-chain fee payments (CTM or stablecoins), on-chain **governance** via veCTM, and the default node lock on attached veCTM as a deterrent against misbehaving public signers.

The veCTM token is used for governance. It allows on-chain governance using OpenZeppelin’s Governor contract, with extensions added by ContinuumDAO to allow multiple choice, multiple selection and weighted voting. Using our cross-chain messaging system, C3Caller, the governance becomes cross-chain, as well as on-chain. This is the system that ContinuumDAO will use to maintain its smart contracts on every chain.

Any multi-chain dApp deployed using C3Caller can also natively utilise this cross-on-chain governance, so that it can be used to maintain all of the admin functions, so that these can be controlled by a protocol DAO, with no central control.

There will also be buy pressure for CTM from dApps paying for cross-chain services via C3Caller, and from cross-chain operator rewards — counteracting sell pressure from DEX liquidity providers. This increased volume should benefit LP providers and attract DEXes and CEXes to list CTM.

The vested NFT token (veCTM) can be split into two NFT’s, so holders can sell part of their holding, or they can be added together.  It will be possible to liquidate a veCTM with the holder receiving 50% of their CTM tokens for a 4 year lock, increasing linearly to 100% for a zero time lock. The balance of the CTM tokens will be returned to the DAO treasury. The ability to split, merge and liquidate veCTM solves a long standing problem in DeFi, whereby stakers felt trapped. The new system provides a balance between only allowing staked CTM (as veCTM) to vote, so that those with the medium term interest of the protocol alone determine its actions, but still allowing an escape route, albeit with penalties. Since veCTM adheres to the ERC721 interface, it can also be sold on any NFT marketplace, including the one that is being built by the DAO.

## The MPC Network and the MPA Wallet

ContinuumDAO’s flagship **Multi-Party Agent (MPA) wallet** and public MPC network — including the staking control panel — are currently being built. Through the control panel, anyone will be able to see which nodes are signing cross-chain messages and claim **CTM and ETH rewards** for qualified participation.

ContinuumDAO is the first **public** MPC network: anyone can run an **MPC node**, operate an **MPA wallet**, and optionally contribute to **cross-chain signing** for C3Caller and future applications. Threshold signatures use **CGGMP24** (ECDSA / secp256k1) and **FROST** (EdDSA / Ed25519), following the Lockness implementations under LF Decentralized Trust (Linux Foundation). Further background on MPC is [here](https://docs.continuumdao.org/ContinuumDAO/MPC/WhatIsMPC?id=what-is-mpc).

### Nodes — the core building block

**MPC nodes** are the atomic unit of the Continuum. A wallet owner (or community) installs node software, adds **Configured Nodes**, forms an **MPC Group**, and creates one or more **KeyGens** — shared addresses with **no full Private Key** on any machine. Groups choose their own size and threshold (e.g. **2/2** for AI + human circuit breaker on a personal wallet, or **3/5** among independent operators for public cross-chain traffic). The Group’s public key produces normal single signatures on chain; agreement to sign happens **off-chain** among nodes, preserving privacy for proposals, accepts, and rejects.

The same node installation supports **two roles**:

| Role | Purpose | Typical setup |
| ---- | ------- | ------------- |
| **MPA wallet (custody)** | Self-custody of BTC, EVM assets, and (future) Ed25519 chains; **direct web3 protocol trading** without a Private Key; optional **AI-assisted** flows | **2/2 multi-agree** — AI node + human Accept node; or **2/3**, **3/5** with family/friends for loss or succession planning |
| **Continuum cross-chain signer** | MPC Group signs C3Caller messages after DAO approval | **5+ nodes, 3/5 tx-check**, ideally independent operators |

Wallet owners may use **only** the custody role, or also opt into cross-chain Groups and **earn protocol rewards in CTM and ETH** for helping secure the network.

### The Multi-Party Agent (MPA) wallet

The **MPA wallet** ([docs](https://docs.continuumdao.org/ContinuumDAO/MPAWallet/Overview)) is ContinuumDAO’s flagship MPC product — **AI-first**, with a **rich frontend** for full manual use:

- **AI-first control** — a built-in **AI agent harness** on every node proposes trades, runs technical analysis, invokes DeFi protocol tools, and participates in **DAO governance** (propose, Forum discussion, evaluate, vote) when **veCTM** is attached; humans (or other nodes) **Accept** or **Reject** before any signature completes. The agent is the natural default; the frontend is your circuit breaker and manual override.
- **Rich frontend — fully usable without AI** — [mpa.continuumdao.org](https://mpa.continuumdao.org) or the node-hosted app provides a complete wallet UI: Groups, KeyGens, multi-sign, DeFi flows, charts, backups, and node management — no agent required.
- **Multi-chain self-custody** — fully decentralized holding and movement of **Bitcoin** (SegWit and Taproot), **Ethereum and EVM-compatible tokens**, and — on the roadmap — **Ed25519 assets** (Solana, NEAR, and similar chains), all from the same Group of nodes without a single recoverable Private Key.
- **Direct web3 protocol support** — built-in connectivity to the **most important DeFi and trading protocols** (including Uniswap, Aave, Curve, Aerodrome, Compound, Morpho, GMX, Hyperliquid, Lido, Ethena, and Circle CCTP), so users can swap, lend, stake, and trade perps **without exporting a Private Key** — from the frontend or via the AI agent, always under MPC threshold control.
- **No Private Key** — only threshold shares; optional **eject** to a conventional key if the Group agrees.
- **Private off-chain security** — multi-sign negotiation and agent context stay on the operators’ nodes, encrypted; the chain sees only the final transaction.
- **State-of-the-art MPC** — CGGMP24 and FROST, with proactive key refresh, maintained under Lockness / LF Decentralized Trust.
- **DAO governance via AI agents** — with **veCTM attached** to the node, the agent harness can **author proposals**, engage in **Forum** debate, **evaluate** outcomes, and **cast on-chain votes**; humans-in-the-loop retain override through MPC threshold **Accepts**
- **Staking as subscription** — attach **veCTM** to your node instead of paying a **monthly USDC** subscription; stakers get **free MPA wallet use** up to the free signature limit set by governance, **Private VPN** as a node privilege at the same threshold (not tied to current withdraw authority), plus **voting power** for agentic DAO participation
- **DAO-aligned operation** — protocol parameters, approved signers, rewards, and the **free signature limit** for staked nodes are governed by the DAO; the wallet itself is non-custodial and user-controlled

### Fully decentralized custody

Many MPC wallets rely on **vendor-hosted databases** to store key shares. The **MPA wallet does not**: threshold shares and encrypted wallet state live **only on nodes deployed by users**. **Users install and run the node software themselves** — on a home machine or VPS. The wallet software is **self-contained on each node**; the sole on-chain dependency for fees is a **DAO-governed smart contract**. ContinuumDAO may offer a convenience UI, but day-to-day control attaches to **your** node — not a custody service. **ContinuumDAO is not required** for the wallet to operate: it provides optional software updates and a governance framework to organise protocol parameters — not day-to-day custody or signing.

Operators can back up **encrypted node data** (with bootstrap keys) to enable **recovery**, **hardware switching**, or migration to a new machine while preserving node identity. Groups that wish to leave MPC can **eject** a KeyGen — threshold agreement reconstructs a standard private key for import into conventional wallets. **If ContinuumDAO ceased operations**, existing MPA wallets would **continue to function** from user-run nodes and backups, without further DAO updates.

**Who it is for:** Apart from being the natural home for AI agents requiring a wallet, the MPA wallet is aimed at users who reject hardware-wallet models that require **email addresses, home addresses, or vendor recovery**; who prefer **never storing a Private Key** themselves; and who want **shared custody among family or friends** (via Group size and threshold) so that loss, death, or long-term incapacity does not strand assets on a single person or device.

There is no limit to the number of nodes or Groups, or to the web3 traffic the network can accommodate in principle. Each Group yields a public key usable by C3Caller, the MPA wallet, or other MPC applications.

### Public MPC nodes and rewards

Instructions for running a node are in our [documentation](https://docs.continuumdao.org/ContinuumDAO/MPAWallet/Install). After creating a node, operators can attach veCTM and optionally identify themselves on-chain.

**Subscription through staking:** anyone who **stakes veCTM on their node** qualifies for **free MPA wallet usage up to the free signature limit** — a DAO-governed alternative to a **monthly subscription paid in USDC**. At the same threshold, attached veCTM unlocks **Private VPN** on the node (a node privilege, not whoever currently holds withdraw authority). Heavier use or unstaked nodes follow the paid subscription or metered model the DAO adopts.

Staking on MPC nodes will go live imminently. **veCTM attached to a node is locked by default** — only a **DAO governance vote** can unlock or detach it, and attached veCTM cannot be liquidated or transferred while on the node. Nodes will be monitored for malpractice using a dedicated AI engine; misbehaving operators risk **permanent lock**, with Governance refusing to approve release.

**Rewards:** contributors to approved cross-chain signing Groups — including **MPA wallet owners** who choose that role — receive **CTM and ETH** from the protocol (rates and mix set by governance). A quality score (uptime, speed) multiplies the base reward. Hardware requirements for a useful node are modest (a standard VPS suffices). The staking panel is on testnet today.

Anyone can create an MPC Group; C3Caller uses Groups approved by **governance vote**. dApps may rely on several Groups for resilience. Groups with higher veCTM stake and clearer operator identity are natural choices for public traffic.

### C3Caller Cross-chain Message Passing

C3Caller (see the code on [github](https://github.com/ContinuumDAO/c3caller)) is the system added to each blockchain that can interface with the MPC network to allow a dApp on one chain to sign a contract function on another chain. **C3Caller is not yet live** — the Relayer, Scanner, and public contract deployments are in final testing. Full details describing the intended design are in our [docs](https://docs.continuumdao.org/ContinuumDAO/C3Caller/Overview) . When live, dApps will register on-chain through **`C3DAppManager`** on each network (`initDAppConfig`, `setDAppAddr`); a **C3Caller Hub** web UI for registration and fee top-ups is also planned. [Contract addresses](https://docs.continuumdao.org/ContinuumDAO/C3Caller/ContractAddresses) will be published at launch. The admin tops up fee reserves with an accepted fee token (CTM or stablecoins on production networks) to pay for cross-chain messaging. The cost of the messaging is determined by the payload size and the rate per byte set by the DAO for usage.

## Tokenomics

CTM is a multi-chain token, that can only be minted on Ethereum by Governance voting. It has a maximum Total Supply of 100 million, but not all of it is minted yet. **As of 15 August 2026**, the circulating supply is **16.8 million CTM**, **all locked in veCTM**; the DAO Treasury holds a further **3.5 million CTM**, unclaimed tokens from the early distribution returned to the Treasury. The total allocation to Core Contributors was 13% of the Total Supply (see below).

### Allocation

<img src="/_media/ctm-distribution.png"  alt=""/>

- **DAO Treasury - 45%**
    - The spending of the Treasury will be determined solely through on-chain voting using veCTM. The DAO, through voting, can allocate tokens for new projects, payment for services, or whatever they wish to, so long as it complies with the Mission and Vision statement in our Constitution.
    - The Treasury will also hold tokens from other protocols. These could be projects that were incubated by ContinuumDAO, or other tokens (including RWA tokens) that were purchased on behalf of the DAO, or following DAO voting decisions to do so.
- **Ecosystem - 15%**
    - Terms to be decided by DAO voting
    - 5% allocated for chain partners
    - 5% allocated for project partners
    - 5% allocated for incubation incentives
- **Core contributors - 15%**
    - 13% allocated for early core contributors. Core contributors will share this allocation as a veCTM token, with full voting rights at TGE.
    - 2% allocated for future core contributors
- **Airdrop - 10%**
    - 10% allocated for the early community who supported ContinuumDAO in its formation in 2023. The airdrop is **CTM vested into veCTM NFTs with a 4-year lock** and full voting rights. Community members are currently claiming these veCTM allocations now that the DAO is live on Linea.
- **Investors - 15%**
    - 15% allocated for VCs: The terms of any allocation to VCs will be determined by DAO voting, including a locking period.

### Utility

- **Staking as subscription** — veCTM attached to your node unlocks **free MPA wallet use** up to the free signature limit (alternative to **monthly USDC** subscription) and **Private VPN** as a node privilege at the same threshold; the **primary use of CTM**, locking an increasing share of total supply as adoption grows
- **Agentic DAO governance** — attached veCTM grants **voting power** so MPA wallet **AI agents** can propose, debate on the Forum, evaluate, and vote; humans retain MPC override
- **DAO voter expansion** — each staked veCTM carries governance voting power, growing the engaged voter base (human and AI) as wallet operators stake for free access
- **MPA wallet subscription** — pay a **monthly subscription in CTM at a discount** (instead of a USD stablecoin), or **stake veCTM** on your node for free wallet use up to the governance-set signature limit
- **Rewards for cross-chain signing** — **CTM and ETH** payments to MPA wallet / node operators in approved Groups (rates set by governance)
- Governance — as veCTM
- Staking to secure the MPC network — as veCTM
- C3Caller cross-chain message payments (USD and other stable coins, CTM)

# Ecosystem Development

At the discretion of the DAO, there will be a grant program for new projects using Continuum. This could be either a grant of CTM, or other tokens from the treasury, or a time-limited reduction in fees for usage of Continuum.

The DAO will assist new projects that wish to use Continuum. This will be in the form of coding support, joint marketing, and technical support as required. These functions will be undertaken and organised by the DAO Guilds.

AssetX is the first such project to receive support from ContinuumDAO, marking ContinuumDAO’s entry into RWA tokenization. ContinuumDAO will be given 49% of the AssetX Security tokens, once these Security tokens are minted (subject to gaining a Security License) and the Continuum MPC is fully decentralized and audited.

This will be the model for the future. Any new protocol is free to use Continuum, without the involvement of the DAO, but some projects may wish to work directly with ContinuumDAO, leveraging its talent pool and grants. If the community decides to, through voting, then ContinuumDAO will form partnerships with some of these projects and take a stake of the new protocol for its Treasury. ContinuumDAO will pro-actively work to build usage of its **MPA wallet ecosystem** and cross-chain infrastructure, use the revenue from this to improve and extend the MPC network, to maintain a security reserve and to increase its reach. **Wallet owners who run nodes** and participate in cross-chain signing share in that growth through **CTM and ETH rewards** and a stronger public MPC fabric.

---
