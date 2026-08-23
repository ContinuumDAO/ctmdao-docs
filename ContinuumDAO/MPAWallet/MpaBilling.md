## MPA wallet billing

MPA wallet usage is metered on **Linea** through a DAO-governed **fee contract**. Each **KeyGen** you use for multi-sign must be **registered** there before billable signatures count against your balance. You either **pay monthly** (stablecoin or CTM credits) or qualify for a **veCTM subscription waiver** — see [veCTM on your node](/ContinuumDAO/MPAWallet/VeCTMOnYourNode.md).

Billing status appears in **Multi-Sign** when a **secp256k1 KeyGen** is selected. VPN billing is separate and is **never** waived by veCTM.

---

### Billing setup order

For a **new KeyGen** on a node, work through these steps once:

1. **Claim withdraw authority** (this page) — bind this node to the KeyGen as its billing operator.
2. **Register the KeyGen on Linea** — enroll the shared address on the fee contract.
3. **Fund or waive** — top up credits, **activate** the billing month, or [attach veCTM](/ContinuumDAO/MPAWallet/VeCTMOnYourNode.md) for free signatures up to the DAO limit.

New nodes may get a **free trial until the end of the current UTC month** on first register (once per node). Check the **MPA wallet status** strip in Multi-Sign for your case.

---

### Withdraw authority

**Withdraw authority** answers one question: **which KeyGen address may operate billing for this node?** — register, deposit, sync the month, attach veCTM, and related fee-contract actions for that KeyGen.

You must **claim withdraw authority** on this node **before** the first **register on Linea** for that KeyGen. It is a one-time binding per KeyGen on this node.

#### What it is

- An **off-chain signature** (typed data), not a normal on-chain transaction — same [compose sign-request flow](/ContinuumDAO/MPAWallet/ComposeTransactionFlow.md#eip-712-typed-data-signatures) as Forum sign-in.
- **Non-billable** — it does not consume signature credits.
- The node proves control with its **P-256 node key**; the result is recorded on Linea as **`claimNodeWithdrawAuthority`** for the chosen KeyGen address.

After authority is claimed, that KeyGen is the **authority KeyGen** for billing on this node. Other KeyGens in your wallet may still exist, but **register and month activation** for that billing account must be composed from the **authority KeyGen** (Multi-Sign will prompt you to switch if needed).

#### How to claim (node app)

1. [Attach](/ContinuumDAO/MPAWallet/AttachYourNode.md) to your node and open **Multi-Sign**.
2. Select the **secp256k1 KeyGen** that should own billing for this node.
3. In the **MPA wallet status** strip, choose **Claim authority** (or use **Compose** if the UI prefills a claim step).
4. Peers **Accept** on **Join**; the originator **Execute**s.

Or ask in **Agent chat**: “Claim withdraw authority for this KeyGen on this node.” Your Group still must agree.

#### Important rules

- **Claim before register** — complete withdraw authority **before** the first register on Linea for that KeyGen.
- **Do not batch claim and register** in one multi-sign request — run claim first, then register in a separate request after claim succeeds.
- **One authority per KeyGen on this node** — veCTM attach and detach also require the **authority KeyGen**; see [veCTM on your node](/ContinuumDAO/MPAWallet/VeCTMOnYourNode.md).

---

### Register on Linea

After withdraw authority is claimed for the selected KeyGen:

1. From the **authority KeyGen**, compose **register on Linea** (Multi-Sign status strip or Compose).
2. **Accept** and **Execute** through your Group.

Until registered, billable wallet actions for that KeyGen will not accrue correctly against your account.

---

### Pay for the month

| Situation | What to do |
|-----------|------------|
| **Month not activated** | From the authority KeyGen, **Activate on Linea** (sync billing month) before heavy signing on other chains. |
| **Low balance** | **Top up** credits in stablecoin or CTM via the billing compose flows. |
| **Over free limit** | Pay overage or attach more veCTM / subscribe per DAO rules. |
| **Avoid USDC subscription** | [Attach veCTM](/ContinuumDAO/MPAWallet/VeCTMOnYourNode.md) for the subscription waiver up to the governance-set signature limit. |

The status strip shows **remaining signatures**, registration state, veCTM waiver, and trial eligibility for the selected KeyGen.

---

### Related

- [veCTM on your node](/ContinuumDAO/MPAWallet/VeCTMOnYourNode.md)
- [Overview — Subscription through staking](/ContinuumDAO/MPAWallet/Overview.md#subscription-through-staking)
- [Install a node](/ContinuumDAO/MPAWallet/Install.md)
- [Compose transaction flow — EIP-712](/ContinuumDAO/MPAWallet/ComposeTransactionFlow.md#eip-712-typed-data-signatures)
- [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md)
