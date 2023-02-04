// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract TestChainLinkOracleSource is AggregatorV3Interface {
    int256 public price = 21000;

    function getRoundData(
        uint80 expirationBlock
    )
        external
        view
        override
        returns (
            uint80 roundID,
            int256 price,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        )
    {
        (roundID, price, startedAt, updatedAt, answeredInRound) = (
            expirationBlock,
            price,
            uint256(expirationBlock),
            uint256(expirationBlock),
            expirationBlock
        );
    }

    function version() external view override returns (uint256) {}

    function description() external view override returns (string memory) {}

    function decimals() external view override returns (uint8) {}

    function latestRoundData()
        external
        view
        override
        returns (
            uint80 roundID,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        )
    {
        (roundID, answer, startedAt, updatedAt, answeredInRound) = (
            uint80(block.number),
            price,
            uint256(block.number),
            uint256(block.number),
            uint80(block.number)
        );
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
