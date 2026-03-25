
 ## Creating a Group

A node Group is a subset of the Configured Nodes that have decided to jointly sign transactions using MPC. At this stage, the Group's purpose is not defined. That requires a further step (KeyGen creation). 

Any node can initiate Group creation by clicking the Add group button and selecting some of the Configured Nodes

<img src="/_media/Add_new_group.png"  alt=""/>

If this button is deactivated, it likely means that either your configs.yaml has errors (run ./process_config.sh on your node to check), or that your node has not initiated the inter-node network (try restarting your node with sudo docker-compose down && sudo docker-compose up -d). The health of your node is shown in the Health section. If some other Configured Nodes have health issues, then this is shown in the Add group selection e.g.

<img src="/_media/Health_and_connectivity.png"  alt=""/>

In this selection, two other nodes are on-line, but need to check their inter-node communications. Nodes that have issues cannot be selected for Group creation.

In our example, two healthy nodes (including our own) were selected and after OK is clicked. That triggers a signature request, e.g. from MetaMask. The new Group request can be seen in the Pending Groups table. Our node is now 'waiting' for agreement from other nodes to Join

<img src="/_media/Pending_groups_creator.png"  alt=""/>

On the other node, they will now see a request to Join. They can accept with a signature. If they do not wish to, then they can ignore the request and after 7 days, it will become stale and disappear.

<img src="/_media/Pending_groups_client.png"  alt=""/>

Once they have joined and ALL other nodes that have been requested to have also joined, then the new Group is created and will appear in the Existing Group table on each node in the Group.

<img src="/_media/Existing_new_group.png"  alt=""/>

Note that if your node is not a member of a Group, you will not see it. A list of multiple Configured Nodes can have more than one Groups, but cannot create a Group that has already been created, so for instance 3 Configured Nodes (node 1, 2 and 3) can only have 4 Groups - 1&2, 1&3, 2&3, 1&2&3

