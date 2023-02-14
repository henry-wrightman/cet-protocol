// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestERC20 is ERC20 {
    constructor() ERC20("MyTestToken", "MTT") {}

    function transfer(
        address _to,
        uint256 _value
    ) public override returns (bool) {
        transfer(_to, _value);
    }
}
