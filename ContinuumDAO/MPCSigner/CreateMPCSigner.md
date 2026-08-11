
## Creating an MPC Signer

Nodes in ContinuumDAO play **two differentiated roles** (same install — different Group / KeyGen choices):

1. **MPA wallet** — secure asset custody without a full Private Key; optional AI with a human Accept circuit breaker. Simplest: **2/2 multi-agree**. Start: [MPA wallet Overview](/ContinuumDAO/MPAWallet/Overview.md) → [Install](/ContinuumDAO/MPAWallet/Install.md).
2. **Continuum cross-chain signer** — optional. Larger Groups (**ideally 5+ independent** operators, **3/5 TSS**, **tx-check** KeyGens) that secure C3Caller messaging after a DAO proposal. See [Joining the Continuum](/ContinuumDAO/MPCSigner/JoinNetwork.md).

UI steps common to both paths:

[Nodes that are in your Config](/ContinuumDAO/MPCSigner/ConfiguredNodes.md)

[How to Create a Group](/ContinuumDAO/MPCSigner/Groups.md)

[How to Create a KeyGen](/ContinuumDAO/MPCSigner/KeyGens.md)

[How to Join the Network](/ContinuumDAO/MPCSigner/JoinNetwork.md) (cross-chain role only)

### Related

- [Overview](/ContinuumDAO/MPAWallet/Overview.md)
- [Install a node](/ContinuumDAO/MPAWallet/Install.md)
- [Backup and restoration](/ContinuumDAO/MPAWallet/BackupAndRestoration.md)
- [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md)
