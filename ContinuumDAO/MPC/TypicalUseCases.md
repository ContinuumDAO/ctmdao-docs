
## Typical Use Cases

#### Empowering Decentralization in Dapps

We provide versatile options for developers, allowing them to either operate their own nodes or select nodes with strong reputations or robust security deposits. Nodes can optionally add a Decentralized Identity, verifiable by Continuum's Committee.


#### Decentralized Wallets Using MPC Technology

MPC technology is effectively utilized in decentralized wallets. Here, multiple participants jointly manage a private key, with each holding only a part of it. Transactions on jointly controlled digital assets can only be executed when a sufficient number of users, who meet a predetermined threshold, collaborate. These users could be included but not limited to some OAUTH validators, such as Google, X, Meta, email, or a centralized authority.

This method is advantageous for both individual users and groups:

- Individual Users: It allows the management of a private key across several devices, mitigating risks associated with damage to any single device.
- Groups: Enables multiple users to jointly control assets.

MPC wallets can be combined with Account Abstraction (EIP4337) to enable the most user friendly experience in web3, with sponsored gas paid for by subscription, single currencies across all chains and chain abstraction - a 'chainless' experience.


While MPC wallets and multi-signature wallets are somewhat similar, they differ significantly in flexibility, security, and scalability. Overall, MPC wallets tend to offer better compatibility, scalability, and cost-efficiency. For a more detailed comparison, refer to the section on MPC versus multi-signature technologies.

#### Oracle Enhancements Through MPC

Our MPC technology also enhances blockchain oracle systems by decentralizing them, which improves the reliability and security of oracle data. The threshold consensus mechanism of MPC ensures that only when a sufficient number of oracle nodes agree on data and sign it, is the data considered trustworthy. This mechanism prevents risks that might arise from any single oracle node's failure or malicious activity, simplifies communication processes, and reduces costs significantly by achieving consensus off-chain.

Additionally, the system's fault tolerance allows it to handle failures of up to 't' nodes, as long as the remaining 'k' nodes can still execute the necessary logic, enhancing the robustness and flexibility of the oracle system.


#### Cross-Chain Communication

Currently, blockchains operate like isolated data islands, or silos, with no interaction between them. For instance, assets on the Bitcoin blockchain are not visible on the Ethereum blockchain, and Ethereum smart contracts cannot interact with those on the Polygon chain. This isolation limits the liquidity of digital assets and the development of decentralized finance (DeFi).

Using the decentralized capabilities of MPC technology, we can securely enable cross-chain information interactions. After multiple MPC nodes verify a message from the source chain and reach the necessary consensus, they collaborate to generate a transaction signature for the target chain, completing the interaction.

This method not only ensures the reliability of the source chain data but also enables functions like cross-chain asset mapping and contract calls, greatly enhancing blockchain usability. Compared to other oracle and relayer-based solutions, this approach provides a higher degree of decentralization and security.

In comparison with the Relayer-Oracle model popularized by projects like LayerZero, particularly in terms of security and trust minimization, MPC technology provides significant advantages. Unlike the Relayer-Oracle model, which relies on external entities (relayers and oracles) to transmit and verify cross-chain data, MPC ensures that no single party has access to the entire data set or control over the transaction. 

This dispersal of control reduces the risk of data manipulation and theft, as compromising a transaction would require breaching multiple parties simultaneously. Furthermore, MPC enhances privacy and security by enabling cryptographic functions to be performed collaboratively without exposing individual inputs to any participant. 

This makes MPC a more robust and secure framework for decentralized applications, especially in scenarios where trust and data integrity are paramount.


### Typical Use Cases

- Cross-chain Liquidity Network
- Intent cross-chain Solvers
- Cross-chain Router
- Cross-chain Oracles
- Interoperability Dapp SDK
- Interoperability GameFi SDK
- Cross on-chain Governance
- Cross-chain Reputation
- Cross-chain Encrypted Messaging

