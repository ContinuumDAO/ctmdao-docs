## Private VPN

Most VPN providers have public servers in different countries that users can route traffic through. The VPN service here is different, since anyone can set up a node and then offer VPN service to any other node in their configured peer group, as well as to themselves. This means that users only have to trust their peer nodes not to log their traffic, which anyway is encrypted with TLS or SSH. ContinuumDAO itself cannot and would not log users traffic. The VPN at its base uses Wireguard, but then optionally can choose obfuscation using ShadowSocks and other ways of disguising traffic. 

Every MPA node can run a **Private VPN** — an encrypted tunnel built on **WireGuard**. It lets you route traffic from your laptop, phone, or other machines **through your node** (useful when you manage the node on a remote VPS but browse or sign from home).

**Private VPN is not a separate paid product.** The multi-sign wallet fee contract treats it as a **veCTM privilege**: you must **lock CTM into veCTM**, **attach** that NFT to your node, and meet the governance-set **voting-power minimum** before you can enable VPN or download client configs. There is no USDC subscription path for VPN — staked veCTM is the gate.

With enough attached **veCTM voting power**, you can **share** your node’s connection with **peer nodes** in your mesh, or **use a peer’s node** as your exit when you need traffic to leave the internet from their location.

Prerequisites: a running node, [attach to the node app](/ContinuumDAO/MPAWallet/AttachYourNode.md), and [veCTM attached](/ContinuumDAO/MPAWallet/VeCTMOnYourNode.md) with at least the governance-set voting-power minimum  ([How much veCTM do I need to lock?](/ContinuumDAO/MPAWallet/VeCTMOnYourNode.md#how-much-vectm-do-i-need-to-lock)). That threshold can change by DAO vote.

---

### What you can do

| Use case | Plain-language description |
|----------|----------------------------|
| **Connect your devices to your node** | Your PC or phone sends traffic through the VPS (or home machine) that runs the node — same control path you already use for wallet management, extended to general browsing or tooling. |
| **Share your node with peer operators** | Other nodes in your configured peer list can request a client profile and send **their** traffic out through **your** node’s public IP. You set a **speed cap** so sharing stays under your control. |
| **Use a peer’s node as your exit** | Your node lists available peer exits; you download a client config and connect so **your** traffic leaves the internet from **their** node (for example another region or provider). |

Private VPN unlocks only when the node reports **veCTM privilege** — attached veCTM on the billing **authority KeyGen** with voting power at or above the live **`veCtmThresholdPower`** from the fee contract. A **node trial** or paid wallet month **does not** grant VPN. If privilege is missing, lock more CTM, extend the lock, or attach veCTM before enabling VPN.

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

1. Confirm **veCTM** is attached and meets the voting-power minimum → [veCTM on your node](/ContinuumDAO/MPAWallet/VeCTMOnYourNode.md#how-much-vectm-do-i-need-to-lock).
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

With the [AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md) configured, you can run Private VPN from **Agent chat** (or Telegram) instead of the node app **Node → VPN** panel. The agent uses the **`vpn`** MCP server on **continuum-mcp** for WireGuard admin and peer exits, and the built-in **`continuum`** server to confirm **veCTM privilege** before enabling anything. Add **`vpn`** from the MCP catalog and turn on **Initial load** if you want those tools available every session — see [MCP servers — VPN](/ContinuumDAO/MPAWallet/AIHarness/McpServers.md).

Describe what you want in plain language. The agent maps your request to MCP tools (for example **`get_node_privilege_status`** / **`get_ve_ctm_attach_status`** on **`continuum`**, then **`set_vpn_enabled`**, **`download_vpn_admin_client_config`**, and egress tools on **`vpn`**). Downloaded client files land under **`data/vpn/`** on the node workspace — same as the node app.

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

Enable, disable, sharing, and config downloads are **management-signed** writes on the node (Ed25519, same as other agent admin actions). They do **not** go through the MPC Accept/Reject loop — unlike wallet transactions. If privilege is missing, the agent should tell you to [attach veCTM](/ContinuumDAO/MPAWallet/VeCTMOnYourNode.md) first; a node trial or paid wallet month does not grant VPN.

After the agent saves a `.conf` (and any transport helper file), copy it from **`data/vpn/`** to your PC or phone and import into the WireGuard app — same as step 5 in [Connect your own machine](#connect-your-own-machine-to-your-node) above.

#### External agents and client setup

**Built-in Agent chat** (above) runs against your node and can enable VPN and write configs in one place. **Claude Desktop, Cursor, Claude Code, or another external harness** on your laptop is a different shape: it usually operates on **your local machine**, while VPN admin and config generation happen **on the node**.

You do **not** need a full OS-by-OS runbook in these docs for WireGuard, Shadowsocks, or similar — a capable external agent already knows how to install clients and start tunnels on Linux, macOS, Windows, iOS, or Android. What **is** worth documenting is the **Continuum-specific split** and artifacts so the agent does not guess wrong.

**Two phases**

| Phase | Where it runs | Who typically does it |
|-------|----------------|------------------------|
| **1. Node** — privilege check, enable VPN, download configs | On the VPS / node host | Built-in Agent chat, or an external agent with MCP access to the node (tunnel **`continuum-mcp`** on port **8446** and Ed25519 management signing — see [Agent provision](/ContinuumDAO/MPAWallet/AgentProvision.md)) |
| **2. Client** — copy configs onto your device, import WireGuard, run any transport helper | On your laptop, phone, or home PC | External agent on that machine, or you manually |

Most users: phase **1** via the node app or built-in agent; phase **2** via Claude/Cursor on the machine that will use the tunnel.

**Continuum-specific artifacts (phase 1 → 2)**

When configs are downloaded (node app or **`download_vpn_admin_client_config`** / **`download_vpn_egress_client_config`**), the tool response includes:

- **`wireGuardPath`** — WireGuard `.conf` (admin) or `cont-egress.conf` (peer exit)
- **`transportPath`** — present when obfuscation is not plain WireGuard (Shadowsocks, wg_obfuscator, LWO, udp2raw)
- **`setupInstructions`** — when the node provides them, **follow these exactly** for obfuscated modes; they describe how the transport helper and WireGuard config work together

Files are written under **`data/vpn/`** on the **node** first. Before phase 2, get them onto the client machine (node app download, `scp` from the VPS, or an agent with shell access to the host bind mount).

**Prompts for an external agent on your client machine**

Use these **after** phase 1 has produced the files (or after you paste / attach the downloaded configs):

- *“Here is my WireGuard `.conf` from my Continuum node — set up a full tunnel on this machine.”*
- *“I downloaded Continuum VPN configs with Shadowsocks obfuscation — here are the WireGuard and transport files. Follow the setup instructions and bring the tunnel up on this Mac.”*
- *“Import this `cont-egress.conf` into WireGuard on Windows and connect.”*
- *“Check whether the WireGuard interface is up and show me how to disconnect cleanly.”*

For **obfuscated** downloads, tell the agent to start the **transport helper first** (when `setupInstructions` say so), then bring up WireGuard pointing at the local proxy — order matters; do not skip straight to WireGuard-only steps.

**What to leave to the agent’s platform knowledge**

- Installing the WireGuard app or `wireguard-tools` on the current OS
- GUI import vs `wg-quick up` / `wg-quick down`
- Mobile: share `.conf` to the WireGuard app and toggle the tunnel
- Generic Shadowsocks / udp2raw client install **when** `setupInstructions` name the binary or command — the agent picks the right package manager or app store for the OS

**What external agents cannot infer without node access**

- Whether veCTM privilege is satisfied — check on the node first ([veCTM on your node](/ContinuumDAO/MPAWallet/VeCTMOnYourNode.md))
- Enabling VPN or re-downloading configs — requires node MCP or the node app, not client-side Claude alone

If an external agent will do **both** phases, connect it to the node MCP catalog (**`vpn`** + **`continuum`**) per [MCP servers — VPN](/ContinuumDAO/MPAWallet/AIHarness/McpServers.md), then use the [AI agent steps](#ai-agent-steps) prompts for phase 1 and the client prompts above for phase 2.

---

### Related

- [veCTM on your node](/ContinuumDAO/MPAWallet/VeCTMOnYourNode.md) — lock, attach, and voting-power minimum
- [Attach your node](/ContinuumDAO/MPAWallet/AttachYourNode.md)
- [MCP servers — VPN](/ContinuumDAO/MPAWallet/AIHarness/McpServers.md) — agent and **`vpn`** MCP tools
- [MPA billing](/ContinuumDAO/MPAWallet/MpaBilling.md) — wallet signature metering on Linea (separate from VPN access)
