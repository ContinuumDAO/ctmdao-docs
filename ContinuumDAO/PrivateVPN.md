## Private VPN

Most VPN providers have public servers in different countries that users can route traffic through. The VPN service here is different, since anyone can set up a node and then offer VPN service to any other node in their configured peer group, as well as to themselves. This means that users only have to trust their peer nodes not to log their traffic, which anyway is encrypted with TLS or SSH. ContinuumDAO itself cannot and would not log users traffic. The VPN at its base uses Wireguard, but then optionally can choose obfuscation using ShadowSocks and other ways of disguising traffic. 

Every MPA node can run a **Private VPN** — an encrypted tunnel built on **WireGuard**. It lets you route traffic from your laptop, phone, or other machines **through your node** (useful when you manage the node on a remote VPS but browse or sign from home).

**Private VPN is not a separate paid product.** The multi-sign wallet fee contract treats it as a **veCTM privilege**: this **node** must be a member of a **Group** (`groupId`) whose **recorded attach key** still has a qualifying veCTM NFT this month (locked CTM at attach, then that NFT’s month-start `balanceOfNFTAt` at **`veCtmThresholdPower`**). Votes delegated to the KeyGen do **not** count. There is no USDC subscription path for VPN — staked veCTM is the gate. The **current withdraw-authority KeyGen does not need to hold that NFT** — privilege survives rotating authority.

With enough attached **veCTM voting power**, you can **share** your node’s connection with **peer nodes** in your mesh, or **use a peer’s node** as your exit when you need traffic to leave the internet from their location.

Prerequisites: a running node, [attach to the node app](/ContinuumDAO/MPAWallet/AttachYourNode.md), and [veCTM attached](/ContinuumDAO/MPAWallet/VeCTMOnYourNode.md) so this node is a member of a Group whose attach key meets the governance-set minimum ([How much veCTM do I need to lock?](/ContinuumDAO/MPAWallet/VeCTMOnYourNode.md#how-much-vectm-do-i-need-to-lock)). That threshold can change by DAO vote. Confirm entitlement with **`get_node_privilege_status`** (or the node app VPN / Multi-Sign privilege hint) — not “does the *current* authority KeyGen own an NFT?”

---

### What you can do

| Use case | Plain-language description |
|----------|----------------------------|
| **Connect your devices to your node** | Your PC or phone sends traffic through the VPS (or home machine) that runs the node — same control path you already use for wallet management, extended to general browsing or tooling. |
| **Share your node with peer operators** | Other nodes in your configured peer list can request a client profile and send **their** traffic out through **your** node’s public IP. You set a **speed cap** so sharing stays under your control. |
| **Use a peer’s node as your exit** | Your node lists available peer exits; you download a client config and connect so **your** traffic leaves the internet from **their** node (for example another region or provider). |

Private VPN unlocks only when the node reports **veCTM privilege**: it is associated with at least one **`groupId`** (via **attach** or **register**) whose recorded attach key still meets **`veCtmThresholdPower`** this month. A **node trial** or paid wallet month **does not** grant VPN. **Withdraw authority** is required to **attach** or **register**, not to enable VPN. If privilege is missing, attach veCTM from the authority KeyGen that **owns** the NFT (then register that Group if needed) — do not treat a missing attach on the *current* authority as “this node is not entitled.”

---

### Transport options

All paths use **WireGuard** for the core encrypted tunnel. On restrictive networks you can add an **obfuscation** layer so traffic is less likely to be blocked:

| Option | When to use |
|--------|-------------|
| **WireGuard (standard)** | Default — import the `.conf` file into any WireGuard app. Best when VPN protocols are allowed. |
| **Shadowsocks** | Common obfuscation wrapper; helpful where plain VPN traffic is filtered. Downloads include a WireGuard config plus a small transport helper file. |
| **WireGuard obfuscator** | Makes WireGuard packets look less like a typical VPN handshake. |
| **LWO** | Lightweight obfuscation layer over WireGuard. |
| **udp2raw** | Carries WireGuard’s UDP traffic inside TCP or ICMP — useful when UDP is blocked but TCP is not. |

The node app (or agent) asks which option you want when you enable VPN or download a client profile. Pick **standard WireGuard** first; switch obfuscation only if your network blocks the tunnel.

**Routing mode**

- **Full tunnel** — all traffic from the client goes through the node.
- **Split tunnel** — only selected routes use the node; the rest uses your local internet as usual.

---

### Sharing your connection with peers (rate limiting)

When you **offer** your node so peer operators can route traffic through it, you choose a **default speed limit** (megabits per second). That cap applies per shared connection so one consumer cannot saturate your VPS link. You can **revoke** a peer’s access at any time from the node VPN controls.

Consumers see your node in the list of **available exits** (address, country hint, obfuscation mode, and advertised speed cap). They download their own client config; you do not hand out your management keys.

---

### How to use the service

#### Connect your own machine to your node

1. Confirm **this node** has veCTM privilege (a Group on the node with a qualifying attached NFT) → [veCTM on your node](/ContinuumDAO/MPAWallet/VeCTMOnYourNode.md#how-much-vectm-do-i-need-to-lock). The current authority KeyGen need not be the one holding the NFT.
2. Open the node app → **Node** → **VPN** (or the Private VPN panel).
3. **Enable** VPN, choose **full** or **split** routing, and pick **WireGuard (standard)** or an obfuscation option if needed.
4. **Download client config** — saves a WireGuard `.conf` (and a transport file when obfuscated) to the node workspace; copy or download to your PC/phone.
5. Import into the **WireGuard** app (or follow any setup notes bundled with the download) and connect.

For the same flow via **Agent chat**, see [AI agent steps](#ai-agent-steps) below.

#### Share your node with peer operators

1. Meet the same **veCTM** threshold and enable VPN on your node.
2. Turn on **share connection with peers** (wording may vary in the UI).
3. Set the **speed limit** (Mbps) you are willing to offer.
4. Optionally choose an obfuscation mode peers must use.
5. Revoke individual peers when access should end.

#### Use another peer’s node as your exit

1. On your node app **VPN** page, open **available peer exits**.
2. Pick an exit (check country, speed cap, and obfuscation).
3. **Download client config** for that exit and import into WireGuard on the machine whose traffic should use that route.

#### AI agent steps

For the **built-in** Agent chat / Telegram harness on the node. **External** agents (Claude with SSH tunnel + MCP, same as [Agent provision](/ContinuumDAO/MPAWallet/AgentProvision.md)) should follow [External AI agent (SSH tunnel + MCP)](#external-ai-agent-ssh-tunnel--mcp) below — that subsection is written for agents, not humans.

With the [AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md) configured, you can run Private VPN from **Agent chat** (or Telegram) instead of the node app **Node → VPN** panel. The agent uses the **`vpn`** MCP server on **continuum-mcp** for WireGuard admin and peer exits, and the built-in **`continuum`** server to confirm **veCTM privilege** before enabling anything. Add **`vpn`** from the MCP catalog and turn on **Initial load** if you want those tools available every session — see [MCP servers — VPN](/ContinuumDAO/MPAWallet/AIHarness/McpServers.md).

Describe what you want in plain language. The agent maps your request to MCP tools (for example **`get_node_privilege_status`** on **`continuum`** — the VPN gate — then **`set_vpn_enabled`**, **`download_vpn_admin_client_config`**, and egress tools on **`vpn`**). Do **not** use **`get_ve_ctm_attach_status`** as the VPN check: that lookup is KeyGen-scoped (does *this* address own an attached NFT). Downloaded client files land under **`data/vpn/`** on the node workspace — same as the node app.

**Check entitlement and status**

- *“Do I have veCTM privilege for Private VPN on this node?”*
- *“What is my VPN status — is WireGuard enabled and which profile is active?”*

**Connect your devices through your node**

- *“Enable Private VPN on my node with a full tunnel and standard WireGuard.”*
- *“Enable split-tunnel VPN on my node and download the client config for my laptop.”*
- *“My network blocks WireGuard — enable VPN with Shadowsocks obfuscation and download the config files.”*

**Share your node with peer operators**

- *“Turn on peer VPN sharing on my node with a 20 Mbps speed cap.”*
- *“Show egress sharing status on my node — how many peers are connected?”*
- *“Revoke VPN access for peer node key …”* (paste the consumer’s 128-char hex node key from the UI or a prior agent reply)

**Use a peer’s node as your exit**

- *“List available peer VPN exits I can use.”*
- *“Download a WireGuard client config to route through the exit at …”* (use the **address** from the exit list)
- *“Download an egress config for that peer using udp2raw obfuscation.”*

Enable, disable, sharing, and config downloads are **management-signed** writes on the node (Ed25519, same as other agent admin actions). They do **not** go through the MPC Accept/Reject loop — unlike wallet transactions — and do **not** require the current withdraw-authority KeyGen to hold the NFT. If privilege is missing, the agent should tell you to [attach veCTM](/ContinuumDAO/MPAWallet/VeCTMOnYourNode.md) from the authority KeyGen that owns the NFT; a node trial or paid wallet month does not grant VPN.

After a successful download, configs are written under **`data/vpn/`** on the node. Tell the user where the files are and how to import them into WireGuard on the device that will use the tunnel.

#### External AI agent (SSH tunnel + MCP)

**Audience:** external AI agents only (Claude, Cursor, Claude Code, etc.) — **not** human how-to steps. This assumes the same **Path A** attachment as [Agent provision and configure](/ContinuumDAO/MPAWallet/AgentProvision.md): the operator runs an **SSH tunnel** from their PC to the node, forwards **`127.0.0.1:8446`** to **`continuum-mcp`**, and you call **`http://127.0.0.1:8446/mcp`**. You have full node management API access via MCP — you do **not** use the node’s built-in Agent chat harness.

**Prerequisites before you enable VPN**

1. Tunnel up — `8446` on loopback (see Agent provision § tunnel; include **8446** even if the wallet website command only lists 3333 / 8080 / 18080).
2. Management signing — Ed25519 private key in `added_keys/` for write tools (same as Path A cron / node_config flows).
3. MCP servers — load **`continuum`** (privilege / billing) and **`vpn`** (WireGuard admin + egress). Catalog id **`vpn`** is opt-in; enable **Initial load** or load it when the user asks for VPN.
4. **veCTM privilege** — call **`get_node_privilege_status`** on **`continuum`**. `entitled` is true when this node is a member of a `groupId` whose recorded attach key has a qualifying NFT this month ([How much veCTM do I need to lock?](/ContinuumDAO/MPAWallet/VeCTMOnYourNode.md#how-much-vectm-do-i-need-to-lock)). Current `nodeWithdrawAuthority` need not hold that NFT. If not entitled, stop and tell the operator to attach veCTM from the authority KeyGen that owns the NFT — do not call **`set_vpn_enabled`**. Do **not** treat `get_ve_ctm_attach_status` as the VPN gate.

**Typical user prompt (start here)**

The operator may say something like:

- *“Set up Private VPN on my node — full tunnel, standard WireGuard, and download the client config.”*
- *“Enable VPN on this node with Shadowsocks obfuscation and save the client files.”*
- *“Check VPN status and whether I have veCTM privilege first, then enable if OK.”*

**Agent workflow (node side — you execute via MCP)**

1. **`get_node_privilege_status`** on **`continuum`** — confirm VPN entitlement (`entitled`); abort with attach-veCTM guidance if missing. Do not use **`get_ve_ctm_attach_status`** as the gate.
2. **`get_vpn_status`** on **`vpn`** — read `available`, `active`, `profile`, `obfuscation`, `privileged`.
3. **`set_vpn_enabled`** on **`vpn`** — `{ "enabled": true, "profile": "full" | "split", "obfuscation": "none" | "shadowsocks" | "wg_obfuscator" | "lwo" | "udp2raw" }` when enabling. Management-signed POST; not an MPC multi-sign transaction.
4. Poll **`get_vpn_status`** until `active` is true (or surface `lastError` / `message`).
5. **`download_vpn_admin_client_config`** — optional `profile` / `obfuscation` matching step 3. Saves under **`user_folder/data/vpn/`** (host bind mount in Docker).
6. Return to the operator: **`wireGuardPath`**, optional **`transportPath`**, and **`setupInstructions`** from the tool response — do not paraphrase obfuscation steps when `setupInstructions` is present.

**Egress (peer exit or sharing)** — same tunnel session:

- Provider: **`set_vpn_egress_sharing`**, **`get_vpn_egress_status`**, **`revoke_vpn_egress_peer`**
- Consumer: **`list_vpn_egress_exits`** → **`download_vpn_egress_client_config`** with `targetAddress` from a row

**If the operator wants the tunnel on their laptop / phone**

Configs live on the **node** first. Over the **same SSH session** you already use for the tunnel, you may **`scp`** from `mpcnode@…:path/to/user_folder/data/vpn/…` to the operator’s machine, then apply WireGuard (and any transport helper) using **`setupInstructions`** and normal OS tooling — you already know how to install WireGuard / run `wg-quick` / import into the mobile app on the platform you are running on. For obfuscated modes: start the **transport helper first** when `setupInstructions` require it, then bring up WireGuard.

**Do not**

- Call **`register_vpn_on_linea`** or any Linea billing tool — VPN is a **veCTM privilege**, not a paid month.
- Batch VPN enable with unrelated MPC sign requests.
- Assume a node trial or paid wallet month grants VPN without a qualifying attached group on this node.
- Require the current withdraw-authority KeyGen to hold the NFT before enabling VPN.
- Use **`get_ve_ctm_attach_status`** as the VPN entitlement check.

Tool reference: [MCP servers — VPN](/ContinuumDAO/MPAWallet/AIHarness/McpServers.md). SDK detail: [continuum-node-sdk `vpn.md`](https://github.com/ContinuumDAO/continuum-node-sdk/blob/master/src/mcp/resources/vpn.md).

---

### Related

- [veCTM on your node](/ContinuumDAO/MPAWallet/VeCTMOnYourNode.md) — lock, attach, and voting-power minimum
- [Attach your node](/ContinuumDAO/MPAWallet/AttachYourNode.md)
- [MCP servers — VPN](/ContinuumDAO/MPAWallet/AIHarness/McpServers.md) — agent and **`vpn`** MCP tools
- [MPA billing](/ContinuumDAO/MPAWallet/MpaBilling.md) — wallet signature metering on Linea (separate from VPN access)
