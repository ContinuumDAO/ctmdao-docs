## Overview

C3Caller is an open-source messaging protocol for building multi-chain, interoperable applications. Developers register a dApp on each chain they want to connect, deploy contracts that inherit `C3CallerDApp` (or `CTMERC20` for fungible cross-chain tokens), and send arbitrary calldata through the Continuum MPC network.

The current contract suite lives in the [c3caller](https://github.com/ContinuumDAO/c3caller) repository (Solidity **0.8.27**, OpenZeppelin **5.4**). Production deployments used by ContinuumDAO (CTM, C3Governor) are built on top of this stack in [vectm](https://github.com/ContinuumDAO/vectm).

> **C3Caller is not yet live.** The protocol contracts, Relayer, and Scanner are in final testing. [Contract addresses](/ContinuumDAO/C3Caller/ContractAddresses.md) will be published when deployments go live.

> **C3Caller Hub (coming soon)** — a web UI to register dApps, manage contract allowlists, and top up fee balances is in development. Until launch, the guides below describe the **intended** on-chain workflow via `C3DAppManager` (see [Quick Start](/ContinuumDAO/C3Caller/QuickStart.md)).

### Security audit

The C3Caller / vectm contract suite was reviewed by **QuillAudits** (Dec 2025). Audit details: [QuillAudits leaderboard — ContinuumDAO](https://www.quillaudits.com/leaderboard/continuumdao). Additional audit artifacts are published in [vectm/audits](https://github.com/ContinuumDAO/vectm/tree/main/audits).

## Why C3Caller?

C3Caller is a fully open-source, decentralized cross-chain messaging protocol developed and governed by ContinuumDAO. Smart contracts on each chain separate **governance** (DAO voting) from **operational** execution (MPC-signed `execute` calls). Cross-chain messages are verified by MPC nodes and relayed to destination chains.

<img src="/_media/C3CallerSchematic.png"  alt=""/>

## Advantages

- **Decentralization** — governance and operator roles are separated; only the MPC network may execute incoming cross-chain calls.
- **Security** — operational signing keys live in the MPC network; source-chain transactions are verified before a destination `execute`.
- **Extensibility** — verification modules can be extended per chain without changing the core messaging model.
- **Generalizability** — arbitrary contract calls, liquidity routing, governance broadcast, and cross-chain ERC-20 transfers (`CTMERC20`) share the same plumbing.
- **Billing** — post-paid from a per-dApp fee deposit; payload billed per byte, execution billed per gas (see [Protocol](/ContinuumDAO/C3Caller/C3CallerProtocol.md)).
- **Fallback** — failed destination execution triggers `_c3Fallback` on the source dApp so tokens or state can be restored.
- **Permissionless (at launch)** — anyone will be able to register a dApp on-chain with `initDAppConfig` and whitelist their own contracts with `setDAppAddr`.
- **High concurrency** — dApps may use multiple MPC groups / addresses to avoid nonce bottlenecks.

More detail: [C3Caller Protocol](/ContinuumDAO/C3Caller/C3CallerProtocol.md) · [Quick Start](/ContinuumDAO/C3Caller/QuickStart.md) · [Simple Demo (CTMERC20)](/ContinuumDAO/C3Caller/C3CallerDemo.md)
