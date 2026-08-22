For almost all users, follow the user guide **[Install a node](/ContinuumDAO/MPAWallet/Install.md)** (node-map **`+`** button at [https://mpa.continuumdao.org/node-map](https://mpa.continuumdao.org/node-map)). You can create a node on a laptop or PC, or on a remote VPS (Linux / Windows 11 / macOS). This page is the **advanced / manual** path.

**AI agents creating or configuring a greenfield Ubuntu/Debian VPS node:** do **not** start here. Use the **agent playbook** first:

- [Agent provision and configure](/ContinuumDAO/MPAWallet/AgentProvision.md) — topology, oneshot, Path A MCP, hand-off
- [CREATE_NODE_ONESHOT.md](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/CREATE_NODE_ONESHOT.md) — install script flags
- Script: [`install-node-debian-ubuntu.sh`](https://github.com/ContinuumDAO/mpc-config/blob/main/scripts/install-node-debian-ubuntu.sh)
- Repo: [AGENTS.md](https://github.com/ContinuumDAO/mpc-config/blob/main/AGENTS.md)

## Node Running Instructions

A lot more details about setting up an MPC node is in our github [here](https://github.com/ContinuumDAO/mpc-config/blob/main/README.md). This covers installation of different OS types and how to resolve any issues that may arise.

### Type of Machine

If you are only setting up a Multi-Party Agent wallet (secure custody / AI with human Accept — often **2/2**), then you can use a home machine with Linux (e.g. Ubuntu/Debian/Mint). You will need at least 16 GB of RAM and 6 CPU cores (most laptops are sufficient). See [MPA wallet Overview](/ContinuumDAO/MPAWallet/Overview.md) for the twofold purpose of nodes.

If you want to join the Continuum as an MPC Signer to support C3Caller cross-chain messaging and to earn rewards for doing so (typically **5+ independent** operators, **3/5 TSS**), then you will need a machine that has at least the above specification but must be a VPS or hosted to ensure uninterrupted service. This will be checked at the Proposal stage of joining the Continuum.


### Quick Start

We briefly cover a Quick Start for an Ubuntu/Debian VPS here.

(1) As root or sudo  user, create another user called mpcnode and give it sudo access

```bash
sudo adduser mpcnode
sudo usermod -aG sudo mpcnode
```


It is useful to avoid having to enter a password for the sudo command. To avoid this, on each node, edit sudoers file:

```bash
sudo visudo
# Add this line at the end of the file (replace 'mpcnode' with your username):
mpcnode ALL=(ALL:ALL) NOPASSWD: ALL
# Or for password-protected sudo (more secure):
mpcnode ALL=(ALL:ALL) ALL

# Save and exit (Ctrl+X, then Y, then Enter in nano)
```



(2)  Log in as user mpcnode (e.g. ssh mpcnode@<your-vps-ip> or: su - mpcnode)

(3) Install all software

```bash
sudo apt update && \
sudo apt install -y \
  ca-certificates \
  curl \
  wget \
  git \
  openssl \
  gnupg \
  iptables \
  docker.io \
  docker-compose \
  python3 \
  python3-pip \
  python3-ruamel.yaml \
  python3-cryptography \
  mongodb-database-tools \
  jq \
  && sudo systemctl enable --now docker
```

You may get a warning if you already have docker installed, but it should be fine.


(4) Pull the software from the ContinuumDAO github

```bash
su  - mpcnode
git clone https://github.com/ContinuumDAO/mpc-config.git
cd mpc-config  # Should see the installed files and folders here
```

**Docker Compose V2 (Ubuntu / Debian only)** We should always use **`docker compose`** ; legacy **`docker-compose` 1.29.x** often fails on current engines (**`KeyError: 'ContainerConfig'`**). We need this so that remote upgrades and rebooting work. Use this script to update to V2:
  
```bash
cd  ~/mpc-config
sudo ./scripts/docker-V2_debian_ubuntu.sh -v
```

(5) Make sure that you don't have other Docker containers running that might conflict

You can see running containers with sudo docker ps

You can see any installed images with sudo docker images

This installation assumes that you have nothing else running that might cause issues

(6) Start the Docker service if necessary

```bash
sudo systemctl status docker  (Check for 'running' and enter a q to quit)
```
If Docker is not running, start it:

```bash
sudo systemctl start docker
sudo systemctl enable docker  # Enable auto-start on boot
```

(7) Add the user mpcnode to the docker group and restart

```bash
sudo usermod -aG docker mpcnode
```

Log out with exit (or CTRL-D) and either from root, su - mpcnode or ssh back into the user mpcnode.


Make sure that you get no error with the command sudo docker ps and if you do, you will need to fix this before moving on.

(8) Collect the needed node information

- Make a note of the IPv4 address of your node. You can get this by running

```bash
hostname -i  # may only show the localhost 127.0.0.1
```

You can also use the command ip address or get the IPv4 address from the VPS supplier.

- Choose which Ethereum address you wish to manage your node (in configs.yaml - **NodeMgtKey**), and which ed25519 key (in configs.yaml **PublicMgtKey**). Both of these will be required by process_config.sh (the next step). For **NodeMgtKey**, use a **new software-wallet address** created for management only — not a hardware wallet (too little memory for large EIP-191 signatures) and not an address that holds custody funds. See [Management signing and devices](/ContinuumDAO/MPAWallet/Overview.md#management-signing-and-devices).
- Optional and recommended: (This can be done from https://mpa.continuumdao.org Nodes page) :

New node, new database
```bash
sudo ./scripts/provision-node.sh --install-systemd -k <0x40characterEthAddress>  # replace
```
**OR** New node, old database
**If you are creating a new node, but wish to restore a previous database**  you need to now add the original Bootstrap PublicMgtKey ed25519 key:

```bash
sudo ./scripts/provision-node.sh --install-systemd --public-mgt-key <64-hex-public-key> -k <0x 40characterEthAddress>
```
You can then send your Bootstrap private key and your backup database to your node from the ContinuumDAO node web app.

Skip to step 10

- . Otherwise, decide what IPv4 addresses will be included in the Node Addresses in your config. You may need to coordinate with other people to fetch these. You can see your own IP address using the command hostname -i You will be asked to enter each IPv4 address in process_config.sh and you and the other nodes in your group must add the same IPs on each node that you want to create a Group with. The FIRST node IP address is the RELAY node for your group. **The first node IP address must be the same on all nodes**. The other nodes can be added afterwards by re-running ./process_config.sh if required, where you can use the node IP editor to add or remove IP addresses. Note that you can add extra nodes to your own list of Configured Nodes, if you want to create a private group, e.g. for an AI agent.

(9) Run process_config.sh

This script will:

-Validate your configuration

-Add the IPv4 addresses of each node in your group, **including yours** as the final entry. You can add and remove IP addresses using the in-built editor.

-Add your NodeMgtKey and/or your PublicMgtKey

-Add the Relayer IP address (or accept the IP address default), so that your wallet can help secure cross-chain transactions, if you wish to.

-Generate a TLS certificates for the MQTT broker (on relay node)

-Create certificate directories (on client nodes)

-Provide instructions for certificate sharing

-Configure your node for https TLS 1.3 encryption, so that all data to the MPA app https://mpa.continuumdao.org  is encrypted EXCEPT your IP address and Node Key, which will both be public.

- Configure a firewall for your node and start it. There is no un-encrypted public access to your node, even from other nodes in your Configured Nodes list.

```bash
sudo ./process_config.sh --enable-loopback-http --install-mpc-auth-systemd
```

If you messed up (e.g. wrong Ethereum address, wrong IP addresses etc.) you can CTRL-C and you can simply rm configs.yaml and try again. The script will copy a vanilla config file for you to use.

You can safely re-run ./process_config.sh again (e.g. to add a new IP address, or to validate your existing config) and your old changes will not be lost.

(10) Load the Docker images

```bash
sudo docker compose up -d  
```
NB If you only have the command docker-compose, you should upgrade to docker V2 (docker-V2_debian_ubuntu.sh script).

Check everything is OK.

```bash
sudo docker ps
```
This should show these containers if your node is a Relay node (the first IP in the Configured Nodes list ) - 

continuumdao/mpc-auth:latest        0.0.0.0:8443->8443/tcp, 127.0.0.1:8080->8080/tcp, 0.0.0.0:18080-18081->18080-18081/tcp

continuumdao/continuum-mcp-server:latest    127.0.0.1:8446->8446/tcp

continuumdao/continuumdao-node-app:latest   0.0.0.0:3333->3000/tcp

eclipse-mosquitto:2.0        0.0.0.0:8883->8883/tcp, 1883/tcp, 0.0.0.0:9001->9001/tcp

mongo:6.0             127.0.0.1:27017->27017/tcp     

Ensure that the containers stay up and do not restart periodically (indicating a fault)

The first container is the ContinuumDAO MPC code. 

The next one, mcp, is the docker containing the DeFi code used by an AI agent (if configured).

The next one, continuumdao-node-app, is a self contained web app, so that a user can run the node without requiring a hosted app (mpa.continuumdao.org) via an SSH tunnel, or run it locally on their own machine. 

The next (eclipse) is the node inter-communication software used for nodes to talk to each other (encrypted). If your node IP is not the first IP address (i.e. the Relay node) in nodeAddresses in configs.yaml, this will not appear. A Relay node can be added via the web all and when that is done, the eclipse docker will appear on restart.

The next one, mongo, is a database that holds all data for your node. There is shared information (e.g. Group data, KeyGen data) and there is private data (e.g. local config information for your MPA wallet setup). **If you delete this container, then you will lose the information to connect to other nodes and you will corrupt the MPC Signer. All existing Group and KeyGen data will be lost**




Check your firewall. -

```bash
sudo ufw status
```

It should look like this -

Status: active

To                         Action      From
--                         ------      ----
22/tcp                     ALLOW       Anywhere                   # ssh

8443/tcp                   ALLOW       Anywhere                   # mpc-auth BrowserHTTPS

18080/tcp                  ALLOW       Anywhere                   # mpc-auth PublicDiscovery

18081/tcp                  ALLOW       82.208.20.136              # mpc-auth ScannerRelayer scoped

8080/tcp                   ALLOW       Anywhere                   # mpc-auth ManagementAPI

8883/tcp                   ALLOW       Anywhere                   # mpc-auth MQTT TLS broker

22/tcp (v6)                ALLOW       Anywhere (v6)              # ssh

8443/tcp (v6)              ALLOW       Anywhere (v6)              # mpc-auth BrowserHTTPS

18080/tcp (v6)             ALLOW       Anywhere (v6)              # mpc-auth PublicDiscovery

8080/tcp (v6)              ALLOW       Anywhere (v6)              # mpc-auth ManagementAPI

8883/tcp (v6)              ALLOW       Anywhere (v6)              # mpc-auth MQTT TLS broker

This says -

(a) You can ssh into your node via port 22

(b) Your browser can communicate directly with your node via encrypted port 8443. Note that the app mpa.continuumdao.org itself cannot communicate with your node, since thais can only be achieved from your browser to your node using a time limited JWT (a bearer token).

(c) The general public can find your node via port 18080, which is a Public Discovery port. This is necessary so that you can initiate attachment of your node to your browser session.

(d) You, or an AI Agent can communicate to the node's API over port 8080 from localhost ONLY. There is no access to the API through the en-encrypted port 8080, or any other port, unless you bypass this in your configs.yaml and compose-docker.yml

(e) The nodes can communicate with each other using MQTT via the encrypted port 8883


You can check for errors or warnings on your node either using sudo docker logs command, or using the log utility in the Info page of https://mpa.continuumdao.org once you have connected to it.

**No further actions are required, since further configuration can be done via https://mpa.continuumdao.org**


(11) Optional (recommend that this be done from https://mpa.continuumdao.org): Otherwise share the MQTT Public Certificate from the Relay node (first IP address IP address in the Configured Nodes) with the other nodes. The Public cert is  ./mosquitto/config/certs/ca.crt and it should be copied to the ./mosquitto/config/certs/ folder on the other nodes **being careful to keep this information secret** It is good practice to delete the key pair on the Relay node and share with the other nodes regularly.

Restart the nodes -

```bash
sudo docker compose down
sudo docker compose up -d
```

(12) Optional (recommend that this be done from https://mpa.continuumdao.org):  Otherwise copy the browser Public cert ./webTLS/config/certs/browser.crt to any PC that you will want to access your node from using the app https://mpa.continuumdao.org

You will need to ensure that your browser will trust your self-signed SSL certificate and to do that, you will need the public cert used for JWT based encrypted traffic.


If you got this far, congratulations! Your node is running. You may now attach to your node at [mpa.continuumdao.org](https://mpa.continuumdao.org) or via the node-hosted app on your machine. See [Attach your node](/ContinuumDAO/MPAWallet/AttachYourNode.md) for the three transport options.

**Node on the same PC:** at the hosted SPA choose **Node hosted app (local PC)** — your browser opens `http://127.0.0.1:3333` on the same path with no SSH step. Or start the local node app with `./local-node-app/install-or-update-node-app.sh` and attach there directly.

**Remote VPS:** choose **Node hosted app (SSH tunnel)** on the hosted SPA, enter your public IPv4, run the three-port SSH command on your PC, then continue to the local node app and attach.

**Browser HTTPS:** attach via a Node hosted app option first, use **Fetch Self-Signed Web Cert** to download **`browser.crt`**, import it into your browser, then reconnect on the hosted SPA with **Browser HTTPS** and a read JWT. The old “SSH tunnel to ContinuumDAO hosted app” option is no longer offered.

To run the node-hosted frontend on the node itself, read `local-node-app/README.md`, set the required environment variables, then:

```bash
./local-node-app/install-or-update-node-app.sh
```

Once you are in MPA wallet, if you ran the automated provision-node.sh above in step (9), go to the Node page → **Node Peer IP Editing** to set up the IP address of the other nodes, then **Inter Node Communication** for secure messaging between nodes.

### Related

- [Install a node](/ContinuumDAO/MPAWallet/Install.md) — preferred node-map installer (humans) + AI one-shot links
- [Agent provision and configure](/ContinuumDAO/MPAWallet/AgentProvision.md) — AI agent full VPS provision + mesh
- [CREATE_NODE_ONESHOT.md](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/CREATE_NODE_ONESHOT.md) — AI agent VPS one-shot
- [Backup and restoration](/ContinuumDAO/MPAWallet/BackupAndRestoration.md)
- [Overview](/ContinuumDAO/MPAWallet/Overview.md)
- [Configured Nodes](/ContinuumDAO/MPCSigner/ConfiguredNodes.md)
- [Joining the Continuum](/ContinuumDAO/MPCSigner/JoinNetwork.md)
- mpc-config [README](https://github.com/ContinuumDAO/mpc-config/blob/main/README.md) · [AGENTS.md](https://github.com/ContinuumDAO/mpc-config/blob/main/AGENTS.md)

