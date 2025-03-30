## Introduction

<img src="/_media/AssetxOverview.png"  alt=""/>

AssetX is ContinuumDAO's RWA tokenization Factory. We have created a system that will allow businesses, big or small, whether established or not, anywhere in the world, even in countries without established stock exchanges, to raise finance for their enterprises, or release capital from illiquid assets.

It is the first trustless platform to enable capital formation for securities across any blockchain with 'no-code'. AssetX enables an Issuer to take control of the process in a self directed way. They can choose exactly what components form the Toolkit they need to satisfy the requirements of a regulator. Substantial cost savings can be made by avoiding the underwriting process associated with typical capital formation. The RWAs created by AssetX can easily be integrated into lending protocols, allowing capital release for Issuers and also into RWA marketplaces. The full power of DeFi becomes available to both traditional businesses and to investors wishing to gain solid returns.

AssetX has these features :-

(1) The entire process for creating an Asset Backed Security is fully on-chain, using a suite of contracts specifically developed for securities - both Asset Backed Securities and equity.

(2) Real World Assets (RWAs) can be created on one, or multiple blockchains and the number of chains can be subsequently extended. Asset classes in each RWA are fully interoperable across these chains. This interoperability is achieved using the security of ContinuumDAO's institutional grade MPC network. It is possible to trade an RWA on any one chain without requiring cross-chain calls, or further dependence on AssetX.

(3) An RWA can be defined by anybody (trustlessly) and does not require any coding. This can be achieved using our website https://factory.AssetX.org or alternatively the contract calls can be embedded in other code.

(4) The RWA can have multiple asset classes defined, each with their own descriptions and units of account for each class. In this way, an asset can be broken down into different types such as property types, loan terms, equity classes, land areas etc. etc. The RWA is suitable for fractional ownership of large, or perhaps illiquid underlying assets, such as works of art etc.

(5) The RWA on each chain is independent of the other chains, in that "value" in each Asset Class can be transferred to other wallets without needing access to the MPC network. They are not 'wrapped' tokens.

(6) The RWA Issuer has full control and they can mint value in each asset class on any chain and then transfer value to holders on any chain. The Issuer can also 'Lock' the RWA, so that no further minting or chain additions can be made. Holders of the RWA can also freely trade the value in each asset class of their RWA, so long as the recipients conform to the whitelist or KYC/KYB status to allow this.

(7) The RWA can be fully described using decentralized storage on BNB Greenfield. The properties that are stored are linked to the RWA through on-chain checksums. The list of properties is immutable, so a prospective holder can see the entire history of the creation and development of this RWA. The property types are classified as follows 

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

Every RWA can choose to use Storage and if it does, it must have details about the Issuer in the ISSUER category. A security must have details about the License and the regulator in the LICENSE property. For equity formation, the Issuer can upload full details (multiple hundreds of pages) about the risks and potential rewards of the asset in a special PROSPECTUS property. They can also specify who may invest in the RWA (using the WHOCANINVEST property) and whether the issuance is via a whitelist, or KYC/KYB, for public or Accredited Investor status, with or without geo-blocking, all using PolygonID zkProofs. In place of the due diligence usually carried out by banks, the Issuer may commission due diligence from any entity (e.g. a well known management consultant company) and attach details of this to the RWA using the DUEDILIGENCE property. The same applies to any LEGAL or FINANCIAL statements concerning the RWA. 

For Asset Backed Securities, the Issuer is encouraged to fully describe how the asset is held in custody using the PROVENANCE category. They may also upload images and video, as well as other metadata in the IMAGE and VIDEO categories. They may upload details about VALUATION of the underlying assets from notable third party experts.

The Issuer is also encouraged to describe how a holder of RWA tokens can redeem the underlying assets and the costs of doing so. This can be detailed in the REDEMPTION property.

The Issuer can provide important updates and news concerning the RWA in the NOTICE property.

Finally the RWA can achieve a RATING in much the same way that traditional investments can, via some of the new web3 specific ratings agencies.

Everything can be attached to the RWA and links to the Storage data is held on all chains that the RWA is deployed to.


(8) The Issuer can distribute Dividends to holders of the RWA on all chains. This would typically be in conjunction with a periodic statement attached to the RWA as a DIVIDEND property.

(9) The Issuer can optionally choose to control the RWA via a whitelist of wallets that they control, or they can opt for the whitelist to be managed via a KYC process using PolygonID and zkProofs to ensure that holders can only come from certain countries, be over 18, or have 'accredited investor' status according to the US SEC definition. These whitelists are identical on all chains that the RWA is deployed to.

(10) All RWAs that have been minted can be examined through our RWA Explorer. In this way, potential investors can search for assets in their jurisdiction, of filtered types of asset, or by accredited status. They can see the dividends paid and the APR. They can also examine the properties attached to the RWA to help them decide if the asset is investment worthy. They can see how to contact the Issuer, either via DM or via social channels. The RWA Explorer will shortly become available at https://explorer.AssetX.org


### Multichain Deployments

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