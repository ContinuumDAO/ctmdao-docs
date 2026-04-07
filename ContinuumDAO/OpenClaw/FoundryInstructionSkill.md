## Foundry skills for MPA wallet Open Claw

The use of the Open Claw MPA wallet assumes that you have set up a KeyGen with MsgCheck "multi-agree" and Key type secp256k1. You can copy the KeyGenId from the Keys page in [MPA wallet](https://mpa.continuumdao.org) and Open Claw will ask you for this through the communications channel (e.g. Telegram)

Foundry is a dependency for using MPA wallet with a AI agent. You can install it using the instructions [here](https://www.getfoundry.sh/). Basically -

```
curl -L https://foundry.paradigm.xyz | bash && foundryup
```

Then make sure that you get a response from 

```
forge --version
```
You may need to adjust your $PATH or source ~/.bashrc

Here we focus on how the AI model needs to interact with Foundry

### KeyGen Registration

You will need to get an RPC for Linea Mainnet

```
curl http://127.0.0.1:8080/getChainDetails?chain_id=59144 |jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   261  100   261    0     0  40832      0 --:--:-- --:--:-- --:--:-- 43500
{
  "Code": 0,
  "Error": "",
  "Data": {
    "chainId": "59144",
    "chainName": "Linea Mainnet",
    "rpcGateway": "https://linea-rpc.publicnode.com",
    "explorer": "https://lineascan.build",
    "legacy": false,
    "testnet": false,
    "baseFee": null,
    "priorityFee": null,
    "updatedAt": "2026-03-30T09:18:41Z"
  }
}
```

The RPC URL is in the response at Data.explorer

If that does not work, use the default value "https://linea-rpc.publicnode.com"

First you should check to see if the KeyGen has been registered yet, e.g. -

```
curl http://127.0.0.1:8080/getKeyGenResultById?id=KeyGen20260329114425999627bb6d1 | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  2367    0  2367    0     0   205k      0 --:--:-- --:--:-- --:--:--  231k
{
  "Code": 0,
  "Error": "",
  "Data": {
    "requestid": "KeyGen20260329114425999627bb6d1",
    "ClientKeys": {
      "33482e761b1c2e4e53b52634c0123f109fcc223b2938f0747b710c13ff7a70662ae895c6b3f0252e3a8346e032a4da9dccb19605ac74210058d2247aea8d269d": "b9065a2db36f192d287c3d6a2aa1d9a6e965828dce15b26f652b210077f76437",
      "8f0eac2c13ef6a56e5532842676092d5cc05347b37705653f490a9c0d53cbffb02865741a59dcc1a9e9ca86a3bbd02c716a2b4e9cb9fa527fa56570c141d49e4": "0x432baf0AB7261819fCf587De7e6D68f902E43195",
      "ebebb127651379905afedf1f90e5814a7609bf98b00822351e3103232bccff07fdcdc7fd0baddae7cf6941c51fd9af8a461c04a1d01a0804d9ddd050e235dda8": "0x60D8c01bd07FB55E88eD56d3Ba1638Ee9A7409E5"
    },
    "GroupId": "894819a3608a2e58658a7aae5c2675bc402d42deada00d3e8157975ef2efcac9",
    "KeyType": "secp256k1",
    "MsgCheck": "multi-agree",
    "SigList": {
      "33482e761b1c2e4e53b52634c0123f109fcc223b2938f0747b710c13ff7a70662ae895c6b3f0252e3a8346e032a4da9dccb19605ac74210058d2247aea8d269d": "fbadae3997c98ee1de9a05198fe24d4ac82e0d737ebfd0fac56f75cf43a1b23ca6ae98f8c674a9d08799ae79efbac145030306b502b824181691095edce4318e",
      "8f0eac2c13ef6a56e5532842676092d5cc05347b37705653f490a9c0d53cbffb02865741a59dcc1a9e9ca86a3bbd02c716a2b4e9cb9fa527fa56570c141d49e4": "a53fd18aa4d2c4294946d4f5779b0d6640a6d6b63d03396a9fe9b17d6faf68db69a1842b1671e4971544327179a9d4ebe6832a08d37cbda2b72ea0a3c207c40f",
      "ebebb127651379905afedf1f90e5814a7609bf98b00822351e3103232bccff07fdcdc7fd0baddae7cf6941c51fd9af8a461c04a1d01a0804d9ddd050e235dda8": "ed749e6b6e4a905912b0c74699742c1d72512b43850d7a4649aa0f391ac5cc83f176b479dbd1e4d1d10bb53a7b3e90da9a73b51830cb0c931d0470b35a36f23d"
    },
    "Threshold": 1,
    "keylist": [
      "33482e761b1c2e4e53b52634c0123f109fcc223b2938f0747b710c13ff7a70662ae895c6b3f0252e3a8346e032a4da9dccb19605ac74210058d2247aea8d269d",
      "8f0eac2c13ef6a56e5532842676092d5cc05347b37705653f490a9c0d53cbffb02865741a59dcc1a9e9ca86a3bbd02c716a2b4e9cb9fa527fa56570c141d49e4",
      "ebebb127651379905afedf1f90e5814a7609bf98b00822351e3103232bccff07fdcdc7fd0baddae7cf6941c51fd9af8a461c04a1d01a0804d9ddd050e235dda8"
    ],
    "pubkeyhex": "155669e0574fd16fd7e865d23aa41688db183ce8853f1567ecf67e5a901f94b869bba85090e687a5c01f0126b98d69b3e24b2bb2d2a6d71cffde2f9093f4fbdc",
    "savedata": "HIDE ENCRYPTED DATA",
    "timepoint": "2026-03-29 11:48:05.026",
    "ethereumaddress": "0x822Ac86AfFe94e063C363134aa31B0F4a368E71e",
    "globalnonce": 1,
    "val": "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b",
    "status": "success"
  }
}
```

The Ethereum address for the KeyGen is in the response at Data.ethereumaddress

You will also need the "pubkeyhex" (called "pubkey" in /multiSignRequest) and the "keyList", which are the node keys of each member of the group of nodes in the KeyGen, also needed in /multiSignRequest. 

The "threshold" is confusing, since threshold+1 nodes need to agree to a signature to allow actual signature generation (NOT threshold).

The Ethereum address needs a little gas (ETH) sent to it by the user. You can check what the balance of the address is e.g. -

```
cast balance 0x822Ac86AfFe94e063C363134aa31B0F4a368E71e --rpc-url https://linea-rpc.publicnode.com
490699656894272

cast from-wei 490699656894272
0.000490699656894272
```


You should then check to see if the KeyGen has yet been registered, e.g. -

```
cast call 0x55aD6Df6d8f8824486C3fd3373f1CF29eCecF0A3 "isRegistered(address)(bool)" 0x822Ac86AfFe94e063C363134aa31B0F4a368E71e --rpc-url https://linea-rpc.publicnode.com
true
```

You can see that this MPC wallet address has registered (return true). Registration is required before any signatures can be generated. If it has not yet been registered, then either the user can register it via the [MPA wallet front end](https://mpa.continuumdao.org) (click the button "Manage your Multi-Party Agent wallet"), or the AI agent can create a multiSignRequest with a single signature request (i.e. not a batch request) for agreement by other parties.

Once an MPC Ethereum address from a KeyGen has been registered,  it will receive a certain number of free signatures. A newly registered address will have have this configuration, e.g. -

```
cast call 0x55aD6Df6d8f8824486C3fd3373f1CF29eCecF0A3 "getActiveFeeConfig()(address,uint256,uint256,uint256,bytes32)" --rpc-url https://linea-rpc.publicnode.com
0x176211869cA2b568f2A7D4EE941E073a821EE1ff
101
100000 [1e5]
5000000 [5e6]
0x541111248b45b7a8dc3f5579f630e74cb01456ea6ac067d3f4d793245a255155
```

### Remaining Allowance and Fees

Where the first address is the fee token ERC20 used to top up the KeyGen (USDC in Linea here), the second number, freeNonceAllocation, is the number of free signatures before the KeyGen must be topped up, the third number is the feePerNonce payable after the free allocation has been used (here this is 0.1 USDC, since USDC has decimals 6), the next output, minimumDeposit, is the minimum amount that can be deposited (here it is 5 USDC) and finally the bytes32 is the hash of the chain type ('Ethereum').

The Active Fee Config used for NEW KeyGens may change from time to time according to DAO Governance.

You can see the Fee Config for any KeyGen ethereumaddress input as follows, e.g. -

```
cast call 0x55aD6Df6d8f8824486C3fd3373f1CF29eCecF0A3 "keyGenFeeConfig(address)(address,uint256,uint256,uint256,bytes32)" 0x822Ac86AfFe94e063C363134aa31B0F4a368E71e  --rpc-url https://linea-rpc.publicnode.com
0x176211869cA2b568f2A7D4EE941E073a821EE1ff
101
100000 [1e5]
5000000 [5e6]
0x541111248b45b7a8dc3f5579f630e74cb01456ea6ac067d3f4d793245a255155
```

And you can see the number of the sum of the free signatures remaining and paid for like this. First of all find out the current nonce for your KeyGen Ethereum address, querying by KeyGenId e.g. -

```
curl http://127.0.0.1:8080/getGlobalNonceByKeyGenId?id=KeyGen20260329114425999627bb6d1 |jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    46  100    46    0     0   3074      0 --:--:-- --:--:-- --:--:--  3285
{
  "Code": 0,
  "Error": "",
  "Data": {
    "globalnonce": 1
  }
}
```

Here you can see that the KeyGen has only made the initial register() signature and transaction, so globalNonce = 1

Then use this value in the smart contract call as well as the Ethereum address, e.g. 

```
cast call 0x55aD6Df6d8f8824486C3fd3373f1CF29eCecF0A3 "getRemainingNonces(address, uint256)(uint256)" 0x822Ac86AfFe94e063C363134aa31B0F4a368E71e 1  --rpc-url https://linea-rpc.publicnode.com
100
```

So in this case there are 100 nonces left before fee top up is required.

Similarly you can get the remaining deposited fee balance, e.g. -

```
cast call 0x55aD6Df6d8f8824486C3fd3373f1CF29eCecF0A3 "getRemainingDeposit(address, uint256)(uint256)" 0x822Ac86AfFe94e063C363134aa31B0F4a368E71e 1  --rpc-url https://linea-rpc.publicnode.com
0
```

This KeyGen is within its free signature allowance and has not deposited any fees yet (return 0).

### Depositing Fees

Any wallet address on Linea mainnet can deposit fees for a KeyGen Ethereum address, either using a wallet (e.g. MetaMask), or by using Foundry e.g. -

```
cast send 0x55aD6Df6d8f8824486C3fd3373f1CF29eCecF0A3 "deposit(address,uint256)()" 0x822Ac86AfFe94e063C363134aa31B0F4a368E71e 10000000 --rpc-url https://linea-rpc.publicnode.com --private-key <private key> --broadcast
```

Or the MPC wallet can pay for its own fees using the deposit function in /multiSignRequest

## Using forge script for multiSignRequest Batch transactions

The /multiSignRequest endpoint can be used to create multiple signature requests in a block, using consecutive blockchain nonces. This is achieved by using Foundry as follows, e.g. -

```
forge script ./script/SetPausedStatus.s.sol:SetPausedStatus --rpc-url <the RPC URL> --sender 0x822Ac86AfFe94e063C363134aa31B0F4a368E71e
```

This command (without --broadcast, since the address has no private key), includes --sender to simulate sending from our MPC Ethereum address, generates output is a file e.g.

./broadcast/SetPausedStatus.s.sol/421614/run-latest.json

This file can be piped into a Python script  (~mpcnode/mpc-config/scripts/generateSignRequestWithFoundryScript.py) to generate a complete mutiSignRequest that can be POSTED by any node (including an AI agent). The instructions for usage are in the Python script.

NOTE that it is important NOT TO US A STALE blockchain nonce value for the Ethereum address.

The current nonce value can be got as follows, e.g. -

```
cast nonce 0x822Ac86AfFe94e063C363134aa31B0F4a368E71e --rpc-url https://linea-rpc.publicnode.com
1
``` 

And then you can set the first nonce value in the generated multiSignRequest to have this current nonce by using --first-nonce 1 (or whatever the current nonce value is). You should always check what the current nonce value is and use this --first-nonce argument when using the Python script.

See the more detailed description of the Python script, its dependencies and its usage  [here](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/references/AI_AGENT_FORGE_SIGNREQUEST.md)