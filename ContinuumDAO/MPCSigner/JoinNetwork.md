
## Joining the Continuum (MPC network)

To be eligible to join the Continuum network, a single Group of 3 or more nodes must create

(1) A KeyGen with MsgCheck "tx-check" and with a threshold of at least 2 (3 or more nodes required to sign) and with a KeyType secp256k1 for Ethereum and EVM chains (and some others).

(2) The same as (1), but with a KeyType ed25519 for non-EVM chains (Solana, NEAR, Stellar, TON, SUI, APTOS etc.)

And each node must complete the Node Registration form in the Info page of the MPA app.

Once these two KeyGens are created, then someone in the Group should click the Add signer button in the Keys page and select both of the KeyGens and then create a JSON file using the displayed output. 

This file can then be used to make a DAO Proposal for the MPC Signer Group to be added to the Continuum. This proposal can be made by anyone, but it might be simplest if this JSON file is passed to a Committee member to actually generate the proposal from the JSON data. If it passes, then the proposal Execute automatically causes the MPC Signer to be added to the Continuum and the Relayer will pick it up.