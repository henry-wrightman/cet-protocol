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
        bytes memory parties,
        bytes memory equityData,
        address recipient
    ) external returns (uint256);

    function voidEquity(bytes memory parties, bytes memory equityData) external;
}
