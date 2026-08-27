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

Or ask in **Agent chat**: *“Enable Private VPN on my node and download a full-tunnel client config”* — your Group still management-signs enable/download steps as usual.

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

---

### Related

- [veCTM on your node](/ContinuumDAO/MPAWallet/VeCTMOnYourNode.md) — lock, attach, and voting-power minimum
- [Attach your node](/ContinuumDAO/MPAWallet/AttachYourNode.md)
- [MCP servers — VPN](/ContinuumDAO/MPAWallet/AIHarness/McpServers.md) — agent and **`vpn`** MCP tools
- [MPA billing](/ContinuumDAO/MPAWallet/MpaBilling.md) — wallet signature metering on Linea (separate from VPN access)
