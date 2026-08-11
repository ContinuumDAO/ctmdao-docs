
## Creating a KeyGen

A key (or KeyGen) contains the information that each node needs to take part in the joint creation of the Private Key to collectively sign transactions. A KeyGen has a *public key* but **NO PRIVATE KEY**. A new KeyGen can be requested by anyone in a Group. If all nodes in the Group agree to Join, then the new KeyGen is created.

**Two roles for KeyGens** (same node software — see [MPA wallet Overview](/ContinuumDAO/MPAWallet/Overview.md)):

1. **MPA wallet custody (multi-agree)** — everyday asset control. The simplest setup is a **2-node Group with threshold 2** (everyday language: **2/2** — both must Accept). Typical pattern: one AI-assisted node + one human circuit-breaker node you control. Larger Groups add loss-of-party resilience or committee control.
2. **Cross-chain Continuum (tx-check)** — optional. Groups that secure C3Caller messaging typically use **five or more independent** operators and **3/5 TSS**; eligibility starts at three nodes with threshold ≥ 3 — see [Joining the Continuum](/ContinuumDAO/MPCSigner/JoinNetwork.md).

Here is the dialogue to request a new KeyGen in the Keys page of the [MPA wallet](https://mpa.continuumdao.org)

<img src="/_media/KeyGen_request.png"  alt=""/>

We can go through each of the inputs here -

(1) MsgCheck

The user selects either "multi-agree", or "tx-check". The **multi-agree** option allows the nodes in the KeyGen to choose whether to sign a transaction (Accept), or not (Reject). This is the MPA wallet path: humans and/or AI agents, with Accept as the circuit breaker (including simple **2/2**). The other option is **tx-check**, where once a signature request has been received by one of the nodes, the others automatically Accept and signature generation proceeds without a manual agreement step. That suits **C3Caller** cross-chain signatures, where security comes from many **independent** nodes holding shares and signing together, without knowledge of the full Private Key — not from a human Accept click on every message.

(2) Multi-sign client auth

This is how  THIS node requires authorization to post information to, either from a web browser user , or an AI agent . When a node generates, for instance, a Sign Request, or when a node is asked to Accept or Reject a Sign Request, they provide a management signature to confirm their choice. This can either be an EIP-191 signature (e.g. MetaMask), or an Ed25519 signature using a keypair. The MetaMask type signature is often preferred by humans, but the Ed25519 signature is more suitable for automated traffic (e.g. AI agents).

Once the management signature type has been chosen, it must always be used for this KeyGen afterwards *from this node*, but other nodes can choose their own signature type, so that for instance, two nodes in a KeyGen can have MetaMask for a human from one node and Ed25519 for an AI agent from the other.

(3) The Client Key is automatically selected based on the auth chosen. For EIP-191 (MetaMask) it is the Ethereum address of your node's NodeMgtKey in the configs.yaml file on the node. For Ed25519, it can either be the *bootstrap* 128 hex public key in PublicMgtKey in configs.yaml, or one of the other public keys added by the user later (for security), which are stored in the node's database. See the Node Running Instructions for how to create an ed25519 key pair.

(4) GroupID

Each KeyGen applies to a single Group that has previously been created, This defines which nodes can partake in the Sign Requests. All nodes in the Group must be in a healthy state before the KeyGen can start. A check is run to make sure this is the case.

(5) Threshold

This is the TSS parameter from the scientific papers behind our MPC stack. **Signing requires `threshold` Accepts** :

| UI **Threshold** | Accepts needed | Everyday name | Typical use |
|------------------|----------------|---------------|-------------|
| **2** | **2** | **2/2** (with a 2-node Group) | Personal AI + human circuit breaker |
| **3** | **3** | **3/5** (with a 5-node Group), or 3/3, 3/4, … | Cross-chain Continuum Groups; larger committees |
| higher | same as threshold | e.g. 4/7 | Stronger shared custody |

So long as **threshold** nodes have agreed to a Sign Request, that signature may be generated. For **multi-agree**, the signature must be generated only by the node that created the Sign Request. For **tx-check**, the signature is performed by the first node in the Configured Nodes and passed back to the C3Caller Relayer for execution.

(6) Key type

This is the cryptographic key type for which a signature is being sought. We currently support two key types secp256k1, an ECDSA elliptic curve signature used by Ethereum and EVMs and some other chains and ed25519 which is the Edward's curve signature used by many non-EVM chains e.g. Solana, NEAR, TON, SUI, APTOS, Algorand, Stellar. 

NOTE *don't confuse the management signature type Ed25519 with the MPC signature ed25519*


Any number of KeyGens can be created for a Group, of both types "multi-agree", or "tx-check", with different management signatures, different thresholds, or different Key types. Each Group can have its own set of KeyGens.

Each KeyGen will have different public addresses derived from its *public key* depending on the Key type and the target blockchain. A KeyGen of type secp256k1 will have a single Ethereum address, but a KeyGen of type ed25519 will have separate unique public addresses depending on the blockchain. All of these addresses are derived in different ways from the single *public address* of the KeyGen.


### KeyGen Agreement 

Once the KeyGen Request has been submitted the originator sees their request in their Pending table

<img src="/_media/KeyGen_pending_creator.png"  alt=""/>

Their own Node Key has a green tick (they agree automatically) and other nodes show 'waiting' whilst these other nodes decide if they want to agree or not to the request.

On one of the other nodes, they will see a Join button. If they click it, they can choose their own management signature type (EIP-191 MetaMask, or Ed25519)

<img src="/_media/KeyGen_pending_client.png"  alt=""/>

</br>
</br>

<img src="/_media/KeyGen_join_select_signature.png"  alt=""/>

Once EVERY node in the Group has Joined, the KeyGen will disappear from the Pending table and **after a few minutes**  of patiently waiting, the KeyGen will appear in the Existing keys table in each node in the Group.

<img src="/_media/KeyGen_existing_signing.png"  alt=""/>

You can see when the record is expanded that it shows the management signature on this node (MetaMask EIP-191 in this case), that it is of type secp256k1 and multi-agree, with threshold 2 (2 nodes must agree) and you see its public key and its Ethereum address.

You can now use your KeyGen for either use in the Multi-Sign page (for "multi-agree" KeyGens), or you use it to sign C3Caller Relayer traffic (for "tx-check" KeyGens).

You can use this KeyGen from the node app alone. Optionally — and recommended for most users on this AI-first wallet — [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md).

If the Group later wants to leave MPC for this key and hold a normal private key (for example to import into MetaMask), use [Eject to Private Key](/ContinuumDAO/MPAWallet/EjectConversion.md).

### Related

- [Groups](/ContinuumDAO/MPCSigner/Groups.md)
- [Configured Nodes](/ContinuumDAO/MPCSigner/ConfiguredNodes.md)
- [Overview](/ContinuumDAO/MPAWallet/Overview.md) — 2/2 vs cross-chain roles
- [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md)
- [Eject to Private Key](/ContinuumDAO/MPAWallet/EjectConversion.md)
- [Joining the Continuum](/ContinuumDAO/MPCSigner/JoinNetwork.md) — tx-check KeyGens for C3Caller

