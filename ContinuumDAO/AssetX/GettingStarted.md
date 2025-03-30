## Getting Started

The AssetX Factory can be found here https://factory.AssetX.org Please check that you arrive at the correct URL(!)

You can deploy or manage RWAs on testnet on multiple chains in a permissionless way. 

PLEASE NOTE that some of the testnets that are used by AssetX are UNSTABLE and that problems can occur using AssetX with them that are not the fault of the platform. Common problems are (1) RPC gateways that stop working, (b) dramatic gas price changes that are hard to track, (c) transactions being stuck 'pending' forever, or even (d) discontinued/upgraded testnets that we have not learned about yet. On mainnet, we will only connect blockchains that are very stable, though this does not guarantee their flawless functionality!


### Connect your Wallet

AssetX supports a large number of wallets, including MetaMask, Phantom, TrustWallet, WalletConnect etc.

<img src="/_media/WalletsAssetX.png"  alt=""/>

Once your wallet is connected, you can click the dropdown in the top right to see the list of chains that you can connect to in this dApp. Go ahead and select one 

<img src="/_media/WalletChainList.png"  alt=""/>

You are now connected to the "source" chain from which you will deploy your RWA to other "destination" chains

You can add extra wallet addresses by clicking Disconnect and then Connect again and "See your accounts ... Edit" (for MetaMask here). After this you can switch accounts easily by clicking the wallet address and switching the address from the selection.

<img src="/_media/WalletListEditing.png"  alt=""/>




### Popular Faucets for Gas

To use AssetX, you will need a wallet containing gas tokens for the chains that you want to interact with. You only need gas on the source chain that you are connected to, since the MPC network pays the gas on the destination chain. Here are some popular faucets to get gas tokens

| Chain                  | Faucet                                                  |
| ---------------------- | ------------------------------------------------------- |
| Sepolia                | https://docs.metamask.io/developer-tools/faucet/        |
| BSC Testnet            | https://www.bnbchain.org/en/testnet-faucet              |
| BNB Greenfield Testnet | Use bridge https://opbnb-testnet-bridge.bnbchain.org/   |
| Arbitrum Sepolia       | https://faucets.alchemy.com/faucets/arbitrum-sepolia    |
| Polygon Amoy           | Polygon Discord faucet                                  |
| Avalanche Fuji         | https://core.app/tools/testnet-faucet/?subnet=c&token=c |
| Optimism Sepolia       | https://faucets.alchemy.com/faucets/optimism-sepolia    |
| opBNB Testnet          | Use bridge https://opbnb-testnet-bridge.bnbchain.org/   |
| BASE Sepolia           | https://faucets.alchemy.com/faucets/base-sepolia        |
| Bitlayer Testnet       | https://www.bitlayer.org/faucet  |
| CORE Testnet           | https://scan.test.btcs.network/faucet  |
| Redbelly Testnet       | https://redbelly.faucetme.pro/                          |
| Soneium Minato         | https://faucets.alchemy.com/faucets/soneium-minato      |
| Holesky Testnet        | https://faucets.alchemy.com/faucets/ethereum-holesky    |
| Morph Holesky          | Use bridge https://bridge-holesky.morphl2.io/           |
| Mantle Sepolia         | https://faucet.quicknode.com/mantle/sepolia/            |
| Scroll Sepolia         | https://scroll.faucetme.pro/                            |
| Linea Sepolia          | https://docs.metamask.io/developer-tools/faucet/        |
| Vanguard testnet       | https://faucet.vanarchain.com/                          |
| Blast Sepolia          | https://faucet.quicknode.com/blast                      |
| Lumia Testnet          | https://faucets.alchemy.com/faucets/lumia-testnet       |
| Conflux Espace Testnet | https://efaucet.confluxnetwork.org/                     |
| Manta Pacific          | https://pacific-info.sepolia-testnet.manta.network/     |
| Lukso Testnet          | https://faucet.testnet.lukso.network/                   |
| 5ire Testnet           | https://testnet.5irescan.io/faucet                      |
| U2U Nebulas            | https://testnet.u2uscan.xyz/                            |

For our testnet, we would greatly appreciate your help to maintain enough gas on the destination chain to pay for the cross-chain services, so if you have spare testnet gas tokens, please do send them to the MPC address on each chain :-

0xEef3d3678E1E739C6522EEC209Bede0197791339

Thanks!


### Payment for AssetX Services

Most actions within AssetX require payment. Initially at least, the contracts have been configured to take testnet USDT. 

You can make a once off claim of USDT from the ContinuumDAO faucet by clicking the faucet symbol in the AssetX frontend. This funds your connected wallet ON ARBITRUM SEPOLIA - but not on other chains

Once you have USDT on Arbitrum Sepolia and if you wish to deploy RWAs from a different chain, you will have to send some USDT to the other chain using the Theia router here  https://theianet.com/ 

The USDT tokens have the following addresses on each chain that you can add to your MetaMask or other wallet


| Chain                  | USDT Contract                                           |
| ---------------------- | ------------------------------------------------------- |
| Sepolia                |  0xa4C104db0937F1E886d5C9c9789D6f0e5bfBA75c  |
| BSC Testnet            |  0xDd43fc986a13392dDbC7aeA150b41EfE27b2d0eD  |
| BNB Greenfield Testnet |  USE tBNB  |
| Arbitrum Sepolia       |  0xbF5356AdE7e5F775659F301b07c4Bc6961044b11  |
| Polygon Amoy           |  0x6a4DBC971533Ba36bdc23aD70F5A7a12E064f4ae  |
| Avalanche Fuji         |  0x15A1ED0815ECeD97E46967179846c72BA21DABAd  |
| Optimism Sepolia       |  0x6a4DBC971533Ba36bdc23aD70F5A7a12E064f4ae  |
| opBNB Testnet          |  0x108642B1b2390AC3f54E3B45369B7c660aeFffAD  |
| BASE Sepolia           |  0x6a4DBC971533Ba36bdc23aD70F5A7a12E064f4ae  |
| Bitlayer Testnet       |  0x6a4DBC971533Ba36bdc23aD70F5A7a12E064f4ae  |
| CORE Testnet           |  0x6a4DBC971533Ba36bdc23aD70F5A7a12E064f4ae  |
| Redbelly Testnet       |  0xe536Bf33585aa6bb528627Ed7Dc4D49009dafC58  |
| Soneium Minato         |  0x6a4DBC971533Ba36bdc23aD70F5A7a12E064f4ae  |
| Holesky Testnet        |  0x108642B1b2390AC3f54E3B45369B7c660aeFffAD  |
| Morph Holesky          |  0x6a4DBC971533Ba36bdc23aD70F5A7a12E064f4ae  |
| Mantle Sepolia         |  0x6a4DBC971533Ba36bdc23aD70F5A7a12E064f4ae  |
| Scroll Sepolia         |  0xe536Bf33585aa6bb528627Ed7Dc4D49009dafC58  |
| Linea Sepolia          |  0x6654D956A4487A26dF1186b01B689c26939544fC  |
| Vanguard testnet       |  0x6654D956A4487A26dF1186b01B689c26939544fC  |
| Blast Sepolia          |  0x5d5408e949594E535d0c3d533761Cb044E11b664  |
| Lumia Testnet          |  0x6a4DBC971533Ba36bdc23aD70F5A7a12E064f4ae  |
| Conflux Espace Testnet |  0x6a4DBC971533Ba36bdc23aD70F5A7a12E064f4ae  |
| Manta Pacific          |  0x20cEfCf72622156987f82E1B54E94Dbc0848De9C  |
| Lukso Testnet          |  0xC92291fbBe0711b6B34928cB1b09aba1f737DEfd  |
| 5ire Testnet           |  0x6a4DBC971533Ba36bdc23aD70F5A7a12E064f4ae  |
| U2U Nebulas            |  0x6a4DBC971533Ba36bdc23aD70F5A7a12E064f4ae  |


If you wish to store RWA data on BNB Greenfield, you will need some testnet BNB tokens, which can be bridged from BSC (see the link in the Faucet table above).