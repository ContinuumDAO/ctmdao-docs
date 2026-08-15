## C3Caller Protocol

### Overview

C3Caller lets a dApp on chain **A** call a function on chain **B** by emitting a message that the Relayer and MPC network verify, sign, and deliver as an `execute` on the destination `C3Caller` contract.

Once a dApp is registered in `C3DAppManager` and its contract addresses are whitelisted with `setDAppAddr`, outgoing calls use the internal **`_c3call`** helper and incoming calls are gated by **`onlyC3Caller`**.

<img src="/_media/C3CallerSchematic.png"  alt=""/>

### How it Works

1. **Outgoing message** — your dApp inherits **`C3CallerDApp`** (or **`CTMERC20`**) and calls **`_c3call`** with string destination address, string chain ID, and calldata. This invokes `C3Caller.c3call`, which emits an event consumed by the Scanner / Relayer.

```solidity
// Internal helper on C3CallerDApp
function _c3call(string memory _to, string memory _toChainID, bytes memory _data)
    internal virtual returns (bytes32);
```

Destinations and chain IDs are **strings** so the same API works for EVM and non-EVM targets. Use OpenZeppelin `Strings` helpers (`address.toHexString()`, `uint256.toString()`) at the call site.

2. **Relayer and MPC network** — the Relayer verifies the source transaction and requests an MPC signature. MPC nodes validate source-chain data before signing the destination `execute`.

3. **Execution and fallback** — `C3Caller` calls the whitelisted target with the supplied calldata. The target returns success/failure; on failure the source dApp’s **`c3Fallback`** / **`_c3Fallback`** runs so you can refund burned tokens or revert local state. During an incoming call, **`_context()`** exposes `uuid`, `fromChainID`, and `sourceTx`.

### Core contracts

| Contract | Role |
| -------- | ---- |
| **`C3Caller`** | Entry point for outgoing `c3call` / incoming `execute`; only MPC may execute. |
| **`C3UUIDKeeper`** | Tracks UUID status for each cross-chain operation. |
| **`C3DAppManager`** | dApp registration (`initDAppConfig`), fee deposits, contract allowlists (`setDAppAddr`), fee configuration. |

ContinuumDAO production deployments will use **UUPS proxies** with the same interface once live (see [Contract Addresses](/ContinuumDAO/C3Caller/ContractAddresses.md)).

### DApp base types

| Type | Use when |
| ---- | -------- |
| **`C3CallerDApp`** | Arbitrary cross-chain contract calls. |
| **`C3GovernDApp`** | Adds a **`gov`** admin (used by CTM and governance contracts). |
| **`CTMERC20`** | Cross-chain ERC-20: **`c3transfer`**, **`c3receive`**, **`setPeer`**, built-in fallback minting. Production reference: **`CTM`** / **`CTMMintable`** in [vectm](https://github.com/ContinuumDAO/vectm). |

### Contract Structure

<img src="/_media/C3CallerContractStructure.png"  alt=""/>

**Roles**

- **Operator (MPC)** — only MPC-signed executors may call `C3Caller.execute` and `onlyC3Caller` functions on dApps.
- **Governance** — DAO / admin controls upgrades, fee rates, and (where applicable) dApp configuration via `C3DAppManager` governance functions.

More: [Overview](/ContinuumDAO/C3Caller/Overview.md) · [Quick Start](/ContinuumDAO/C3Caller/QuickStart.md) · [Contracts](/ContinuumDAO/C3Caller/Contracts.md)
