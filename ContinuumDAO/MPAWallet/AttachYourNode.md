## Attach your node

Open [mpa.continuumdao.org](https://mpa.continuumdao.org) on any page that shows the attach gate (Multi-Sign, Node, Groups, Keys). Your browser talks to **your** node — ContinuumDAO does not relay day-to-day control traffic.

On the hosted app you choose how to reach your node. In **geo-restricted** jurisdictions only the two **Node hosted app** options are shown (no Browser HTTPS on the hosted SPA).

| Option | When to use |
|--------|-------------|
| **Browser HTTPS** | Direct TLS to the node from the hosted SPA (non-restricted regions) |
| **Node hosted app (local PC)** | Node runs on the same machine as your browser |
| **Node hosted app (SSH tunnel)** | Remote VPS — SSH from your PC, then attach via the local node app |

The old **SSH tunnel to ContinuumDAO hosted app** transport is no longer offered. Use Browser HTTPS or a Node hosted app path instead.

---

### Option 1: Browser HTTPS

Attach on the hosted SPA over HTTPS to your node’s read port. You need a short-lived read JWT and a browser that trusts the node’s self-signed **`browser.crt`**.

**Recommended order:** attach via a **Node hosted app** option first (see below), open **Node → Fetch Self-Signed Web Cert**, download **`browser.crt`**, import it into your browser, then reconnect on the hosted SPA with **Browser HTTPS** if you want direct TLS from the browser.

<!-- Screenshot placeholder: replace _media/attach-option-browser-https.png -->
<img src="/_media/attach-option-browser-https.png" alt="Browser HTTPS attach option — screenshot pending" />

---

### Option 2: Node hosted app (local PC)

Use when the node runs on the **same PC** as your browser.

1. On the hosted SPA, select **Node hosted app (local PC)**.
2. Your browser opens the local node app at `http://127.0.0.1:3333` on the **same path** (e.g. `/multi-sign` stays `/multi-sign`).
3. No public IP field and no SSH command on the hosted SPA.
4. On the local app, attach with plain HTTP to `127.0.0.1:8080` (management) as prompted.

<!-- Screenshot placeholder: replace _media/attach-option-node-hosted-local.png -->
<img src="/_media/attach-option-node-hosted-local.png" alt="Node hosted app (local PC) — screenshot pending" />

---

### Option 3: Node hosted app (SSH tunnel)

Use when the node runs on a **remote VPS** (or another machine you reach over SSH).

1. On the hosted SPA, select **Node hosted app (SSH tunnel)**.
2. Enter your node’s **public IPv4 or hostname**.
3. Copy the **three-port SSH tunnel** command and run it in a terminal on **this** PC.
4. Click **Continue** / **Next** / **Submit** — the browser opens `http://127.0.0.1:3333` on the same path.
5. Attach on the local node app (plain HTTP to loopback management ports forwarded by SSH).

<!-- Screenshot placeholder: replace _media/attach-option-node-hosted-ssh.png -->
<img src="/_media/attach-option-node-hosted-ssh.png" alt="Node hosted app (SSH tunnel) — screenshot pending" />

---

### Geo-restricted hosted app

If Browser HTTPS is hidden for your region, choose **Node hosted app (local PC)** or **Node hosted app (SSH tunnel)** only. Acknowledge the compliance banner, then follow the steps above.

<!-- Screenshot placeholder: replace _media/attach-option-geo-restricted.png -->
<img src="/_media/attach-option-geo-restricted.png" alt="Geo-restricted attach options — screenshot pending" />

---

### Related

- [Install a node](/ContinuumDAO/MPAWallet/Install.md)
- [Overview](/ContinuumDAO/MPAWallet/Overview.md)
- [Running an MPC Node](/ContinuumDAO/RunningInstructions/NodeRunningInstruction.md)
- [Backup and restoration](/ContinuumDAO/MPAWallet/BackupAndRestoration.md)
