
## An Overview of the Multi-party Agent Wallet

[The MPA wallet](https://mpa.continuumdao.org) is an **AI-first** wallet: multiple individuals (people) and AI agents can jointly control a single wallet address using Multi Party Computation (MPC).

ContinuumDAO's MPA wallet is the only truly decentralized MPC wallet, in that there are no custodial elements, or reliance on a third party 'service'. Most other MPC wallets allow recovery signatures that are stored by the provider, but with MPA wallet, you can configure the same by defining a Threshold number of nodes that need to sign out of the group, but with no custodial elements. 

Any group of users can initiate an MPA wallet using their own machines (Linux VPS instances, or Windows 11/ MacOS/Linux based PCs). These nodes communicate with each other in a private encrypted network to perform transactions and to store important context and wallet information that is private to the node. Start with [Install a node](/ContinuumDAO/MPAWallet/Install.md) (node-map **`+`**). Advanced / manual shell steps remain under [Running an MPC Node](/ContinuumDAO/RunningInstructions/NodeRunningInstruction.md).

You can operate the wallet entirely from the **node app** UI (Groups, KeyGens, multi-sign, and so on) without ever enabling the AI agent. For most users it is desirable to also use the built-in [AI agent harness](/ContinuumDAO/MPAWallet/AIHarness/Overview.md): one or more nodes can be agent-assisted, agents and people can message each other, and your threshold still bounds what can be signed. Configuring the harness is **optional** — see [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md) when you want that path.

Direct DeFi / web3 protocol integrations (node app and agent MCP): [DeFi protocol support](/ContinuumDAO/MPAWallet/DeFiProtocolSupport.md). Interactive candlesticks, analysis, and trade ideas: [AI charting](/ContinuumDAO/MPAWallet/AICharting.md), [Technical analysis](/ContinuumDAO/MPAWallet/TechnicalAnalysis.md), and [Trade ideas](/ContinuumDAO/MPAWallet/TradeIdeas.md). 

All communications between the AI agent and people is stored on the nodes, so that this 'context' is owned by the MPA wallet group and can be accessed by all future agents. It won't be forgotten, you own the data and it is encrypted. The data includes both transaction data, scripts and text messages between all nodes.

The MPA wallet can be fully configured and controlled via a Restful API and a built-in MCP server on your node. Your browser attaches to **your** node — ContinuumDAO does not proxy day-to-day control of it. Two common attach paths:

1. **SSH tunnel (often the simplest)** — open an SSH tunnel from your PC to the node, then attach over localhost. Encryption is provided by SSH. This needs no ContinuumDAO service, no public CA certificate, and no ContinuumDAO-hosted frontend. Many operators prefer this for remote VPS nodes.
2. **Browser HTTPS with a self-signed cert** — talk to the node over TLS using the node’s own certificate and short-lived token (JWT) access, without registering a certificate with a public Certification Authority. You trust the cert in your browser (for example via **Fetch Self-Signed Web Cert** in the app).

MPA wallet is completely decentralized. Each node can run its own node-app container, so you can use a ContinuumDAO-hosted UI such as [mpa.continuumdao.org](https://mpa.continuumdao.org) if you wish, or the node-hosted app on your machine. Either way, management traffic goes to your node (via SSH tunnel or Browser HTTPS), not through a ContinuumDAO custody service. Even if ContinuumDAO ceases to exist, the MPA wallet will continue to function (with no further updates of course).