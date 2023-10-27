
Created time: October 9, 2023 15:00 UTC

# **ContinuumDAO Introduction**

This document is the Constitution of ContinuumDAO (CTMDAO). 

CTMDAO will consistently leverage the benefits of DAO governance and the unique features of MPC to ensure the stability and security of our network called the Continuum. Some of the rules and procedures in the Constitution will be enforced by voting and it is only by voting that these rules can be changed. Voting can take effect through on-chain governance and smart contracts, or the outcome will be implemented by the ContinuumDAO Committee.

## Mission & Vision

### **Mission:**

The mission is to create public goods that connect all web protocols and networks in a decentralized manner.

### **Vision:**

Our vision is to connect the world by building the public goods of web3. We aim to provide a fully decentralized MPC infrastructure that enables dApps on different blockchains to connect, or to provide unique MPC related services, with trustless coordinated decision making.

### ContinuumDAO Governance Structure:

There will be three governance roles: Committee, Contributor, and Citizen.

- The Committee will commit to uphold the ContinuumDAO Constitution. They will be the custodians of the important security information of CTMDAO. They will be responsible for submitting proposals that have passed a Temperature Check to a Formal Vote snapshot in a timely manner.
    - For the beginning of the CTMDAO, some previously active community members have been selected who have a good track record of contributing to the DAO. Their term will be for 6 months, starting from October 1st 2023. Thereafter Committees will be elected every 12 months. An election of a new Committee will take place and be completed before every 1st April, the expiration of the term of the old Committee. If a vote for a new Committee does not reach the quorum or required majority, then the old Committee will stay in place and a new election will be implemented as soon as practical.
    - **Committee List：**

| Name | 
| --- |
| Selqui |
| Apex |
| JB |
| Apxymous |
| John CTM |
| Jerry |
| Chookz |

- Contributors will include node runners, Guild members, and the core-contributors group.
    - The Contributors will be responsible for all operational tasks of the Continuum as well as future ecosystem projects that may need help. There will be four Guilds to assist CTMDAO, namely Research, Marketing, Business Development, and Developers.
- Citizens will have the right to join all governance processes, which include proposing, voting, and making contributions.
    - veCTM holders who will have full governance right in the CTMDAO.

### The ContinuumDAO Forum

The Forum is a Bulletin Board hosted by CTMDAO on its website at [forum.continuumdao.org](http://forum.continuumdao.org) . It is the official record of the proceedings of ContinuumDAO. All business concerning the DAO will be documented here, including proposals, Committee proceedings, Treasury asset transfers and Guild actions.

The Forum will be divided into five sections: Announcements, Ideas & Suggestions, Governance, Code Development and Guilds.

- **The Announcements section** is where important updates about ContinuumDAO will appear. This is the main record of such events happening with the protocol.
- **The Idea & Suggestions section** is a place for all DAO members to share their thoughts on ContinuumDAO and the cross-chain industry. It is a place where ideas can be formed into proposals.
- **The Governance section** is where DAO members can propose subjects related to the Constitution, the Treasury or project operations that require serious action. All proposals must be posted here.
- **The Code Development section** will be for DAO members with a development background to propose and discuss topics related to the code or bugs.
- **Guilds section** will be where focused actions are organized on behalf of CTMDAO. These invitation only areas will be split into the four Guilds: Developers, Marketing, Business Development and Research. Each Guild leader will be appointed by the Committee.

### The Governance Process

All proposals will appear in the Governance section of the Forum. Every veCTM holder will have access to all Governance sections in the Forum. 
There are only two steps of the governance process: **Temperature Check & Formal Vote**.

**Temperature Check:**

There is no threshold to propose for the temperature check. Proposals will have a temperature check for 5 days. Once they collect enough feedback (more than twice as many veCTM holders commented positively for the proposal as did negatively and at least 10 veCTM holders commented) from the community, the proposals can move on to the next stage, which is a Formal Vote. 

**Formal Vote:**

The formal voting period for the snapshot will be 10 days. The governance for Emergency proposals will be shortened to 4 days. Only a Committee member can initiate an Emergency proposal. A Formal Vote needs to be submitted by a wallet address with at least 1% of the vote power before posting on the Snapshot. This can be accomplished via delegation if necessary.

A proposal submitted by a Committee member does not require a Temperature Check, but after having been posted to the Forum Proposal section, may be submitted directly for the Formal Vote snapshot.

### **The Temperature Check/Proposal Template:**

- ***Abstract***
- ***Motivation***
- ***Specification***
    - *Overview*
    - Type of proposal (Constitutional, Treasury/Committee, or Emergency)
    - *Scope*
    - *Success Criteria (for Treasury proposals)*
    - *Timeline/Budget (for Treasury proposals)*
    - *References (for Treasury proposals)*

A Citizen who wishes to make a proposal should develop it in the Forum Ideas and Suggestions section, before proceeding to posting in the Proposals section for a Temperature Check and if it passes this, they can then contact a Committee member or core-contributor to make the proposal go live with a Formal Vote.

Any proposal that is a re-submission should reference the previous proposal and explain what has changed from that version. If there is no material change from the previous version, then the proposal should not be submitted.

### ContinuumDAO Proposals and Voting

Proposals should further the Vision and Mission of ContinuumDAO. If proposals do not clearly do this, then voters should seriously consider rejecting them. Every veCTM holder will be able to vote, with no threshold to vote, except holders of non-voting veCTM tokens. The quorum for the voting must meet 20% of the total voting power. 

There will be three categories of proposal. 

- The first is to change this Constitution. Any proposal that has an effect on it will be considered a constitutional vote. A proposal that will update core smart contracts, such as veCTM or SMPC related code will also be considered as a Constitutional proposal.
    - To amend the Constitution, a higher threshold of 67% is required.
    - Any Constitutional proposal that changes this document must include the new version of the Constitution. If it passes, then a hash of the document will be generated and it, together with the document itself and the code to check the hash will be made available on the ContinuumDAO github at [https://github.com/ContinuumDAO](https://github.com/ContinuumDAO).
- The second is for a proposal to spend from the Treasury, to elect a new Committee upon expiry of their term, to replace a Committee member, or concerning any other matter.
    - A voting result of over 50% of votes cast will pass the Treasury/Committee proposal.
    - A Committee election vote which alters the Committee will update this Constitution’s Committee and Multi-signers list without the need for a Constitutional vote.
- The third is for an Emergency proposal.
    - A voting result of over 50% of votes cast will pass the Emergency proposal.

### Security/Emergency Procedure

An Emergency Procedure to halt the Continuum network can be performed by the Committee. A Committee member should try to contact other members, so that at least 4 members agree on a course of action, which must be discussed and documented in the Forum under the private Governance Committee section (not Telegram). If this is not possible due to an urgent situation, then it is acceptable for a Committee member to go ahead and halt the MPC network, either partially or totally, after which they must contact other Committee members as soon as possible and then document the reasons for their actions in the Forum Announcements section. **The ability of the Committee to halt the Continuum network is a temporary measure**, which will be lifted once the network is more mature. After this, it will only be possible to halt the network using on-chain governance controlled through voting.

No other Emergency procedure may be carried out by the Committee without a vote. 

The Committee may squash the outcome of any vote, declaring it null and void if it obviously does not further the Vision and Mission of ContinuumDAO as laid out in this Constitution. To do so, at least 5 members of the Committee have to take this extraordinary action and then document the reasons for their action in the Forum Announcements section, including stating which members decided to oppose the vote outcome. Following this documentation procedure, if the proposal is re-submitted unaltered and if it once again passes, then the Committee may not squash the vote outcome for a second time.

### Treasury

The Treasury is fully under the control of the voting process and the Committee may only spend Treasury assets as directed by DAO voting. The Treasury is protected by the seven CTMDAO Committee in the table below. 

**Multi-signers list:**

| Name | Address |
| --- | --- |
| Selqui | 0x167518826cba5c2180acc60E4753ee3e811a08e7 |
| Apex | 0x8A3D31028C8C83C407408193FF031e2DFD79E224 |
| John | 0x14C189354702b7f2aC7b19e61522A41632226BD8 |
| JB | 0x85e07b95213bc1c4d5a606c977d2116f8bcce811 |
| Apxymous | 0xA9108260723e5633137150d0950D0FF3f9a9222a |
| Chookz | 0xd41B402D7FA1c00284AFf06c6771E6C179826F12 |
| Jerry | 0x80255a4a00CdDb1070DF85Be2407787199C43892
 |

**Safe-Wallets**

Treasury wallets are multi-sig Safe-wallets. The threshold of the Treasury is **4 out of 7** signers.

The No. 1 Safe-wallet address is *arb1:0x47B33679b7FF853300a5Cc19c59d85fcEBAaa278*

Other Treasury Safe-wallets may be created in the future to assist in CTMDAO management and funds may be transferred between them, but they will follow the same rules as the No. 1 wallet and their addresses will be added to the Constitution as soon as it is convenient to do so. 

Over time the use of multi-sig wallets will be progressively replaced by direct on-chain governance and new Treasury wallets will be created, whose spending will only be controlled by veCTM governance contracts. These wallet addresses will also appear in the Constitution as soon as it is convenient to do so.

### ContinuumDAO ethics

- **Security Access**
    
    This concerns access to social media accounts, admin access to the CTMDAO github, admin access to all areas of the Forum, other key CTMDAO related websites and root access to VPS machines. Admin signing rights for smart contracts will either be via a multi-sig wallet under the control of the Committee, with the same requirements of 4 out of 7 signers as for Treasury spending, or by governance functions in veCTM. The relevant keys and passwords will be held in a Key Vault file, which will be updated as necessary.
    
    There will be different levels of access to information for different roles. The Committee will have full access to the Key Vault to ensure the security of the CTMDAO. The Committee undertakes to keep this information secret. When anyone from the Committee leaves, the keys and passwords will be changed. The spread of the Key Vault to all Committee members will ensure decentralisation. Contributors will have limited access to specific projects and accounts depending on their need. Citizens will have public access.
    
- **Code of Conduct**
    
    ContinuumDAO’s purpose is to provide a trustless and fully decentralized MPC infrastructure to connect the world.
    We welcome more web3 builders and partners to join our community, become contributors, and promote the prosperity and large-scale adoption of web3 trust layer.
    
    **Our Commitment to the Code**
    
    ContinuumDAO is committed to fostering a safe and collaborative environment regardless of gender identity and expression, sexual orientation, disability, physical appearance, race, ethnicity, religion, nationality, age, education, socio-economic status, or level of experience.
    This Commitment is written and shared in the spirit of creating a reliable standard for all members, contributors, partners, and communities associated with the ContinuumDAO.
    We invite all those who participate in the ContinuumDAO to help create safe and positive experiences for everyone.
    
    **Goals of the Code**
    
    The goals of this Code of Conduct are to set the overall tone for our community and to provide a guide and a process by which we interact and hold each other accountable.
    This isn't an exhaustive list of things you can and can't do. We want to cultivate a community environment that is healthy, open-minded, collaborative, and creative.
    
    **Expected Behaviors:**
    
    - Accepting constructive criticism gracefully.
    - Giving constructive feedback gracefully: Be direct, caring, and empathetic, express your thoughts on how well ideas relate to the common goal or aligned objective rather than putting them down.
    - Acting in the community’s best interest.
    - Being respectful of different viewpoints and experiences.
    - Participating in an authentic and active way. Contributing to the health and longevity of this community.
    - Using welcoming and inclusive language. Acknowledging preferred gender pronouns. Refraining from demeaning, discriminatory, or harassing behavior and speech.
    
    **Unacceptable Behaviours:**
    
    - Sustained disruption of community events and including public talks and presentations.
    - Organizing or participating in raids or other activities that intentionally disrupt community operations.
    - Implicitly or explicitly offensive comments.
    - Threats or incitement of violence of any kind.
    - Harassment, including persistent attempts to communicate with someone (publicly or privately) after requests are ignored or otherwise declined.
    - Using bots or other programs to maliciously manipulate ContinuumDAO’s contracts, events, products, content, social media account, Discord channels.
