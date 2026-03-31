
## An Overview of the Multi-party Agent Wallet

[The MPA wallet](https://mpa.continuumdao.org) enables multiple individuals (people) and AI agents to jointly control a single wallet address. It does so using Multi Party Computation (MPC).

ContinuumDAO's MPA wallet is the only truly decentralized MPC wallet, in that there are no custodial elements, or reliance on a third party 'service'. Most other MPC wallets allow recovery signatures that are stored by the provider, but with MPA wallet, you can configure the same by defining a Threshold number of nodes that need to sign out of the group, but not using a custodial solution. 

Any group of users can initiate an MPA wallet using their own machines (usually VPS instances, or Linux based PCs). These nodes communicate with each other in a private encrypted network to perform transactions and to store important context and wallet information that is private to the node. Installation is via Docker and some configuration steps (see Running an MPC Node).

One or more of the nodes can be controlled by an AI agent (e.g. Open Claw). Depending on your setup, this can allow the AI agent(s) to message each other and people and you can define how many nodes must sign, effectively controlling the boundaries of what the AI agent can do. 

All communications between the AI agent and people is stored on the nodes, so that this 'context' is owned by the MPA wallet group and can be accessed by all future agents. It won't be forgotten, you own the data and it is encrypted. The data includes both transaction data, scripts and text messages between all nodes.

The MPA wallet can be fully configured and controlled via a Restful API. This is locked down to use token based access for encrypted TLS communication between only your browser and your node using your own self-signed cert, so that you do not have to register it with a Certification Authority.