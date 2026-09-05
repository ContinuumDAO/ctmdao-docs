<!--
agent:
  task: provision-and-configure-mpc-node
  audience: [ai-agent]
  oneshot_script: https://raw.githubusercontent.com/ContinuumDAO/mpc-config/main/scripts/install-node-debian-ubuntu.sh
  oneshot_doc: https://github.com/ContinuumDAO/mpc-config/blob/main/docs/CREATE_NODE_ONESHOT.md
  agents_md: https://github.com/ContinuumDAO/mpc-config/blob/main/AGENTS.md
  playbook: https://docs.continuumdao.org/ContinuumDAO/MPAWallet/AgentProvision
  keywords: [provision node, configure node, Path A, continuum-mcp, 8446, topology, 2-of-3, MQTT, node_config, oneshot, create mpc node]
-->

## Agent provision and configure

If you are an AI agent (Claude, Cursor, Grok, or similar) asked to **create an MPC node**, **install a node**, **provision a VPS**, or **fully configure** a Continuum MPA node, **this page is the playbook**. Do not start from the long manual [Running an MPC Node](/ContinuumDAO/RunningInstructions/NodeRunningInstruction.md) page.

Humans installing interactively should use **[Install a node](/ContinuumDAO/MPAWallet/Install.md)** (node map **`+`**).

This playbook covers **VPS install plus mesh configuration** (peers, relay, MQTT, Group, KeyGen) and hand-off to the operator. The one-shot script is **only the install step**.

### How an AI agent discovers this page

1. Call **`search_continuum_docs`** with queries such as `provision node`, `create mpc node`, `install node agent`, or `configure peers MQTT`.
2. Follow the hit for this page: **`get_continuum_doc`** with path `ContinuumDAO/MPAWallet/AgentProvision`.
3. Crawlers and other clients: start at [llms.txt](https://docs.continuumdao.org/llms.txt) and [llm-index.json](https://docs.continuumdao.org/well-known/llm-index.json) (`llmld:getStarted` / task `provision-and-configure-mpc-node`).

After the operator tunnels **continuum-mcp**, load MCP resource **`node_config_docs`** (`node-config.md`) for the same Path A tool names.

### 0. Ask which topology before renting anything

Do **not** default to “rent two VPS from the same provider.” Continuum does **not** buy machines (no x402 / Hetzner / DigitalOcean integration here). After the user picks a topology, tell them to rent the matching **Ubuntu or Debian** VPS count with public IPv4 and `ssh root@`.

**Recommend redundancy plus diversity** whenever the user will control more than one node (option A, and invitees in C):

- **Node redundancy:** prefer **2-of-3** (or higher `N` with `gate < N`) so one lost VPS does not freeze the wallet. 2/2 has no spare.
- **Different regions:** put nodes in distinct geographic regions.
- **Different VPS providers:** one provider ban, billing failure, or regional incident should not take every node offline.

The relay is still a single MQTT hub — say that clearly — but signing nodes should not share provider and region with each other.

| Option | Tell the user | Rent / oneshot | Then |
|--------|---------------|----------------|------|
| **A — Standalone set they control** | They run every signing node. Ask **how many can die** before the wallet is stuck. **Recommend 2-of-3**, split across **regions and providers**. | **N** Ubuntu/Debian VPS | Same relay (first slot) on every node. MQTT key from relay → others. Group + KeyGen with chosen **gate**. |
| **B — Join an established group** | Someone already has a relay. | **One** VPS | Prefer a **different region and provider** than the existing peers. Import **relay IP** + **MQTT TLS public key**. Do not invent a second relay. |
| **C — This node is the relay; invite others** | They host MQTT. | **One** VPS to start | Export MQTT public key and share IP + PEM. Invitees run B; ask them to use other regions/providers. |

#### Option A — 2/2 vs extra nodes for safety

| Sub-choice | Nodes (N) | KeyGen `gate` | If one node is lost |
|------------|-----------|---------------|---------------------|
| **2/2** | 2 | 2 | Cannot sign until that node is restored. Smallest pair only if they accept that risk. Still use **two providers / two regions**. |
| **Safer (recommend this)** | 3 | 2 (2-of-3) | The other two still reach gate 2. **Default ask.** Three VPS, three regions if possible, at least two providers. |
| **More slack** | 4+ | e.g. 2-of-4 or 3-of-5 | Can lose `N − gate` nodes. Keep spreading region and provider as N grows. |

`gate` is the KeyGen signing threshold (`2 ≤ gate ≤ N`). Loss-safety requires **gate &lt; N**. One installed node cannot finish a KeyGen alone. The MQTT TLS public key is an **invite secret** (relay → peers), not a public paste. Every collaborator must use the **same first/relay IPv4**.

### 1. One-shot VPS install (as root)

On each new Ubuntu/Debian VPS, run the one-shot installer as **root** (`ssh root@…`). Full flags and restore notes: [CREATE_NODE_ONESHOT.md](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/CREATE_NODE_ONESHOT.md).

```bash
curl -fsSL "https://raw.githubusercontent.com/ContinuumDAO/mpc-config/main/scripts/install-node-debian-ubuntu.sh" \
  | bash -s -- \
      --node-mgt-key "0xYour40HexCharacters..." \
      --ip "YOUR_VPS_PUBLIC_IP"
```

| Secret | Oneshot | After install |
|--------|---------|---------------|
| Root password or root SSH key | Needed to run the script | Do not keep in the agent after install |
| `mpcnode` login password | **Not set by oneshot** — you must give `passwd` next | User-only (SSH / wallet website attach). Not needed for MCP |
| LLM API key | — | User sets **AI Agent → Provider** later. Not your first action. There is no MCP tool for it. |

Prefer: the user runs oneshot, or you use a **root SSH key**. Putting the root password in chat is last resort.

Local Windows / macOS PCs are **not** this flow — send humans to [Install a node](/ContinuumDAO/MPAWallet/Install.md#your-own-pc).

### 1b. Set the `mpcnode` login password (required before the tunnel)

Oneshot **creates** OS user `mpcnode` (`adduser --disabled-password`, sudo + docker group). It does **not** set a login password (passwords must not go through curl|bash). Until the user sets one, `ssh mpcnode@…` will fail.

**Immediately after oneshot succeeds**, give this copy-paste line (substitute the VPS IPv4). The user runs it on **this PC**; `passwd` prompts them twice. Do **not** ask them to type the password in chat.

```bash
ssh root@YOUR_VPS_PUBLIC_IP 'passwd mpcnode'
```

Tell them: pick a password they will remember; they will need it for the SSH tunnel and later attach. Only after this succeeds, give the `mpcnode@` tunnel command.

### 2. Tunnels: mesh setup vs wallet control

You may MCP **each node you provisioned**, but only for **host mesh setup**. Do **not** Accept Group, KeyGen, or spends on more than one node. That would let one agent complete the threshold and cancel MPC.

| Allowed on every node you oneshot | Never on a second node |
|-----------------------------------|-------------------------|
| Peers (`set_configured_nodes`) | `create_group_request` / `accept_group_request` |
| MQTT export / import | `create_key_gen_request` / `accept_key_gen_request` |
| New preferred Ed25519 signer (silent) | `post_preferred_key_gen`, compose, Agree/Reject sign |
| Health / `node_id` / restart gate | MCP into a node you did **not** provision (invitees run their own Path A or the wallet website) |

Default: **one tunnel at a time** on `127.0.0.1:8446`. Give a new copy-paste `ssh` line for the next VPS IPv4; the user stops the previous `-N` session. Do not invent extra local ports unless they ask. After mesh setup, leave the tunnel on **one home node** (prefer the **relay**) for Group/KeyGen origin and later work.

You talk to **`http://127.0.0.1:8446/mcp`**. You do **not** use the node’s built-in AI harness. MCP HTTP has **no auth** — keep **8446** on loopback.

**Always give a single copy-paste OpenSSH line** (same style as the **Node hosted app (SSH tunnel)** box on [mpa.continuumdao.org](https://mpa.continuumdao.org)). Substitute the VPS you are configuring **now**. Run it on **this PC**, not on the node. Leave the process running (`-N`). User is **`mpcnode`**, not `root` — only after §1b (`passwd mpcnode`) succeeded.

The wallet website’s default three-port command (**3333** node-app, **8080** management, **18080** discovery) does **not** include MCP. Path A needs **8446**. Prefer one command that forwards all four so attach later works without a second tunnel:

```bash
ssh -4 -N \
  -L 127.0.0.1:8446:127.0.0.1:8446 \
  -L 127.0.0.1:3333:127.0.0.1:3333 \
  -L 127.0.0.1:8080:127.0.0.1:8080 \
  -L 127.0.0.1:18080:127.0.0.1:18080 \
  mpcnode@YOUR_NODE_PUBLIC_IP
```

MCP-only (if they will not attach in the browser this session):

```bash
ssh -4 -N -L 127.0.0.1:8446:127.0.0.1:8446 mpcnode@YOUR_NODE_PUBLIC_IP
```

Do **not** bind `0.0.0.0`, invent extra ports, or use `root@` for this tunnel. Bind `127.0.0.1` on both sides. Windows: Terminal or Command Prompt (OpenSSH). macOS/Linux: Terminal. If `ssh` is missing on Windows, tell them to add the OpenSSH Client optional feature.

| Local port | Remote | Who |
|------------|--------|-----|
| **8446** | `continuum-mcp` `/mcp` | You use (`http://127.0.0.1:8446/mcp`) |
| **3333** | node-app | User attach (hand-off) |
| **8080** | management HTTP | wallet website attach |
| **18080** | public discovery | wallet website attach |

First MCP calls after connect: `get_health` or `node_id`.

### 3. Configure peers, MQTT, and signer (each node you provisioned)

Activate tool group **`node_config`** (`activate_tool_group`). Read peers with **`get_configured_node_keys`**. Tool detail lives on the node as MCP resource **`node_config_docs`**.

Walk the nodes **one tunnel at a time** (relay first):

1. `set_configured_nodes` with the **same** `peers: [relayIpv4, ...otherIpv4]` on each. Default peer port is **8081**.
2. On the **relay**: `get_mqtt_tls_public_key`. Keep the PEM for the other tunnels.
3. On each **other** node you provisioned: `set_mqtt_tls_key` with that PEM.
4. On each of those nodes (silent): `add_management_signer` then `set_preferred_management_signer` with the new public key. Do not leave bootstrap as preferred.
5. Optional: `get_maintenance_restart_gate`. The operator runs **`docker compose restart`** on that VPS. There is no MCP reboot tool.
6. `get_configured_node_keys` / `get_connectivity_health` before you leave the tunnel.

Do **not** call `create_group_request`, `accept_group_request`, `create_key_gen_request`, or `accept_key_gen_request` until you are back on the **home** node — and never Accept on a second node.

### 4. Topology playbooks (after oneshot)

**A1 — 2/2** (only if they accept no spare): oneshot on two VPS in **different regions**, ideally **different providers**. Sequential tunnels: peers + MQTT + new signer on **both**. Then stay on the **relay**. Originate Group both `node_id`s and KeyGen `gate: 2`. User **Accepts** on the other node in the wallet website.

**A2 — 2-of-3** (recommended): three VPS — **different regions**, **at least two providers**. Sequential tunnels for peers/MQTT/signer on all three. Stay on the relay. Group all three IDs. KeyGen `gate: 2`. User Accepts on the other two.

**B — Join existing:** oneshot on one VPS. Import their **relay IPv4** and **MQTT PEM**, new signer, restart. Originate or Accept **only on this node** as they instruct.

**C — Become relay and invite:** oneshot on one VPS. Peers + export MQTT + new signer here. Give invitees: public IP, relay slot, PEM. They run B themselves. You never MCP invitee nodes. Prefer a 2-of-3+ gate.

### 5. Hand-off to the user

Do **not** stop after peers / MQTT / restart and point them at the long docs. **Say the remaining wallet steps out loud** (a short checklist). After §3, leave the tunnel on the **home** node (relay). Originate Group and KeyGen **there only**. The user Accepts on every other node in the wallet website.

When the home node’s mesh view looks healthy (`get_connectivity_health`):

0. Preferred signer is already done on each provisioned node in §3 (silent). If you skipped a node, do it before Group.
1. **Group** — `create_group_request` with the `node_id`s from the chosen topology. You are auto-agreed as originator. Tell the user to **Accept** on each other node (unanimous).
2. **KeyGen** — `create_key_gen_request` with the **gate** you already agreed (prefer 2-of-3). User Accepts on the other nodes. Wait until `fetch_key_gen_result` shows a shared address.
3. **Register (preferred KeyGen)** — `post_preferred_key_gen` on the node they will use for compose / Agent chat. In the UI this is **AI Agent → Provider** (or the prompt in Agent chat). Without this, the wallet has an address but the agent/UI does not know which KeyGen to spend from.
4. **Attach** — [https://mpa.continuumdao.org](https://mpa.continuumdao.org) ([Attach your node](/ContinuumDAO/MPAWallet/AttachYourNode.md); tunnel **3333** if needed) so they can see the Group, KeyGen, and Accept queue.
5. They already set the **`mpcnode`** password in §1b. If they skipped it, give `ssh root@IP 'passwd mpcnode'` now.
6. Optional later: **AI Agent → Provider** (their LLM key), chains, tokens. Path A does not need the LLM key.

Point at [Groups](/ContinuumDAO/MPCSigner/Groups.md) and [KeyGens](/ContinuumDAO/MPCSigner/KeyGens.md) only as backup, not as the primary instruction.

### Related

- [Install a node](/ContinuumDAO/MPAWallet/Install.md) — humans (node map) + short agent pointer
- [CREATE_NODE_ONESHOT.md](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/CREATE_NODE_ONESHOT.md) — VPS install script only
- [Uninstall a node](/ContinuumDAO/MPAWallet/Uninstall.md) — decommission; [UNINSTALL_NODE.md](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/UNINSTALL_NODE.md)
- [Configured Nodes](/ContinuumDAO/MPCSigner/ConfiguredNodes.md)
- [Groups](/ContinuumDAO/MPCSigner/Groups.md)
- [KeyGens](/ContinuumDAO/MPCSigner/KeyGens.md)
- [Attach your node](/ContinuumDAO/MPAWallet/AttachYourNode.md)
- [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md) — optional, after KeyGen
