## Eject conversion to standard wallet

An MPA **KeyGen** is an MPC wallet: each Group node holds only a **share**. There is no single private key on any machine until the Group deliberately **ejects** that KeyGen. That is the point of the custody role in [MPA wallet Overview](/ContinuumDAO/MPAWallet/Overview.md) — assets stay under TSS until the Group chooses to convert to a normal key.

<img src="/_media/EjectKeyGen.png"  alt=""/>

**Eject** is a threshold-governed conversion: enough nodes in the KeyGen (the same TSS quorum as multi-sign — **threshold + 1** Accepts) agree to reconstruct the full private key, verify it against the KeyGen’s public address, then **retire MPC** for that key. Afterward the Group can treat it as a normal wallet and import the key into a browser wallet such as **MetaMask**.

This is optional and irreversible for that KeyGen’s MPC life. Use it when you want to leave shared MPC control (for example consolidate to one hot wallet, migrate, or wind down the Group’s MPC use of that address).

### What you get

| Before eject | After eject |
|--------------|-------------|
| MPC shares only; no full private key on any node | Full private key export available to nodes that finalized |
| Multi-sign / Accept–Reject for every spend | That KeyGen can no longer be used for MPC signing |
| Address is the KeyGen’s public address | Same address — now controllable with the exported key |

Supported KeyGen types for eject (in the node app **Keys** page):

- **secp256k1** (Ethereum / EVM, and related Bitcoin P2WPKH material) — import the **Ethereum private key** (64-hex scalar) into MetaMask or similar
- **ed25519** — chain-specific import formats (for example Solana, NEAR) from **Fetch Private Keys**
- **bitcoin-taproot** — Taproot / WIF material from **Fetch Private Keys**

Only **multi-agree** KeyGens can be ejected. **tx-check** KeyGens and keys already marked **Ejected** are not eligible.

### How to eject (node app)

Do this from **Keys** on a node that is in the KeyGen’s Group. Peers need to be online and healthy enough to complete the eject protocol (same idea as finishing a KeyGen or multi-sign).

1. Open **Existing keys**, expand the KeyGen you want to convert.
2. Start **eject** for that KeyGen (management-signed request — MetaMask EIP-191 or Ed25519, same as other KeyGen actions).
3. Other Group nodes see the eject in **Pending**. Each agreeing node taps **Eject** / Agree (again with their management signature). You need the same number of Accepts as for signing that KeyGen (**threshold + 1**).
4. After governance reaches quorum, nodes run the export protocol. The KeyGen moves to Existing keys with an **Ejected** badge. Green ticks on the pending eject row mean agreement only — wait until export finishes and the **Ejected** badge appears.
5. On a node that completed export, use **Fetch Private Keys** (management-signed). Copy the relevant secret **once**, store it offline, and clear it from screen history when you are done.

For **Ethereum / MetaMask**: use the exported **Ethereum private key** (64 hex, typically without a `0x` prefix — MetaMask’s import dialog accepts the usual private-key import form). Confirm the imported account’s address matches the KeyGen’s Ethereum address before you move funds elsewhere.

### After eject

- MPC share material for that KeyGen is **cleared** on nodes that finalized. The address is no longer an MPC committee wallet.
- Anyone who obtains the exported private key can spend without further Group Accepts. Treat the export like a seed phrase: do not paste it into chats, tickets, or untrusted sites.
- If this KeyGen was the agent’s **preferred KeyGen**, set another preferred KeyGen (or clear it) under **AI Agent → Provider** / Agent chat — ejected keys are not eligible for multi-sign.
- You can create a **new** KeyGen later if the Group wants MPC again on a different key; eject does not recreate MPC control over the same secret.

### Related

- [KeyGens](/ContinuumDAO/MPCSigner/KeyGens.md) — creating multi-agree keys and thresholds
- [Overview](/ContinuumDAO/MPAWallet/Overview.md)
- Operator / API detail: [API Implementation — key eject](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/references/API_IMPLEMENTATION.md#post-keygenejectrequest)
