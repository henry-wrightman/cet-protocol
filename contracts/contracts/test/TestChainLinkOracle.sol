// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "../interfaces/oracles/IWagerOracleModule.sol";

contract TestChainLinkOracle is IWagerOracleModule {
    int256 public price = 21000;

    function getResult(
        Wager memory wager
    ) external view override returns (bytes memory) {
        return toBytes(uint256(price));
    }

    function setPrice(int256 newPrice) external {
        price = newPrice;
    }

    function toBytes(uint256 x) public pure returns (bytes memory b) {
        b = new bytes(32);
        assembly {
            mstore(add(b, 32), x)
        }
    }
}
