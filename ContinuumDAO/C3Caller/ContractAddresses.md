## Contract Addresses

> **C3Caller is not yet live.** Protocol contracts and the Relayer / Scanner backend are still in final testing. **No production or public testnet addresses are published here yet.** This page will be updated when deployments go live.

When available, addresses will be listed per network for:

| Contract | Role |
| -------- | ---- |
| **C3UUIDKeeper** | Cross-chain UUID tracking |
| **C3DAppManager** | dApp registration, fees, allowlists |
| **C3Caller** | Outgoing messages and incoming MPC `execute` |
| **Fee token(s)** | Tokens accepted for dApp fee deposits |

### Public testnets

| Network | Chain ID | C3UUIDKeeper | C3DAppManager | C3Caller | Fee token |
| ------- | -------- | ------------ | ------------- | -------- | --------- |
| | | | | | |

### ContinuumDAO production

| Network | C3UUIDKeeper | C3DAppManager | C3Caller | C3Governor | CTM |
| ------- | ------------ | ------------- | -------- | ---------- | --- |
| | | | | | |

Chain IDs used in **`c3transfer`**, **`setPeer`**, and **`_c3call`** are **decimal strings** (e.g. `"97"`, `"421614"`).

Deploy configuration in the repos ([c3caller/deployments.toml](https://github.com/ContinuumDAO/c3caller/blob/main/deployments.toml), [vectm/config/deployments.toml](https://github.com/ContinuumDAO/vectm/blob/main/config/deployments.toml)) is for **internal / staging use only** until launch — do not treat those files as published user-facing addresses.
