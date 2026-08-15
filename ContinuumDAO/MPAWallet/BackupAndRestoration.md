## Backup and restoration

Every MPA node has a **bootstrap Ed25519** key pair. The public half is **`PublicMgtKey`** in the node config. With **deterministic node identity** enabled (normal installs), the node’s public **Node Key** is derived from that bootstrap material. That is how other Group members recognise “you” after a rebuild: same bootstrap → same Node Key.

You should treat the **bootstrap private key** and any **encrypted database backups** as critical recovery material. Store both safely (offline / encrypted storage you control). Losing the bootstrap private key means you cannot decrypt database backups or reinstall the same node identity.

**Storage separation (important):**

- **Do not store encrypted database backups in the same place as the bootstrap private key** — not the same folder, USB stick, password-manager entry, cloud account, or backup bundle. If one location is compromised, an attacker should not get both the ciphertext and the key that decrypts it.
- **Do not store more than one node’s backup material in the same place** — keep each node’s bootstrap key and encrypted DB backup in **separate** locations (or at least separate encrypted containers with different access). That limits damage if a single storage site is lost or exposed.

You need **both** pieces to restore a node, but they should be recoverable from **different** stores you control.

**Important security note:** With a sensible TSS setup (for example **2/2** or a larger committee threshold), someone who steals only your bootstrap key and/or an encrypted database dump still **cannot** reconstruct a KeyGen’s full on-chain private key or move assets alone. Those backups restore **this node’s** share of history and configuration (Groups, KeyGens metadata, contacts, and so on) — not a complete wallet key. Stealing assets would still require enough MPC shares / Accepts from the Group. That is one reason to keep spare Group nodes and a proper threshold (see [Overview](/ContinuumDAO/MPAWallet/Overview.md)).

UI for the steps below: attach to your node in continuumdao-node-app / [MPA wallet](https://mpa.continuumdao.org), then open **Node → Database**.

---

### Back up the bootstrap public and private keys to your PC

Do this soon after install (and again if you ever rotate recovery copies). Prefer attaching over **Browser HTTPS** or **Node hosted app** — fetching the bootstrap private seed is blocked on plain remote HTTP.

1. Open **Node → Database**.
2. Open the **Bootstrap Key** tab.
3. Click **Fetch bootstrap key** and sign the management request when prompted.
4. You should see:
   - **PublicMgtKey (bootstrap public)** — 64 hex. Use **Copy** or **Save to disk…**.
   - **ed25519PrivateSeedHex** — 64 hex private seed. Use **Copy** or **Save to disk…** (typical download name `ed25519_bootstrap_private.hex`).
5. Move both files (or a printed / offline copy of the hex) to **your own PC** (or other storage you control), then into long-term safe storage: encrypted disk, password manager vault reserved for node recovery, offline media — not chat, email, or cloud folders shared with others. **Keep the bootstrap private key in a different location from any encrypted database backup** for this node (and from other nodes’ recovery material).
6. Confirm you can open the saved files before you rely on them. Optionally remove the private seed from the node later only if you understand the consequences (database backup/restore and some agent signing paths need the seed on disk).

Without this offline copy, a dead VPS or wiped disk can leave you unable to decrypt backups or recreate the same Node Key.

---

### Spare nodes: surviving the loss of one machine

Backup of bootstrap + database restores **one node’s** identity and local data. Separately, **Group design** protects the **KeyGen and its assets**:

- If you run **spare nodes** in the same Group / KeyGen (for example a second home PC, a second VPS, or a friend’s node) with a threshold that can still be met when one node is gone, the wallet can keep signing.
- Example: **2/2** needs both nodes online to sign — losing one blocks spends until that node is restored (or the Group ejects). A **2/3** or **3/5** setup can often continue if one node is lost, as long as enough remaining nodes still hold shares and can Accept.
- Recreating the lost node (next sections) puts that operator back into the mesh with the same Node Key and restored local state.

So: **spare Group members** protect assets against hardware loss; **bootstrap + DB backup** protect *your* ability to come back as the same node with your history.

---

### Recreate a node using the bootstrap key

Use this when the machine is gone or you want the same identity on a new host / IP.

1. **Install a fresh node** ([Install a node](/ContinuumDAO/MPAWallet/Install.md)).
2. Ensure the new node is configured with the **same PublicMgtKey** (64-hex bootstrap public) as before — for example via the installer / `provision-node.sh --public-mgt-key <64-hex>` path, or by setting **`PublicMgtKey`** in config before the node finalizes identity. Peers only recognise you if the **Node Key** matches the old one.
3. Attach to the new node (**Node → Database → Bootstrap Key**).
4. **Install bootstrap key on node**: paste the saved private seed (or **Load key from file…**), then **Install bootstrap key on node** and sign when prompted.
5. **Restart** the node service when the UI asks (so `getNodeKey` and deterministic identity load correctly).
6. Re-check **Configured Nodes** / peers (relay IP and peer list) so the rebuilt node can talk to the Group again.
7. If you have an encrypted database backup, continue with [Restore the node database](#restore-the-node-database) below. Without a DB backup you keep the same Node Key but lose local Groups / history that only lived on that node (other Group members still hold their own shares and records).

---

### Backup the node database

The node database holds confidential local state for this operator, including (among other things):

- Groups and KeyGen participation / local share material as stored on this node  
- Transaction / multi-sign history visible to this node  
- Contacts / known addresses  
- Chain, token, and related wallet configuration  

Backups are **encrypted** using material derived from the **bootstrap** key, then stored under the node’s `database_backups/` directory. You can also download the encrypted file to your PC.

#### Steps (create + download)

1. Attach with MetaMask or Ed25519 management keys (**Browser HTTPS** or **Node hosted app** recommended for download).
2. Confirm the bootstrap private key is present on the node (**Bootstrap Key** tab / fetch works). Database encryption requires it.
3. Open **Backup Database**.
4. Choose scope if offered (all Groups, or include/exclude specific Group IDs), add optional notes, then create the backup and sign the management request. The node may enter a short **maintenance / drain** window for a consistent dump.
5. In **Saved backups on this node**, find the new **Backup ID** and use the download control to save the encrypted `.json` envelope to your PC.
6. Store that file in **safe storage separate from the bootstrap private key** — different device, vault, or offline medium. The ciphertext alone is useless without the bootstrap private key; the bootstrap key alone does not replace a missing backup file. **Do not put this node’s backup in the same location as another node’s backup.**

Repeat backups after important changes (new KeyGens, major config, before OS upgrades).

---

### Restore the node database

Restoring **replaces** the Mongo database on the target node with the snapshot. Use a node that already has the **matching** bootstrap private key installed (same identity that created the backup).

1. Recreate / prepare the node and **install the bootstrap private key** as in [Recreate a node using the bootstrap key](#recreate-a-node-using-the-bootstrap-key).
2. Open **Node → Database → Restore Backup**.
3. If the encrypted file is only on your PC, **upload** it to the node (the UI supports posting a backup file into `database_backups/` after a signed request). Confirm it appears under **Saved backups on this node**.
4. Select the **Backup ID** (or paste it) and run **restore**. Sign the management request. This is destructive for the current DB contents on that node.
5. When restore finishes, use **Restart Node Service** (or the restart control shown after drain) so the node leaves maintenance mode and reloads cleanly.
6. Re-attach, confirm Groups / KeyGens / history look right, and verify peers still see a healthy node with the expected Node Key.

---

### What to store safely (checklist)

| Item | Why |
|------|-----|
| Bootstrap **public** (`PublicMgtKey`) | Needed when provisioning a replacement node with the same identity |
| Bootstrap **private** seed | Decrypts DB backups; installs identity on a new host; often required for agent / management fallback |
| Encrypted **database backup** file(s) | Restores Groups, KeyGen-local state, history, contacts, chain/token data on this node |
| Peer / relay notes | Speeds re-joining Configured Nodes after a rebuild |

Store them offline and redundantly. Do not put the private seed in git, tickets, or shared drives.

**Separation rules:**

| Rule | Reason |
|------|--------|
| Bootstrap private key **≠** same location as encrypted DB backup | One breach should not yield both decryptor and ciphertext |
| One node’s recovery bundle **≠** same location as another node’s | Limits blast radius across your Group nodes |
| Prefer different media or vaults for bootstrap vs database files | e.g. bootstrap on offline hardware wallet / paper; DB backup on a different encrypted disk |
| **Dedicated signing devices** | Management-sign from machines not used for general web use; ideally **one device per node** — see [Overview](/ContinuumDAO/MPAWallet/Overview.md#management-signing-and-devices) |
| **Ethereum management address** | New **software** wallet per node as **NodeMgtKey** — not hardware wallets; not used for custody |

Again: compromising this recovery bundle is serious for **your node’s privacy and operability**, but with a proper Group TSS threshold it is **not** by itself enough to steal KeyGen assets — attackers would still need enough other nodes’ shares / Accepts (or a full [eject](/ContinuumDAO/MPAWallet/EjectConversion.md) they somehow control).

### Related

- [Install a node](/ContinuumDAO/MPAWallet/Install.md)
- [Default Ed25519 signer](/ContinuumDAO/MPAWallet/DefaultEd25519Signer.md)
- [Overview](/ContinuumDAO/MPAWallet/Overview.md) — TSS roles and spare nodes
- [Configured Nodes](/ContinuumDAO/MPCSigner/ConfiguredNodes.md)
- [Eject to Private Key](/ContinuumDAO/MPAWallet/EjectConversion.md)
- Technical: [CONFIGURING_ED25519_KEYS.md](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/CONFIGURING_ED25519_KEYS.md)
