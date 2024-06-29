## C3Caller Deployment Using Foundry

These following steps are just an example, we encourage you to develop your own ideas and create a personalized dApp.

### Register dApp

1. Open [Register your dApp](https://c3caller.continuumdao.org/dapp).
2. Click “dApp Register”.

<img src="/_media/C3CallerTest-1.png"  alt=""/>

3. Confirm the transaction in your wallet.
4. Refresh the page, and take note of the dApp ID you are given.

<img src="/_media/C3CallerTest-2.png"  alt=""/>

### Install Foundry

Once you have registered your dApp and obtained a unique dApp ID, it is time to install Foundry.

You can install Foundry by following these [instructions](https://book.getfoundry.sh/getting-started/installation).

### Create a Foundry Project

Create a Foundry project where we will build, test, deploy and interact with our C3Caller dApp:

```bash
forge init c3caller-dapp
cd c3caller-dapp/
```

You will see some default contracts in `src/`, `test/` and `script/`.

### Install Dependencies

Next, install the OpenZeppelin dependencies which are required by C3Caller:

```bash
forge install OpenZeppelin/openzeppelin-contracts
```

Configure dependency remappings:

```bash
echo "@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/" > remappings.txt
```

Copy the C3CallerDapp abstract contract and IC3Caller into your `src/` folder:

```bash
wget https://raw.githubusercontent.com/ContinuumDAO/router-contract/main/contracts/protocol/C3CallerDapp.sol -P src/
wget https://raw.githubusercontent.com/ContinuumDAO/router-contract/main/contracts/protocol/IC3Caller.sol -P src/
```

### Setup Environment

Create a `.env` file to store private keys, RPC URLs and Etherscan API keys:

```bash
touch .env
```

In this example we will make a cross-chain transaction from Arbitrum Sepolia testnet to BSC Testnet. Paste the following into your `.env` file, adding in your own private key:

```bash
ARB_SEPOLIA_RPC_URL=https://sepolia-rollup.arbitrum.io/rpc
BSC_TESTNET_RPC_URL=https://bsc-testnet-dataseed.bnbchain.org/
ARB_SEPOLIA_C3_ENDPOINT=0xeC1f296fC2Dd0FFf803c30DBD315b5457aFaA8B3
BSC_TESTNET_C3_ENDPOINT=0x088A7e395981B2d5230c4f0d6273594c1ff40179
PRIVATE_KEY=0xabc123...
```

> Note
> Make sure your account has ETH on Arbitrum Sepolia, and BNB on BSC Testnet.

Source `.env`:

```bash
source .env
```

Add the aliases to your `foundry.toml`:

```
[rpc_endpoints]
arbSepolia = "${ARB_SEPOLIA_RPC_URL}"
bscTestnet = "${BSC_TESTNET_RPC_URL}"
```

### Implement C3CallerDapp

Remove the files in `src/`, `test/` and `script/` and create `src/CToken.sol:

```bash
rm src/Counter.sol test/Counter.t.sol script/Counter.s.sol
touch src/CToken.sol
```

Paste the following in `src/CToken.sol`:

```solidity
// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./C3CallerDapp.sol";


contract CToken is ERC20, C3CallerDapp {
    using Strings for *;

    uint8 private _decimals;

    bytes4 public FuncCrossIn = bytes4(keccak256("crossIn(address,uint256)"));

    constructor(
        string memory name_,
        string memory symbol_,
        address c3callerProxy_,
        uint256 dappID_,
        uint8 decimals_
    ) ERC20(name_, symbol_) C3CallerDapp(c3callerProxy_, dappID_) {
        _decimals = decimals_;
        _mint(msg.sender, 100 * 10 ** _decimals);
    }

    function claim(uint256 amount) public {
        _mint(msg.sender, amount);
    }

    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }

    function crossTo(
        uint256 chainID_,
        address ctokenAddr_,
        uint256 amount_
    ) public {
        _burn(msg.sender, amount_);

        c3call(
            ctokenAddr_.toHexString(),
            chainID_.toString(),
            abi.encodeWithSignature(
                "crossIn(address,uint256)",
                msg.sender,
                amount_
            )
        );
    }

    function crossIn(
        address to_,
        uint256 amount_
    ) external onlyCaller returns (bool) {
        _mint(to_, amount_);
        return true;
    }

    function _c3Fallback(
        bytes4 selector,
        bytes calldata data_,
        bytes calldata /*reason_*/
    ) internal override returns (bool) {
        (address to, uint256 amount) = abi.decode(data_, (address, uint256));
        require(to != address(0), "empty to");
        require(amount > 0, "empty amount");
        if (selector == FuncCrossIn) {
            _mint(to, amount);
            return true;
        } else {
            return false;
        }
    }

    function isVaildSender(address /*txSender*/) external pure returns (bool){
        return true;
    }
}
```

### Compile the dApp

Run the following command to compile your contracts:

```bash
forge build
```

### Deploy the dApp to Arbitrum Sepolia (Chain A)

Deploy the dApp to Arbitrum Sepolia, using the dApp ID you were provided with after registration:

```bash
forge create --rpc-url arbSepolia --private-key $PRIVATE_KEY src/CToken.sol:CToken --constructor-args "CToken" "CTN" $ARB_SEPOLIA_C3_ENDPOINT <DAPP_ID> 18
```

Copy the address (the address listed after "Deployed to: ") of the contract that was deployed and go back to the dApp registry. We will refer to it as `<ARB_CTOKEN>`.

### Add Contract to dApp

Click on the plus sign to add contract addresses to your dApp, and select Arbitrum Sepolia chain.

Enter the address of the deployed contract, and sign the transaction.

You must add some fees to cover gas on the destination chain, and you can do this from you dApp admin page. Adding 5-10 testnet CTM should cover it. You can go to the faucet if you require testnet CTM.

### Deploy the dApp to BSC Testnet (Chain B)

Deploy the dApp to BSC Testnet, using the same dApp ID from before:

```bash
forge create --rpc-url bscTestnet --private-key $PRIVATE_KEY src/CToken.sol:CToken --constructor-args "CToken" "CTN" $BSC_TESTNET_C3_ENDPOINT <DAPP_ID> 18
```

Make a note of the deployed contract address (the address listed after "Deployed to: "), we will refer to it as `<BSC_CTOKEN>`.

Since this contract is the recipient of the cross-chain message, no further action is required.

### Read Total Supplies

Before running the transaction, we will read the total supplies of the token on Arbitrum Sepolia and BSC Testnet:

```bash
cast call <ARB_CTOKEN> "totalSupply()(uint256)" --rpc-url arbSepolia

# output -> 100000000000000000000 [1e20]
```

```bash
cast call <BSC_CTOKEN> "totalSupply()(uint256)" --rpc-url bscTestnet

# output -> 100000000000000000000 [1e20]
```

Paste the resulting total supplies into a unit conversion:

```bash
cast to-unit 100000000000000000000 ether

# output -> 100
```

We can see that the total supply of CToken on both Arbitrum Sepolia and BSC Testnet are 100 CTN.

We are now ready to make the cross-chain transaction.

### Cross-chain Transaction

Let's make a transfer of some tokens from Arbitrum Sepolia to BSC Testnet.

```bash
cast send <ARB_CToken> "crossTo(uint256,address,uint256)()" 97 <BSC_CToken> 25ether --rpc-url arbSepolia --private-key $PRIVATE_KEY
```

Our transaction has now been relayed to the C3Caller and will soon be executed on the destination chain. This should take around five minutes.

### Check Results of Transaction

We can right away observe the change to the total supply of CToken on Arbitrum Sepolia:

```bash
cast call <ARB_CToken> "totalSupply()(uint256)" --rpc-url arbSepolia

# output -> 75000000000000000000 [7.5e19]
```

After a few minutes we will observe the change to the total supply of CToken on BSC Testnet:

```bash
cast call <BSC_CToken> "totalSupply()(uint256)" --rpc-url bscTestnet

# output -> 125000000000000000000 [1.25e20]
```

Paste the resulting total supplies into a unit conversion:

```bash
cast to-unit 75000000000000000000 ether

# output -> 25
```

```bash
cast to-unit 125000000000000000000 ether

# output -> 125
```

The cross-chain transaction has executed successfully.