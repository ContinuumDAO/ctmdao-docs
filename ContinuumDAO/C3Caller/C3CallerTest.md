## C3Caller with Remix

This guide deploys the **`CTMERC20`** demo token via [Remix](https://remix.ethereum.org/). For a full Foundry workflow, see [Deployment with Foundry](/ContinuumDAO/C3Caller/C3CallerFoundry.md).

> **C3Caller is not yet live.** This guide describes the intended workflow for when protocol contracts are deployed.

> **Registration:** there is no live dApp registration frontend (coming soon). Register on-chain first — see [Quick Start](/ContinuumDAO/C3Caller/QuickStart.md) — once contracts are live.

### 1. Register the dApp on-chain

On each testnet you plan to use (when live):

1. Approve the fee token for **`C3DAppManager`** on that chain.
2. Call **`initDAppConfig(dappKey, feeToken, metadata)`** with the **same admin wallet and dappKey** on every chain.
3. Note your **`dappID`**: `deriveDAppID(admin, dappKey)` on `C3DAppManager`.

Use [Remix “Deploy & Run”](https://remix.ethereum.org/) with the **`C3DAppManager`** ABI, or `cast send` as shown in Quick Start. Contract addresses: [Contract Addresses](/ContinuumDAO/C3Caller/ContractAddresses.md).

### 2. Prepare flattened contracts

Remix works best with flattened sources. From a local clone of [c3caller](https://github.com/ContinuumDAO/c3caller):

```bash
git clone https://github.com/ContinuumDAO/c3caller.git
cd c3caller
forge install
./helpers/0-flatten.sh   # writes build/token/CTMERC20.sol and other artifacts
```

Upload **`build/token/CTMERC20.sol`** (or the whole `build/` folder) into Remix.

### 3. Create DemoToken.sol in Remix

Add a new file **`DemoToken.sol`**:

```solidity
// SPDX-License-Identifier: BSL-1.1
pragma solidity 0.8.27;

import "./CTMERC20.sol";  // flattened file from c3caller build/

contract DemoToken is CTMERC20 {
    constructor(address _c3caller, uint256 _dappID)
        CTMERC20("Demo Token", "DEMO", _c3caller, _dappID)
    {}

    function _incrementGlobalSupply(uint256 _amount) internal override {
        globalSupply += _amount;
    }

    function _decrementGlobalSupply(uint256 _amount) internal override {
        globalSupply -= _amount;
    }

    function mint(uint256 _amount) external {
        _incrementGlobalSupply(_amount);
        _mint(msg.sender, _amount);
    }
}
```

Compile with Solidity **0.8.27**.

### 4. Deploy on chain A

Constructor arguments:

| Field | Value |
| ----- | ----- |
| `_c3caller` | `C3Caller` address on this chain (see [Contract Addresses](/ContinuumDAO/C3Caller/ContractAddresses.md)) |
| `_dappID` | Your derived dApp ID from registration |

Deploy and save the contract address.

### 5. Whitelist the deployment

In Remix, attach to **`C3DAppManager`** on the same chain and call:

```
setDAppAddr(dappID, demoTokenAddress, true)
```

### 6. Deploy on chain B

Use the **same `dappID`** and the **`C3Caller`** address on the destination chain. Whitelist with **`setDAppAddr`** there as well.

### 7. Configure peers

On each `DemoToken` deployment, call **`setPeer(toChainIDStr, peerAddressStr)`** pointing at the sister deployment. Chain IDs and addresses are **strings**.

### 8. Test a transfer

On the source chain (once the Relayer is live):

1. Call **`mint`** to fund your wallet.
2. Call **`c3transfer(recipientHexString, amount, toChainIDStr)`**.

After the Relayer processes the message, check **`balanceOf`** on the destination deployment.

### Contract addresses

See [Contract Addresses](/ContinuumDAO/C3Caller/ContractAddresses.md) — published when C3Caller goes live.

### Related

- [Simple Demo (CTMERC20)](/ContinuumDAO/C3Caller/C3CallerDemo.md) — API explanation
- [Quick Start](/ContinuumDAO/C3Caller/QuickStart.md) — registration details
- Production **`CTM`** reference: [vectm/src/token/ctm/CTM.sol](https://github.com/ContinuumDAO/vectm/blob/main/src/token/ctm/CTM.sol)
