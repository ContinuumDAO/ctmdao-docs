
 ## Creating a Group

A node Group is a subset of the Configured Nodes that have decided to jointly sign transactions using MPC. At this stage, the Group's purpose is not defined. That requires a further step (KeyGen creation) — **multi-agree** for an MPA wallet, or **tx-check** if you later aim to secure Continuum cross-chain traffic. See the twofold purpose in [MPA wallet Overview](/ContinuumDAO/MPAWallet/Overview.md).

**Group size depends on the role:**

- **2 nodes** — simplest MPA wallet (**2/2** KeyGen). Common when one node is AI-assisted and the other is a human circuit breaker (often the same operator).
- **3+ nodes** — shared custody / loss safeguard with a higher threshold.
- **5+ independent operators** — ideal for Groups that will [join the Continuum](/ContinuumDAO/MPCSigner/JoinNetwork.md) as cross-chain signers (**3/5 TSS**).

### Manual flow

Any node can request Group creation by clicking the Add group button and selecting some of the Configured Nodes

<img src="/_media/Add_new_group.png"  alt=""/>

If all nodes that have been requested to do so, agree, then the new Group is created.

If this button is deactivated, it likely means that either your node configuration has errors, or that your node has not initialized the inter-node network. The health of your node is shown in the **Health** section on this page.

**In the node app:** open **Node → Node Peer IP Editing** to confirm relay and peer IPs match your collaborators, complete **Inter Node Communication** (MQTT) as the UI guides, and use **Restart Node Service** on the Node page if connectivity still looks stuck after you save changes. See [Install a node — Tell your node about its peers](/ContinuumDAO/MPAWallet/Install.md#tell-your-node-about-its-peers-configured-nodes).

If some other Configured Nodes have health issues, then this is shown in the Add group selection e.g.

<img src="/_media/Health_and_connectivity.png"  alt=""/>

In this selection, two other nodes are on-line, but need to check their inter-node communications. Nodes that have issues cannot be selected for Group creation.

In our example, two healthy nodes (including our own) were selected and after OK is clicked, a **management signature** is requested (Ethereum injected signer **EIP-191**, e.g. MetaMask or Rabby, or **Ed25519** — whichever signer is selected in the header). The new Group request can be seen in the Pending Groups table. Our node is now 'waiting' for agreement from other nodes to Join

<img src="/_media/Pending_groups_creator.png"  alt=""/>

On the other node, the node operator will now see a request to Join. They can accept with a signature. If they do not wish to, then they can ignore the request and after 7 days, it will become stale and disappear.

<img src="/_media/Pending_groups_client.png"  alt=""/>

Once they have joined and ALL other nodes that have been requested to have also joined, then the new Group is created and will appear in the Existing Group table. The same will be shown for each node in the Group.

<img src="/_media/Existing_new_group.png"  alt=""/>

Note that if your node is not a member of a Group, you will not see it. A list of multiple Configured Nodes can have more than one Group, but cannot create a Group that has already been created, so for instance 3 Configured Nodes (node 1, 2 and 3) can only have 4 Groups - 1&2, 1&3, 2&3, 1&2&3

### AI flow

Alternative to **Add group** in the UI — use the built-in agent on the node where you want to **originate** the Group request.

**Before you prompt:**

1. **AI Agent → Provider** — choose an LLM provider and model, and set the API key (stored in **Variables** when prompted). Without this, Agent chat cannot run. See [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md).
2. **Preferred signer** — under **Node → Ed25519 Management Keys**, set the **preferred** (crown) management key the agent uses to sign API calls (or pick it when Agent chat asks). Details: [Default Ed25519 signer](/ContinuumDAO/MPAWallet/DefaultEd25519Signer.md).
3. **Configured peers healthy** — complete peer IP editing and Inter Node Communication on each node first ([Configured Nodes](/ContinuumDAO/MPCSigner/ConfiguredNodes.md)).


Open **Agent chat** from the **cat icon** (bottom-right of the node app). Example prompts:

- *"List my configured node keys and their health, then create a group with all healthy peers."*
- *"Create a new group that includes every configured peer node."*
- *"Create a group with node keys …"* (name the **Node Key** values from **Groups → Configured Node Keys** if you want a specific subset).

To **review** requests instead of creating one:

- *"What active group requests are pending?"*
- *"List pending group requests and show which nodes still need to join."*
- *"Are there any group requests waiting for me to join?"*

The agent submits the group request from **this** node; you still need each **other** node operator to **Join** the pending Group (same as the [manual flow](#manual-flow) above). On a **2/2** setup, attach to the peer node and prompt there to *"Show pending group requests and help me join"* or use the **Join** control on the Groups page.

For mesh problems before grouping, you can also ask *"Check why Add group is disabled"*, *"Check my node health and peer connectivity"*, or *"Restart my node if it needs a reload after these changes"*. External agents provisioning VPS nodes: [Agent provision and configure](/ContinuumDAO/MPAWallet/AgentProvision.md).

### Related

- [Configured Nodes](/ContinuumDAO/MPCSigner/ConfiguredNodes.md)
- [KeyGens](/ContinuumDAO/MPCSigner/KeyGens.md)
- [Install a node — Post install steps](/ContinuumDAO/MPAWallet/Install.md#post-install-steps)
- [Overview](/ContinuumDAO/MPAWallet/Overview.md)
- [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md)
- [Default Ed25519 signer](/ContinuumDAO/MPAWallet/DefaultEd25519Signer.md)
- [Creating an MPC Signer](/ContinuumDAO/MPCSigner/CreateMPCSigner.md)

