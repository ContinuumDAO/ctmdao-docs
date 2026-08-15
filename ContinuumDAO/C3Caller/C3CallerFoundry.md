## C3Caller Deployment Using Foundry

This walkthrough deploys the **`DemoToken`** (`CTMERC20` demo from [Simple Demo](/ContinuumDAO/C3Caller/C3CallerDemo.md)) on two testnets, registers the dApp on-chain, and sends a cross-chain transfer.

> **C3Caller is not yet live.** This guide describes the intended workflow for when protocol contracts are deployed. Use addresses from [Contract Addresses](/ContinuumDAO/C3Caller/ContractAddresses.md) once published.

> There is **no registration web UI** yet (coming soon). All registration steps use **`C3DAppManager`** directly.

### Prerequisites

- [Foundry](https://book.getfoundry.sh/getting-started/installation) installed
- Testnet gas tokens on your chosen source and destination chains
- Accepted fee token on both chains (see [Contract Addresses](/ContinuumDAO/C3Caller/ContractAddresses.md) when live)

### Create a project

```bash
forge init c3caller-dapp && cd c3caller-dapp
forge install ContinuumDAO/c3caller OpenZeppelin/openzeppelin-contracts
```

Add to `remappings.txt`:

```
@c3caller/=lib/c3caller/src/
@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/
```

Set **`foundry.toml`** compiler to **`solc = "0.8.27"`** (required by c3caller).

### Environment

Create `.env` (example — replace `<…>` with live addresses when available):

```bash
ARB_SEPOLIA_RPC_URL=https://sepolia-rollup.arbitrum.io/rpc
BSC_TESTNET_RPC_URL=https://bsc-testnet-dataseed.bnbchain.org/
PRIVATE_KEY=0x...

C3_CALLER=<C3Caller address>
DAPP_MANAGER=<C3DAppManager address>
FEE_TOKEN=<fee token address>

DAPP_KEY="v1.myprotocol.demotoken"
METADATA='{"version":1,"name":"Demo","description":"Demo cross-chain token","email":"you@example.com","url":"example.com"}'
```

Add RPC aliases to `foundry.toml`:

```toml
[rpc_endpoints]
arbSepolia = "${ARB_SEPOLIA_RPC_URL}"
bscTestnet = "${BSC_TESTNET_RPC_URL}"
```

### Implement DemoToken

Create `src/DemoToken.sol` using the contract from [Simple Demo](/ContinuumDAO/C3Caller/C3CallerDemo.md).

```bash
forge build
```

### Register the dApp (each chain)

On **Arbitrum Sepolia**:

```bash
source .env
export ADMIN=$(cast wallet address $PRIVATE_KEY)

cast call $DAPP_MANAGER "deriveDAppID(address,string)(uint256)" $ADMIN "$DAPP_KEY" --rpc-url arbSepolia

cast send $FEE_TOKEN "approve(address,uint256)" $DAPP_MANAGER $(cast max-uint) \
  --rpc-url arbSepolia --private-key $PRIVATE_KEY

cast send $DAPP_MANAGER "initDAppConfig(string,address,string)" "$DAPP_KEY" $FEE_TOKEN "$METADATA" \
  --rpc-url arbSepolia --private-key $PRIVATE_KEY

export DAPP_ID=$(cast call $DAPP_MANAGER "deriveDAppID(address,string)(uint256)" $ADMIN "$DAPP_KEY" --rpc-url arbSepolia)
echo "dApp ID: $DAPP_ID"
```

Repeat **`approve`** + **`initDAppConfig`** on **BSC Testnet** with the **same** `DAPP_KEY` and admin wallet.

Alternatively, use the [InitC3DApp.s.sol](https://github.com/ContinuumDAO/c3caller/blob/main/script/InitC3DApp.s.sol) script from the c3caller repo.

### Deploy DemoToken

Arbitrum Sepolia:

```bash
forge create src/DemoToken.sol:DemoToken \
  --rpc-url arbSepolia --private-key $PRIVATE_KEY \
  --constructor-args $C3_CALLER $DAPP_ID

export ARB_DEMO=<Deployed address>
```

BSC Testnet (same `DAPP_ID`):

```bash
forge create src/DemoToken.sol:DemoToken \
  --rpc-url bscTestnet --private-key $PRIVATE_KEY \
  --constructor-args $C3_CALLER $DAPP_ID

export BSC_DEMO=<Deployed address>
```

### Whitelist and configure peers

On each chain:

```bash
cast send $DAPP_MANAGER "setDAppAddr(uint256,address,bool)" $DAPP_ID $ARB_DEMO true \
  --rpc-url arbSepolia --private-key $PRIVATE_KEY

cast send $DAPP_MANAGER "setDAppAddr(uint256,address,bool)" $DAPP_ID $BSC_DEMO true \
  --rpc-url bscTestnet --private-key $PRIVATE_KEY
```

On each chain, call **`setPeer`** with the **0x-prefixed hex string** of the sister deployment (same format as OpenZeppelin `Strings.toHexString(address)`):

```bash
cast send $ARB_DEMO "setPeer(string,string)" "97" "0xYourBscDemoTokenAddress" \
  --rpc-url arbSepolia --private-key $PRIVATE_KEY

cast send $BSC_DEMO "setPeer(string,string)" "421614" "0xYourArbDemoTokenAddress" \
  --rpc-url bscTestnet --private-key $PRIVATE_KEY
```

Fund fee reserves if needed:

```bash
cast send $DAPP_MANAGER "deposit(uint256,address,uint256)" $DAPP_ID $FEE_TOKEN 1000000000000000000 \
  --rpc-url arbSepolia --private-key $PRIVATE_KEY
```

(Approve `FEE_TOKEN` for `DAPP_MANAGER` first.)

### Mint and cross-chain transfer

Mint on Arbitrum Sepolia:

```bash
cast send $ARB_DEMO "mint(uint256)" 100000000000000000000 --rpc-url arbSepolia --private-key $PRIVATE_KEY
```

Transfer 25 tokens to your address on BSC (chain ID **`"97"`**). The recipient must be a **hex string** (same as `address.toHexString()`):

```bash
export RECIPIENT=$(cast wallet address $PRIVATE_KEY)
cast send $ARB_DEMO "c3transfer(string,uint256,string)" "$RECIPIENT" 25000000000000000000 "97" \
  --rpc-url arbSepolia --private-key $PRIVATE_KEY
```

The Relayer and MPC network process the message; after a few minutes check balances on BSC:

```bash
cast call $BSC_DEMO "balanceOf(address)(uint256)" $RECIPIENT --rpc-url bscTestnet
```

### Related

- [Simple Demo (CTMERC20)](/ContinuumDAO/C3Caller/C3CallerDemo.md)
- [Quick Start](/ContinuumDAO/C3Caller/QuickStart.md)
- [Contract Addresses](/ContinuumDAO/C3Caller/ContractAddresses.md)
- [c3caller repository](https://github.com/ContinuumDAO/c3caller)
