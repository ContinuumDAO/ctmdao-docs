
## Joining the Continuum (MPC network)

This page is about the **second role** of Continuum nodes: securing **cross-chain** C3Caller traffic and earning rewards — not the minimum setup for a personal MPA wallet.

- For a personal / AI-controlled **MPA wallet**, you only need a small **multi-agree** Group (simplest: **2/2**). See [MPA wallet Overview](/ContinuumDAO/MPAWallet/Overview.md) and [KeyGens](/ContinuumDAO/MPCSigner/KeyGens.md).
- For **Continuum cross-chain** signing, use a larger Group of nodes that are **ideally five or more completely independent operators**, with **3/5 TSS** (UI threshold **3** — three Accepts out of five). That independence is what makes the committee trustworthy for public messaging.

### Eligibility (technical floor)

To be eligible to join the Continuum network, a single Group of **3 or more** nodes must create:

(1) A KeyGen with MsgCheck **tx-check** and with a **threshold of at least 3** (so **3 or more** nodes must Accept to sign) and with a KeyType **secp256k1** for Ethereum and EVM chains (and some others).

(2) The same as (1), but with a KeyType **ed25519** for non-EVM chains (Solana, NEAR, Stellar, TON, SUI, APTOS etc.)

**Ideal production shape:** **5+ independent** operators and threshold **3** (**3/5**). Meeting the floor of three nodes is enough to propose; governance will prefer well-identified, independent Groups.

### Steps (node app)

1. On **each node**, complete **Info → Node Registration**.
2. Create both required **tx-check** KeyGens on the **Keys** page — one **secp256k1**, one **ed25519**, each with threshold **≥ 3** (see [KeyGens](/ContinuumDAO/MPCSigner/KeyGens.md)).
3. On the **Keys** page, click **Add signer**, select both KeyGens, and copy the displayed JSON for the DAO proposal.

**With an AI agent:** attach via [Agent provision and configure](/ContinuumDAO/MPAWallet/AgentProvision.md) and ask in plain language — for example *"Create tx-check KeyGens for cross-chain signing — secp256k1 and ed25519 with threshold 3"*, *"Export the signer JSON for my Group's tx-check keys"*, or *"Walk me through Node Registration for joining the Continuum"*. You still **Accept** KeyGen requests on each node in the wallet website; the agent must not Accept on more than one node.

This JSON file can then be used to make a DAO Proposal for the MPC Signer Group to be added to the Continuum. This proposal can be made by anyone, but it might be simplest if this JSON file is passed to a Committee member to actually generate the proposal from the JSON data. If it passes, then the proposal Execute automatically causes the MPC Signer to be added to the Continuum and the Relayer will pick it up.

### Related

- [Overview](/ContinuumDAO/MPAWallet/Overview.md) — MPA wallet vs cross-chain roles
- [KeyGens](/ContinuumDAO/MPCSigner/KeyGens.md) — tx-check vs multi-agree
- [Groups](/ContinuumDAO/MPCSigner/Groups.md)
- [Creating an MPC Signer](/ContinuumDAO/MPCSigner/CreateMPCSigner.md)
- [Agent provision and configure](/ContinuumDAO/MPAWallet/AgentProvision.md)
- [C3Caller Overview](/ContinuumDAO/C3Caller/Overview.md)