## Introduction

<img src="/_media/AssetxOverview.png"  alt=""/>

AssetX is ContinuumDAO's RWA tokenization Factory.

It is the first trustless platform to enable Capital Formation for securities across any blockchain with 'no-code'. AssetX enables an Issuer to take control of the process in a self directed way, but with a toolkit that allows them to satisfy the requirements of a regulator. Substantial cost savings can be made by avoiding the underwriting process associated with typical capital formation. The RWAs created by AssetX will be suitable for use in lending protocols, allowing capital release for Issuers and in RWA marketplaces.

AssetX has these features :-

(1) The entire process for creating an Asset Backed Security in fully on-chain, using a suite of contracts specifically developed for securities.

(2) Real World Assets (RWAs) can be created on multiple blockchains and the number of chains can be subsequently extended. Asset classes in each RWA are fully interoperable across these chains. This interoperability is achieved using the security of ContinuumDAO's institutional grade MPC network.

(3) The RWA can be defined by anybody and does not require any coding. This can be achieved using our website https://factory.AssetX.org or alternatively the contract calls can be embedded in other code.

(4) The RWA can have multiple asset classes defined, each with their own descriptions and units. In this way, an asset can be broken down into different types such as property types, loan terms, equity classes, land areas etc. etc. The RWA is suitable for fractional ownership of perhaps illiquid underlying assets, such as works of art etc.

(5) The RWA Issuer has full control and they can mint value in each asset class on any chain and then transfer value to holders. The Issuer can also 'Lock' the RWA, so that no further minting or chain additions can be made. Holders of the RWA can also freely trade the value in each asset class of their RWA, so long as they recipients conform to the whitelist or KYC/KYB status to allow this.

(6) The RWA can be fully described using decentralized storage on BNB Greenfield. These properties stored are linked to the RWA through on-chain checksums. The list of properties is immutable, so a prospective holder can see the entire history of the creation and development of this RWA. The properties are classified as follows 

	ISSUER,
    PROVENANCE,
    VALUATION,
    PROSPECTUS,
    RATING,
    LEGAL,
    FINANCIAL,
    LICENSE,
    DUEDILIGENCE,
    NOTICE,
    DIVIDEND,
    REDEMPTION,
    WHOCANINVEST,
    IMAGE,
    VIDEO

Every RWA must have details about the Issuer. A security must have details about the License and the regulator. For equity formation, the Issuer can upload full details about the risks and potential rewards of the asset in a special PROSPECTUS property. They can also specify who may invest in the RWA (using the WHOMAYINVEST property) and whether the issuance is via a whitelist, or KYC/KYC with or without geo-blocking, all using PolygonID zkProofs. In place of the due diligence usually carried our by banks, the Issuer may commission due diligence from any entity (e.g. a well known management consultant company) and attach details of this to the RWA using the DUEDILIGENCE property. The same applies to any legal or financial statements concerning the RWA. Everything can be attached to the RWA on all chains.

The Issuer is also encouraged to describe how a holder of RWA tokens can redeem the underlying assets and the costs of doing so. This can be detailed in the REDEMPTION property.

(7) The Issuer can distribute Dividends to holders of the RWA on all chains. This would typically be in conjunction with a statement attached to the RWA as a DIVIDEND property.

(8) The Issuer can optionally choose to control the RWA via a whitelist of wallets that they control, or they can opt for the whitelist to be managed via a KYC process using PolygonID and zkProofs to ensure that holders can only come from certain countries, be over 18, or have 'accredited investor' status according to the US SEC definition.


ContinuumDAO continues to add new chains to AssetX and will also integrate non-EVM chains such as Stellar, Solana and NEAR. The system is currently on the following chains :

Ethereum Sepolia,
Arbitrum Sepolia,
BASE Sepolia,
Linea Sepolia,
BLAST Sepolia,
Redbelly Testnet,
Lumia Testnet,
Holesky Testnet,
Morph Holesky,
BSC Testnet,
opBNB Testnet
BNB Greenfield Testnet,
Vanguard,
U2U Nebulas,
Core Testnet,
Bitlayer Testnet,
Soneium Testnet,
Scroll Sepolia,
Mantle Sepolia,
Lukso Testnet,
Bera Bartio,
Optimism Sepolia,
Polygon Amoy

In addition, Sonic, Cronos, Convex, Humanode and 5ire are close to completion.