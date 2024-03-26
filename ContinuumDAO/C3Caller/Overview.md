## Overview

C3Caller is an open-source, immutable messaging protocol designed to facilitate the creation of multi-chain, interoperable applications. Developers can easily customize data with multi-chain messaging while preserving full autonomy and control over their application.

C3Caller is currently running on the Goerli, BSC, Mumbai, Arbitrum Sepolia and Fantom Sonic Test Chains; to register your dApp on the C3Caller page please fill out and submit the form in this link[[http://CTMdAppRegister]]

## Why C3Caller?

C3Caller is a fully open sourced, decentralized cross-chain messaging protocol developed and governed by the ContinuumDAO. C3Caller deploys smart contracts across various chains, with contract management and operational permissions being governed by the community and generated and managed by the MPC network, respectively. This is supported by a combination of Relayer and MPC network for verification and signing.

<img src="/_media/C3CallerSchematic.png"  alt=""/>


## Advantages

- **Decentralization** Smart contract permissions are divided into governance and operational roles, with governance controlled by community voting and operators simply facilitating transactions, as detailed in the Contract—>Roles section.
- **Security (Trustlessness), Generalizability, and Extensibility** 
  - Security: Operational permissions for contracts are entirely generated within the MPC network, with private keys split-stored across MPC nodes. Each node also verifies source chain transactions during signing, as explained further in the MPC section.
  - Extensibility: C3Caller adopts an external verification approach, allowing for the development of verification modules for different chains and their updates across all MPC nodes.
  - Generalizability: C3Caller utilizes a cross-chain messaging model to enable cross-chain contract calls, liquidity aggregation, and the building of cross-chain applications.
- **Billing Mechanism** Billing is post-usage with a pre-deposit system. Fees can be paid with CTM and various stablecoins, billed based on usage without the need for recharging on each chain.
- **Cost Calculated by Length** The cost of utilizing the CTM-MPC network is calculated on a per-byte basis, making the overall expense directly proportional to the amount of data being processed. It is calculated based on (calldata) Length x Unit Price (Gas + Fee) and is detailed in the table below.


|     |     |
| --- | --- |
|     |     |

- **Fallback Support** In case of smart contract execution failure, it directly falls back to the source chain, executing c3FallBack with the source chain's calldata as the parameter.
- **Permissionless** Anyone can obtain a dAppID through simple registration and configure their dApp's contract addresses on different chains via the webpage, as detailed in the Quick Start section.
- **High Concurrency** Smart contracts can utilize any number of MPC addresses to enhance message concurrency due to not having to wait for Nonce, thus reducing the probability of nonce errors.
- **Programmable Transaction Verification (coming soon)** Project teams can configure how MPC nodes perform verification.
- **Option to Select Signatures from Specific MPC Nodes (coming soon)** Project teams can operate N MPC nodes, forming groups with other network nodes to generate several addresses and specify these addresses for cross-chain signing.

More information can be found in the C3Caller Protocol description.