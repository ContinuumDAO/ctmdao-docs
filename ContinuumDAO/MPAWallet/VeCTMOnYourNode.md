## veCTM on your node

**veCTM** is ContinuumDAO’s voting-escrow token: you lock **CTM** for a chosen period and receive an **veCTM NFT** that carries **governance voting power**. When you **attach** that NFT to your MPA wallet node, you unlock practical benefits — **DAO participation**, **free wallet signatures** (subscription through staking), and **Private VPN** at the same voting-power threshold — while accepting that **removing it requires a governance vote**.

This page is for node operators. Governance background: [How To Write a Proposal](/ContinuumDAO/Governance/HowToWriteAProposal.md). Agent-assisted Forum and voting: [AI-managed governance](/ContinuumDAO/MPAWallet/AIHarness/AgentGovernance.md).

---

### Why attach veCTM?

| Benefit | What you get |
|---------|----------------|
| **Governance** | Voting power for ContinuumDAO — Forum access at holder thresholds, on-chain proposals, and votes. With the [AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md) configured, your agent can help research, draft, and vote; your Group still **Accept**s every on-chain step. |
| **Free wallet signatures** | **Subscription through staking** — free MPA wallet use up to a **governance-set signature limit** each month, instead of paying a **monthly subscription** in stablecoins. Limits and any overage fees are set by DAO votes. |
| **Private VPN** | Encrypted WireGuard tunnel through your node (and optional peer sharing) when attached veCTM meets the same voting-power threshold — see [Private VPN](/ContinuumDAO/PrivateVPN.md). Not sold separately; **staked veCTM required**. |

Attaching veCTM also signals long-term alignment with the protocol. Operators who later opt into **approved cross-chain signing Groups** may earn additional **CTM, USDC, or ETH** rewards (rates set by governance); that is separate from the personal wallet waiver.

#### Governance without locking a huge balance

You do **not** need to lock an enormous **CTM** balance into the KeyGen’s own veCTM NFT for **DAO governance**. Holders with veCTM in **other wallets** can **delegate voting power to the KeyGen address** — the same address that holds the attached NFT — so Forum access, proposals, and votes can use **delegated power** as well as power from the attached lock.

That is especially useful for a **shared KeyGen** across several nodes: each operator can lock and delegate **only what they choose** from their own wallet, without forcing one person to fund the whole Group. **Undelegating** is under the delegator’s control — it does **not** need a DAO vote (unlike **detaching** veCTM from the node).

**Cross-chain signing is different.** If your Group secures public **[C3Caller](/ContinuumDAO/C3Caller/Overview.md)** traffic, the KeyGen must meet the DAO’s **minimum veCTM voting power on its own attached stake** — **without counting delegated power**. The exact amount is set by governance. Delegation still helps with Forum and on-chain governance votes; it does **not** substitute for the stake required to back cross-chain verification.

---

### Attach is yours — detach needs governance

This asymmetry is deliberate.

**Attaching** is under **your control**. You choose the veCTM NFT, submit the attach through your node, and your MPC Group agrees through the normal [Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md).

**Detaching is not.** While veCTM is attached to a node it is **locked there**:

- You **cannot** detach, transfer, split, merge, or withdraw that NFT on your own.
- You **request detach** through the node; **ContinuumDAO governance must vote** to approve removal before the NFT is released.
- While attached, the NFT **cannot be sold or liquidated** through the usual escape routes — it stays bound to the node until governance agrees.

Only **one veCTM NFT per MPC Group** can be attached for the subscription waiver. You **cannot swap** to a different NFT without going through the detach process first.

You do **not** need to **describe your node** for normal MPA wallet use, or to attach veCTM for governance and the subscription waiver. Describe your node on the **Node** page only if you want **DAO approval to earn rewards** for verifying **cross-chain transfers** as part of an approved public signing Group — dApps and their users need to know **who** is performing these security-sensitive operations and **which MPC Groups** they may choose. If you take that path, the details you supply (Forum handle, email, hosting metadata) become **public on-chain** when you attach veCTM; describe yourself honestly.

Misbehaving operators on those public cross-chain roles risk governance **refusing** detach; treat attach as a long-term commitment.

---

### Before you attach

1. [Install](/ContinuumDAO/MPAWallet/Install.md) and [attach](/ContinuumDAO/MPAWallet/AttachYourNode.md) to your node in the browser.
2. Create a **Group** and a **secp256k1 KeyGen** → [Groups](/ContinuumDAO/MPCSigner/Groups.md), [KeyGens](/ContinuumDAO/MPCSigner/KeyGens.md).
3. Add **Linea**  in [Chain management](/ContinuumDAO/MPAWallet/ChainManagement.md).
4. Complete **MPA billing setup** for that KeyGen on Linea — including [withdraw authority](/ContinuumDAO/MPAWallet/MpaBilling.md#withdraw-authority) before the first registration.
5. Hold a **veCTM NFT** at the KeyGen address that will act as the node’s billing **authority** for that Group.

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

Currently, the attached veCTM NFT must carry at least **200 voting power** to qualify for **monthly free wallet signatures** and **Private VPN** — both gated by the same on-chain minimum. Voting power depends on how much **CTM** you lock and for how long — longer lock periods generally yield more power for the same amount of CTM.

Wallet signatures and VPN use the same on-chain **`veCtmThresholdPower`** gate in the multi-sign wallet fee contract. There is **no separate VPN subscription** — if your attached veCTM is below the threshold, you cannot enable Private VPN until you lock or attach enough stake.

That **200** threshold is a **governance parameter**. ContinuumDAO can raise or lower it through an on-chain vote; always check the **Multi-Sign** billing view on your node for the live minimum before you attach.

---

### Attach veCTM to your node

From the node app (with your **authority KeyGen** selected):

1. On **Assets**, open **ContinuumDAO** on the veCTM NFT you want to attach.
2. Open the **Attach** tab, confirm the token id, and submit.
3. Peers **Accept** the sign request on **Join**; the originator **Execute**s.

Or ask in **Agent chat**: “Attach my veCTM to this node for subscription waiver” — the agent prepares the same sign request; your Group still must agree.

After attach succeeds, the **Multi-Sign** billing view shows whether the Group qualifies for the **veCTM waiver** (free wallet signatures and **Private VPN** when the attached NFT meets the governance voting-power minimum — see [How much veCTM do I need to lock?](#how-much-vectm-do-i-need-to-lock)). Heavier wallet use above the free limit follows the paid subscription or metered rules the DAO defines. **Private VPN** itself is not available without staked attached veCTM at that threshold — see [Private VPN](/ContinuumDAO/PrivateVPN.md).

---

### Request detach

When you want veCTM back under your KeyGen’s full control:

1. Open **ContinuumDAO** on the attached NFT → **Attach** tab → **Request detach** (same authority KeyGen).
2. **Accept** and **Execute** through your Group.

That records your request on-chain. **Governance must pass a proposal** to complete detach. Until then, the NFT stays attached and the escrow actions blocked above remain blocked.

If a detach request is already open, the UI shows that governance must decide — you cannot submit a second attach for a different NFT on the same Group.

---

### Managing voting power

| Goal                                              | What to do                                                                                                                                                                                                                                 |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Vote or propose from this KeyGen                  | Ensure enough **voting power** at the KeyGen address — from the attached NFT, from **delegation sent to the KeyGen**, or both. Proposers need at least **1000 veCTM** or **0.1% of total power**, whichever is higher (delegation counts). |
| Add power without locking more CTM in the KeyGen  | From an **external wallet**, delegate veCTM voting power **to the KeyGen address**. Each member of a shared Group can delegate independently.                                                                                              |
| Reduce delegated power you control                | **Undelegate** from the wallet that delegated — no DAO vote required.                                                                                                                                                                      |
| Let another address vote for you                  | **Delegate** from the Escrow tab on your veCTM NFT (or ask the agent).                                                                                                                                                                     |
| Vote from this KeyGen again after delegating away | **Undelegate** / return power to the KeyGen before propose or vote.                                                                                                                                                                        |
| Qualify for **C3Caller** cross-chain signing      | Meet the DAO’s minimum on the KeyGen’s **attached veCTM only** — delegated power does **not** count toward that bar.                                                                                                                       |
| Pay node bills without USDC                       | Keep veCTM **attached** and stay within the monthly free signature limit; top up or sync billing month in Multi-Sign if you also use paid registration paths. At the same voting-power threshold, attached veCTM also unlocks [Private VPN](/ContinuumDAO/PrivateVPN.md) — not billed on Linea.                                                                              |
| Move veCTM off the node                           | **Request detach** and follow the governance process — there is no instant self-service detach.                                                                                                                                            |

---

### Related

- [Overview — Subscription through staking](/ContinuumDAO/MPAWallet/Overview.md#subscription-through-staking)
- [Install — MPA billing](/ContinuumDAO/MPAWallet/MpaBilling.md)
- [Private VPN](/ContinuumDAO/PrivateVPN.md)
- [AI-managed governance](/ContinuumDAO/MPAWallet/AIHarness/AgentGovernance.md)
- [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md)
- [White Paper — Staking as subscription](/ContinuumDAO/WhitePaper.md)
