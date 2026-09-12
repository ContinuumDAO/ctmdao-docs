<!--
agent:
  task: create-mpc-node
  audience: [human, ai-agent]
  oneshot_script: https://raw.githubusercontent.com/ContinuumDAO/mpc-config/main/scripts/install-node-debian-ubuntu.sh
  oneshot_doc: https://github.com/ContinuumDAO/mpc-config/blob/main/docs/CREATE_NODE_ONESHOT.md
  agents_md: https://github.com/ContinuumDAO/mpc-config/blob/main/AGENTS.md
  agent_playbook: https://docs.continuumdao.org/ContinuumDAO/MPAWallet/AgentProvision
  keywords: [one-shot, install node, create node, provision VPS, mpc-config]
-->

## Install a node

For almost all interactive (human) users, install a node from the Continuum node map — you do not need manual shell provisioning.

<img src="/_media/ContinuumMPAWalletNodeMap.png"  alt=""/>

### Start here

1. Open [https://mpa.continuumdao.org/node-map](https://mpa.continuumdao.org/node-map).
2. Click the **`+`** button.
3. Walk through the installer options: where the node should run (remote VPS or your own PC), management keys, and the **public** IPv4 address peers will use to reach you.
4. When the installer finishes, **attach** the node (see [Attach your node](#attach-your-node) below) and continue with [Post install steps](#post-install-steps).

Product overview: [An Overview of the Multi-party Agent Wallet](/ContinuumDAO/MPAWallet/Overview.md).

### For AI agents — full provision and configure

**If you are an AI agent asked to provision or configure a node, start here:** [Agent provision and configure](/ContinuumDAO/MPAWallet/AgentProvision.md) (topology, oneshot, SSH tunnel to `:8446`, peers / MQTT, Group, KeyGen, hand-off). Discover it with `search_continuum_docs` (`provision node` / `create mpc node`) then `get_continuum_doc` path `ContinuumDAO/MPAWallet/AgentProvision`.

The one-shot script is **install only** (Ubuntu/Debian VPS as **root**). Do not start from the long manual [Running an MPC Node](/ContinuumDAO/RunningInstructions/NodeRunningInstruction.md) page.

| | |
|--|--|
| **Full playbook** | [Agent provision and configure](/ContinuumDAO/MPAWallet/AgentProvision.md) |
| **Script** | [`install-node-debian-ubuntu.sh`](https://github.com/ContinuumDAO/mpc-config/blob/main/scripts/install-node-debian-ubuntu.sh) |
| **Install flags** | [CREATE_NODE_ONESHOT.md](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/CREATE_NODE_ONESHOT.md) |
| **Repo entry** | [AGENTS.md](https://github.com/ContinuumDAO/mpc-config/blob/main/AGENTS.md) |

```bash
curl -fsSL "https://raw.githubusercontent.com/ContinuumDAO/mpc-config/main/scripts/install-node-debian-ubuntu.sh" \
  | bash -s -- \
      --node-mgt-key "0xYour40HexCharacters..." \
      --ip "YOUR_VPS_PUBLIC_IP"
```

Run as **root** on the VPS (or via `ssh root@… 'curl … | bash -s -- …'`). Full options: script `--help`. Deeper notes: [mpc-config README — One-shot VPS install](https://github.com/ContinuumDAO/mpc-config/blob/main/README.md#one-shot-vps-install).

Advanced / manual shell steps (interactive operators): [Running an MPC Node](/ContinuumDAO/RunningInstructions/NodeRunningInstruction.md).

### Choose where the node runs

| Host | Best when | Notes |
|------|-----------|--------|
| **Remote VPS** | You want an always-on node with a stable public IP | Cloud firewall / security groups must allow peer ports |
| **Your own PC** | You prefer running Docker Desktop at home or on a laptop | You must use your **public** WAN IP and forward ports on your router |

---

### Remote VPS

1. Use the node-map **`+`** flow and choose the remote / VPS option the installer presents.
2. Typical prerequisites: an Ubuntu or Debian VPS, SSH access, and the **public IPv4** the installer asks for.
3. Ensure the cloud firewall (or host firewall) allows discovery and peer traffic — see the [one-shot VPS install](https://github.com/ContinuumDAO/mpc-config/blob/main/scripts/install-node-debian-ubuntu.sh) and [mpc-config README](https://github.com/ContinuumDAO/mpc-config/blob/main/README.md) for exact port / `ufw` detail.
4. When containers are up, [attach your node](#attach-your-node).

---

### Your own PC

> **For AI agents:** do **not** run install shell scripts on the operator’s Windows, macOS, or home Linux PC. **Coach** them through this section and the [node map `+`](https://mpa.continuumdao.org/node-map) / **Continuum Node** Docker extension — the human clicks **Install** in the UI. See [Agent install anti-patterns](/ContinuumDAO/MPAWallet/AgentInstallAntiPatterns.md#anti-pattern-4--windows--macos-agent-ran-install-scripts-instead-of-coaching-the-human).

Enter your **public** WAN IPv4 in the installer (for example from [https://ip.me](https://ip.me)) — **not** a private LAN address such as `192.168.x.x`. Other nodes must reach you over the internet.

**Prerequisites (you install these yourself):**

1. **Docker Desktop** — Continuum’s PC installer does **not** install Docker Desktop. Download and install it from [Docker Desktop](https://www.docker.com/products/docker-desktop/), start it, and leave it running. On Windows, use the **WSL2** backend that comes with the Docker Desktop installation.
2. **Continuum Node Docker extension** — In Docker Desktop, open **Extensions**, enable Extensions if needed, then **search the Marketplace** for **Continuum Node** (image **`continuumdao/continuum-node-installer`**) and install it. The node-map **`+`** flow also directs you to this extension once Docker Desktop is ready.

#### Home router setup (port forwarding)

Your PC sits behind a home router. Other Continuum nodes on the internet only see your **public** IP (what [ip.me](https://ip.me) shows). The router must send the Continuum ports through to **your PC**. That takes two simple settings in the router’s admin pages.

**1. Open the router settings**

- In a browser on your home network, go to the router admin address. Common ones are **`http://192.168.0.1`** or **`http://192.168.1.1`** (check the sticker on the router, or your ISP’s app).
- Sign in with the router password (often on the same sticker if you never changed it).

**2. Give your PC a fixed address on the home network (tie IP ↔ MAC)**

Routers usually hand out temporary “home” addresses (like `192.168.0.42`). If that changes after a reboot, port forwarding breaks.

- Find your PC’s **MAC address** (hardware ID for Wi‑Fi or Ethernet — the connection you actually use). On Windows: Settings → Network, or PowerShell `getmac /v /fo list`.
- In the router, open **DHCP**, **LAN**, **Address reservation**, or **DHCP binding** (names vary by brand).
- Create a reservation that **ties a chosen home-network IP to your PC’s MAC address** (for example always give this PC `192.168.0.50`). Save/apply.

That fixed home address is **not** the public IP from ip.me — it is only how the router finds your PC inside the house. Write it down; you need it in the next step.

**3. Forward ports in NAT / port forwarding**

- In the router, open **Port forwarding**, **NAT**, **Virtual server**, or similar.
- Add rules that send traffic from the internet to your PC’s **reserved** home IP:

| What to forward | Port (TCP) | Send to |
|-----------------|------------|---------|
| Discovery (so other nodes can find you) | **18080** | Your PC’s reserved home IP |
| Messaging (if this PC is the **relay**) | **8883** | Your PC’s reserved home IP |

Use the same port number outside and inside (18080→18080, 8883→8883). Save/apply; some routers want a reboot.

If your PC is only a **client** (not the relay), **18080** is still required.

**4. Check it worked**

From a phone on **mobile data** (not home Wi‑Fi), or another network, the discovery port should answer on your public IP. More detail and troubleshooting: [Home router port forwarding](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/PORT_FORWARDING_HOME_NETWORK.md).

If the IP on the router’s “internet / WAN” page is different from what ip.me shows, you may be behind **CGNAT** — home hosting may not work without ISP help or a tunnel (same guide).

#### Windows

1. Install **Docker Desktop for Windows** yourself ([download](https://www.docker.com/products/docker-desktop/)), with the **WSL2** backend, and start it.
2. In Docker Desktop → **Extensions**, search for **Continuum Node** / **`continuumdao/continuum-node-installer`** and install the extension (or follow the node-map **`+`** prompts to the same extension).
3. Open the extension, enter your management key, if this is re-creating a previously existing node and **public** IPv4, then **Install** (this provisions the Continuum containers — it does not install Docker Desktop).

Full walkthrough: [Install on Windows (Docker Desktop)](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/INSTALL_NODE_WINDOWS_DOCKER_DESKTOP.md).

#### macOS

1. Install and start **Docker Desktop for Mac** yourself ([download](https://www.docker.com/products/docker-desktop/)) — Intel or Apple Silicon.
2. In Docker Desktop → **Extensions**, search for **Continuum Node** / **`continuumdao/continuum-node-installer`** and install the extension.
3. Open the extension, enter your management key and **public** IPv4, then **Install**.

Full walkthrough: [Install on macOS (Docker Desktop)](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/INSTALL_NODE_MACOS_DOCKER_DESKTOP.md).

##### For AI agents — macOS home PC

**Audience:** external AI agents helping an operator install on **this Mac**. Discover via `search_continuum_docs` (`macOS install node`, `Docker Desktop Mac`) or [install-node.json](https://docs.continuumdao.org/well-known/install-node.json) (`agentPlatformRules.macos`). **Coaching only** — no curl/bash install scripts.

Walk the operator through these steps in order. They perform each action; you do **not** substitute Terminal automation for the extension wizard.

1. **Docker Desktop for Mac** — operator downloads, installs, and starts it ([Docker Desktop](https://www.docker.com/products/docker-desktop/)).
2. **Enable Extensions** — Docker Desktop → **Settings → Extensions** → enable Docker Extensions if prompted.
3. **Continuum Node extension** — Extensions tab → Marketplace → **Continuum Node** (`continuumdao/continuum-node-installer`), or start from [node map `+`](https://mpa.continuumdao.org/node-map) if they prefer the guided flow.
4. **Keys and IP** — in the extension: **NodeMgtKey** (`0x` + 40 hex) and **public WAN IPv4** from [ip.me](https://ip.me) (not a LAN address). Same router forwarding as [Home router setup](#home-router-setup-port-forwarding) (**18080**, **8883** if relay).
5. **Install** — operator clicks **Install** in the extension UI. Do **not** run `install-node-macos-docker-desktop.sh` or `desktop-local-orchestrate.sh --profile macos`.
6. **Prerequisites (only if the extension or docs ask)** — operator runs locally:
   - Homebrew (recommended): `brew install python@3 yq wireguard-tools socat bash` — macOS `/bin/bash` is 3.2; Homebrew **bash 4+** is used for install progress when present.
   - Passwordless sudo if prompted: `sudo visudo -f /etc/sudoers.d/USERNAME` and add `USERNAME ALL=(ALL) NOPASSWD: ALL` — operator types their Mac password; never in chat.
7. **Verify** — after Install completes, operator runs in Terminal:

```bash
curl -fsSL "https://raw.githubusercontent.com/ContinuumDAO/mpc-config/main/scripts/verify-node-install-macos-desktop.sh" | bash -s
```

All required checks must pass before you declare success. Expected layout: **`~/mpc-config`**, running compose containers, LaunchAgent `com.continuumdao.mpc-auth-watcher` (warn if missing — see [Agent install anti-patterns](/ContinuumDAO/MPAWallet/AgentInstallAntiPatterns.md)).

8. **Attach** — [mpa.continuumdao.org](https://mpa.continuumdao.org) → **Node hosted app (local PC)** (not VPS SSH tunnel unless they later use a remote node).

Wrong install or agent ran shell scripts? [Agent install anti-patterns — macOS](/ContinuumDAO/MPAWallet/AgentInstallAntiPatterns.md#anti-pattern-4b--macos-agent-ran-install-scripts-instead-of-coaching-the-human).

#### Linux PC

Install **Docker Desktop for Linux** yourself if you use the Desktop extension path, then search Extensions for **Continuum Node** / **`continuumdao/continuum-node-installer`**. Prefer the same node-map **`+`** flow the installer offers. If it routes you to a workstation-style script instead, follow the prompts and the [mpc-config README](https://github.com/ContinuumDAO/mpc-config/blob/main/README.md). When peers are on the internet, use a public IP and the same **18080** / **8883** forwarding as other home PCs.

---

### After install (all paths)

1. [Attach your node](#attach-your-node) and confirm you can open the Node page.
2. Back up bootstrap Ed25519 material and, soon after, an encrypted database snapshot — see [Backup and restoration](/ContinuumDAO/MPAWallet/BackupAndRestoration.md) (also [Default Ed25519 signer](/ContinuumDAO/MPAWallet/DefaultEd25519Signer.md) and technical [CONFIGURING_ED25519_KEYS.md](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/CONFIGURING_ED25519_KEYS.md)).
3. Continue with **Post install steps** below.

### Attach your node

Your browser talks to **your** node. ContinuumDAO does not relay that control path. Three attach options on the wallet website ([mpa.continuumdao.org](https://mpa.continuumdao.org)): **Browser HTTPS**, **Node hosted app (local PC)**, and **Node hosted app (SSH tunnel)**. Geo-restricted users see only the two node-hosted options.

Full walkthrough with screenshots: [Attach your node](/ContinuumDAO/MPAWallet/AttachYourNode.md). See also [Overview](/ContinuumDAO/MPAWallet/Overview.md) and [Running an MPC Node](/ContinuumDAO/RunningInstructions/NodeRunningInstruction.md).

---

## Post install steps

A single node is not enough to create a shared KeyGen address. You need peers, a Group, and then a KeyGen. Detailed UI for each step lives under [Creating an MPC Signer](/ContinuumDAO/MPCSigner/CreateMPCSigner.md) — this section is the bridge from “I have one node” to those pages.

### One node is not enough for a KeyGen address

A lone node cannot create a KeyGen / shared wallet address by itself. The **simplest** useful MPA wallet is **two nodes with 2/2 TSS** (both must agree to sign) — typical when you want to control an AI agent yourself: one node proposes via the agent, the other is your human-in-the-loop circuit breaker.

Why add a second (or more) node — same peer setup, different roles:

- **Human-in-the-loop vs AI (2/2)** — second node you control so an AI-operated node cannot complete a signature alone
- **Loss safeguard** — extra shares / higher Group size so one lost party or offline node does not strand assets (choose threshold accordingly)
- **No full on-chain private key** — MPC shares replace a single recoverable private key
- **Shared custody** — DAO, investment committee, or multi-party wallet (larger Groups, higher thresholds)
- **Optional later — cross-chain Continuum** — larger Groups (ideally **5+ independent** operators, **3/5 TSS**) with **tx-check** KeyGens; see [Joining the Continuum](/ContinuumDAO/MPCSigner/JoinNetwork.md) and the twofold purpose in [Overview](/ContinuumDAO/MPAWallet/Overview.md)

### Tell your node about its peers (Configured Nodes)

After a fresh install, the peer / relay list is typically a **placeholder** (`0.0.0.0`) — not a working multi-node mesh yet. Before you can create a Group, every collaborating node needs the **same ordered peer list** (first row = **Relay**) and a shared **Inter Node Communication** public key from that relay. Attach to each node in the node app, then open **Node** on that node.

#### Example: two-node 2/2 wallet (relay + peer)

Typical pattern: one VPS runs the **relay** (MQTT broker) and often the AI-assisted node; a second VPS is your **peer** (human circuit-breaker node). Both operators use the **same** relay IP as row 1 and list both public IPv4 addresses.

| Role | Example public IPv4 | Notes |
| ---- | ------------------- | ----- |
| **Node A — Relay** | `198.51.100.10` | First row on **every** node; runs the MQTT relay |
| **Node B — Peer** | `198.51.100.20` | Second row; must appear on both nodes’ lists |

On **Node A** and **Node B**, **Node → Node Peer IP Editing** should look like this (order matters):

| Row | IPv4 on both nodes |
| --- | ------------------ |
| **Relay** | `198.51.100.10` |
| **Peer 2** | `198.51.100.20` |

Each node’s own public IP must appear somewhere in its list. Coordinate with your co-operator so you do not swap relay and peer rows.

#### Node Peer IP Editing (each node)

1. Open **Node → Node Peer IP Editing**.
2. Replace the **Relay** placeholder with the relay VPS public IPv4 (same value on every node).
3. Click **+ Add peer** and enter the other node’s public IPv4 (repeat for larger Groups).
4. Click **Check new Peer list** — fix duplicates or invalid addresses; the UI warns if you changed the relay or added peers.
5. Click **Write config** and complete the management signature (Ed25519 or Ethereum signer).
6. Click **Restart** on the Node page so the new peer set loads (repeat on **each** node after its own write).

You can export the same list with **Save peers JSON…** and send it to co-operators so everyone imports identical entries (**Import JSON…**).

#### Inter Node Communication (relay key → peer nodes)

Nodes encrypt MQTT traffic using a **public key (PEM)** from the **relay** node. Peers must install that key before **Add group** is enabled.

**On the relay node (Node A):**

1. Open **Node → Inter Node Communication**.
2. Click **Get inter-node key**.
3. Copy the **Public key (PEM)** (or **Download** the file as `ca.crt`). Send this certificate to the peer operator through a channel you trust — treat it like TLS trust material, not a broadcast post.

<img src="/_media/inter-node-download-crt-relay.png" alt="" />

**On each peer node (Node B, and any other non-relay node):**

1. Open **Node → Inter Node Communication**.
2. Save the relay’s `ca.crt` to a file on your PC.
3. Click **Choose file**, select `ca.crt`, then click **Post inter-node key** and management-sign when prompted.
4. When the UI shows **Saved.**, use **Restart Node Service** on the Node page (the section shows an amber hint until you restart).


<img src="/_media/inter-node-post-crt-peer-node.png" alt="" />

Repeat the peer steps on every non-relay node. If you **change the relay IP** later, fetch the new relay’s inter-node key again and re-post on all peers.

##### For AI agents — Inter Node Communication

**Audience:** external AI agents (Claude Code, Cursor, Grok Build, and similar) helping an operator install the relay MQTT trust anchor on peer nodes. Full mesh playbook: [Agent provision and configure](/ContinuumDAO/MPAWallet/AgentProvision.md). API detail: [`GET /getMSQTTKey`](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/references/API_IMPLEMENTATION.md#get-getmqttkey) and [`POST /postMSQTTKey`](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/references/API_IMPLEMENTATION.md#post-postmqttkey) in mpc-auth (documented in mpc-config).

The UI steps above map to management HTTP and Path A MCP tools (activate tool group **`node_config`**; resource **`node_config_docs`**):

| Step | UI | HTTP | MCP (`node_config`) |
| ---- | -- | ---- | ------------------- |
| Relay — fetch `ca.crt` | **Get inter-node key** / **Download** | `GET /getMSQTTKey` → `{ path, caCertPem }` | `get_mqtt_tls_public_key` |
| Peer — install relay CA | **Choose file** → **Post inter-node key** | `POST /postMSQTTKey` (management signature over **`caCertPem`** bytes) | `set_mqtt_tls_key` |

**One node at a time.** You cannot reach two nodes from one PC at once — SSH tunnel and local node both bind `127.0.0.1` ports **3333**, **8080**, **18080**, and MCP **8446**. Tell the operator to run **one** tunnel, finish that node, stop it, then open the next. Relay first: fetch the PEM; on each peer tunnel: post the **same** PEM. Call `get_configured_node_keys` / `get_connectivity_health` on each node before you leave its tunnel. Remind them to **Restart Node Service** after post (no automatic reload).

**When one agent may fetch and post**

| Setup | OK for one agent to fetch on relay and post on peers? |
| ----- | ------------------------------------------------------- |
| **Same operator** owns every VPS (Path A provision) | **Yes** — sequential tunnels, health check after each post. This is the intended AgentProvision flow. |
| **Separate co-operators** (each runs their own node) | **No** — relay operator exports `ca.crt` through a channel **they** trust; each peer operator (or their agent) posts **only on their node**. Do not use one external agent as the sole courier across trust boundaries. |
| **External cloud agent** with chat/tool logging | **Caution** — PEM may appear in provider logs. Prefer the peer operator receive the cert out-of-band and post locally, or have the operator confirm the PEM fingerprint before you call `set_mqtt_tls_key`. |

Posting the wrong CA is a **trust substitution** (peer MQTT could be MITM’d). Treat `ca.crt` like TLS trust material, not a public broadcast.

When peer IPs and the relay key are in place, **Groups → Configured Node Keys** should show healthy peers. Details and troubleshooting: [Configured Nodes](/ContinuumDAO/MPCSigner/ConfiguredNodes.md).

### Then create a Group and a KeyGen

1. Confirm Configured Nodes are healthy → [Configured Nodes](/ContinuumDAO/MPCSigner/ConfiguredNodes.md)
2. Create or join a Group → [Groups](/ContinuumDAO/MPCSigner/Groups.md)
3. Create a KeyGen (shared address) → [KeyGens](/ContinuumDAO/MPCSigner/KeyGens.md)

You can keep using the wallet from the node app alone. The MPA wallet is **AI-first**, so most users will also want the optional [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md) steps after the KeyGen exists.

### MPA billing

Before the first **register on Linea** for a KeyGen, claim **withdraw authority** on that node. Full setup — withdraw authority, register, top-up, month activation, and veCTM waiver: **[MPA billing](/ContinuumDAO/MPAWallet/MpaBilling.md)**. [Attach veCTM](/ContinuumDAO/MPAWallet/VeCTMOnYourNode.md) from the authority KeyGen that owns the NFT (at the governance locked-CTM / month-start voting-power minimum) to waive that **Group’s** wallet signature fees and unlock **[Private VPN](/ContinuumDAO/PrivateVPN.md)** on the node. Authority is required to attach and register, not to enable VPN.

### Related

- [Overview](/ContinuumDAO/MPAWallet/Overview.md)
- [Backup and restoration](/ContinuumDAO/MPAWallet/BackupAndRestoration.md)
- [Configured Nodes](/ContinuumDAO/MPCSigner/ConfiguredNodes.md)
- [Groups](/ContinuumDAO/MPCSigner/Groups.md)
- [KeyGens](/ContinuumDAO/MPCSigner/KeyGens.md)
- [MPA billing](/ContinuumDAO/MPAWallet/MpaBilling.md)
- [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md)
- [AI-managed governance](/ContinuumDAO/MPAWallet/AIHarness/AgentGovernance.md)
- [Plan mode](/ContinuumDAO/MPAWallet/AIHarness/PlanMode.md)
- [Agent provision and configure](/ContinuumDAO/MPAWallet/AgentProvision.md) — AI agent full VPS provision + mesh
- [Agent install anti-patterns](/ContinuumDAO/MPAWallet/AgentInstallAntiPatterns.md) — wrong installs, verify, recovery
- [CREATE_NODE_ONESHOT.md](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/CREATE_NODE_ONESHOT.md) — AI agent one-shot VPS install
- [Uninstall a node](/ContinuumDAO/MPAWallet/Uninstall.md) — remove containers, images, and the node folder
- [Running an MPC Node](/ContinuumDAO/RunningInstructions/NodeRunningInstruction.md) — advanced / manual path
