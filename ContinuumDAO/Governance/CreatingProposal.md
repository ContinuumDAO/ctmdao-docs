# Creating a Proposal on ContinuumDAO

This guide details:

- How to create a proposal on ContinuumDAO
- How to share the proposal on the forum
- How to vote on your proposal and on others.

Currently it is only possible to create a proposal from the command line, but a frontend interface will eventually be available.

For this example, we will create a proposal to transfer 1 CTM from the DAO treasury to us, the proposer.

## Create a Proposal

### Step 1: Install Foundry

You can install Foundry by following these [instructions](https://book.getfoundry.sh/getting-started/installation).

### Step 2: Clone the veCTM Repository and Install Dependencies

To clone the veCTM repository, navigate to a directory where you want to install it and run:

```bash
git clone https://github.com/ContinuumDAO/vectm.git
```

Then, change directory into `vectm` and install the dependencies:

```bash
forge install
```

### Step 3: Add Deployment Environment

In order to execute the proposal creation transaction, you must add the private key of the account with which you wish to do so. This account should have some fees to cover the gas cost.

It will also be necessary to add an RPC URL for the chain (in our case we are deploying to Arbitrum Sepolia testnet).

Edit the file `.env` with the following format:

```
PRIVATE_KEY=0x0123abcd0123abcd0123abcd0123abcd0123abcd0123abcd0123abcd0123abcd
RPC_URL=https://sepolia-rollup.arbitrum.io/rpc
```

### Step 4: Create the Proposal

Open the file `script/CreateProposal.s.sol` in an editor of your choice.

#### Choose the number of actions

Change the number `numberOfActions` to reflect the number of transactions that will be executed upon successful passing of your proposal. These can be contract calls, transfers of ETH or whatever the gas token is, or a contract deployment.

In our example proposal, we want to carry out one transaction upon passing by the DAO, therefore we set the number to 1.

If the transaction count is more than 1, you must specify the following fields for each transaction.

#### Specify the target address(es)

Next, add the address(es) that will be called upon successful passing of your proposal. This can be a contract address, or in the case of a simple ETH transfer, an account.

In our example proposal, we want to transfer some CTM, which requires we call a function on the CTM address. Therefore, the target of our proposal is the CTM token contract address.

```solidity
address ctmAddr = 0xADeE65208A9fd9d6d47AD2D8A53D7E019955d1Db;
targets[0] = ctmAddr;
```

#### Specify the value(s)

Add the value for each transaction. If you are transferring ETH or calling a payable function, set the value accordingly. Otherwise, just set it to zero.

In our example proposal, we aren't transferring any ETH nor are we calling a payable function, so we will leave the value as zero.

```solidity
values[0] = 0;
```

#### Specify the calldata(s)

For a contract function call, you must specify the nature and parameters of the function that you wish to execute. If you are simply sending ETH, it is not necessary to specify any calldata.

In our example proposal, we *are* calling a contract function - `transfer`. Therefore, we will set the calldata to a ERC20 `transfer` call, ABI encoded with the recipient of the tokens and the amount of tokens to transfer.

```solidity
calldatas[0] = abi.encodeWithSignature("transfer(address,uint256)", proposer, 1 ether);
```

Notice that the first argument in the `encodeWithSignature` method is the name of the function, and the types of the parameters that it takes in brackets. The 2nd, 3rd, ...*n*th arguments are the actual values that will be passed to this function.

#### Specify the description

Add a descriptive title to your proposal. It should follow the format "Proposal #X: ...". This will allow voters to know what they are actually voting for.

```solidity
string memory description = "Proposal #1: Transfer 1 CTM from treasury to proposer"
```

### Step 5: Run the Script

Once you have added a private key and built your proposal, you can run the script.

Start by compiling the script:

```bash
forge build
```

Then run it:

```bash
forge script script/CreateProposal.s.sol:CreateProposal --rpc-url $SEPOLIA_RPC_URL --broadcast -vvvv
```

Once the run command passes, your proposal will be active.

**NB**: Copy the output from the console, you will need it later. The important data you will need to copy can be found in the output under "\== Logs \==".

In our example proposal, there is only one transaction, so copy the content under "Proposal Data:".

```bash
== Logs ==
  Creating proposal with 1 transaction(s)...
  Proposal Data:
  Transaction 1
  0xADeE65208A9fd9d6d47AD2D8A53D7E019955d1Db
  0
  0xa9059cbb000000000000000000000000e3d231836b8a
  70ce89ed118f1c439ce78e7c54c7000000000000000000
  0000000000000000000000000000000de0b6b3a7640000
```

## Share the Proposal

In order for other voters to be made aware of the proposal, you must create a proposal topic on the [forum](https://forum.continuumdao.org). Log in with your account and create a new post under either [Treasury](https://forum.continuumdao.org/category/7/proposals-treasury) or [Constitution](https://forum.continuumdao.org/category/6/proposals-constitution), depending on the nature of your proposal.

Include the title of your proposal, as well as (NB) **the output of the proposal creation command**.

DAO members can now discuss the proposal, and vote accordingly.

## Vote

You can now head over to the ContinuumDAO Governance page and vote on this proposal and others. If a proposal is passed, then anyone will be able to execute the result of the vote.

In our proposal example, once it passes, it can be executed, which will automatically carry out the transfer of 1 CTM from the DAO treasury to the proposer address.

