# ContinuumDAO White Paper

15th August 2026

# Welcome to Continuum

An open public cross-chain network secured by Multi-Party Computation — and the **Multi-Party Agent (MPA) wallet**, a flagship MPC product for custody **without a Private Key**, **AI-assisted trading**, and optional **cross-chain signing** rewards — run as a public good under **DAO governance**.

## About ContinuumDAO

ContinuumDAO is a community that is collectively building a future in which all blockchains are linked, to enable the integration of decentralized blockchain ledgers for all dApps. We realise that the entirety of finance and other ‘trust’ based networks will transition to web3 in the next few years and that the biggest opportunity for blockchain is to provide DeFi like services for actual businesses, whether that is to raise capital, or allow investment in assets or provide services that it would be impossible to do so using traditional tools. A future open to everyone, not just in the financial centers of the world. To do this though, it is necessary for all blockchains to be able to communicate with each other securely. This is urgent, since it seems likely that the number of chains will only increase. That is the mission of ContinuumDAO.

As the backbone of ContinuumDAO, we have the first public institutional-grade Multi-Party Computation (MPC) node network called the Continuum. **The Multi-Party Agent (MPA) wallet** is a flagship product: fully decentralized **self-custody** of **BTC** (SegWit and Taproot), **Ethereum / EVM assets**, and (in rollout) **Ed25519 chains** — **without any single Private Key**, with optional **AI-assisted trading** on the **most important web3 protocols built in directly** (swaps, lending, staking, perps, and bridges) for **secure, Private-Key-less trading**. The same node software also powers **C3Caller** cross-chain messaging and **cross-on-chain governance** — all operated under **DAO governance**, with signing and agreement handled **off-chain** using peer-reviewed **CGGMP24** and **FROST** threshold signature protocols (Lockness / LF Decentralized Trust).

We are committed to a permissionless and decentralized architecture, which will create a strong and durable framework, with an open protocol that everyone can help run, and anyone can contribute towards, that is owned by the community. An unstoppable system, just like the internet on which it runs.

## Why Does Having Open Public Infrastructure Matter?

A better question is why would anyone who wishes to create a multi-chain dApp rely on an infrastructure that wasn’t completely decentralized, or which was owned by a company, knowing that this could disappear at anytime? ContinuumDAO has sophisticated **DAO-governed** smart contracts that do not rely on a ‘team’ to administer or update them. **MPC nodes** — run by wallet owners, communities, or independent operators — are the core building blocks of **MPC Groups** that collectively sign cross-chain transactions. A dApp can choose whatever MPC Group it wishes to use, or have its own community run its own groups. The number of MPC groups is unlimited and so the capacity of the cross-chain network, which can grow as demand increases, effectively in an unlimited way.

## Why is the ContinuumDAO Mission Important?

The existing landscape of web3 is confusing for new and even existing users. Continuum will solve one of the biggest pain points — how decentralized applications (dApps) securely communicate between any blockchain that supports a contract based system.

**The Multi-Party Agent (MPA) wallet** addresses a parallel pain point: **fully decentralized self-custody** without ever holding a recoverable Private Key on any device — and **without storing key shares in vendor databases**, as many other MPC wallets do. Custody lives entirely on **nodes users deploy**; wallet software is self-contained on those nodes, with only a **fee smart contract** on chain. The wallet supports **Bitcoin** (SegWit and Taproot), **Ethereum and other EVM-compatible assets**, and — as the network expands — **many Ed25519 chains** (Solana, NEAR, and others) via threshold **FROST** signing. Users run one or more **MPC nodes** that hold only threshold **shares**. Agreement to sign — including AI-proposed trades — happens **off-chain** among those nodes; the chain sees a normal single signature. There is no on-chain record of who proposed, accepted, or rejected a transaction, which preserves **private, off-chain security** for the wallet group’s decisions.

Self-custody with an MPA wallet suits anyone who **does not trust hardware wallets** that tie recovery to vendor accounts, email addresses, or home addresses; anyone who **does not want to store a Private Key** on disk, paper, or a single device; and anyone who wants **relatives or friends to hold partial custody** — through extra Group nodes and a chosen threshold — so assets are not lost to one person’s death, device failure, or absence. Trading and DeFi run **directly** against the **most important web3 protocols** built into the wallet (no key export to a browser extension), with every on-chain action still gated by MPC threshold **Accepts**. A typical personal setup pairs an **AI-assisted node** with a **human circuit-breaker node** under **2/2** threshold control: the agent can analyze markets, propose DeFi actions, and compose trades, but cannot complete a signature alone.

The same nodes can optionally join larger Groups that provide **cross-chain signing** for the Continuum network. **Wallet owners who participate in that role can earn protocol rewards** in CTM, aligning personal custody with public infrastructure.

### Lack of  Open Cross-Chain Fabrics

Existing cross-chain architectures are sometimes ‘black-boxes’, so that no one is aware of who is signing transactions on destination chains. Others are secured by nodes run by a few individuals, often team members. They do not allow anyone to contribute to cross-chain signing. They are not ‘public’ infrastructure. They are almost always run by centralized entities (companies), so that even their continued existence is in serious doubt.

### Security Relies on ‘Staking’ Alone

When a cross-chain messaging system relies on node-runners staking on their nodes alone, then the issue, as the volume grows, is that the value of the staking would become low compared to the value of the traffic itself. There is not a good enough incentive to avoid foul play. Cross-chain signing must be **inherently secure** — as with the Continuum’s **CGGMP24** and **FROST** MPC protocols — not dependent on staking alone. The **MPA wallet** applies the same principle to custody: security comes from threshold cryptography and **private off-chain** agreement, with veCTM staking as a supplementary deterrent for public signers.

### The Number of Chains in a Network is not Scaleable

Sometimes (and this includes some of the most popular bridges) the cross-chain signing relies on multi-signature wallets. The issue here is that multiple signatures are costly. It is hard to upgrade every node to include a new chain that they must sign on. This will prevent support for all but a few major chains and limit the scalability of web3 to the general public.

### Technical Challenges in Expanding the Cross-Chain Network

Systems secured by zkProofs are difficult to expand. The zkProof is computationally expensive and requires expensive hardware, which can be challenging for most node-runners to implement. Generating a zkProof from an EVM to a non-EVM is difficult (impossible?) to achieve.

### Lack of Protocol Level Security

Systems that use zkProofs and relayers of those proofs do not have protocol level security. It is up to the dApp to choose the relayer and they can switch at any time from within their frontend to an insecure or malicious relayer, unbeknown to the users of those dApps.

## How is ContinuumDAO Different?

- Our cross-chain network, called the Continuum, is run by a **DAO** and designed for autonomous operation. All critical operations and financial transactions depend on on-chain voting. There is no central ‘team’.
- **The MPA wallet** is a core MPC product: **fully decentralized self-custody** of **BTC** (SegWit and Taproot), **Ethereum / EVM assets**, and (in rollout) **Ed25519 chains** such as Solana and NEAR — **without a Private Key**, with **direct integration to the most important web3 protocols** (Uniswap, Aave, Curve, GMX, Hyperliquid, Lido, and others) for **secure Private-Key-less trading**, **AI-assisted** workflows, threshold-bound signing, and **private off-chain** agreement — secured by **CGGMP24** (ECDSA) and **FROST** (EdDSA) as maintained by Lockness under LF Decentralized Trust (Linux Foundation).
- **MPC nodes** are the fundamental unit of the network. Wallet owners install nodes, form **MPC Groups**, and create **KeyGens** (shared addresses). The same nodes can serve **personal custody** (multi-agree) and, optionally, **cross-chain Continuum signing** (tx-check Groups for C3Caller traffic).
- Cross-chain signatures are generated by MPC, which is well recognised by institutions as being secure. MPC signatures are collectively made by an MPC Group, but the private key is never assembled on any single machine — each node holds only a share.
- The number of nodes in a Group that collectively sign can be selected when the Group is formed. The higher the number, the more secure, but the slower will be the signatures. ContinuumDAO will soon enable ‘pre-signing’, to speed up the computation and allow larger MPC Groups.
- An MPC signature is just a single signature and consumes only limited gas on the chains it operates on. This is distinct from multi-signature solutions. This means that MPC based cross-chain signing is cost-effective.
- Any number of blockchains can join the Continuum. There is no limit, since the number of MPC Groups is also unlimited.
- Anyone can run an MPC node. Nodes combine into Groups; governance voting decides which Groups may sign public cross-chain traffic for C3Caller.
- **Wallet owners who opt in to cross-chain signing Groups receive protocol rewards** in CTM, proportional to a Quality Factor set by governance — in addition to using the MPA wallet for their own assets and AI-assisted trading flows.
- Nodes will monitor each other for malpractice. If any nodes misbehave, then Governance can lock the staked tokens (veCTM) and these cannot be sold or transferred. This is just a supplement to the inherent security that MPC already has.
- Any blockchain with a smart contract system is accessible from the MPC network. ContinuumDAO has already connected some 30 EVM chains on testnet, as well as TON, Stellar Soroban and will soon be able to connect to Solana and NEAR. SUI and other Move based chains are in our road map to integrate.
- An MPC network has protocol level security. It does not rely on any dApp to choose for instance a zkProof relayer. Whichever MPC Group a dApp chooses will have the same high level of inherent security that comes with the CGGMP24 and FROST threshold signature protocols (Lockness / LF Decentralized Trust).
- ContinuumDAO’s code is open source. This includes the cross-chain messaging system callable from dApps (C3Caller) and then once it has been audited and thoroughly tested, the MPC code itself will also be open sourced.
- Unlike any other MPC based solution, with Continuum, each individual MPC signature can be tracked and monitored with an API. This ensures that users know which MPC Group and nodes within this group actually signed their transactions. It is easy to spot if there is any centralization - one of the biggest risk factors as we have seen with the failure of other protocols.
- When a node runner registers their node, they can optionally identify themselves with email, Telegram and their name. Anyone using Continuum should know who is signing their transactions and should be able to contact them if they wish to, or at least they should know that they cannot, if the dApp is using an anonymous MPC Group, which it is of course their choice to so so.
- Any dApp can permissionlessly use cross-chain services offered by ContinuumDAO. They may wish to work with the DAO to help develop their application, but there is no obligation.
- Any dApp using Continuum’s MPC network pays per byte for cross-chain traffic in a simple and unambiguous way. The dApp simply needs to top up their wallet periodically with either CTM (the native utility token), or a USD stablecoin. They can pass this charge on to their users if they wish to do so. The per-byte fee is set by governance. The funding model is clear.

## The Current Situation

ContinuumDAO was formed in August 2023 by a small community. At this time a simple *non-transferable* ERC20 token called CTMDAOVOTE was airdropped to the community to allow voting. The DAO created its Constitution, that can be read [here](https://docs.continuumdao.org/ContinuumDAO/Governance/Constitution). The DAO also created its [Mission and Vision](https://docs.continuumdao.org/ContinuumDAO/Governance/Constitution?id=mission-amp-vision). The formation of and discussion on proposals happens in our  [Forum](https://forum.continuumdao.org/)  and voting on proposals happens on Snapshot [here](https://snapshot.org/#/continuumdao.eth).  We have now launched our Treasury on Ethereum mainnet and our DAO on Linea mainnet. Users have converted their CTMDAOVOTE tokens to veCTM, our voting escrow token.

We are currently transitioning to mainnet, following the successful completion of our audit with QuillAudit. This includes our cross-chain messaging system C3Caller, our voting-escrow contract veCTM, and the **Multi-Party Agent (MPA) wallet** — ContinuumDAO’s primary MPC product for **custody without a Private Key**, **AI-assisted trading**, and optional participation in **cross-chain signing**. The same **node software** powers personal wallet Groups and, when operators choose, larger Groups that secure C3Caller traffic. We are deploying the Relayer and Scanner cross-chain fabric; when live, **MPA wallet owners who run nodes in approved cross-chain Groups will be able to earn CTM rewards** for that service while continuing to use their wallet for everyday (and AI-assisted) on-chain activity.

Over the last year, the DAO has also been working on some projects that will use Continuum. This includes AssetX (which has successfully completed its audit with QuillAudit), which is a Real World Asset Tokenization factory and Lawracle, an protocol that will link law firms to web3 ventures, to provide on-chain proofs of important facts, such as ownership of property,  provenance of assets and the veracity of statements made by protocols. Both AssetX and Lawracle will give 49% of their tokens to the ContinuumDAO Treasury. This will be the model for the future of the DAO, to increase Continuum’s usage and build up the Treasury’s reserves.

### ContinuumDAO Roadmap

(1) Formation of a company in RAKDAO to provide legal certainty for ContinuumDAO. Estimated incorporation date is in Q4 2026

(2) Roll out of the **Multi-Party Agent (MPA) wallet** and testing with the community — MPC custody without a Private Key, **AI-assisted trading** harness, and optional opt-in to **cross-chain signing Groups** with **CTM rewards** for participating wallet operators. Estimated delivery in Q3 2026

(3) Establishment of community-run **MPC Groups** (built from MPA wallet nodes) attached to the Relayer for C3Caller signing. Estimated delivery Q4 2026.

(3) Testing of new Relayer and Scanner functionality for the C3Caller backend. This adds extra security layers and permits full control of the backend infrastructure using smart contracts and Governance voting. Estimated delivery in Q4 2026

(4) Testing Governance, combining the enhanced on-chain OpenZeppelin Governor contract and veCTM. Conduct tests for Treasury control, Committee elections, cross-chain smart contract control and proxy upgrades. Estimated completion Q2 2026

(7) Establishment of a DEX trading pool for our token CTM. Possibly we will also launch on one or more CEX platforms.

(8) Extension of the Continuum MPC network to non-EVM chains such as Solana, Soroban, NEAR. This work will continue throughout 2026 and 2027

(9) Audit of Scanner, Relayer and MPC code. Estimated time Q3 2026

(10) Business development will be a focus from just before mainnet and thereafter. We will work with any protocol that wishes to build using Continuum. We will actively help build these dApps if it make sense for us and the protocol team to do so. Such decisions will always be subject to DAO voting.

## Governance

### **Why Have we Built a DAO?**

The adoption of a DAO for Continuum is not just a governance choice; it is a strategic necessity to unlock the full potential of multi-chain dApps. By leveraging the DAO model, we ensure that the services remain decentralized and transparent. 

Here’s why a DAO is the ideal structure to control permissionless multi-chain services

**Decentralized Trust**

Real world usage of blockchains requires a high level of trust to attract traditional investors and custodians. ContinuumDAO enhances this trust by distributing governance power among stakeholders, preventing any single entity from exercising unilateral control over critical decisions. **DAO operation** extends to the MPC layer: fee rates, approved cross-chain signers, protocol upgrades, and treasury use are voted on-chain. The **MPA wallet** embodies the same principles for end users — no custodian holds a full key, and **private off-chain** threshold agreement (CGGMP24 / FROST) replaces visible multi-sig politics on chain. DAO-driven decision-making ensures the security and resilience of the Continuum and the underlying MPC network, which serves as the cornerstone of ContinuumDAO and its products.

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
    - Will have the right to join the governance process, which includes proposing, voting, and making contributions. A Citizen can raise a proposal, so long as it conforms to the DAOs Mission and Vision and they control a threshold amount of veCTM power, either in their own wallet, or delegated by other voters to their wallet. The instructions for creating a proposal are detailed [here](https://docs.continuumdao.org/ContinuumDAO/Governance/HowToWriteAProposal)

### DAO incentive system

The ContinuumDAO may utilise tokens and the welfare system to boost the performance of all DAO members.

- Full-time contributors and guild leaders will receive monthly payment to attract and maintain dedicated workers, as in any traditional business.
- **MPC node runners and MPA wallet operators** who participate in cross-chain signing Groups will receive CTM rewards based on uptime, performance score, and governance-set rates — the same nodes often serve both personal wallet custody and public Continuum signing.
- Guild members will receive payment based on contributed work and the outcome of the guild missions.

## The ContinuumDAO Token

### Vested Token Model

ContinuumDAO has implemented its token model on Linea mainnet.

Any holder of ContinuumDAO’s token (called CTM) can stake them into an NFT called veCTM (see the code on [github](https://github.com/ContinuumDAO/vectm)). There will be a buy pressure for CTM, since it is used as a payment token by dApps for cross-chain services. This will counteract any sell pressure from node-runners who are paid in CTM and DEX liquidity providers selling tokens. This increased volume should benefit LP providers and attract DEXes and CEXes to list CTM.

The veCTM token is used for governance. It allows on-chain governance using OpenZeppelin’s Governor contract, with extensions added by ContinuumDAO to allow multiple choice, multiple selection and weighted voting. Using our cross-chain messaging system, C3Caller, the governance becomes cross-chain, as well as on-chain. This is the system that ContinuumDAO will use to maintain its smart contracts on every chain.

Any multi-chain dApp deployed using C3Caller can also natively utilise this cross-on-chain governance, so that it can be used to maintain all of the admin functions, so that these can be controlled by a protocol DAO, with no central control. 

The veCTM token is also used to stake on MPC nodes, adding an extra security measure to the inherently secure CGGMP24 and FROST threshold signature protocols. Only the DAO can un-stake these veCTMs, allowing a bad actor’s veCTM to remain locked forever. **MPA wallet owners** who run nodes and join cross-chain signing Groups receive payment for that service in CTM; remuneration rates and quality scoring are determined by DAO governance.

**Subscription through staking:** veCTM staked on a node is an alternative to a **monthly MPA wallet subscription**. Operators who attach veCTM to their node receive **free use of the MPA wallet up to a governance-set free signature limit** — enough for typical personal custody and trading without a separate SaaS fee. Usage above that limit, or nodes without staked veCTM, can pay via subscription or metered fees as the DAO defines. This ties long-term protocol alignment (veCTM) to everyday wallet access and rewards node operators who secure the network.

As well as being used for governance (via veCTM) and distribution of payments to node runners, CTM will also be used as a payment option for all services in cross-chain messaging system, C3Caller.

The vested NFT token (veCTM) can be split into two NFT’s, so holders can sell part of their holding, or they can be added together.  It will be possible to liquidate a veCTM with the holder receiving 50% of their CTM tokens for a 4 year lock, increasing linearly to 100% for a zero time lock. The balance of the CTM tokens will be returned to the DAO treasury. The ability to split, merge and liquidate veCTM solves a long standing problem in DeFi, whereby stakers felt trapped. The new system provides a balance between only allowing staked CTM (as veCTM) to vote, so that those with the medium term interest of the protocol alone determine its actions, but still allowing an escape route, albeit with penalties. Since veCTM adheres to the ERC721 interface, it can also be sold on any NFT marketplace.

## The MPC Network and the MPA Wallet

ContinuumDAO’s MPC network, **Multi-Party Agent (MPA) wallet**, and staking control panel are currently being built. Through the control panel, anyone will be able to see which nodes are signing cross-chain messages and claim **CTM rewards** for qualified participation.

ContinuumDAO is the first **public** MPC network: anyone can run an **MPC node**, operate an **MPA wallet**, and optionally contribute to **cross-chain signing** for C3Caller and future applications. Threshold signatures use **CGGMP24** (ECDSA / secp256k1) and **FROST** (EdDSA / Ed25519), following the Lockness implementations under LF Decentralized Trust (Linux Foundation). Further background on MPC is [here](https://docs.continuumdao.org/ContinuumDAO/MPC/WhatIsMPC?id=what-is-mpc).

### Nodes — the core building block

**MPC nodes** are the atomic unit of the Continuum. A wallet owner (or community) installs node software, adds **Configured Nodes**, forms an **MPC Group**, and creates one or more **KeyGens** — shared addresses with **no full Private Key** on any machine. Groups choose their own size and threshold (e.g. **2/2** for AI + human circuit breaker on a personal wallet, or **3/5** among independent operators for public cross-chain traffic). The Group’s public key produces normal single signatures on chain; agreement to sign happens **off-chain** among nodes, preserving privacy for proposals, accepts, and rejects.

The same node installation supports **two roles**:

| Role | Purpose | Typical setup |
| ---- | ------- | ------------- |
| **MPA wallet (custody)** | Self-custody of BTC, EVM assets, and (future) Ed25519 chains; **direct web3 protocol trading** without a Private Key; optional **AI-assisted** flows | **2/2 multi-agree** — AI node + human Accept node; or **2/3**, **3/5** with family/friends for loss or succession planning |
| **Continuum cross-chain signer** | MPC Group signs C3Caller messages after DAO approval | **5+ nodes, 3/5 tx-check**, ideally independent operators |

Wallet owners may use **only** the custody role, or also opt into cross-chain Groups and **earn protocol rewards** for helping secure the network.

### The Multi-Party Agent (MPA) wallet

The **MPA wallet** ([docs](https://docs.continuumdao.org/ContinuumDAO/MPAWallet/Overview)) is ContinuumDAO’s flagship MPC product:

- **Multi-chain self-custody** — fully decentralized holding and movement of **Bitcoin** (SegWit and Taproot), **Ethereum and EVM-compatible tokens**, and — on the roadmap — **Ed25519 assets** (Solana, NEAR, and similar chains), all from the same Group of nodes without a single recoverable Private Key.
- **Direct web3 protocol support** — built-in connectivity to the **most important DeFi and trading protocols** (including Uniswap, Aave, Curve, Morpho, GMX, Hyperliquid, Lido, Ethena, and Circle CCTP), so users can swap, lend, stake, and trade perps **without exporting a Private Key** — from the node app or via the AI agent, always under MPC threshold control.
- **No Private Key** — only threshold shares; optional **eject** to a conventional key if the Group agrees.
- **AI-assisted trading** — agents propose trades, run technical analysis, and invoke protocol tools directly; humans (or other nodes) **Accept** or **Reject** before any signature completes.
- **Private off-chain security** — multi-sign negotiation and agent context stay on the operators’ nodes, encrypted; the chain sees only the final transaction.
- **State-of-the-art MPC** — CGGMP24 and FROST, with proactive key refresh, maintained under Lockness / LF Decentralized Trust.
- **DAO-aligned operation** — protocol parameters, approved signers, rewards, and the **free signature limit** for staked nodes are governed by the DAO; the wallet itself is non-custodial and user-controlled.
- **Subscription through staking** — attach **veCTM** to your node instead of paying a monthly subscription; stakers get **free MPA wallet use** up to the free signature limit set by governance.

### Fully decentralized custody

Many MPC wallets rely on **vendor-hosted databases** to store key shares. The **MPA wallet does not**: threshold shares and encrypted wallet state live **only on nodes deployed by users**. The wallet software is **self-contained on each node**; the sole on-chain dependency for fees is a **DAO-governed smart contract**. ContinuumDAO may offer a convenience UI, but day-to-day control attaches to **your** node — not a custody service.

Operators can back up **encrypted node data** (with bootstrap keys) to enable **recovery**, **hardware switching**, or migration to a new machine while preserving node identity. Groups that wish to leave MPC can **eject** a KeyGen — threshold agreement reconstructs a standard private key for import into conventional wallets. **If ContinuumDAO ceased operations**, existing MPA wallets would **continue to function** from user-run nodes and backups, without further DAO updates.

**Who it is for:** the MPA wallet is aimed at users who reject hardware-wallet models that require **email addresses, home addresses, or vendor recovery**; who prefer **never storing a Private Key** themselves; and who want **shared custody among family or friends** (via Group size and threshold) so that loss, death, or long-term incapacity does not strand assets on a single person or device.

There is no limit to the number of nodes or Groups, or to the web3 traffic the network can accommodate in principle. Each Group yields a public key usable by C3Caller, the MPA wallet, or other MPC applications.

### Public MPC nodes and rewards

Instructions for running a node are in our [documentation](https://docs.continuumdao.org/ContinuumDAO/MPAWallet/Install). After creating a node, operators can attach veCTM and optionally identify themselves on-chain.

**Subscription through staking:** anyone who **stakes veCTM on their node** qualifies for **free MPA wallet usage up to the free signature limit** — a DAO-governed alternative to a monthly subscription. Heavier use or unstaked nodes follow the paid subscription or metered model the DAO adopts.

Staking on MPC nodes will go live with the Relayer and Scanner. veCTM attachment is an additional safeguard: only a DAO vote can detach it, and attached veCTM cannot be liquidated or transferred. Misbehaving operators risk permanent lock of staked veCTM.

**Rewards:** contributors to approved cross-chain signing Groups — including **MPA wallet owners** who choose that role — receive CTM from the protocol. A quality score (uptime, speed) set by governance multiplies the base reward. Hardware requirements for a useful node are modest (a standard VPS suffices). The staking panel is on testnet today.

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
    - 10% allocated for Airdrop for the early community who supported ContinuumDAO in its formation in 2023. The airdrop will be as a veCTM token, locked for 4 years and with full voting rights. These community members are currently claiming their veCTM, now that the DAO is live on Linea.
- **Investors - 15%**
    - 15% allocated for VCs: The terms of any allocation to VCs will be determined by DAO voting, including a locking period.

### Utility

- **MPA wallet** — non-custodial MPC self-custody on **user-run nodes** (no vendor database of key shares), **direct web3 protocol trading** without a Private Key, encrypted backup / recovery, optional **eject** to a standard private-key wallet, and AI-assisted workflows
- C3Caller cross-chain message payments (USD and other stable coins, CTM)
- Governance — as veCTM
- Staking to secure the MPC network — as veCTM
- **Subscription through staking** — veCTM attached to your node unlocks **free MPA wallet use** up to the free signature limit (alternative to monthly subscription)
- **Rewards for cross-chain signing** — CTM payments to MPA wallet / node operators in approved Groups

# Ecosystem Development

There will be a grant program for new projects using Continuum. This could be either a grant of CTM, or other tokens from the treasury, or a time-limited reduction in fees for usage of Continuum.

The DAO will assist new projects that wish to use Continuum. This will be in the form of coding support, joint marketing, and technical support as required. These functions will be undertaken and organised by the DAO Guilds.

AssetX is the first such project to receive support from ContinuumDAO, marking ContinuumDAO’s entry into RWA tokenization. ContinuumDAO will be given 49% of the AssetX Security tokens, once these Security tokens are minted (subject to gaining a Security License) and the Continuum MPC is fully decentralized and audited.

Lawracle is another project being jointly developed by ContinuumDAO. It is another service for RWA’s, to create legal certainty around asset tokenization. Lawracle will provide on-chain proofs from law firms that asset tokens are really being backed by real assets and other statements made by web3 protocols are truthful. ContinuumDAO will be allocated 49% of Lawracle’s token supply in return for technical services being provided by DAO members to build it.

This will be the model for the future. Any new protocol is free to use Continuum, without the involvement of the DAO, but some projects may wish to work directly with ContinuumDAO, leveraging its talent pool and grants. If the community decides to, through voting, then ContinuumDAO will form partnerships with some of these projects and take a stake of the new protocol for its Treasury. ContinuumDAO will pro-actively work to build usage of its cross-chain infrastructure and **MPA wallet** ecosystem, use the revenue from this to improve and extend the MPC network, to maintain a security reserve and to increase its reach. **Wallet owners who run nodes** and participate in cross-chain signing share in that growth through **CTM and ETH rewards** and a stronger public MPC fabric.

---
