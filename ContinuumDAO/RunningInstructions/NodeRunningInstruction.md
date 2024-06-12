
## Node Running Instructions Using Docker

For most people, this is the sensible way to run a node. No need to do a source installation.

1. **Preparation**
   minimal VM: 4 CPU Cores, 8 GB Memory, 40 GB Hard Disk enable port 8080 open to public docker file: docker-compose_server.yml which you will install.
    
2. **Install Docker and Docker Compose**
   Follow steps in https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository https://docs.docker.com/compose/install/linux/#install-using-the-repository

3. **Create User continuum**
   As user root, create another user continuum as follows, hitting Enter to all questions 
   
```console
adduser continuum
```

Give the new user continuum sudo (root) privileges
	
```console
	visudo
```
Add the line 
continuum ALL=(ALL) NOPASSWD:ALL
to the end of the file and then hit CTRL-X to save it.

```console
   su continuum
   mkdir distributed-auth
   cd distributed-auth
```

4.  **Download the Docker Installation File**
	<a href="/_media/docker-compose_server.yml" download>Click to Download </a> 
	
	OR do the following command to create it :
```console
cd ~/distributed-auth
echo "version: '3.7'
services:
    mongodb:
    image: mongo:6.0
    ports:
      - \"27017:27017\"
    volumes:
      - ../distributed-auth-data/mongodata:/data/db
    networks:
      - local-network
    app:
    image: continuumdao/distributed-auth:v1.2
    environment:
      - NodeMgtKey=0xABCDEF1234567890ABCDEF1234567890ABCDEF12
    ports:
      - \"8080:8080\"
    depends_on:
      - mongodb
    volumes:
      - ../distributed-auth-data/appdata:/app/logs
    networks:
      - local-network
networks:
  local-network:
    driver: bridge
    attachable: true
" > docker-compose_server.yml
```


5. **Modify the Configuration** 
   In the file docker-compose_server.yml, using a text editor (nano, vim), modify key "NodeMgtKey" as your wallet address, in step Register the Node, you'll use it to sign messages. Check :  The updated file should be in the folder "distributed-auth"
    
6. **Run the Node **
```console
cd ~/distributed-auth
docker-compose -f docker-compose_server.yml up -d --build
```
   
7. **Check the Node Status**
```console
sudo docker ps -a
```
you'll see container distributed-auth and mongod curl http://YOUR_VM_IP:8080/version // you'll see node version

    
8. **Register the Node**
   Register in the [Continuum MPC dashboard](https://c3mpcnetwork-frontend.pages.dev/)
    
9. **Test the Node**
   Follow from Step 5 in [Networking Signature Test](#networking-signature-test)

## Node Running Instructions From Source

These are the installation instructions if you want to install from source code. Most people will install using Docker (see above).

1. **Download** 
Your machine needs to have Docker installed, please refer to the link. Ensure that port 8080 is open, with port 8080 serving as the node's external API port. Download the program source files from GitHub at [distributed-auth](https://github.com/ContinuumDAO/distributed-auth)

2.  **Configuration** 
Modify the following information in the distributed-auth/console/configs.json configuration file, other configuration information can remain default:
- NodeMgtKey: This attribute is used to set the EVM management wallet, which will be used for node management interface authentication and node registration to the Dashboard. It is recommended to change it to your veCTM EVM wallet address.

- IgnoreMgtKeySigCheck: If set to true, the management wallet will not undergo signature verification. For testing purposes, it can be set to true to enable; in production environments, it is strongly recommended to disable it.

- IgnoreClientSigCheck: If true, the application clients using MPC will not undergo signature verification. For testing, it can be set to true to enable; it is strongly recommended to disable it in production environments.

- DisableDocs: If true, swagger API documentation will not be provided. For testing, it can be set to false to enable documentation; in production environments, it is strongly recommended to disable it.

3. **Run Node** 
Enter the root directory of distributed-auth and run the following command:

```console
sudo docker-compose up -d --build
```

This command will create a MongoDB instance on your machine, compile, install, and run the distributed-auth program. It will also create a folder named distributed-auth-backend-data in the same directory as the source files, which will save the MongoDB database directory and the program logs. 

<span style="color:red">Please avoid deleting this directory</span>

4. **Check Node Operation** 
If the installation and operation are normal, you can access the node's swagger API documentation through the external IP link of your node:

http://YOUR_SERVER_EXTERNAL_IP:8080/swagger/index.html

Or on your server console, you can obtain the node ID, known as NodeKey, with the following command:


```console
curl -X 'GET' 'http://YOUR_SERVER_EXTERNAL_IP:8080/getNodeKey'
```

5. **Networking Signature Test**

Assuming you and your friends currently have nodes A, B, and C running, and you wish to collaborate to create a 2/3 distributed threshold key, i.e., any two of the nodes A, B, and C agree to sign, you can obtain a correct distributed signature. Follow these steps to test:

**(a) Networking**

First, nodes A, B, and C need to form a distributed threshold network. Any node can initiate a networking request, and if other nodes agree, networking can be successful. We assume here that node A initiates.

Obtain the NodeKey for nodes A, B, and C:

```console
curl -X 'GET' 'http://NODE_A_EXTERNAL_IP:8080/getNodeKey'
```

Output: 

```
output: {
  "Code": 0,
  "Error": "",
  "Data":    "8ef8f189f8179e16b861f6a2babd4871cb138d463f9648f9ecc1529873929550f6e854c0dfcb442045a9651f6ab03c9c596bbab169382fb3857cc4889d945399"
}
```

```console
curl -X 'GET' 'http://NODE_A_EXTERNAL_IP:8080/getNodeKey'
```

Output:

```
​￼output: {
  "Code": 0,
  "Error": "",
  "Data": "799f5df3b6f5cf4088bda42e9a938b7bb85f58cad6594fd73ef0fab97196bdbd024d67ee1b6d5d87967c8f53b3aad42bfc87e7b914d6327a4405c942443eac9c"
}

```


```console
curl -X 'GET' 'http://NODE_C_EXTERNAL_IP:8080/getNodeKey'
```

```
output: {
  "Code": 0,
  "Error": "",
  "Data": "8c50e55f780ae3d87a16fcb05eb4f3f1e18c4298643520671df0c5f3ea50fd7620893168a5497ea2fddb8517cfabed4087c7e0c72a7aedad6122b383ef992107"
}
```

Node A submits a networking request and receives a request ID “NewGroup202404150700219996fb8a98e”:

```console
curl -X 'POST' 'http://NODE_A_EXTERNAL_IP:8080/newGroupRequest' \
  -H 'accept: application/json' -H 'Content-Type: application/json' \
  -d '{
  "keyList": [
    "8ef8f189f8179e16b861f6a2babd4871cb138d463f9648f9ecc1529873929550f6e854c0dfcb442045a9651f6ab03c9c596bbab169382fb3857cc4889d945399",
    "799f5df3b6f5cf4088bda42e9a938b7bb85f58cad6594fd73ef0fab97196bdbd024d67ee1b6d5d87967c8f53b3aad42bfc87e7b914d6327a4405c942443eac9c",
    "8c50e55f780ae3d87a16fcb05eb4f3f1e18c4298643520671df0c5f3ea50fd7620893168a5497ea2fddb8517cfabed4087c7e0c72a7aedad6122b383ef992107"
  ],
  "nonce": 0,
  "sig": ""
}'
```

Output:

```
{
  "Code": 0,
  "Error": "",
  "Data": "NewGroup202404150700219996fb8a98e"
}
```

Nodes B and C agree to network. B and C nodes can query the networking request ID sent by node A and agree:

```console
curl -X 'GET' 'http://NODE_B_EXTERNAL_IP:8080/listNewGroupRequests'
```

```
output: {
  "Code": 0,
  "Error": "",
  "Data": [
    {
      "requestid": "NewGroup202404150700219996fb8a98e",...
    }
  ]
}

```

```console
curl -X 'POST' 'http://NODE_B_EXTERNAL_IP:8080/newGroupRequestAgree' \
  -H 'accept: application/json' -H 'Content-Type: application/json' \
  -d '{
  "nonce": 0,
  "requestId": "NewGroup202404150700219996fb8a98e",
  "sig": "string"
}'

```

Output:

{
  "Code": 0,
  "Error": "",
  "Data": "success to aggree newgrouprequest with requestid NewGroup202404150700219996fb8a98e"
}

Networking is successful. Nodes A, B, and C can all see that networking has been successful and can obtain the Group ID:

```console
curl -X 'GET' 'http://NODE_B_EXTERNAL_IP:8080/listNewGroupResults'
```

Output:

```
output:{
  "Code": 0,
  "Error": "",
  "Data": [
    {
      "requestid": "NewGroup202404150700219996fb8a98e",
      "GroupId": "e05c32a269e255a8725e07101e0833431381cdc300e19e12079242c83c8e1218",
      ...
    },
  ]
}
```

 **(b) Distributed Key Generation**

Once network setup is successful, any of the nodes A, B, or C can initiate a distributed key generation request, and upon agreement by the other nodes, distributed keys can be successfully generated. 

Here we assume node A initiates. Node A submits a distributed key generation request and receives a request ID “KeyGen202404150729519995071cc4d”:

```console
curl -X 'POST' 'http://NODE_A_EXTERNAL_IP:8080/keyGenRequest' \
  -H 'accept: application/json' -H 'Content-Type: application/json' \
  -d '{ 
  "groupId": "e05c32a269e255a8725e07101e0833431381cdc300e19e12079242c83c8e1218",
  "keyType": "secp256k1",
  "msgCheck": "multi-agree",
  "threshold": 1
}'
```

Output:

```
{
  "Code": 0,
  "Error": "",
  "Data": "KeyGen202404150729519995071cc4d"
}
```

Nodes B and C agree to the distributed key generation. B and C nodes can query the request ID sent by node A and agree:

```console
curl -X 'GET' 'http://NODE_B_EXTERNAL_IP:8080/listKeyGenRequests'
```

Output:


```
output: {
  "Code": 0,
  "Error": "",
  "Data": [
    {
      "requestid": "KeyGen202404150729519995071cc4d",
      "GroupId": "e05c32a269e255a8725e07101e0833431381cdc300e19e12079242c83c8e1218",
      "KeyType": "secp256k1",
      "MsgCheck": "multi-agree",
      "Threshold": 1,...
    }
  ]
}
```

 
```console
curl -X 'POST' 'http://NODE_B_EXTERNAL_IP:8080/keyGenRequestAgree' \
  -H 'accept: application/json' -H 'Content-Type: application/json' \
  -d '{
  "requestId": "KeyGen202404150729519995071cc4d",...
}'

```

Output:

```
{
  "Code": 0,
  "Error": "",
  "Data": "success to aggree keygenrequest with requestid KeyGen202404150729519995071cc4d"
}
```

Distributed key generation is successful. Nodes A, B, and C can all see the generated distributed key and can obtain the corresponding public key "0aa9c2a6103e13ea110e9e1d72d94a1edf29ba8c36731b83de565cdd0fc557e88587abc6c0c2c252603c28cc9b20fead2e728e84fa594db0806a1ce621f18ed8":

```console
curl -X 'GET' 'http://NODE_B_EXTERNAL_IP:8080/listKeyGenResults?pagesize=1'
```

Output:

```
output: {
  "Code": 0,
  "Error": "",
  "Data": [
    {
      "requestid": "KeyGe202404150729519995071cc4d",
      "GroupId": "e05c32a269e255a8725e07101e0833431381cdc300e19e12079242c83c8e1218",
      "KeyType": "secp256k1",
      "MsgCheck": "multi-agree",
      "Threshold": 1
      "pubkeyhex": "0aa9c2a6103e13ea110e9e1d72d94a1edf29ba8c36731b83de565cdd0fc557e88587abc6c0c2c252603c28cc9b20fead2e728e84fa594db0806a1ce621f18ed8",
      ,...
    }
  ]
}
```

**(c) Distributed Signing**

Using the distributed key generated in the above steps, any of the nodes A, B, or C can initiate a distributed signing request. If other nodes agree and the number of agreeing nodes meets the threshold, i.e., two nodes agree, a successful distributed signature can be generated. 

Here we assume node A initiates, and node B agrees. Node A initiates a distributed signing request and receives a request ID “Sign20240415074554999f80845a3”:

```console
curl -X 'POST' 'http://NODE_A_EXTERNAL_IP:8080/signRequest' \
  -H 'accept: application/json' -H 'Content-Type: application/json' \
  -d '{
  "keyList": [
    "8ef8f189f8179e16b861f6a2babd4871cb138d463f9648f9ecc1529873929550f6e854c0dfcb442045a9651f6ab03c9c596bbab169382fb3857cc4889d945399",
    "799f5df3b6f5cf4088bda42e9a938b7bb85f58cad6594fd73ef0fab97196bdbd024d67ee1b6d5d87967c8f53b3aad42bfc87e7b914d6327a4405c942443eac9c"
  ],
  "msgHash": "1234567890123456789012345678901234567890123456789012345678901234",
  "msgRaw": "MESSAGE to be SIGN",
  "pubKey": "0aa9c2a6103e13ea110e9e1d72d94a1edf29ba8c36731b83de565cdd0fc557e88587abc6c0c2c252603c28cc9b20fead2e728e84fa594db0806a1ce621f18ed8"
}'
```

Output:

```
{
  "Code": 0,
  "Error": "",
  "Data": "Sign20240415074554999f80845a3"
}
```

Node B agrees to the distributed signing. Node B can query the request ID sent by node A and agree:

```console
curl -X 'POST' 'http://NODE_B_EXTERNAL_IP:8080/signRequestAgree' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{  "requestId": "Sign20240415074554999f80845a3"
}'

```

Output:

```
{
  "Code": 0,
  "Error": "",
  "Data": "success to aggree keygenrequest with requestid Sign20240415074554999f80845a3"
}
```

The distributed signature is successfully generated. Nodes A, B, and C can all view the generated distributed signature and can each independently verify its authenticity:

```console
curl -X 'GET' 'http://NODE_B_EXTERNAL_IP:8080/listSignResults?pagesize=1'
```

Output:

```
output: {
  "Code": 0,
  "Error": "",
  "Data": [
    {
      "messagehash": "1234567890123456789012345678901234567890123456789012345678901234",
      "requestid": "Sign20240415074554999f80845a3",
      "sigr": "ff9178c7efbb27c0bb2c9a0bc8965a1cdf745ac16a8692be684e675b77bb1975",
      "sigrecover": "01",
      "sigs": "33f01c9dda456b2bca35d5bea64f00fde2089b94c246046ba45475a347859ebe"
    }
  ]
}
```

**(d)  Node Registration**

Already running nodes can join the Dashboard, offering MPC computing services to other projects. After passing a certain stability of online time and service efficiency test, they can earn network CTM rewards. The registration process is as follows:

Log in to your wallet at the website https://c3mpcnetwork-frontend.pages.dev/, noting that this wallet is the one configured in the node configuration files during the node running steps.

Afterwards, select 'Node Register', fill in the relevant information, and click to register.

Finally, use your wallet to sign the registration message. Once the node verifies the registration signature, the registration is completed.













