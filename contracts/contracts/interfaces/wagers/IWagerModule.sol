// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "../oracles/IWagerOracle.sol";

// -- structs --
struct Wager {
    bytes parties; // party data; |partyOne|partyTwo|
    bytes partyOneWagerData; // wager data; e.g |wagerStart|wagerValue|
    bytes partyTwoWagerData;
    uint256 wagerAmount;
    bytes blockData; // blocktime data; |created|expiration|enterLimit|
    bytes wagerOracleData; // ancillary wager data
    bytes supplumentalWagerOracleData; // supplumental wager data
    bytes result; // wager outcome
    WagerState state;
    IWagerModule wagerModule; // wager semantics
    IWagerOracle oracleModule; // oracle module semantics
    address oracleSource; // oracle source
}

// -- wager states
enum WagerState {
    active,
    created,
    completed,
    voided
}

interface IWagerModule {
    // -- methods --
    function settle(
        Wager memory wager
    ) external returns (Wager memory, address);
}
