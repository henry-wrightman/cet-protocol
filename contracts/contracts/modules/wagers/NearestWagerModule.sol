// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "../../interfaces/wagers/IWagerModule.sol";
import "@openzeppelin/contracts/utils/math/SignedMath.sol";

/**
 @title NearestWagerModule
 @author Henry Wrightman

 @notice wager module for the 1:1 'nearest-price' strategy
 */

contract NearestWagerModule is IWagerModule {
    /// @notice settle
    /// @dev
    /// @param wager wager who's to be settled & their winner calculated
    /// @return wager wager with the result & winner, address of winner
    function settle(
        Wager memory wager
    ) external override returns (Wager memory, address) {
        bytes memory result = IWagerOracle(wager.oracleModule).getResult(wager);
        wager.result = result;
        int256 price = int(abi.decode(result, (uint256)));
        address winner;
        (address partyOne, address partyTwo) = abi.decode(
            wager.parties,
            (address, address)
        );

        uint256 partyOneWagerPrice = decodeNearestWager(
            wager.partyOneWagerData
        );
        uint256 partyTwoWagerPrice = decodeNearestWager(
            wager.partyTwoWagerData
        );

        uint256 wagerOneDiff = SignedMath.abs(price - int(partyOneWagerPrice));
        uint256 wagerTwoDiff = SignedMath.abs(price - int(partyTwoWagerPrice));

        if (wagerOneDiff <= wagerTwoDiff) {
            // wagerOne wins
            winner = partyOne;
        } else {
            // wagerTwo wins
            winner = partyTwo;
        }

        return (wager, winner);
    }

    /// @notice decodeNearestWager
    /// @dev Nearest wager data consists of <wagerPrice> or the player's guestimate price when the executionBlock is mined
    /// @param data supplemental data for Nearest wager's to be decoded
    /// @return wagerPrice wager price
    function decodeNearestWager(
        bytes memory data
    ) public pure returns (uint256 wagerPrice) {
        (wagerPrice) = abi.decode(data, (uint256));
    }
}
