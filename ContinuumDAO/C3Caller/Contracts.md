## Contracts

Smart contracts ship from the [c3caller](https://github.com/ContinuumDAO/c3caller) repository. Install as a dependency:

```bash
forge install ContinuumDAO/c3caller
# or: forge soldeer install @c3caller~0.3.1
```

Solidity **0.8.27**, OpenZeppelin Contracts **5.4.0**.

### Protocol layer

| Contract | Path | Purpose |
| -------- | ---- | ------- |
| **C3Caller** | `src/C3Caller.sol` | Outgoing `c3call` events; incoming MPC `execute`. |
| **C3UUIDKeeper** | `src/uuid/C3UUIDKeeper.sol` | UUID lifecycle / completion tracking. |
| **C3DAppManager** | `src/dapp/C3DAppManager.sol` | dApp registration, fees, allowlists. |

Upgradeable variants live under `src/upgradeable/` for production proxy deployments (used by [vectm](https://github.com/ContinuumDAO/vectm)).

### DApp bases

| Contract | Path | Purpose |
| -------- | ---- | ------- |
| **C3CallerDApp** | `src/dapp/C3CallerDApp.sol` | Abstract base: `_c3call`, `_c3Fallback`, `onlyC3Caller`. |
| **C3GovernDApp** | `src/gov/C3GovernDApp.sol` | Adds **`gov`** admin role. |
| **CTMERC20** | `src/token/CTMERC20.sol` | Cross-chain ERC-20: `c3transfer`, `c3receive`, `setPeer`. |

### Production tokens (vectm)

| Contract | Repository | Purpose |
| -------- | ---------- | ------- |
| **CTM** | [vectm/src/token/ctm/CTM.sol](https://github.com/ContinuumDAO/vectm/blob/main/src/token/ctm/CTM.sol) | Production Continuum token on top of `CTMERC20`. |
| **CTMMintable** | [vectm/src/token/ctm/CTMMintable.sol](https://github.com/ContinuumDAO/vectm/blob/main/src/token/ctm/CTMMintable.sol) | Governance-controlled mint/burn with global supply cap. |
| **C3Governor** | vectm | Cross-chain OpenZeppelin Governor broadcasts. |

### Security

Audited by **QuillAudits** (Dec 2025): [leaderboard entry](https://www.quillaudits.com/leaderboard/continuumdao) · [vectm/audits](https://github.com/ContinuumDAO/vectm/tree/main/audits).

### Related

- [Contract Addresses](/ContinuumDAO/C3Caller/ContractAddresses.md)
- [Quick Start](/ContinuumDAO/C3Caller/QuickStart.md)
- [Protocol](/ContinuumDAO/C3Caller/C3CallerProtocol.md)
