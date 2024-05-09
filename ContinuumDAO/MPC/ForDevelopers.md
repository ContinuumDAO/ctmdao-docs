
## For Developers

Some Definitions

**Node ID:** Also known as NodeKey, it is the unique identifier of a node throughout its lifecycle.

**Networking:** Multiple nodes need to form a network, after which distributed keys and signatures can be generated.

**Group Application ID, Key Generation ID, Signature ID:** Serve as unique identifiers for group applications, distributed key generation, and distributed signature generation.

**Group ID:** Generated after networking to uniquely identify the group, which can then be used for Relay Channel communication.

**Message Verification Type, msgCheck:** Includes multi-agree and tx-check, where the former requires other nodes to manually agree to a signature; the latter means other nodes automatically agree once transaction conditions are met.

**KeyType:** Refers to the supported signature algorithm types, such as secp256k1, EdDSA, or BLS12381.

