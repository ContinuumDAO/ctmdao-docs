
## Joining the Continuum (MPC network)

This page is about the **second role** of Continuum nodes: securing **cross-chain** C3Caller traffic and earning rewards — not the minimum setup for a personal MPA wallet.

- For a personal / AI-controlled **MPA wallet**, you only need a small **multi-agree** Group (simplest: **2/2**). See [MPA wallet Overview](/ContinuumDAO/MPAWallet/Overview.md) and [KeyGens](/ContinuumDAO/MPCSigner/KeyGens.md).
- For **Continuum cross-chain** signing, use a larger Group of nodes that are **ideally five or more completely independent operators**, with **3/5 TSS** (UI threshold **3** — three Accepts out of five). That independence is what makes the committee trustworthy for public messaging.

### Eligibility (technical floor)

To be eligible to join the Continuum network, a single Group of **3 or more** nodes must create:

(1) A KeyGen with MsgCheck **tx-check** and with a **threshold of at least 3** (so **3 or more** nodes must Accept to sign) and with a KeyType **secp256k1** for Ethereum and EVM chains (and some others).

(2) The same as (1), but with a KeyType **ed25519** for non-EVM chains (Solana, NEAR, Stellar, TON, SUI, APTOS etc.)

**Ideal production shape:** **5+ independent** operators and threshold **3** (**3/5**). Meeting the floor of three nodes is enough to propose; governance will prefer well-identified, independent Groups.

And each node must complete the Node Registration form in the Info page of the MPA app.

Once these two KeyGens are created, then someone in the Group should click the Add signer button in the Keys page and select both of the KeyGens and then create a JSON file using the displayed output. 

This file can then be used to make a DAO Proposal for the MPC Signer Group to be added to the Continuum. This proposal can be made by anyone, but it might be simplest if this JSON file is passed to a Committee member to actually generate the proposal from the JSON data. If it passes, then the proposal Execute automatically causes the MPC Signer to be added to the Continuum and the Relayer will pick it up.

### Related

- [Overview](/ContinuumDAO/MPAWallet/Overview.md) — MPA wallet vs cross-chain roles
- [KeyGens](/ContinuumDAO/MPCSigner/KeyGens.md) — tx-check vs multi-agree
- [Groups](/ContinuumDAO/MPCSigner/Groups.md)
- [Creating an MPC Signer](/ContinuumDAO/MPCSigner/CreateMPCSigner.md)
- [C3Caller Overview](/ContinuumDAO/C3Caller/Overview.md)