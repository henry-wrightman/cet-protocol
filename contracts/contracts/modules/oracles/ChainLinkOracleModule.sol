// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "../../interfaces/wagers/IWagerModule.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

/**
 @title ChainLinkOracleModule
 @author Henry Wrightman

 @notice ChainLink oracle module for wager price-related data resolution
 */

contract ChainLinkOracleModule is IWagerOracleModule {
    /// @notice getResult
    /// @dev result is always bytes & up to wager module / inheritor to decode desired field(s)
    /// @param wager wager who needs to be settled & its result acquired
    /// @return bytes oracle result to be decoded
    function getResult(
        Wager memory wager
    ) external view override returns (bytes memory) {
        AggregatorV3Interface feed = AggregatorV3Interface(wager.oracleSource);

        (, int256 answer, , , ) = feed.latestRoundData();

        return toBytes(uint256(answer));
    }

    function toBytes(uint256 x) public pure returns (bytes memory b) {
        b = new bytes(32);
        assembly {
            mstore(add(b, 32), x)
        }
    }
}
