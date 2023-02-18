// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "../wagers/IWagerModule.sol";

interface IWagerOracleModule {
    // -- methods --
    function getResult(Wager memory wager) external returns (bytes memory);
}
