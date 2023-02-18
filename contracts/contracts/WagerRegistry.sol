// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./interfaces/wagers/IWagerModule.sol";
import "./interfaces/IWagerRegistry.sol";
import "./interfaces/IEquityModule.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

/**
 @title WagerRegistry
 @author Henry Wrightman

 @notice registry contract for wager management
 */

contract WagerRegistry is IWagerRegistry {
    uint256 private _id;

    mapping(uint256 => Wager) public wagers;
    mapping(uint256 => uint256[]) public executionSchedule; // blockNumber -> [wagerIds]
    address public equityModule;

    constructor() {}

    /// @notice createWager
    /// @dev
    /// @param wager wager to be created
    function createWager(Wager memory wager) external payable override {
        require(wager.partyOneWagerData.length > 0, "W14");
        (, uint80 expirationBlock, uint80 enterBlockLimit) = decodeBlocks(
            wager.blockData
        );
        require(expirationBlock >= block.number + 30, "W12");
        require(enterBlockLimit < expirationBlock, "W19");

        IEquityModule(equityModule).acceptEquity{value: msg.value}(
            wager.equityData
        );

        (address partyOne, ) = decodeParties(wager.parties);
        require(partyOne != address(0) && partyOne == msg.sender, "W13");

        wager.blockData = abi.encode(
            block.number,
            expirationBlock,
            enterBlockLimit
        );
        wager.state = WagerState.created;
        wagers[_id] = wager;

        emit WagerCreated(
            msg.sender,
            msg.value,
            wager.partyOneWagerData,
            enterBlockLimit,
            expirationBlock,
            address(wager.wagerModule),
            address(wager.oracleSource),
            _id
        );
        _id++;
    }

    /// @notice enterWager
    /// @dev
    /// @param wagerId id of wager to be entered by second party
    /// @param partyTwoEquityData bytes encoded of address and id (if NFT)
    /// @param partyTwoWagerData second party's supplemental data for their specific wager
    function enterWager(
        uint256 wagerId,
        bytes memory partyTwoEquityData,
        bytes memory partyTwoWagerData
    ) external payable override {
        require(wagerId <= _id, "W1");

        Wager memory wager = wagers[wagerId];
        require(wager.state == WagerState.created, "W2");

        (, uint80 expirationBlock, uint80 enterLimitBlock) = decodeBlocks(
            wager.blockData
        );
        if (enterLimitBlock != 0) {
            require(block.number <= enterLimitBlock, "W15");
        }
        require(expirationBlock >= block.number + 15, "W7");

        (address partyOne, ) = decodeParties(wager.parties);
        require(msg.sender != partyOne, "W8");

        wager = IEquityModule(equityModule).acceptCounterEquity{
            value: msg.value
        }(partyTwoEquityData, wager);

        require(
            (wager.partyTwoWagerData.length == 0 &&
                partyTwoWagerData.length > 0) ||
                ((wager.partyTwoWagerData.length > 0 &&
                    partyTwoWagerData.length > 0) &&
                    bytes32(wager.partyTwoWagerData) ==
                    bytes32(partyTwoWagerData)),
            "W10"
        );
        require(
            bytes32(wager.partyOneWagerData) != bytes32(partyTwoWagerData),
            "W18"
        );

        wager.parties = abi.encode(partyOne, msg.sender);
        wager.partyTwoWagerData = partyTwoWagerData;
        wager.state = WagerState.active;
        executionSchedule[expirationBlock].push(wagerId);
        wagers[wagerId] = wager;

        emit WagerEntered(msg.sender, partyTwoWagerData, wagerId);
    }

    /// @notice settleWager
    /// @dev
    /// @param wagerId id of wager to be settled
    function settleWager(uint256 wagerId) external override {
        require(wagerId <= _id, "W1");
        Wager memory wager = wagers[wagerId];
        require(wager.state == WagerState.active, "W2");

        (, uint80 expirationBlock, ) = decodeBlocks(wager.blockData);
        require(block.number >= expirationBlock, "W3");

        (Wager memory settledWager, address recipient) = IWagerModule(
            wager.wagerModule
        ).settle(wager);
        settledWager.state = WagerState.completed;
        wagers[wagerId] = settledWager;

        uint256 winnings = IEquityModule(equityModule).settleEquity(
            wager,
            recipient
        );

        emit WagerSettled(recipient, winnings, settledWager.result, wagerId);
    }

    function executeBlockRange(
        uint256 startBlock,
        uint256 endBlock
    ) external override {
        for (uint256 block_ = startBlock; block_ <= endBlock; block_++) {
            uint256[] memory ids = executionSchedule[block_];
            for (uint256 j = 0; j < ids.length; j++) {
                this.settleWager(ids[j]);
            }
        }
    }

    /// @notice voidWager
    /// @dev
    /// @param wagerId id of wager to be voided & respective parties refunded
    function voidWager(uint256 wagerId) external override {
        require(wagerId <= _id, "W1");

        Wager memory wager = wagers[wagerId];
        (address partyOne, ) = decodeParties(wager.parties);
        (
            uint80 createdBlock,
            uint80 expirationBlock,
            uint80 enterLimitBlock
        ) = decodeBlocks(wager.blockData);
        require(msg.sender == partyOne, "W4");

        if (wager.state == WagerState.active) {
            if (enterLimitBlock != 0) {
                require(block.number <= enterLimitBlock, "W16");
            } else if (enterLimitBlock == 0) {
                // more than half of wager time hasn't elapsed (default entryLimitBlock)
                require(
                    block.number <=
                        createdBlock + (expirationBlock - createdBlock / 2),
                    "W16"
                );
            }
        }
        require(wager.state == WagerState.created, "W2");

        wager.state = WagerState.voided;
        wagers[wagerId] = wager;

        IEquityModule(equityModule).voidEquity(wager);

        emit WagerVoided(wagerId);
    }

    function setEquityModule(address moduleAddr) external {
        equityModule = moduleAddr;
    }

    /// @notice decodeParties
    /// @dev Wager's party data consists of <partyOne> (address) and <partyTwo> address
    /// @param data wager address data be decoded
    /// @return partyOne address
    /// @return partyTwo address
    function decodeParties(
        bytes memory data
    ) public pure returns (address partyOne, address partyTwo) {
        (partyOne, partyTwo) = abi.decode(data, (address, address));
    }

    /// @notice decodeBlocks
    /// @dev Wager's block data consists of <createdBlock> (uint80) <expirationBlock> settlement date (uint80) <enterLimitBlock> entrance gating limit block (uint80)
    /// @param data wager block data be decoded
    /// @return createdBlock block wager was created
    /// @return expirationBlock block wager expires
    /// @return enterLimitBlock block wager entrance expiration.
    /// @notice if enterLimitBlock not provided (default 0), entrance expiration is the half way between created/expiration
    function decodeBlocks(
        bytes memory data
    )
        public
        pure
        returns (
            uint80 createdBlock,
            uint80 expirationBlock,
            uint80 enterLimitBlock
        )
    {
        (createdBlock, expirationBlock, enterLimitBlock) = abi.decode(
            data,
            (uint80, uint80, uint80)
        );
    }
}
