
## Better Security

Continuum's MPC stack adheres to **CGGMP24** (threshold ECDSA) and **FROST** (threshold EdDSA), following the open-source implementations maintained by the [Lockness](https://www.lfdecentralizedtrust.org/projects/lockness) project under LF Decentralized Trust (Linux Foundation).

**Proactive Security Strategy:** Both protocols support proactive key refresh — the private key shards held by nodes are rotated on a regular basis. This process is forward compatible, meaning it does not disrupt ongoing operations and remains transparent. For instance, in the rare event that a malicious participant manages to gather some private key shards, those shards become useless after rotation, safeguarding the system's integrity.

