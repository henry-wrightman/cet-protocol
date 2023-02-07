// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./wagers/IWagerModule.sol";

interface IWagerRegistry {
    // -- events --
    event WagerCreated(
        address indexed partyAddr,
        uint256 partyWagerAmount,
        bytes partyWager,
        uint256 createdBlock,
        uint256 enterLimitBlock,
        uint256 expirationBlock,
        address wagerModule,
        address oracleModule,
        uint256 indexed wagerId
    );
    event WagerEntered(
        address indexed partyAddr,
        bytes partyWager,
        uint256 indexed wagerId
    );
    event WagerSettled(
        address indexed winner,
        uint256 amount,
        bytes result,
        uint256 indexed wagerId
    );
    event WagerVoided(uint256 indexed wagerId);

    // -- methods --
    function settleWager(uint256 wagerId) external;

    function executeBlockRange(uint256 startBlock, uint256 endBlock) external;

    function enterWager(
        uint256 wagerId,
        bytes memory partyTwoWager
    ) external payable;

    function createWager(Wager memory wager) external payable returns (uint256);

    function voidWager(uint256 wagerId) external;
}
