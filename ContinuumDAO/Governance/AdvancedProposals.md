# Advanced Proposals on ContinuumDAO

## Motivation

The OpenZeppelin Governor system of smart contracts comes with a basic form of proposing and voting. Voters can allocate their entire voting power to either "For", "Against", or "Abstain" for a given proposal.

Often when DAO members want a more nuanced view about the direction forward for the DAO, this basic voting system isn't sufficiently detailed.

The additions that are made to OZ Governor by ContinuumDAO will allow DAOs to make more advanced proposals that reflect more accurately the intentions of the DAO members, whether that is for the Treasury or the Constitution.

## Types of Proposal

```solidity
enum ProposalType {
	Basic,
	SingleChoice,
	Approval,
	Weighted
}
```

### 1. Basic Voting

This is the default method of voting that comes out of the box with OZ Governor. The proposal can have a number of transactions that will be executed on-chain in the case of a successful vote. Voters can vote "For", "Against", or "Abstain".

```
Should we allocate money to building?
|X|  Yes
| |  No
| |  No opinion
```

### 2. Single Choice Voting

Single-choice voting involves a proposal that contains a number of options, where each voter can vote for one option only. The option that gets the most number of votes will be executed, and the others will not.

In order to ensure voters have an opt-out of every single-choice vote, an option for "none of the above" should be included.

```
Which chain should we prioritise integrating next?
| |  Ethereum
| |  Solana
|X|  TON
| |  NEAR
| |  None of the above
```

### 3. Approval Voting

Approval voting is similar to single-choice, in that there is a list of options to vote on, the difference being voters can choose multiple options to pass. Their voting power is represented on each option they choose.

```
Which DAO members should be co-signers of the treasury multi-sig (top 2 will be selected)?
| |  Mark
|X|  Joe
|X|  Sarah
| |  David
| |  None of the above
```

### 4. Weighted Voting

Weighted voting is similar to approval voting, in that there is a list of options to vote on, the difference being they can allocate a certain percentage of their voting power to each option.

```
How should funding be spread (%) across the DAO guilds for Q2?
|20|  Building
|35|  Business Development
|25|  Marketing
|20|  Research
```

## Technical Specification

The advanced voting module for OZ Governor operates by creating 'groups' that contain separate proposals. DAO members will now vote on a group basis, rather than a proposal basis. Even basic voting will be a single proposal within a group.
