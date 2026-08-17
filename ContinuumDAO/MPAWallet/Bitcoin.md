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

<img src="/_media/bitcoin-send-btc.png" alt="" />

The same [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md) applies as for EVM transfers and DeFi batches.

---

### AI flow

With the [AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md) and **continuum** MCP server enabled:

> Send Tom 0.1 BTC

The agent:

1. Resolves **Tom** from the [address book](/ContinuumDAO/MPAWallet/ContactManagement.md) (`get_address_book_registry`) — or asks you for a **bc1…** address if Tom is not saved.
2. Selects the correct **Bitcoin KeyGen** (SegWit **secp256k1** or **bitcoin-taproot**, matching how you custody BTC).
3. Builds a Bitcoin transfer multi-sign request for **0.1 BTC** and submits it into the **Join** → **Execute** loop.

The agent cannot complete the send alone in a **2/2** wallet — your human or committee **Accept** is still required before MPC signing.

You can also ask: *“What is my Bitcoin SegWit address for KeyGen X?”* or *“Show my BTC balance on mainnet”* when your node build exposes those reads.

---

### Related

- [KeyGens](/ContinuumDAO/MPCSigner/KeyGens.md) — create secp256k1 or bitcoin-taproot keys
- [Chain management](/ContinuumDAO/MPAWallet/ChainManagement.md#bitcoin-segwit-and-taproot) — Bitcoin network selection
- [Contact management](/ContinuumDAO/MPAWallet/ContactManagement.md) — named recipients for sends
- [Compose transaction flow](/ContinuumDAO/MPAWallet/ComposeTransactionFlow.md)
- [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md)
- [Eject to Private Key](/ContinuumDAO/MPAWallet/EjectConversion.md) — export after threshold eject
- [Overview](/ContinuumDAO/MPAWallet/Overview.md)
- [What is MPC?](/ContinuumDAO/MPC/WhatIsMPC.md) — CGGMP24 and FROST (Lockness)
