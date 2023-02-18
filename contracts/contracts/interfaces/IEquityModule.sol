// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./wagers/IWagerModule.sol";

interface IEquityModule {
    function acceptEquity(bytes memory equityData) external payable;

    function acceptCounterEquity(
        bytes memory partyTwoData,
        Wager memory wager
    ) external payable returns (Wager memory);

    function settleEquity(
        Wager memory wager,
        address recipient
    ) external returns (uint256);

    function voidEquity(Wager memory wager) external;
}
