## Bitcoin

The MPA wallet supports **fully decentralized self-custody of BTC** without a single recoverable private key on any device — the same MPC model as EVM assets in [Overview](/ContinuumDAO/MPAWallet/Overview.md). You run **your own nodes**; ContinuumDAO does not hold shares in a vendor database and there is **no hardware-wallet registration** (no name, email, or device enrollment with a manufacturer). Threshold shares live only on Group members you choose.

On-chain, spends look like ordinary Bitcoin transactions from a **bc1…** address. Agreement to send still runs through the [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md) off-chain.

---

### SegWit and Taproot — two KeyGen types

Bitcoin uses **KeyGen type**, not the EVM chain registry. Pick the KeyGen that matches the address format you want to receive and spend from:

| Style | KeyGen type | MPC protocol | Typical address | Notes |
|-------|-------------|--------------|-----------------|-------|
| **SegWit (P2WPKH)** | **secp256k1** | **CGGMP24** (threshold ECDSA) | **bc1q…** mainnet | Same KeyGen family as Ethereum / EVM. SegWit v0 P2WPKH addresses are **derived automatically** from the KeyGen public key (mainnet, testnet, signet). One multi-agree KeyGen can custody EVM assets **and** SegWit BTC. |
| **Taproot (P2TR)** | **bitcoin-taproot** | **FROST** (BIP-340 key-path, via **givre**) | **bc1p…** mainnet | **Separate** KeyGen from secp256k1 and from **ed25519** (Solana-style chains). Create a dedicated **multi-agree** KeyGen with `keyType: "bitcoin-taproot"` — see [KeyGens](/ContinuumDAO/MPCSigner/KeyGens.md). |

Both MPC stacks are maintained by the [Lockness](https://www.lfdecentralizedtrust.org/projects/lockness) project under **LF Decentralized Trust** (Linux Foundation): **CGGMP24** for secp256k1 / SegWit ECDSA, **FROST** for Taproot Schnorr signing. Signatures are valid on Bitcoin mainnet like any single-party wallet — no custom script or on-chain MPC footprint.

Brief chain/network context: [Chain management — Bitcoin](/ContinuumDAO/MPAWallet/ChainManagement.md#bitcoin-segwit-and-taproot).

---

### Why MPC for BTC

**No hardware-wallet vendor dependency** — custody is threshold shares on nodes you deploy, not a USB device tied to one person’s recovery seed in a manufacturer cloud.

**No registration gate** — unlike some institutional or hardware flows, you are not required to submit personal information to a third party to generate or use keys. Your Group, your nodes, your threshold.

**Loss and succession planning** — add **extra nodes and a higher threshold** (for example **2/3** or **3/5**) so one lost machine, offline party, or death does not strand BTC forever. Relatives, co-trustees, or a spare node you operate can hold shares and still reach quorum when needed — see [Overview — loss safeguard](/ContinuumDAO/MPAWallet/Overview.md#1-secure-decentralized-asset-custody-mpa-wallet) and [Backup and restoration](/ContinuumDAO/MPAWallet/BackupAndRestoration.md).

**Human or AI circuit breaker** — typical **2/2 multi-agree** setup: an AI-assisted node can *propose* a BTC send, but your second node must **Accept** on **Join** before MPC signing completes.

**Optional exit** — the Group can later [eject](/ContinuumDAO/MPAWallet/EjectConversion.md) a KeyGen to export SegWit or Taproot key material if you deliberately leave MPC custody.

---

### Storing and receiving BTC

1. Create a **multi-agree** KeyGen (**secp256k1** for SegWit, or **bitcoin-taproot** for Taproot) in your Group — [KeyGens](/ContinuumDAO/MPCSigner/KeyGens.md).
2. After KeyGen completes, open **Keys** (or KeyGen details) and copy the **Bitcoin address**:
   - SegWit: **bc1q…** (`bitcoinp2wpkhmainnet` on the KeyGen result)
   - Taproot: **bc1p…** (`bitcoinp2trmainnet` on a **bitcoin-taproot** KeyGen)
3. Send BTC from an exchange or another wallet to that address. Balances appear on the **Assets** tab when Bitcoin network support is enabled on your node build and the network is configured.

SegWit and Taproot are **different addresses** — funds sent to one are not spendable with the other KeyGen type.

---

### Sending BTC (Compose)

1. Open **Compose**, select the **Bitcoin KeyGen** (secp256k1 for SegWit or **bitcoin-taproot** for Taproot) and the **Bitcoin network** (mainnet / testnet / signet as exposed in the app).
2. Build a **Bitcoin transfer** step: recipient address (or pick a saved [contact](/ContinuumDAO/MPAWallet/ContactManagement.md)), amount in BTC.
3. Set **Purpose** text so peers on **Join** understand the send (especially useful for named contacts).
4. **Validate** / simulate if offered, then create the multi-sign request → peers **Accept** or **Reject** → originator **Execute** (MPC sign + broadcast).

**Use stored contacts when you can.** Pick **Tom** (or another saved name) from the contact picker instead of pasting a **bc1…** address from chat, email, or a website. That avoids typos and reduces **copy-paste intercept** risk — malware that swaps a address in your clipboard cannot easily replace a contact you select by name inside the wallet. Peers on **Join** also see a readable Purpose (“0.1 BTC to Tom”) instead of a long Bech32 string alone. Add recipients once under the header **Contacts** icon — see [Contact management](/ContinuumDAO/MPAWallet/ContactManagement.md).

<img src="/_media/bitcoin-send-btc-secure.png" alt="Send Bitcoin dialog with the optional Bitcoin Core security check" />

The checkbox on that dialog is the optional security check. It stays off, with the message in the screenshot, until a node in this KeyGen has Bitcoin Core online and caught up. When one is ready, the label names that node and you can turn the check on for this payment. The same [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md) still applies: peers **Accept** or **Reject**, then the originator **Execute**s.

---

### Optional Bitcoin security check

The check is optional and applies to one BTC payment at a time. Turn it on in the **Send Bitcoin** dialog, or tell the [AI agent](#ai-flow) to add it when you ask for a send. You can also save a default so the agent asks with the check already on.

Any node in the **same KeyGen** can host the Bitcoin Core that performs the check, including a node you are not sending from. The wallet uses this node when its Bitcoin Core is caught up, and otherwise the first other KeyGen node that answers as caught up for that network (mainnet, testnet, or signet). The dialog shows **This node**, or a short id of the peer that is providing Bitcoin Core.

A node can also use a Bitcoin Core you already run. Save that RPC address on the **Node** page, as described under [Bitcoin Core on the Node page](#bitcoin-core-on-the-node-page). A saved address on any KeyGen member is enough for the group. When you ask the agent to add the check, it uses whichever Bitcoin Core a KeyGen node already has — the pruned container or a saved RPC address.

If no node in the KeyGen is online and caught up, the checkbox stays disabled and a send that asks for the check is refused. Add Bitcoin Core on a node in the group and wait until it is up to date.

#### What the check verifies

With the check on, each **Accept**, the later **Get Sig** step, and **broadcast** ask that Bitcoin Core to look at this payment. The checker signs a short attestation naming the payment, recipient, amount, and transaction. Every signing node checks that signature and still reads the transaction itself, so a peer cannot substitute a different recipient or amount. The attestation expires after about two minutes; the next step asks for a fresh one. Only a party to the payment can request the check, and only the node that created the payment can broadcast it.

The checker confirms all of the following before it will attest:

1. **One coin.** The payment spends exactly one coin — the coin recorded when the transfer was created.
2. **That coin is still yours.** Bitcoin Core still has the coin, its value matches the value recorded on the payment, and the coin pays the sender address.
3. **Recipient and amount.** The first output pays the destination address the exact amount you requested.
4. **Change returns to the sender.** A payment has one output, or two when there is change. Change must pay the sender address.
5. **No conflicting spend.** No other transaction already spends that coin.
   - If another unconfirmed transaction spends it but the signature does not verify, the node refuses and tells you not to fee-bump that transaction. Rebroadcast the original.
   - If another transaction spends it with a valid signature, the node refuses to sign a replacement.
6. **Broadcast from that node.** On **Execute**, the signed transaction is submitted through that Bitcoin Core. The payment is recorded as sent only after the transaction is in that node’s mempool or already confirmed, and the recorded transaction id matches the signed transaction.

**Accept**, **Get Sig**, and **broadcast** stop when any of these checks fail.

#### Bitcoin Core on the Node page

Open **Node** on the node that should run the checker. The **Bitcoin Core** section is where you add a pruned Bitcoin Core container, or save another node’s RPC address. You only need this if you want the extra check on BTC transfers.


<img src="/_media/node-page-bitcoin-core.png" alt="" />

**Add a pruned node on this machine**

1. Choose **mainnet**, **testnet**, or **signet**. The checker must be on the same network as the payment.
2. Confirm the disk has at least **100 GB free**. The button stays disabled until it does. The first sync downloads chain history and deletes old blocks as it goes, so the disk needs that headroom while pruning is in progress. After the prune settles, the data is about **40 GB**.
3. Click **Add Bitcoin Core** and sign the management request (the same MetaMask or Ed25519 management key you use for other Node page changes).
4. Wait until the section shows **Up to date**. A progress bar shows percent verified while it syncs. **Mainnet** usually takes **several hours to about two days**, depending on the node’s internet connection. Testnet and signet are the same install and finish sooner because those chains are smaller.
5. Leave the container running. **Remove** stops it. Chain data stays on disk, so adding it again continues from the blocks already stored.

The container is a pruned Bitcoin Core. It keeps recent blocks and the data needed to look up coins and broadcast. Its RPC is reachable only from this node.

**Use another Bitcoin Core**

To check payments against a Bitcoin Core you already run, open **Use another Bitcoin Core** on the same **Node** page:

- **Address** — an `http://` or `https://` Bitcoin Core RPC URL (for example `http://bitcoin.example:8332`).
- **RPC user** and **RPC password**. The password is hidden after you save it.

**Save address** stores them on this node (management signature). Checks from this node then use that address, including when another KeyGen member asks this node to verify a payment. **Clear address** drops the saved RPC; this node goes back to its local container if one is installed. The remote Bitcoin Core must be caught up on the same network as the payment before the checkbox will turn on.

---

### AI flow

With the [AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md) and **continuum** MCP server enabled:

> Send Tom 0.1 BTC

The agent:

1. Resolves **Tom** from the [address book](/ContinuumDAO/MPAWallet/ContactManagement.md) (`get_address_book_registry`) — or asks you for a **bc1…** address if Tom is not saved.
2. Selects the correct **Bitcoin KeyGen** (SegWit **secp256k1** or **bitcoin-taproot**, matching how you custody BTC).
3. Asks whether this payment should use the [extra security check](#optional-bitcoin-security-check), naming Tom’s address and the amount. It calls `get_bitcoin_security_default` first. When you have saved the default on, it asks *“Extra security checks are on by default. Use them for this transfer?”* Otherwise it asks *“Add the extra security check for this transfer?”* Say yes, no, or *“use my default”* (the saved value, and only if you have saved one).
4. Builds a Bitcoin transfer multi-sign request for **0.1 BTC** (`create_bitcoin_transfer`) and submits it into the **Join** → **Execute** loop. With the check on, **Accept**, **Get Sig**, and **broadcast** each require a passing attestation from a Bitcoin Core in the KeyGen.

The agent cannot complete the send alone in a **2/2** wallet — your human or committee **Accept** is still required before MPC signing. If you ask for the check and no KeyGen node has Bitcoin Core online and caught up, the agent refuses the send and tells you to add Bitcoin Core on a node in the group and wait until it is up to date.

*“Turn default BTC security checks on”* or *“turn default BTC security checks off”* only saves the default (`set_bitcoin_security_default`). The agent still asks on the next send. Saving the RPC address for another Bitcoin Core is done on the **Node** page, under [Use another Bitcoin Core](#bitcoin-core-on-the-node-page).

You can also ask: *“What is my Bitcoin SegWit address for KeyGen X?”* or *“Show my BTC balance on mainnet”* when your node build exposes those reads.

---

### Related

- [KeyGens](/ContinuumDAO/MPCSigner/KeyGens.md) — create secp256k1 or bitcoin-taproot keys
- [Chain management](/ContinuumDAO/MPAWallet/ChainManagement.md#bitcoin-segwit-and-taproot) — Bitcoin network selection
- [Optional Bitcoin security check](#optional-bitcoin-security-check) — pruned Bitcoin Core, or another RPC, and what the check verifies
- [Contact management](/ContinuumDAO/MPAWallet/ContactManagement.md) — named recipients for sends
- [Compose transaction flow](/ContinuumDAO/MPAWallet/ComposeTransactionFlow.md)
- [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md)
- [Eject to Private Key](/ContinuumDAO/MPAWallet/EjectConversion.md) — export after threshold eject
- [Overview](/ContinuumDAO/MPAWallet/Overview.md)
- [What is MPC?](/ContinuumDAO/MPC/WhatIsMPC.md) — CGGMP24 and FROST (Lockness)
