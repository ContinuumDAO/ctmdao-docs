## Introduction


ContinuumDAO offers an essential service: a state-of-the-art peer-to-peer node based Multi-Party Computation network for blockchain inter-operability and MPC wallets.

Our smart contracts have full multi-chain inter-operability with many EVMs and soon with non-EVMs. 

This technology runs on the Continuum network, built using Secure Multiple Party Computation (SMPC) and secured with Threshold Signature Scheme (TSS) at its core — **CGGMP24** for ECDSA (secp256k1) and **FROST** for EdDSA (Ed25519), as maintained by the [Lockness](https://www.lfdecentralizedtrust.org/projects/lockness) project under LF Decentralized Trust (Linux Foundation). It runs on a peer-to-peer node network that collectively signs transactions.

The same node software serves **two roles**: (1) **MPA wallets** — an **AI-first** wallet with a **rich frontend** for full manual operation, **fully decentralized** custody on nodes you deploy (no vendor database of key shares; encrypted backups and optional **eject** to a standard private-key wallet), with optional AI and a human-in-the-loop Accept circuit breaker (simplest **2/2**); every spend runs through the [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md); (2) **cross-chain Continuum signing** — larger Groups (ideally **5+ independent** operators, **3/5 TSS**) that secure messaging between chains. Details: [MPA wallet Overview](/ContinuumDAO/MPAWallet/Overview.md). The Continuum allows all EVMs and almost all non-EVMs to connect.

The Continuum will be used whenever an agreement on the network needs to be reached before a transaction can happen or when a single party wishes only to trust a transaction collectively signed by a specific group. Threshold signatures use **CGGMP24** and **FROST** (Lockness / LF Decentralized Trust), ensuring that no parties can act maliciously without colluding at the required threshold.

As a key part of our architecture, ContinuumDAO acts as an independent controller of the protocol, which does not have allegiance to any person, company, or protocol. It is a DAO controlled through voting by token holders.

### Related

- [MPA wallet Overview](/ContinuumDAO/MPAWallet/Overview.md)
- [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md)
- [Install a node](/ContinuumDAO/MPAWallet/Install.md)
- [What is MPC?](/ContinuumDAO/MPC/WhatIsMPC.md)
- [C3Caller Overview](/ContinuumDAO/C3Caller/Overview.md)
- [Our White Paper](/ContinuumDAO/WhitePaper.md)
