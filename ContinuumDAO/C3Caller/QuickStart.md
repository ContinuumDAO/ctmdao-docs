## Quick Start

> **C3Caller is not yet live.** The steps below describe the workflow for when protocol contracts are deployed. See [Contract Addresses](/ContinuumDAO/C3Caller/ContractAddresses.md) for launch status.

### 1. Register your dApp (on-chain)

There is **no live registration frontend** yet (C3Caller Hub — coming soon). When live, register on each network where you want to send or receive messages.

On every chain, call **`C3DAppManager.initDAppConfig`** with:

1. **`dappKey`** — a stable string you reuse on all chains, e.g. `v1.myprotocol.demotoken`. The dApp ID is derived deterministically from your address + key via `deriveDAppID(creator, dappKey)`.
2. **`feeToken`** — a token accepted on that chain (inspect `C3DAppManager` for valid fee tokens once deployed — see [Contract Addresses](/ContinuumDAO/C3Caller/ContractAddresses.md)).
3. **`metadata`** — JSON metadata (name, description, email, url) — see the [c3caller README](https://github.com/ContinuumDAO/c3caller#metadata).

> **Important:** use the **same creator wallet and dappKey on every chain**. A different account or key produces a different dApp ID and your deployments will not interoperate.

Before `initDAppConfig`, **approve** the fee token for `C3DAppManager` (at least the minimum deposit for that token). The registration call pulls the minimum deposit automatically.

Example (Foundry `cast` — replace placeholders with live addresses from [Contract Addresses](/ContinuumDAO/C3Caller/ContractAddresses.md) when available):

```bash
export DAPP_MANAGER=<C3DAppManager address on this chain>
export FEE_TOKEN=<accepted fee token on this chain>
export DAPP_KEY="v1.myprotocol.demotoken"
export METADATA='{"version":1,"name":"Demo","description":"Demo cross-chain token","email":"you@example.com","url":"example.com"}'

# Preview the dApp ID (must match on every chain)
cast call $DAPP_MANAGER "deriveDAppID(address,string)(uint256)" $YOUR_ADDRESS "$DAPP_KEY" --rpc-url $ARB_SEPOLIA_RPC_URL

cast send $FEE_TOKEN "approve(address,uint256)" $DAPP_MANAGER $(cast max-uint) --rpc-url $ARB_SEPOLIA_RPC_URL --private-key $PRIVATE_KEY

cast send $DAPP_MANAGER "initDAppConfig(string,address,string)" "$DAPP_KEY" $FEE_TOKEN "$METADATA" \
  --rpc-url $ARB_SEPOLIA_RPC_URL --private-key $PRIVATE_KEY
```

Repeat on each destination chain. The [InitC3DApp.s.sol](https://github.com/ContinuumDAO/c3caller/blob/main/script/InitC3DApp.s.sol) script in the c3caller repo automates this from `deployments.toml`.

### 2. Deploy your dApp contract

Install the library:

```bash
forge install ContinuumDAO/c3caller
# or: forge soldeer install @c3caller~0.3.1
```

Your contract inherits **`C3CallerDApp`** (arbitrary messaging) or **`CTMERC20`** (cross-chain ERC-20 — recommended for fungible tokens; see [Simple Demo](/ContinuumDAO/C3Caller/C3CallerDemo.md) and the production **`CTM`** token in [vectm](https://github.com/ContinuumDAO/vectm/blob/main/src/token/ctm/CTM.sol)).

Constructor arguments:

1. **`c3caller`** — the `C3Caller` contract on this network (not a legacy “proxy endpoint”).
2. **`dappID`** — from step 1 (`deriveDAppID` or the return value of `initDAppConfig`).

### 3. Whitelist deployed addresses

On each network, the dApp admin calls:

```bash
cast send $DAPP_MANAGER "setDAppAddr(uint256,address,bool)" $DAPP_ID $YOUR_CONTRACT true \
  --rpc-url $RPC_URL --private-key $PRIVATE_KEY
```

Only whitelisted contracts may send or receive C3Caller messages for that dApp ID.

### 4. Fund fee reserves

Top up the dApp’s fee balance when needed:

```bash
cast send $FEE_TOKEN "approve(address,uint256)" $DAPP_MANAGER $AMOUNT --rpc-url $RPC_URL --private-key $PRIVATE_KEY
cast send $DAPP_MANAGER "deposit(uint256,address,uint256)" $DAPP_ID $FEE_TOKEN $AMOUNT \
  --rpc-url $RPC_URL --private-key $PRIVATE_KEY
```

On public testnets, fee tokens will be documented at launch — see [Contract Addresses](/ContinuumDAO/C3Caller/ContractAddresses.md).

### 5. For CTMERC20 tokens — configure peers

Cross-chain ERC-20 dApps must map sister deployments:

```bash
cast send $YOUR_TOKEN "setPeer(string,string)" "97" $BSC_DEPLOYED_ADDRESS_HEX \
  --rpc-url $ARB_SEPOLIA_RPC_URL --private-key $PRIVATE_KEY
```

Chain IDs and peer addresses are **strings** (EVM addresses as hex strings) for non-EVM compatibility.

### Contract implementation sketch

```solidity
import {C3CallerDApp} from "@c3caller/dapp/C3CallerDApp.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

contract MyDApp is C3CallerDApp {
    using Strings for address;

    constructor(address _c3caller, uint256 _dappID) C3CallerDApp(_c3caller, _dappID) {}

    function onMessage(string calldata msg_) external onlyC3Caller {
        // handle incoming execute
    }

    function sendMessage(address peer, string memory toChainID, string memory msg_) external {
        bytes memory data = abi.encodeWithSelector(this.onMessage.selector, msg_);
        _c3call(peer.toHexString(), toChainID, data);
    }

    function _c3Fallback(bytes4, bytes calldata, bytes calldata) internal override returns (bool) {
        return false;
    }
}
```

Full walkthroughs: [Deployment with Foundry](/ContinuumDAO/C3Caller/C3CallerFoundry.md) · [Deployment with Remix](/ContinuumDAO/C3Caller/C3CallerTest.md) · [Simple Demo (CTMERC20)](/ContinuumDAO/C3Caller/C3CallerDemo.md)

Open-source contracts: [github.com/ContinuumDAO/c3caller](https://github.com/ContinuumDAO/c3caller)
