## Demo

The demo demonstrates for a cross-chain supported Fungible Token contract, illustrating how the C3Caller protocol facilitates interoperable blockchain transactions.

```
// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.8.19;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "../protocol/C3CallerDapp.sol";

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
    }

    function claim() public {
        _mint(msg.sender, 10 ** _decimals);
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
        bytes calldata reason_
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
}
```


### Send the Message

```
c3call(
    ctokenAddr_.toHexString(),
    chainID_.toString(),
    abi.encodeWithSignature(
        "crossIn(address,uint256)",
        msg.sender,
        amount_
    )
);
```

use `Strings` lib to pass the string type so that it is possible to support non-EVM chains.

```
import "@openzeppelin/contracts/utils/Strings.sol";
...
using Strings for *;
```


### Receive the Message

It is not necessary to modify anything on the receive function. The calldata is already built in the source chain and verified by the MPC nodes. In the demo, it is `crossIn`, just mint token to the user address with the passed amount and return True if execute is successful.

```
function crossIn(
    address to_,
    uint256 amount_
) external onlyCaller returns (bool) {
    _mint(to_, amount_);
    return true;
}
```


### Fallback Mechanism

The dapp contract needs to implement  \_c3Fallback in C3CallerDapp, which will pass the selector and calldata when c3call is called at beginning. The dApp should handle the callData depending on selector. The transaction will revert if \_c3Fallback returns false.

```
function _c3Fallback(
    bytes4 selector,
    bytes calldata data_,
    bytes calldata reason_
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
```

This streamlined approach to cross-chain messaging opens new possibilities for dApp developers, enabling them to create more interconnected and versatile blockchain applications.

