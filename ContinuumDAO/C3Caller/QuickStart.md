## Quick Start

### Register dApp

1. Register your own dApp with your wallet. The dApp name is only for your information and will only be visible to you. Gas fee bills and alert mails will be sent to this email.

<img src="/_media/C3CallerDappRegister.png"  alt=""/>

2. Configure which chain and contract you implement C3CallerDapp on. The Relayer will check if the target is correct and on the list.

<img src="/_media/C3CallerAddContracts.png"  alt=""/>

3. Deposit some fees (it's free on the testnet now). C3Caller allows dApps to choose the token type to pay the gas and service fees, like CTM (CTM's native token), USDT, USDC, DAI. Withdrawals are available anytime.

<img src="/_media/C3CallerFundAccount.png"  alt=""/>

### Contract Implementation

To use C3Caller, your contract should extend ‘C3CallerDapp’ as a parent contract. Use ‘c3call’ to send messages to another chain.

Implement ‘\_c3Fallback’ to receive calldata if the transaction execution fails. The code is open-source now and can be viewed at: [https://github.com/ContinuumDAO/router-contract](https://github.com/ContinuumDAO/router-contract).

### Testnet Endpoint

```
abstract contract C3CallerDapp is IC3Dapp {
    ...

    function _c3Fallback(
        bytes4 selector,
        bytes calldata data,
        bytes calldata reason
    ) internal virtual returns (bool);

    function c3Fallback(
        uint256 _dappID,
        bytes calldata _data,
        bytes calldata _reason
    ) external override onlyCaller returns (bool) {
        require(_dappID == dappID, "dappID dismatch");
        return _c3Fallback(bytes4(_data[0:4]), _data[4:], _reason);
    }

    function c3call(
        string memory _to,
        string memory _toChainID,
        bytes memory _data
    ) internal {
        IC3CallerProxy(c3CallerProxy).c3call(dappID, _to, _toChainID, _data);
    }
}
```


|  **Chain**   |  **C3Caller Address**   |  **Endpoint Address**   |
| --- | --- | --- |
|  **Goerli**   |  0x93591ADc60f528C49b500063753BBDFe213c6E79   |  0xa4C104db0937F1E886d5C9c9789D6f0e5bfBA75c   |
|  **BNB Test** |  0x7581638A442907450636f4F0E8974A6449D9edC2   |  0x2628F5641d4c06dD150b1852aa393B90c0EA40E8   |
|  **Polygon Mumbai** |  0x983B5eAC55D7Ef37C69bBAb67d8655453120bD4B   |  0x1F5CbcfAd7e33648747c9798A23084CE8C77b00e   |
|  **Arbitrum Sepolia** | 0x433f3275a787be38703917fF2919CeFEAd9327cD |  0x1f462e92005DC96D754C02d38c3D39Acbd01B9ca |
|  **Fantom Sonic** | 0x433f3275a787be38703917fF2919CeFEAd9327cD | 0x1f462e92005DC96D754C02d38c3D39Acbd01B9ca |

