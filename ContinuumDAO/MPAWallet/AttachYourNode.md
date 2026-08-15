## Attach your node

Open [mpa.continuumdao.org](https://mpa.continuumdao.org). Your browser talks to **your** node — ContinuumDAO does not relay day-to-day control traffic.

For **management signing** (Accept/Reject, backups, KeyGen actions), prefer devices **not used for everyday browsing**; the most secure pattern is a **separate dedicated device per node**. See [Management signing and devices](/ContinuumDAO/MPAWallet/Overview.md#management-signing-and-devices).

On the hosted app you choose how to reach your node. In **geo-restricted** jurisdictions only the two **Node hosted app** options are shown (no Browser HTTPS), since ContinuumDAO cannot offer you a service, but instead you must run an app that you have downloaded. The app that ContinuumDAO offers as a service is identical to the app that you can download and run on your node yourself. All three options ensure private encrypted traffic to your node.

| Option                           | When to use                                                         |
| -------------------------------- | ------------------------------------------------------------------- |
| **Browser HTTPS**                | Direct TLS to the node (non-restricted regions) |
| **Node hosted app (local PC)**   | Node runs on the same machine as your browser                       |
| **Node hosted app (SSH tunnel)** | Remote VPS — SSH from your PC, then attach via the local node app   |


---

### Option 1: Browser HTTPS

Attach over HTTPS to your node’s read port. You need a short-lived read JWT and a browser that trusts the node’s self-signed **`browser.crt`**.

**Recommended order:** attach via a **Node hosted app** option first (see below), open **Node → Fetch Self-Signed Web Cert**, download **`browser.crt`**, import it into your browser, then reconnect.with **Browser HTTPS** if you want direct TLS from the browser.

<img src="/_media/attach-option-browser-https.png" alt="" />

---

### Option 2: Node hosted app (local PC)

Use when the node runs on the **same PC** as your browser.

1. Select **Node hosted app (local PC)**.
2. Your browser opens the local node app at `http://127.0.0.1:3333` on the **same path** (e.g. `/multi-sign` stays `/multi-sign`).
3. No public IP field and no SSH command.
4. On the local app, attach with plain HTTP to `127.0.0.1:8080` (management) as prompted.


<img src="/_media/attach-option-node-hosted-local.png" alt="" />

---

### Option 3: Node hosted app (SSH tunnel)

Use when the node runs on a **remote VPS** (or another machine you reach over SSH). This is a good default option to connect to a remote nodes, e.g. on a VPS. It does not require to have a Let's Encrypt type of cert for https to be installed, or to import a self-signed cert into your browser, which can be problematic.

1. Select **Node hosted app (SSH tunnel)**.
2. Enter your node’s **public IPv4 or hostname**.
3. Copy the **three-port SSH tunnel** command and run it in a terminal on **this** PC.
4. Click **Continue** / **Next** / **Submit** — the browser opens `http://127.0.0.1:3333` on the same path.
5. Attach on the local node app (plain HTTP to loopback management ports forwarded by SSH).

<!-- Screenshot placeholder: replace _media/attach-option-node-hosted-ssh.png -->
<img src="/_media/attach-option-node-hosted-ssh.png" alt="Node hosted app (SSH tunnel) — screenshot pending" />

---

### Hosted app over an SSH tunnel

If Browser HTTPS is hidden for your region, choose **Node hosted app (local PC)** or **Node hosted app (SSH tunnel)** only. Acknowledge the compliance banner, then follow the steps above.

<img src="/_media/attach-option-ssh-tunnel.png" alt="" />

---

### Related

- [Install a node](/ContinuumDAO/MPAWallet/Install.md)
- [Overview](/ContinuumDAO/MPAWallet/Overview.md)
- [Running an MPC Node](/ContinuumDAO/RunningInstructions/NodeRunningInstruction.md)
- [Backup and restoration](/ContinuumDAO/MPAWallet/BackupAndRestoration.md)
