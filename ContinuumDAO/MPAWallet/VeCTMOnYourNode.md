## veCTM on your node

**veCTM** is ContinuumDAO’s voting-escrow token: you lock **CTM** for a chosen period and receive an **veCTM NFT** that carries **governance voting power**. When you **attach** that NFT to your MPA wallet node (from the **withdraw-authority** KeyGen that **owns** it), you unlock practical benefits — **DAO participation**, **free wallet signatures** (subscription through staking) for that **Group**, and **Private VPN** for the **node** at the same locked-CTM / month-start voting-power threshold — while accepting that **removing it requires a governance vote**.

This page is for node operators. Governance background: [How To Write a Proposal](/ContinuumDAO/Governance/HowToWriteAProposal.md). Agent-assisted Forum and voting: [AI-managed governance](/ContinuumDAO/MPAWallet/AIHarness/AgentGovernance.md).

---

### Why attach veCTM?

| Benefit | What you get |
|---------|----------------|
| **Governance** | Voting power for ContinuumDAO — Forum access at holder thresholds, on-chain proposals, and votes. With the [AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md) configured, your agent can help research, draft, and vote; your Group still **Accept**s every on-chain step. |
| **Free wallet signatures** | **Subscription through staking** — free MPA wallet use up to a **governance-set signature limit** each month, instead of paying a **monthly subscription** in stablecoins. Limits and any overage fees are set by DAO votes. |
| **Private VPN** | Encrypted WireGuard tunnel through your node (and optional peer sharing) when **this node** is a member of a Group whose recorded attach key still meets the same threshold — see [Private VPN](/ContinuumDAO/PrivateVPN.md). Not sold separately; **staked veCTM required**. The current authority KeyGen need not hold the NFT after you rotate authority. |

Attaching veCTM also signals long-term alignment with the protocol. Operators who later opt into **approved cross-chain signing Groups** may earn additional **CTM, USDC, or ETH** rewards (rates set by governance); that is separate from the personal wallet waiver.

#### Delegation does not qualify the node

Do **not** delegate veCTM to this KeyGen to meet a node threshold. The monthly fee waiver, **Private VPN**, and **[C3Caller](/ContinuumDAO/C3Caller/Overview.md)** cross-chain minimum all look at the **attached NFT only** (`balanceOfNFTAt` at UTC month start vs `veCtmThresholdPower`). Votes delegated **to** the KeyGen do **not** count. To stay waived, lock enough **CTM** for long enough on **that** NFT, or extend its lock time.

Forum proposals and votes use governor `getVotes` at the address that acts — that path is separate from attach, waiver, and VPN.

---

### Attach is yours — detach needs governance

This asymmetry is deliberate.

**Attaching** is under **your control**. You choose the veCTM NFT, submit the attach through your node, and your MPC Group agrees through the normal [Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md).

**Detaching is not.** While veCTM is attached to a node it is **locked there**:

- You **cannot** detach, transfer, split, merge, or withdraw that NFT on your own.
- You **request detach** through the node; **ContinuumDAO governance must vote** to approve removal before the NFT is released.
- While attached, the NFT **cannot be sold or liquidated** through the usual escape routes — it stays bound to the node until governance agrees.

**One veCTM NFT per KeyGen address** (the address that attaches must own the token). The fee waiver is **per attach key + Group** (`groupId`): sibling KeyGens that **register** with the same Group share that waived month; each KeyGen still has its own free-signature allowance. You **cannot** attach a second NFT from the **same** KeyGen, and you **cannot swap** NFTs on that address without governance **detach** first.

A **second Group on the same node** attaches after you **rotate withdraw authority** to that Group’s secp256k1 KeyGen (the KeyGen that owns its own NFT), then attach and register. Authority is the anti-spoof check on attach and register — it is **not** the VPN gate.

You do **not** need to **describe your node** for normal MPA wallet use, or to attach veCTM for governance and the subscription waiver. Describe your node on the **Node** page only if you want **DAO approval to earn rewards** for verifying **cross-chain transfers** as part of an approved public signing Group — dApps and their users need to know **who** is performing these security-sensitive operations and **which MPC Groups** they may choose. If you take that path, the details you supply (Forum handle, email, hosting metadata) become **public on-chain** when you attach veCTM; describe yourself honestly.

Misbehaving operators on those public cross-chain roles risk governance **refusing** detach; treat attach as a long-term commitment.

---

### Before you attach

1. [Install](/ContinuumDAO/MPAWallet/Install.md) and [attach](/ContinuumDAO/MPAWallet/AttachYourNode.md) to your node in the browser.
2. Create a **Group** and a **secp256k1 KeyGen** → [Groups](/ContinuumDAO/MPCSigner/Groups.md), [KeyGens](/ContinuumDAO/MPCSigner/KeyGens.md).
3. Add **Linea**  in [Chain management](/ContinuumDAO/MPAWallet/ChainManagement.md).
4. Complete **MPA billing setup** for that KeyGen on Linea — including [withdraw authority](/ContinuumDAO/MPAWallet/MpaBilling.md#withdraw-authority) before the first registration.
5. Hold a **veCTM NFT** at the secp256k1 KeyGen that will **attach** for that Group — that KeyGen must be this node’s **withdraw authority** at attach time (claim authority first, or rotate onto it). The attach call binds the waiver to that KeyGen’s **Group id** immediately.

---

### Get veCTM (lock CTM)

If you already hold veCTM elsewhere, you can transfer it to your KeyGen first (only while it is **not** attached to any node).

To **create a new lock** from the node app:

1. Open **Multi-Sign**, select your KeyGen, and open the **Assets** tab on **Linea**.
2. Add **CTM** and **veCTM** if they are not listed — see [Asset management](/ContinuumDAO/MPAWallet/AssetManagement.md).
3. On a **veCTM** row, open **ContinuumDAO** → **Escrow** tab → **Create Lock**. Choose amount and lock duration (longer locks generally mean more voting power).
4. **Accept** on Join and **Execute** after your Group agrees.

You can later **increase** the locked amount or **extend** unlock time from the same Escrow tab. You can **delegate** voting power to another address, or **return** power to your KeyGen (**Undelegate**) before you propose or vote.

---

### How much veCTM do I need to lock?

Currently, the attached veCTM NFT must carry at least **200 CTM in the lock** to qualify for **monthly free wallet signatures** and **Private VPN** — both gated by the same on-chain minimum. After that, **that NFT** must still have **200 voting power on the 1st day of the UTC month** (`balanceOfNFTAt` on the attached token). Voting power depends on how much **CTM** you lock and for how long — longer lock periods generally yield more power for the same amount of CTM. As an example, 400 CTM locked for 2 years yields 200 voting power, for 3 years — 300 voting power. **Delegating veCTM from another address to the KeyGen does not raise this bar** — inbound `getVotes` is ignored for the fee waiver and VPN.

**Tip:**
*Lock enough CTM for a long enough period that the attached NFT itself stays at or above the month-start voting-power threshold. Extending lock time on that NFT is the way to keep the free allowance — not delegating extra votes to the KeyGen.*

Wallet signatures (the Group waiver) and VPN (node privilege) use the same on-chain **`veCtmThresholdPower`** bars in the multi-sign wallet fee contract: **locked CTM** at attach, then **that NFT’s month-start voting power** to stay waived / privileged. There is **no separate VPN subscription**. VPN stays available after you rotate authority as long as a recorded attach key on this node still meets the bar.

That **200** threshold is a **governance parameter**. ContinuumDAO can raise or lower it through an on-chain vote; always check the **Multi-Sign** billing view on your node for the live minimum before you attach.

---

### Attach veCTM to your node

From the node app (with the **authority KeyGen that owns the NFT** selected):

1. On **Assets**, open **ContinuumDAO** on the veCTM NFT you want to attach.
2. Open the **Attach** tab for **that KeyGen**, confirm the token id, and submit. The compose includes that KeyGen’s **Group id** — you do not pick a different Group.
3. Peers **Accept** the sign request on **Join**; the originator **Execute**s.

Or ask in **Agent chat**: “Attach my veCTM to this node for subscription waiver” — the agent prepares the same sign request from the authority KeyGen; your Group still must agree.

After attach succeeds, the waiver is bound to that KeyGen’s Group. **Register** sibling KeyGens with the **same Group id** so they share the waived month. The **Multi-Sign** billing view shows whether **this KeyGen’s Group** qualifies (see [How much veCTM do I need to lock?](#how-much-vectm-do-i-need-to-lock)). Heavier wallet use above the free limit follows the paid subscription or metered rules the DAO defines.

**Private VPN** is a **node** privilege: the node is entitled when **any** recorded Group on it still has a qualifying attach key — check privilege status, not “does the KeyGen I have selected right now own the NFT.” See [Private VPN](/ContinuumDAO/PrivateVPN.md).

---

### Request detach

When you want veCTM back under your KeyGen’s full control:

1. Open **ContinuumDAO** on the attached NFT → **Attach** tab → **Request detach** from the **KeyGen that owns** the NFT.
2. **Accept** and **Execute** through your Group.

That records your request on-chain. **Governance must pass a proposal** to complete detach. Until then, the NFT stays attached and the escrow actions blocked above remain blocked. Governance votes for detaches may be infrequent.

If a detach request is already open, the UI shows that governance must decide — that KeyGen cannot attach a different NFT until governance detaches. A **second Group** on this node uses a **second secp256k1 KeyGen** (rotate authority, then attach that KeyGen’s own NFT).

---

### Managing voting power

| Goal                                              | What to do                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Vote or propose from this KeyGen                  | Propose/vote read governor `getVotes` at the KeyGen. That is **not** the fee-waiver or VPN bar. Proposers need at least **1000 veCTM** or **0.1% of total power**, whichever is higher.                                                                                                          |
| Reduce delegated power you control                | **Undelegate** from the wallet that delegated — no DAO vote required.                                                                                                                                                                                                                           |
| Let another address vote for you                  | **Delegate** from the Escrow tab on your veCTM NFT (or ask the agent). The attached NFT’s month-start power (and the fee waiver) stay with the NFT.                                                                                                                                              |
| Vote from this KeyGen again after delegating away | **Undelegate** / return power to the KeyGen before propose or vote. Delegating away does **not** by itself drop the fee waiver; decaying **attached NFT** power below the 1st-of-month bar does.                                                                                                 |
| Keep the **free allowance** / **VPN**             | Keep the **attached NFT** at or above **`veCtmThresholdPower`** at UTC month start (`balanceOfNFTAt`). Delegation to the KeyGen does **not** count.                                                                                                                                              |
| Qualify for **C3Caller** cross-chain signing      | Meet the DAO’s minimum on the KeyGen’s **attached veCTM only** — delegated power does **not** count toward that bar.                                                                                                                                                                            |
| Pay node bills without USDC                       | Keep veCTM **attached** for that Group and stay within the monthly free signature limit; top up or sync billing month in Multi-Sign if you also use paid registration paths. [Private VPN](/ContinuumDAO/PrivateVPN.md) stays available on the node while any recorded attach key still meets the threshold — not billed on Linea. |
| Move veCTM off the node                           | **Request detach** and follow the governance process — there is no instant self-service detach.                                                                                                                                                                                                 |

---

### Related

- [Overview — Subscription through staking](/ContinuumDAO/MPAWallet/Overview.md#subscription-through-staking)
- [Install — MPA billing](/ContinuumDAO/MPAWallet/MpaBilling.md)
- [Private VPN](/ContinuumDAO/PrivateVPN.md)
- [AI-managed governance](/ContinuumDAO/MPAWallet/AIHarness/AgentGovernance.md)
- [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md)
- [White Paper — Staking as subscription](/ContinuumDAO/WhitePaper.md)
