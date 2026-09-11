## Attach your node

Open [mpa.continuumdao.org](https://mpa.continuumdao.org). Your browser talks to **your** node — ContinuumDAO does not relay day-to-day control traffic.

For **management signing** ([Accept/Reject on multi-sign](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md), backups, KeyGen actions), prefer devices **not used for everyday browsing**; the most secure pattern is a **separate dedicated device per node**. See [Management signing and devices](/ContinuumDAO/MPAWallet/Overview.md#management-signing-and-devices).

On the hosted app you choose how to reach your node. In **geo-restricted** jurisdictions only the two **Node hosted app** options are shown (no Browser HTTPS), since ContinuumDAO cannot offer you a service, but instead you must run an app that you have downloaded. The app that ContinuumDAO offers as a service is identical to the app that you can download and run on your node yourself. All three options ensure private encrypted traffic to your node.

| Option                           | When to use                                                         |
| -------------------------------- | ------------------------------------------------------------------- |
| **Browser HTTPS**                | Direct TLS to the node (non-restricted regions) |
| **Node hosted app (local PC)**   | Node runs on the same machine as your browser                       |
| **Node hosted app (SSH tunnel)** | Remote VPS — SSH from your PC, then attach via the local node app   |

---

### Hosted app over an SSH tunnel

If Browser HTTPS is hidden for your region, choose **Node hosted app (local PC)** or **Node hosted app (SSH tunnel)** only. Acknowledge the compliance banner, then follow **Option 2** or **Option 3** below (not Browser HTTPS).

<img src="/_media/attach-option-ssh-tunnel.png" alt="" />

---

### Option 1: Browser HTTPS

Attach over HTTPS to your node’s read port. You need a short-lived read JWT and a browser that trusts the node’s self-signed **`browser.crt`**.

**Recommended order:** attach via a **Node hosted app** option first (Option 2 or 3 below), open **Node → Fetch Self-Signed Web Cert**, download **`browser.crt`**, import it into your browser, then reconnect with **Browser HTTPS** if you want direct TLS from the browser.

Once connected to the node app, continue with [Management signing at attach](#management-signing-at-attach) (Browser HTTPS requires a read JWT before attach — see the Ethereum or Ed25519 steps there).

<img src="/_media/attach-option-browser-https.png" alt="" />

---

### Option 2: Node hosted app (local PC)

Use when the node runs on the **same PC** as your browser.

1. Select **Node hosted app (local PC)**.
2. Your browser opens the local node app at `http://127.0.0.1:3333` on the **same path** (e.g. `/multi-sign` stays `/multi-sign`).
3. No public IP field and no SSH command.
4. On the local app, attach with plain HTTP to `127.0.0.1:8080` (management) as prompted.
5. Continue with [Management signing at attach](#management-signing-at-attach).

<img src="/_media/attach-option-node-hosted-local.png" alt="" />

---

### Option 3: Node hosted app (SSH tunnel)

Use when the node runs on a **remote VPS** (or another machine you reach over SSH). This is a good default option to connect to a remote node, e.g. on a VPS. It does not require a Let's Encrypt-style HTTPS cert on the node, or importing a self-signed cert into your browser.

1. Select **Node hosted app (SSH tunnel)**.
2. Enter your node’s **public IPv4 or hostname**.
3. Copy the **three-port SSH tunnel** command and run it in a terminal on **this** PC.
4. Click **Submit** — the browser opens `http://127.0.0.1:3333` on the same path.
5. Attach on the local node app (plain HTTP to loopback management ports forwarded by SSH).
6. Continue with [Management signing at attach](#management-signing-at-attach).

A PC can own a local node **or** an SSH tunnel to a remote node, not both at once. See [One node at a time from your PC](#one-node-at-a-time-from-your-pc).

<img src="/_media/attach-option-node-hosted-ssh.png" alt="Node hosted app (SSH tunnel) — screenshot pending" />

---

### One node at a time from your PC

ContinuumDAO does **not** support using two nodes at the same time from one PC. The SSH tunnel and a local node both use `127.0.0.1` ports **3333**, **8080**, and **18080**. If those overlap, attach talks to the wrong process and you can get the **wrong node key**.

You may own both a local node and a VPS. Use only one of them from this PC at a time:

1. **Remote VPS:** start the [SSH tunnel](#option-3-node-hosted-app-ssh-tunnel), then attach as in Option 3.
2. **Local node:** stop the SSH tunnel first (Ctrl+C in that terminal, or close it). Then follow [Option 2](#option-2-node-hosted-app-local-pc) and attach **`127.0.0.1:8080`**.

Detach in the app before you switch. Do not leave a tunnel up while attaching the local node. Do not remap discovery ports or run two attach URLs in the same dashboard to keep both “live”.

---

### Management signing at attach

After you reach the node app (any attach option above), you connect with a **management signer**:

| Signer | When to use |
| ------ | ----------- |
| **Ed25519** | No Ethereum signer required. Set **`PublicMgtKey`** (and optional added keys) on the node at install time. |
| **Ethereum signer (EIP-191)** | Optional. Requires **`NodeMgtKey`** in config — see [Management signing and devices](/ContinuumDAO/MPAWallet/Overview.md#management-signing-and-devices). |

**Ethereum signer attach (ownership proof):**

1. Ensure **`NodeMgtKey`** is configured on the node (dedicated management address — see [Overview — Management signing](/ContinuumDAO/MPAWallet/Overview.md#management-signing-and-devices)).
2. Connect an **Ethereum injected signer** (e.g. MetaMask, Rabby, etc.) in the browser and select the account whose address **matches** **`NodeMgtKey`**.
3. Enter the node management URL (or use the loopback URL after an SSH tunnel — Option 3) and click **Attach to Node**.
4. The app calls **`GET /getNodeMgtKey`** and confirms your connected account matches; attach succeeds when they match.
5. For **Browser HTTPS** (Option 1) or **Node hosted app (SSH tunnel)** (Option 3): obtain a **read JWT** first — the Ethereum signer signs an **EIP-191** challenge when you click **Get read token**, then attach as above.

<!-- Screenshot placeholder: replace _media/ethereum-signer-attach-modal.png -->
<img src="/_media/ethereum-signer-attach-modal.png" alt="Ethereum signer attach — screenshot pending" />

**Ed25519 attach (ownership proof):**

1. Pick an allowed Ed25519 key (bootstrap or an added key). The bootstrap key is the topmost one.
2. Copy the attach message from the dialog.
3. On **your PC**, run **`sign-clipboard --key-file <path-to-private-key>`** (or **`--bootstrap`** if that matches your selection). If you do not have the tool yet, clone [mpc-config](https://github.com/ContinuumDAO/mpc-config) and build it from **`tools/sign-clipboard`** — see [`tools/sign-clipboard/README.md`](https://github.com/ContinuumDAO/mpc-config/blob/main/tools/sign-clipboard/README.md).
4. Paste the **128-hex** signature and submit.


<img src="/_media/ed25519-attach-modal.png" alt="Ed25519 attach modal — screenshot pending" />

Ed25519 attach always uses **sign-clipboard on your PC** — including for **Node hosted app (SSH tunnel)** (Option 3) — because attach must prove you hold the private key; the node does not sign attach verification on your behalf.

**After attach — day-to-day management:**

- If the selected Ed25519 key’s **private material is stored on the node** (bootstrap or `added_keys/`), most actions need only **OK** in the signing dialog.
- If the private key lives **only on your PC**, expand **Sign on this PC** (or the app shows it by default) and use **sign-clipboard** + paste for each management action.

Use the **header key icon** to switch between Ed25519 keys or the Ethereum signer for later actions. Details: [Default Ed25519 signer](/ContinuumDAO/MPAWallet/DefaultEd25519Signer.md), [Overview — Management signing](/ContinuumDAO/MPAWallet/Overview.md#management-signing-and-devices).

---

### Related

- [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md)
- [Install a node](/ContinuumDAO/MPAWallet/Install.md)
- [Overview](/ContinuumDAO/MPAWallet/Overview.md)
- [Running an MPC Node](/ContinuumDAO/RunningInstructions/NodeRunningInstruction.md)
- [Default Ed25519 signer](/ContinuumDAO/MPAWallet/DefaultEd25519Signer.md)
- [Backup and restoration](/ContinuumDAO/MPAWallet/BackupAndRestoration.md)
