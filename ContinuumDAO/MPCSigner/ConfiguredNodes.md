
## Configured Nodes

Once collaborators have installed nodes and completed **Node Peer IP Editing** and **Inter Node Communication**, their public keys appear under **Configured Node Keys** on the **Groups** page in the [MPA wallet](https://mpa.continuumdao.org).

<img src="/_media/Configured_node_keys.png"  alt=""/>

If any nodes are not running, the table shows that. Ensure each node runs an up-to-date build.

This is the list of nodes that can *potentially* collaborate. The **first** configured address is always the **Relay** node — it runs MQTT and must stay online for inter-node work. Other nodes may be offline temporarily but must have trusted the relay’s inter-node public key.

Every operator may include extra IPs they control (for example a second machine for **2/2** AI + human circuit breaker), but **the relay row (first entry) must be identical on every node** in the mesh. Step-by-step setup — two-node example, peer IP editing, copying the relay PEM, restart: [Install a node — Tell your node about its peers](/ContinuumDAO/MPAWallet/Install.md#tell-your-node-about-its-peers-configured-nodes).

**Add group** stays disabled until: (a) at least two peers are configured, (b) a real relay IP is set, and (c) **Inter Node Communication** is posted on each node (peers use the relay’s PEM). If connectivity looks stuck after changes, use **Restart Node Service** on the **Node** page on each affected machine.

### Related

- [Install a node](/ContinuumDAO/MPAWallet/Install.md)
- [Groups](/ContinuumDAO/MPCSigner/Groups.md)
- [KeyGens](/ContinuumDAO/MPCSigner/KeyGens.md)
- [Overview](/ContinuumDAO/MPAWallet/Overview.md)
- [Backup and restoration](/ContinuumDAO/MPAWallet/BackupAndRestoration.md) — spare nodes and rebuilds