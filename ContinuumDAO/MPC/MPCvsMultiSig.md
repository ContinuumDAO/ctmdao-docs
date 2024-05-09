
## MPC vs Multi-Signature

Multi-Signature (Multi-Sig) is a security feature used on blockchain platforms like Bitcoin or through smart contracts that require multiple parties to approve a transaction before it can be executed. This setup involves setting rules for multiple authorized accounts to ensure that a transaction only proceeds when all required approvals are in place. This increases security and trust, as no single participant can act maliciously.
Multi-Sig is employed across various applications including transaction transfers, managing digital assets, decentralized organizations (DAOs), and executing blockchain contracts. For instance, a transaction transfer only succeeds when all involved parties meet the authorization criteria, safeguarding against fraud and unauthorized actions. Organizations can also manage shared cryptocurrency holdings through Multi-Sig wallets, and in cross-chain communications, transactions move forward only after validations from multiple participants.

Implementation of Multi-Sig wallets generally relies on smart contracts. However, on blockchains that do not support smart contracts, native support for Multi-Sig accounts is necessary. But these native solutions often lack flexibility and cannot accommodate customized settings, such as Bitcoin's limitation to no more than five recipient addresses.

A typical Multi-Sig wallet like Gnosis Safe works as follows:

#### 1. Creating a Multi-Sig Account

This involves setting up a contract that specifies the public keys of all participants and the minimum number of signatures required for transactions to proceed.

#### 2. Transaction Authorization

Transactions or commands are initially submitted to the contract, which then requires the designated participants to sign off using their private keys. These signatures are then collected by the contract.

#### 3. Signature Verification and Execution

When the contract gathers enough signatures to meet the preset threshold, the transaction is deemed valid and executes as planned.

### Conclusion

Multi-Sig wallets impose substantial demands on blockchain contract capabilities, which may limit their compatibility. Each transaction requires on-chain confirmation, which can result in high transaction fees, particularly on networks like Ethereum where costs are notoriously high. Furthermore, Multi-Sig solutions compromise privacy because the wallets executing the transactions are identifiable.

Scaling Multi-Sig solutions across multiple blockchains is also challenging. Each node must update its contracts to manage signatures on new chains, or sometimes even establish new dedicated nodes on these networks.

Additionally, with Multi-Sig solutions they often depend on assets that are locked and staked to deter misconduct. However, the amount staked is usually much smaller than the transaction volumes handled, presenting a security risk. In contrast, Multi-Party Computation with Threshold Signature Scheme (MPC-TSS), particularly within a Trusted Execution Environment, does not face this issue.

In summary, Multi-Party Computation (MPC) offers better compatibility without relying heavily on smart contracts. MPC handles more of its processes off-chain and uses cryptographic protocols to ensure security. This setup allows for only one final transaction to be recorded on the blockchain, which can significantly reduce transaction fees compared to Multi-Sig systems.


