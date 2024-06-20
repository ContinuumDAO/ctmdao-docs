## C3Caller Test with Remix

These following steps are just an example, we encourage you to develop your own ideas and create a personalized dApp.

1. Open [Register your dApp](https://c3caller-frontend.pages.dev/dapp)
2. Click “dApp Register”

<img src="/_media/C3CallerTest-1.png"  alt=""/>

3. Confirm the transaction in your wallet
4. Refresh the page

<img src="/_media/C3CallerTest-2.png"  alt=""/>

5. NewDappContract using C3Caller [https://remix.ethereum.org/](https://remix.ethereum.org/)

<img src="/_media/C3CallerTest-3.png"  alt=""/>

6. Create a new file in “contracts” folder and copy the following code into the file

<img src="/_media/C3CallerTest-4.png"  alt=""/>

```javascript
// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "https://github.com/ContinuumDAO/router-contract/blob/main/contracts/protocol/C3CallerDapp.sol";


contract CToken is ERC20, C3CallerDapp {
    using Strings for *;

    uint8 private _decimals;

    bytes4 public FuncCrossIn = bytes4(keccak256("crossIn(address,uint256)"));

    constructor(
        string memory name_,
        string memory symbol_,
        address c3callerProxy_,
        uint256 dappID_,
        uint8 decimals_
    ) ERC20(name_, symbol_) C3CallerDapp(c3callerProxy_, dappID_) {
        _decimals = decimals_;
        _mint(msg.sender, 100000000 * 10 ** _decimals);
    }

    function claim(uint256 amount) public {
        _mint(msg.sender, amount);
    }

    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }

    function crossTo(
        uint256 chainID_,
        address ctokenAddr_,
        uint256 amount_
    ) public {
        _burn(msg.sender, amount_);

        c3call(
            ctokenAddr_.toHexString(),
            chainID_.toString(),
            abi.encodeWithSignature(
                "crossIn(address,uint256)",
                msg.sender,
                amount_
            )
        );
    }

    function crossIn(
        address to_,
        uint256 amount_
    ) external onlyCaller returns (bool) {
        _mint(to_, amount_);
        return true;
    }

    function _c3Fallback(
        bytes4 selector,
        bytes calldata data_,
        bytes calldata /*reason_*/
    ) internal override returns (bool) {
        (address to, uint256 amount) = abi.decode(data_, (address, uint256));
        require(to != address(0), "empty to");
        require(amount > 0, "empty amount");
        if (selector == FuncCrossIn) {
            _mint(to, amount);
            return true;
        } else {
            return false;
        }
    }

    function isVaildSender(address /*txSender*/) external pure returns (bool){
        return true;
    }
}
```

7. Compile: choose a version above 0.8.20

<img src="/_media/C3CallerTest-5.png"  alt=""/>

8. Deploy Contract
Input your token name and the dAppID that you registered before

<img src="/_media/C3CallerTest-6.png"  alt=""/>

<img src="/_media/C3CallerTest-7.png"  alt=""/>

C3Caller Proxy: 0xeC1f296fC2Dd0FFf803c30DBD315b5457aFaA8B3

<img src="/_media/C3CallerTest-8.png"  alt=""/>

<img src="/_media/C3CallerTest-9.png"  alt=""/>

Steps on BNB chain

- Add BNB test chain
    - click plug icon
    - search for the BNB test network in the Chainlist add to the Metamask
    - when The custom () shows 97 it is working

<img src="/_media/C3CallerTest-10png"  alt=""/>

<img src="/_media/C3CallerTest-11.png"  alt=""/>

<img src="/_media/C3CallerTest-12.png"  alt=""/>

BNB proxy: 0x088A7e395981B2d5230c4f0d6273594c1ff4017

<img src="/_media/C3CallerTest-13.png"  alt=""/>

<img src="/_media/C3CallerTest-14.png"  alt=""/>

<img src="/_media/C3CallerTest-15.png"  alt=""/>
