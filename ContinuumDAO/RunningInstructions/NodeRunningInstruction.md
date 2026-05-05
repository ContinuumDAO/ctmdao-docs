
## Node Running Instructions

The source of truth for setting up an MPC node is in out github [here](https://github.com/ContinuumDAO/mpc-config/blob/main/README.md), This covers installation of different OS types and how to resolve any issues that may arise.

### Type of Machine

If you are only setting up a Multi-Party Agent wallet, then you can use a home machine with Linux (e.g. Ubuntu/Debian/Mint). You will need at least 16 GB of RAM and 6 CPU cores (most laptops are sufficient).

If you want to join the Continuum as an MPC Signer to support C3Caller cross-chain messaging and to earn rewards for doing so, then you will need a machine that has at least the above specification but must be a VPS or hosted to ensure uninterrupted service. This will be checked at the Proposal stage of joining the Continuum.


### Quick Start

We briefly cover a Quick Start for an Ubuntu/Debian VPS here.

(1) As root or sudo  user, create another user called mpcnode and give it sudo access

```
sudo adduser mpcnode
sudo usermod -aG sudo mpcnode
```


It is useful to avoid having to enter a password for the sudo command. To avoid this, on each node, edit sudoers file:

```
sudo visudo
# Add this line at the end of the file (replace 'mpcnode' with your username):
mpcnode ALL=(ALL:ALL) NOPASSWD: ALL
# Or for password-protected sudo (more secure):
mpcnode ALL=(ALL:ALL) ALL

# Save and exit (Ctrl+X, then Y, then Enter in nano)
```



(2)  Log in as user mpcnode (e.g. ssh mpcnode@<your-vps-ip> or: su - mpcnode)

(3) Install all software

```
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
  jq \
  && sudo systemctl enable --now docker
```

You may get a warning if you already have docker installed, but it should be fine.

(4) Pull the software from the ContinuumDAO github

```
su  - mpcnode
git clone https://github.com/ContinuumDAO/mpc-config.git
cd mpc-config
```

(5) Make sure that you don't have other Docker containers running that might conflict

You can see running containers with sudo docker ps

You can see any installed images with sudo docker images

This installation assumes that you have nothing else running that might cause issues

(6) Start the Docker service if necessary

```
sudo systemctl status docker  (Check for 'running' and enter a q to quit)
```
If Docker is not running, start it:

```
sudo systemctl start docker
sudo systemctl enable docker  # Enable auto-start on boot
```

(7) Add the user mpcnode to the docker group and restart

```
sudo usermod -aG docker mpcnode
```

Log out with exit (or CTRL-D) and either from root, su - mpcnode or ssh back into the user mpcnode.

You should now be in the folder /home/mpcnode/mpc-config and if you are not 

```
su - mpcnode
 cd ~mpcnode/mpc-config
 pwd
```

Make sure that you get no error with the command sudo docker ps and if you do, you will need to fix this before moving on.

(8) Collect the needed node information

- Make a note of the IPv4 address of your node. You can get this by running

```
hostname -i
```

Or get the IPv4 address from the VPS supplier.

- Choose which Ethereum address you wish to manage your node (in configs.yaml - NodeMgtKey), and/or which ed25519 key (in configs.yaml PublicMgtKey). One or both of these will be required by process_config.sh (the next step)
- Optional and recommended: (This can be done from https://mpa.continuumdao.org Nodes page) :

```
sudo ./scripts/provision-node.sh -k 0x12345abcdef87654321987654775  # Replace with yours
```

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

```
./process_config.sh 
```

If you messed up (e.g. wrong Ethereum address, wrong IP addresses etc.) you can CTRL-C and you can simply rm configs.yaml and try again. The script will copy a vanilla config file for you to use.

You can safely re-run ./process_config.sh again (e.g. to add a new IP address, or to validate your existing config) and your old changes will not be lost.

(10) Load the Docker images

```
sudo docker-compose up -d  
```
NB If you have docker-compose-plugin installed then the command is docker compose and not docker-compose. If you get an error such as ERROR: Version in "./docker-compose.yml" is unsupported, then see the [README](https://github.com/ContinuumDAO/mpc-config/blob/main/README.md#compose-file-version-unsupported-version-38)

Check everything is OK.

```
sudo docker ps
```
This should show 3 containers if your node is a Relay node (the first IP in the Configured Nodes list ) - 

continuumdao/mpc-auth:vX.Y        0.0.0.0:8443->8443/tcp, 127.0.0.1:8080->8080/tcp, 0.0.0.0:18080-18081->18080-18081/tcp

eclipse-mosquitto:2.0        0.0.0.0:8883->8883/tcp, 1883/tcp, 0.0.0.0:9001->9001/tcp

mongo:6.0             127.0.0.1:27017->27017/tcp     

Ensure that the containers stay up and do not restart periodically (indicating a fault)

The first container is the ContinuumDAO MPC code. The second (eclipse) is the node inter-communication software used for nodes to talk to each other (encrypted). The last one (mongo) is a database that holds all data for your node. There is shared information (e.g. Group data, KeyGen data) and there is private data (e.g. local config information for your MPA wallet setup). **If you delete this container, then you will lose the information to connect to other nodes and you will corrupt the MPC Signer. All existing Group and KeyGen data will be lost**

The other nodes (not the first IP address) are Client nodes. They only have 2 docker containers and don't have the eclipse container.

Check your firewall. -

```
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

(d) You, or an AI Agent (like Open Claw) can communicate to the node's API over port 8080 from localhost ONLY. There is no access to the API through the en-encrypted port 8080, or any other port, unless you bypass this in your configs.yaml and compose-docker.yml

(e) The nodes can communicate with each other using MQTT via the encrypted port 8883


You can check for errors or warnings on your node either using sudo docker logs command, or using the log utility in the Info page of https://mpa.continuumdao.org once you have connected to it.


(11) Optional (recommend that this be done from https://mpa.continuumdao.org): Otherwise share the MQTT Public Certificate from the Relay node (first IP address IP address in the Configured Nodes) with the other nodes. The Public cert is  ./mosquitto/config/certs/ca.crt and it should be copied to the ./mosquitto/config/certs/ folder on the other nodes **being careful to keep this information secret** It is good practice to delete the key pair on the Relay node and share with the other nodes regularly.

Restart the nodes -

```
sudo docker-compose down
sudo docker-compose up -d
```

(12) Optional (recommend that this be done from https://mpa.continuumdao.org):  Otherwise copy the browser Public cert ./webTLS/config/certs/browser.crt to any PC that you will want to access your node from using the app https://mpa.continuumdao.org

You will need to ensure that your browser will trust your self-signed SSL certificate and to do that, you will need the public cert used for JWT based encrypted traffic.


(13) Optional (recommend that this be done from https://mpa.continuumdao.org, if you wish to do it): Otherwise you can set up an ed25519 management key on your node. This will allow POST requests to be made to your node by an AI Agent (or you on your PC).

You can generate a key -

```
ssh-keygen -t ed25519 -C "some unique text of your own"
```

Copy the Public Key into the PublicMgtKey field in your configs.yaml file by running ./process_config.sh again. You can add the openSSH pubkey (e.g. ssh-ed25519 AAAA… comment), or you can convert this to a 64 hex pubkey using the util tools/openssh_ed25519_to_hex.py and add that. You will then need to stop and restart your Docker instances for the changes to take effect.

You can also give the Private key to your AI Agent to sign POST requests by copying this into the ~/.ssh/ folder of the AI Agent's home folder.

This will verify that your key is correct. This is your **bootstrap key** and you should not delete it (or the Private key). You can create new ed25519 keypairs in the Info page of https://mpa.continuumdao.org at any time (good security practice), but do keep the original bootstrap key. New ed25519 public keys are stored in your database, so no further changes to configs.yaml are required.

If you have an ed25519 keypair, you do not need an EIP-191 wallet (e.g. MetaMask) to attach your node to mpa.continuumdao.org (just enter your IP address, without connecting your wallet). If you have both EIP-191 and ed25519 keys, then *if MetaMask is connected* this will be used in preference to ed25519 signing.


If you got this far, congratulations! Your node is running. You may now attach to your node securely via your browser at https://mpa.continuumdao.org using ContinuumDAO's public frontend.

If you skipped the steps to add the webTLS cert, choose the option 'SSH tunnel' and follow instructions. 

If you want to run your own frontend on your node itself, you can easily do so. Read the README.md file in local-node-app/README.md and set the required environmental variables. Then start it:

```
./local-node-app/install-or-update-node-app.sh
```

This pulls the frontend code and starts the web server on your node. You can then attach to it. If your node is running on your laptop/PC, in your browser go to localhost:3333 and select 'Plain HTTP' and there is no need to run the ssh tunnel command.

If you want to connect to your web server over the internet, then also choose 'Plain HTTP', enter the IPv4 address of your node in the box 'Your node’s public address '  and copy and run the command presented to you to run in your terminal.

Once you are in MPA wallet, if you ran the automated provision-node.sh above in step (9), you should go to the Node page and 'Node Peer IP Editing'  to set up the IP address of the other nodes and then go to 'Inter Node Communication' to set up secure messaging between the nodes. 

If you want to setup secure TLS connections from your web browser rather than using the SSH tunnel (which is fine by the way on its own), you can fetch your web TLS cert in 'Fetch Self-Signed Web Cert' and them follow the instructions to add this cert to your browser's certificate store. After refreshing the browser, you can now enter the MPA wallet using the 'Browser HTTPS' route.

