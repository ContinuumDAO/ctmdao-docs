
##  Router Working Mechanism

###  Nodes Structure

![](Router_Node_Structure.png)

The relationship between C3Caller-Relayer and MPC can be seen in the above diagram. The C3Caller-Relayer node includes all the functionalities of the message cross-chain. It is highly available and scalable, with stateless nodes that do not communicate with each other. When performance is insufficient, it can be horizontally scaled. Currently, the plan is to deploy two or three nodes to form a cluster, relying on a MySQL database and Redis cache.

It is enhancing the current node services for high availability, scalability, and performance. The proposed system will include stateless nodes in a cluster formation, supported by a MySQL database and Redis cache.

- The C3Caller-Relayer node includes token and message cross-chain functionalities, offering high availability and scalability.
- Nodes are stateless, not communicating with each other, allowing horizontal scalability.
- Planned deployment of a cluster, relying on MySQL and Redis.
- RpcGateway supplies a union-high availability of blockchain RPC when C3Caller-Relayer requests. it always forwards requests to those with the highest Blocknumber of all the RPCs.

###  Contracts

![](Router_Contract_Structure.png)


The contract structure is shown in the above diagram.

- C3DappManager is Dapp manager Contract, which handles the pre-stored fees and Dapp register.
- C3CallerDapp is a entry point so if Dapp Contract extends it, it could call the `c3call()` method
- C3CallerProxy is a Upgradeable contract and holds an instance of IC3Caller so that we could upgrade C3Caller if a new version C3Caller comes.
- C3Caller is a real logic contract which have `c3call` `c3fallback` and `execute`
- The management rights of the contracts are generated using the MPC network.

