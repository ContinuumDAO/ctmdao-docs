## Deploying an RWA

It is assumed that you are now in AssetX (https://factory.AssetX.org), that you have connected a wallet, that you have connected to the chain you wish to deploy an RWA from and that you have gas in your wallet. If not, please see Getting Started.

Click on "Create Token"

<img src="/_media/CreateRWA-1.png"  alt=""/>

Then you can fill out the "name", "symbol" and "decimals"

<img src="/_media/CreateRWA-2.png"  alt=""/>

The name should be between 10 and 100 characters in length

The symbol should be between 1 and 6 characters in length and capitalized

The decimals refers to how many decimal places you are reserving when describing fractional assets. For instance if decimals = 0, only whole integer numbers of the asset can be minted and exchanged. The use of decimals = 18 is common amongst ERC20 type assets.

You can now select which chains you want to deploy the RWA to by clicking on the boxes next to the chains. The current chain is automatically selected

<img src="/_media/CreateRWAChains.png"  alt=""/>

Now click "Deploy", approve the payment to the contract, and click OK to pay the fee and initiate the deployment.

You will see the RWA created within seconds on the locally connected chain, which will appear in the "Mint" section of AssetX, as well as in the "RWA TokenAdmin" section below it. The deployment on the other chains will take a few minutes (up to 20 minutes on some chains) as the MPC node network securely signs the cross chain transactions and waits for sufficient confirmations. Please wait patiently. Eventually the remote chains will also show up. If you click on the RWA in the Mint section you will see something like this :-


<img src="/_media/CreateRWA-3.png"  alt=""/>

This indicates that a series of interlinked contracts have been deployed on each chain. 

Your wallet is now the Issuer of this RWA and it is now the "Token Admin"

The RWA has a unique ID, which is the same on all chains that it is deployed to. You can see this in the "RWA Token Admin" section :-

<img src="/_media/CreateRWA-4.png"  alt=""/>

You can re-assign the Token Admin to another address here, or you can "Lock" it, though there is no point in doing this until you have added some Asset Classes have minted some value to these.


### Adding New Chains

You can add new chains to an existing RWA by clicking on the pencil icon in the "Mint" section. You will see the "Name" of the RWA appear, which cannot be modified. You can then click on the new chains that you wish to add (the existing chains will be permanently selected) :-

<img src="/_media/CreateRWA-5.png"  alt=""/>

Then click "Deploy" and wait patiently for the MPC network to do the cross chain signatures.

NOTE that you can only extend the deployment of an RWA if you are connected to a chain that it was already deployed to. The ID and other information is picked up and used for deployment to the new chains.

Afterwards you will see the new chains added in the "Mint" and the "RWA Token Admin" sections :-

<img src="/_media/CreateRWA-6.png"  alt=""/>


### Adding Asset Classes (slots)



