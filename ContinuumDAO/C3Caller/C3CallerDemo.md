## Simple Demo — cross-chain ERC-20 with CTMERC20

The recommended pattern for a fungible cross-chain token is to inherit **`CTMERC20`** from the [c3caller](https://github.com/ContinuumDAO/c3caller) package. ContinuumDAO’s production **`CTM`** token in [vectm](https://github.com/ContinuumDAO/vectm/blob/main/src/token/ctm/CTM.sol) extends this base with fee logic and treasury integration; the demo below shows the minimal hooks required for a testnet token.

`CTMERC20` burns on the source chain, **`_c3call`**s a **`c3receive`** on the peer contract, and mints on the destination. Failed deliveries refund via **`_c3Fallback`**.

### Minimal demo token

```solidity
// SPDX-License-Identifier: BSL-1.1
pragma solidity 0.8.27;

import {CTMERC20} from "@c3caller/token/CTMERC20.sol";

/// @notice Minimal CTMERC20 demo — see vectm/src/token/ctm/CTM.sol for production CTM.
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

Register the dApp and whitelist deployments as described in [Quick Start](/ContinuumDAO/C3Caller/QuickStart.md), then on **each** network:

1. Deploy `DemoToken` with the local **`C3Caller`** address and your **`dappID`**.
2. Call **`setDAppAddr`** on `C3DAppManager`.
3. Call **`setPeer(toChainIDStr, peerAddressStr)`** pointing at the sister deployment on the other chain(s).

### Send tokens cross-chain

Users call **`c3transfer`** (or **`c3transferFrom`**) with **string** destination address and chain ID:

```solidity
// Transfer 25 DEMO from this chain to `recipient` on BSC Testnet (chain ID "97")
demoToken.c3transfer(recipient.toHexString(), 25 ether, "97");
```

Under the hood this:

1. Burns `25 ether` locally and updates **`globalSupply`** (if you implement decrement on burn — for simple demos mint-only, `_decrementGlobalSupply` can mirror burn in an override or you burn without changing global cap).
2. Builds calldata for **`c3receive(fromStr, toStr, amount)`** on the peer.
3. Calls **`_c3call(peers["97"], "97", data)`**.

### Receive on the destination

No custom receive logic is required — **`c3receive`** is implemented on `CTMERC20`:

```solidity
function c3receive(string memory _fromStr, string memory _toStr, uint256 _amount) external virtual onlyC3Caller {
    address _to = _toStr.toAddress();
    _mint(_to, _amount);
    // ...
}
```

Only **`C3Caller`** (via MPC **`execute`**) may call this function.

### Fallback (failed destination execution)

If the destination **`c3receive`** reverts, the source chain runs **`_c3Fallback`**, which re-mints burned tokens to the original sender:

```solidity
function _c3Fallback(bytes4 _selector, bytes calldata _data, bytes calldata _reason)
    internal virtual override returns (bool)
{
    if (_selector == this.c3receive.selector) {
        (string memory _fromStr, , uint256 _amount) = abi.decode(_data, (string, string, uint256));
        address _from = _fromStr.toAddress();
        _mint(_from, _amount);
        emit C3Refund(_from, "", _amount, _reason);
        return true;
    }
    return false;
}
```

### Production reference — CTM (vectm)

The live Continuum token adds governance, cross-chain fee deduction, and dApp fee-deposit helpers on top of `CTMERC20`:

- **`CTM.sol`** — production token with transfer fees and `depositDAppRemote` / `depositDAppLocal`.
- **`CTMMintable.sol`** — governance **`mint`** / **`burn`** with **`globalSupply`** cap enforcement.

See [vectm tests](https://github.com/ContinuumDAO/vectm/blob/main/test/token/CTM.t.sol) for full integration examples with `C3DAppManager` deposits and peer configuration.

### Next steps

- [Deployment with Foundry](/ContinuumDAO/C3Caller/C3CallerFoundry.md) — end-to-end deploy and `c3transfer` between testnets.
- [Deployment with Remix](/ContinuumDAO/C3Caller/C3CallerTest.md) — flatten-and-deploy workflow.
- [Contract Addresses](/ContinuumDAO/C3Caller/ContractAddresses.md) — published when C3Caller goes live
