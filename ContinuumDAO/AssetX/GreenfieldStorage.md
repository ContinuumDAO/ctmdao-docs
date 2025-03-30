## Data on BNB Greenfield

There are many categories of information that can either be attached to the whole RWA, or to individual Asset Classes (slots). The data is stored in BNB Greenfield "Objects" and the "Title" and the checksum of the objects are transferred to all chains in the RWA. Whenever the object is referenced or recovered from Greenfield, the checksum is compared to the stored value in the RWA and if there is a mismatch, the object is ignored. The RWA holds an immutable ledger of the storage records.

The first object that is created MUST be details about the Issuer. Click on the RWA in the "Mint" section and the Storage Property list will appear. At the top is ISSUER and above this are details about the "Bucket" that will be created, the RWA storage contract on the currently connect chain and the ID common to all chains

<img src="/_media/GreenfieldRWA-1.png"  alt=""/>

Click on the Issuer Entry and fill in the details :-

<img src="/_media/GreenfieldRWA-2.png"  alt=""/>

When you click "Submit", you will be asked for a Signature request from BNB Greenfield to allow access by your contract to it and then you sign a transaction to write the ledger in your RWA and finally you sign a transaction (spending BNB) to store the object on Greenfield. After this the ledger information is transferred by the MPC node network (several minutes) to the storage contracts on each of the chains in the RWA and you can check that this happened by switching chains and clicking "Sync from Storage" and the information that you entered on the first chain should appear.

All other types of storage are similar. Entire Markdown texts can be pasted into the Text boxes and images and videos can be uploaded from your local disk. There are sensible limits on the volume of data that may be uploaded. For videos, the limit is typically equivalent to 1 minute.