## Core Steps

The core steps of MPC algorithms include distributed key generation, distributed signing, distributed key updating, and signature verification. Assuming there are n (n≥2) participants, they agree to run a threshold signature protocol and set a threshold t, where t must be less than or equal to n. Continuum uses **CGGMP24** for ECDSA (secp256k1) and **FROST** for EdDSA (Ed25519), as maintained by the Lockness project under LF Decentralized Trust (Linux Foundation).

#### Distributed Key Generation

n participants collaboratively run a distributed key generation protocol (**CGGMP24** for secp256k1 / ECDSA, **FROST** for Ed25519 / EdDSA), which, after several rounds of data interaction, results in a distributed public-private key pair. The public key is publicly visible, while the private key appears in a distributed form, with each participant holding a fragment.

#### Distributed Signing

When multiple participants agree to generate a signature and their number is greater than or equal to the threshold t, a valid signature can be produced; otherwise, the signature cannot be verified. Participants run a distributed signing protocol together to produce a valid signature compatible with the target chain.

#### Distributed Key Updating

When a threshold number of participants agree to update keys, private key fragments held by participants can be updated while maintaining forward compatibility. That is, the public key remains unchanged before and after the update, greatly enhancing security without impacting MPC users or applications. Both CGGMP24 and FROST include proactive key-refresh support.

#### Signature Verification

The signature produced can be publicly verified against the public key generated through the distributed key generation protocol, using the same verification rules as a conventional single-party signature on that chain.

It's important to note that in the distributed key generation, signing, and key updating algorithms, the private key never appears in its entirety, preventing the possibility of private key leakage. Additionally, the public key generated through distributed key generation is consistent with and indistinguishable from those generated through conventional signature algorithms; the signature verification process is entirely consistent with conventional signatures, such that given two signatures, one produced by MPC and another by a conventional signature algorithm, they are indistinguishable.


