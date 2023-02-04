// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "../../interfaces/wagers/IWagerModule.sol";

/**
 @title HighLowWagerModule
 @author Henry Wrightman

 @notice wager module for the 1:1 'high-low' strategy
 */

contract HighLowWagerModule is IWagerModule {
    /// @notice calculateWinner
    /// @dev
    /// @param wager wager who's to be settled & their winner calculated
    /// @return wager settled, address wager winner's address
    function settle(
        Wager memory wager
    ) external override returns (Wager memory, address) {
        bytes memory result = IWagerOracle(wager.oracleModule).getResult(wager);
        wager.result = result;
        int256 price = int(abi.decode(result, (uint256)));
        (address partyOne, address partyTwo) = abi.decode(
            wager.parties,
            (address, address)
        );

        (
            uint256 partyOneWagerDirection,
            int256 partyOneWagerInitialPrice
        ) = decodeHighLowWager(wager.partyOneWagerData);
        (
            uint256 partyTwoWagerDirection,
            int256 partyTwoWagerInitialPrice
        ) = decodeHighLowWager(wager.partyTwoWagerData);

        if (partyOneWagerDirection == 1) {
            // partyOne bet high
            if (partyOneWagerInitialPrice <= price) {
                //partyOne wins
                return (wager, partyOne);
            }
            return (wager, partyTwo);
        } else {
            // partyTwo bet high
            if (partyTwoWagerInitialPrice <= price) {
                // partyTwo wins
                return (wager, partyTwo);
            }
            return (wager, partyOne);
        }
    }

    /// @notice decodeHighLowWager
    /// @dev HighLow wager data consists of <wagerDirection> (0 or 1 for high low) and <initialPrice> to compare against
    /// @param data supplemental data for HighLow wager's to be decoded
    /// @return wagerDirection wager direction (1 || 0)
    /// @return initialPrice initial price
    function decodeHighLowWager(
        bytes memory data
    ) public pure returns (uint256 wagerDirection, int256 initialPrice) {
        (wagerDirection, initialPrice) = abi.decode(data, (uint256, int256));
    }
}
