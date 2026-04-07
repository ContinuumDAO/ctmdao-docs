## Overview

This section describes how to run an AI agent on the same machine as one of the nodes in an MPA wallet setup

Firstly, the user should be able to give the AI agent a KeyGenId. That means they have already created a Group and generated a KeyGen with MsgCheck "multi-agree" and Key type secpk256k1. The KeyGen will have a threshold, so that threshold+1 nodes are required to Accept a signRequest before the AI agent (or any other node) can generate a signature and execute the transaction. An AI agent can list what KeyGens are available using the API endpoint 

```
curl http://127.0.0.1:8080/listKeyGenRequests?filter=success
```

The KeyGenId of each KeyGen in the result is found at Data.requestid

Once the AI agent has identified the KeyGen, then they can get most of the information they need about it using the API endpoint

```
curl http://127.0.0.1:8080/getKeyGenResultById?id=<keyGenId>
```

The result is returned in the data field and this includes the node keys of all nodes in the Group, the pubkeyhex (or simply the pubkey) of the KeyGen and the Ethereum public address of the KeyGen

### Signature Context of the KeyGen

The AI agent can see the full context of what activity associated with this KeyGen in the past by using these API endpoints

```
curl http://127.0.0.1:8080/listSignRequests
```

This returns all the previous sign requests in the data field. ONLY sign requests from the currently selected KeyGen in the field "KeyGenRequestId" should be considered by the AI agent. A "fromTime" and "toTime" query params can be used to limit the output by time.

In the "status" of each one. It can have values of "success" (Accepted by threshold+1 nodes), "blocked" (not enough nodes Accepted the sign request), "live" (the sign request is still being considered by nodes), "pending" (THIS node has called /signRequestAgree with either Accept or Reject), "blocked" (the sign request cannot proceed because not enough nodes are left to Accept it, with others having Rejected the request), or "shelved" (the originator node decided to cancel the sign request, perhaps because of the feedback from the nodes in their Thoughts). A filter query param can be used to filter by the status. The return value also shows which node keys Accepted or Rejected the sign request.

The API return includes "DestinationChainID" (the destination chain ID where the transaction would be executed), "DestinationAddress" (the address of the contract or Externally Owned Address that the transaction would be executed on) and the "SignatureText" (a JSON describing the function call, with a human readable signature, and names of each parameter in the function call).

If the sign request contains multiple signature requests, then it is a "BatchSignRequest" with "BatchSize" messages to sign (optional). These must be either ALL accepted by the nodes, or Rejected. They must be executed in order as a batch, with no cherry picking allowed.

The AI agent should examine the text message return value "Purpose" (which they may have written when they did a multiSignRequest, creating the sign request) and also the text message  "Thoughts" of each node when they did a /signRequestAgree. These messages should be used to guide the AI agent in its future actions. This is IMPORTANT CONTEXT.

The AI agent can examine the actual transactions that might have resulted from successful sign requests using the API endpoint

```
curl http://127.0.0.1:8080/listSignResults
```

This shows CONCLUDED sign requests in the data returned, including signature data and "transactionhash" data that can be used to looks at the transaction in a block explorer (if the AI agent has this Skill). The AI agent should have the ability to look at block chain data via a block explorer. With the transaction hash and using the saved "explorer" field in the return from the API endpoint /getChainDetails it should be able to examine the transaction in detail, including mempool status,  gas used etc.


### Message Context of the KeyGen

The nodes in a KeyGen also store a rich message stream that is valuable context. These are messages sent between nodes, including to the AI agent. If the nodes use the message system included in MPA wallet, then these are saved in the node's databases and NEVER LOST. It means that the user can switch AI agents, or AI LLMs without losing any context.

USERS SHOULD TALK TO THE AI AGENT USING the system [here](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/references/API_KEYGEN_MESSAGING.md)

**AI agents should use this text messaging system as much as possible in deciding scenarios and strategies, so that this valuable context is saved for the nodes**


### Blockchain Context

The AI agent can retrieve  details about a chain in the local node's database using the API endpoints

```
curl http://127.0.0.1:8080/getChainDetails
```

with the optional query param chain_id

They can also save new details using the API endpoint /postChainDetails or remove the record for a chain using /removeChainDetails. Full details in the API docs [here](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/references/API_IMPLEMENTATION.md#local-chain-config-1)


### Known Address Context

Similarly an AI Agent can retrieve known address information saved on its node, either for personal addresses, or contract addresses using teh API methods described [here](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/references/API_IMPLEMENTATION.md#known-addresses-local-node-only-1)

