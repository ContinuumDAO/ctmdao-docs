## Contact management

The **address book** (contacts) stores named recipients and contract addresses on **this node only** — the same local-registry model as [chains](/ContinuumDAO/MPAWallet/ChainManagement.md) and [assets](/ContinuumDAO/MPAWallet/AssetManagement.md). Contacts are not propagated to other Group members. The node app and AI agent use the management API (`POST /addKnownAddress`, `GET /getKnownAddresses`). Operator reference: [API Implementation — known addresses](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/references/API_IMPLEMENTATION.md#local-known-address-config).

**EVM contacts for now** — entries are scoped by chain type (for example `ethereum`). Support for Solana and other non-EVM address books will follow when enabled on your node build.

Contacts appear in backups — see [Backup and restoration](/ContinuumDAO/MPAWallet/BackupAndRestoration.md).

---

### Open Contacts (header)

Click the **body / person icon** in the app **header** to open **Contacts**. From here you can:

- **Browse** saved names and addresses
- **Add** a new contact (**+**)
- **Edit** name, chain scope, or contract flag
- **Remove** an entry (node registry only — nothing on-chain changes)

Management signing (MetaMask **EIP-191** or **Ed25519**) is required for add, update, and remove.

---

### Add or edit a contact

When adding a contact, set:

| Field | Purpose |
|-------|---------|
| **Name** | Label shown in Contacts and in [Compose](#using-contacts-in-compose) pickers (for example `Tom`, `Treasury`, `USDC contract`) |
| **Address** | EVM address (`0x…`) — wallet (EOA) or **smart contract** |
| **Chain scope** | Which networks this entry applies to (see below) |
| **Is contract** | Enable when the address is a **smart contract** (not an EOA). Helps the UI treat the entry correctly in Compose and validation |

**Chain scope**

- **Any chain** (default) — leave chain restrictions empty. The contact is available on **every** configured EVM chain of that type (Ethereum mainnet, Polygon, Arbitrum, and so on).
- **Specific chains** — restrict to one or more chain IDs (for example Ethereum **`1`** only, or **`1`** and **`137`** for mainnet + Polygon). The contact appears in Compose only when the selected network matches.

Use specific chains when the same name would point to different addresses on different networks, or when you only ever pay that recipient on one chain.

**Smart contracts**

Contacts are not limited to people’s wallets. Save frequently used **contract addresses** — token contracts, multisigs, protocol routers, your own deployed contracts — with **Is contract** enabled. You can still label them clearly (`Aave Pool`, `Company Gnosis`) and pick them in Compose instead of pasting hex each time.


<img src="/_media/contact-management-add-contact.png" alt="" />

---

### Using contacts in Compose

After contacts exist, they surface in the [Compose transaction flow](/ContinuumDAO/MPAWallet/ComposeTransactionFlow.md):

1. Open **Compose**, select KeyGen and chain.
2. Add a step (for example **ERC-20 transfer** or a custom contract call).
3. In **recipient** or **to** fields, open the **contact picker** (or type to filter) — saved names appear alongside raw address entry.
4. Only contacts **valid for the current chain** are listed (global contacts plus any scoped to this chain id).
5. Select a contact; the node fills the address. Complete amount, Purpose, and the rest of the flow as usual → **Join** → **Execute**.

Using named contacts reduces copy-paste errors and makes **Purpose** text on **Join** easier for peers to review (“100 USDC to Tom” vs an bare `0x5637…` address).

The same address book is available to the **AI agent** when building transfers or compose actions (see [AI flow](#ai-flow)).

---

### AI flow

With the [AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md) and **continuum** MCP server enabled, manage contacts from **Agent chat**.

**List contacts:**

> What contacts do I have?

The agent calls **`get_address_book_registry`** and returns names, addresses, chain scope, and contract flags.

**Add a contact:**

> Add a new contact called Tom with address 0x563751cE7f45a5De9D4A082826788dA78Dcb0311

The agent calls **`add_to_address_book_registry`** with `chainType: ethereum`, the address, and `name: Tom`. With no `chainIds`, Tom is available on **any** EVM chain. To limit to Ethereum mainnet only, say so in chat (chain id **`1`**).

**Send using a contact name:**

> Send Tom 100 USDC on Ethereum

The agent resolves **Tom** from the address book, confirms **USDC** is registered on Ethereum ([Asset management](/ContinuumDAO/MPAWallet/AssetManagement.md)), and builds a transfer via compose / MCP transfer tools. The resulting multi-sign request still goes through the full [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md) — the agent cannot skip your threshold.

Before add/remove, the agent uses your [preferred Ed25519 management signer](/ContinuumDAO/MPAWallet/DefaultEd25519Signer.md) (or Ethereum management key). To remove: ask to remove by name or address; the agent uses **`remove_from_address_book_registry`**.

---

### Related

- [Compose transaction flow](/ContinuumDAO/MPAWallet/ComposeTransactionFlow.md) — pick contacts as recipients
- [Asset management](/ContinuumDAO/MPAWallet/AssetManagement.md) — tokens for transfers
- [Chain management](/ContinuumDAO/MPAWallet/ChainManagement.md) — networks must be configured first
- [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md)
- [Backup and restoration](/ContinuumDAO/MPAWallet/BackupAndRestoration.md) — contacts are included in node backups
- [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md)
- [Overview](/ContinuumDAO/MPAWallet/Overview.md)
- Operator detail: [API Implementation — known addresses](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/references/API_IMPLEMENTATION.md#local-known-address-config)
