
## Creating a KeyGen

A key (or KeyGen) contains the information that each node needs to take part in the joint creation of the Private Key to collectively sign transactions. A KeyGen has a *public key* but **NO PRIVATE KEY**. A new KeyGen can be requested by anyone in a Group. If all nodes in the Group agree to Join, then the new KeyGen is created.

Here is the dialogue to request a new KeyGen in the Keys page of the [MPA wallet](https://mpa.continuumdao.org)

<img src="/_media/KeyGen_request.png"  alt=""/>

We can go through each of the inputs here -

(1) MsgCheck

The user selects either "multi-agree", or "tx-check". The "multi-agree" option allows the nodes in the Group of the keyGen to choose whether to sign a transaction (Accept), or not (Reject). This is suitable for MPA wallet users, where the nodes can be run by humans or AI agents. The other option is "tx-check", where once a signature request has been received by one of the nodes, the others automatically Accept and the signature generation should then proceed without the explicit manual agreement step. This is useful for C3Caller signatures, where a Group is asked for a signature using a KeyGen and where the security is due to the fact that multiple unrelated nodes collectively sign and they can only do so together, without knowledge of the Private Key.

(2) Multi-sign client auth

This is how sign requests by THIS node are handled. When a node generates a Sign Request, or when a node is asked to Accept or Reject a Sign Request, they provide a management signature to confirm their choice. This can either be an EIP-191 signature (e.g. MetaMask), or an Ed25519 signature using a keypair. The MetaMask type signature is often preferred by humans, but the Ed25519 signature is more suitable for automated traffic (e.g. AI agents).

Once the management signature type has been chosen, it must always be used for this KeyGen afterwards *from this node*, but other nodes can choose their own signature type, so that for instance, two nodes in a KeyGen can have MetaMask for a human and Ed25519 for an AI agent.

(3) The Client Key is automatically selected based on the auth chosen. For EIP-191 (MetaMask) it is the Ethereum address of your node's NodeMgtKey in the configs.yaml file on the node. For Ed25519, it can either be the *bootstrap* 128 hex public key in PublicMgtKey in configs.yaml, or one of the other public keys added by the user later (for security), which are stored in the node's database.

(4) GroupID

Each KeyGen applies to a single Group that has previously been created, This defines which nodes can partake in the Sign Requests.

(5) Threshold

This defines how many of the nodes must Accept (or agree) to a Sign Request made by another node. It is the TSS algorithm. Perversely, a threshold of 1 requires 2 nodes to agree, a threshold of 2 requires 3 nodes to agree. This comes directly from the scientific paper used in our MPC algorithm (GG18).

So long as threshold+1 nodes have agreed to a Sign Request, that signature may be generated. For "multi-agree", the signature must be generated only by the node that did the Sign Request. For "tx-check", the signature is performed by the first node in the Configured Nodes and passed back to the C3Caller Relayer for execution.

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

<img src="/_media/KeyGen_join_select_sig.png"  alt=""/>

