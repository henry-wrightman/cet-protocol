// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./interfaces/wagers/IWagerModule.sol";
import "./interfaces/IWagerRegistry.sol";

/**
 @title WagerRegistry
 @author Henry Wrightman

 @notice registry contract for wager management
 */

interface TransferableToken {
    function transfer(address _to, uint256 _value) external returns (bool);

    function safeTransferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) external returns (bool);
}

contract WagerRegistry is IWagerRegistry {
    uint256 private _id;

    mapping(uint256 => Wager) public wagers;
    mapping(uint256 => uint256[]) public executionSchedule; // blockNumber -> [wagerIds]

    constructor() {}

    /// @notice createWager
    /// @dev
    /// @param wager wager to be created
    /// @return uint256 wager id
    function createWager(
        Wager memory wager
    ) external payable override returns (uint256) {
        (, uint80 expirationBlock, uint80 enterBlockLimit) = decodeBlocks(
            wager.blockData
        );
        (, , uint256 amount) = decodeWagerEquity(wager.wagerEquityData);
        require(expirationBlock >= block.number + 30, "W12");
        require(enterBlockLimit < expirationBlock, "W19");

        (address partyOne, ) = decodeParties(wager.parties);
        require(partyOne != address(0), "W13");
        require(wager.partyOneWagerData.length > 0, "W14");
        require(msg.value >= amount, "W9");

        wager.blockData = abi.encode(
            block.number,
            expirationBlock,
            enterBlockLimit
        );
        wager.state = WagerState.created;
        uint256 id = _id;
        wagers[id] = wager;
        _id++;

        emit WagerCreated(
            msg.sender,
            msg.value,
            wager.partyOneWagerData,
            block.number,
            enterBlockLimit,
            expirationBlock,
            address(wager.wagerModule),
            address(wager.oracleSource),
            id
        );
        return id;
    }

    /// @notice enterWager
    /// @dev
    /// @param wagerId id of wager to be entered by second party
    /// @param partyTwoWagerData second party's supplemental data for their specific wager
    function enterWager(
        uint256 wagerId,
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

        (address partyOne, address partyTwo) = decodeParties(wager.parties);
        require(msg.sender != partyOne, "W8");

        (int style, , uint256 amount) = decodeWagerEquity(
            wager.wagerEquityData
        );
        if (style == 0) {
            require(msg.value >= amount, "W9");
        }
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

        (, uint80 expirationBlock, uint80 enterLimitBlock) = decodeBlocks(
            wager.blockData
        );
        require(block.number >= expirationBlock, "W3");

        (Wager memory settledWager, address winner) = IWagerModule(
            wager.wagerModule
        ).settle(wager);
        settledWager.state = WagerState.completed;
        wagers[wagerId] = settledWager;

        (int style, address ercInterface, uint256 amount) = decodeWagerEquity(
            wager.wagerEquityData
        );
        uint256 winnings = style == 0 ? (amount * 2) : amount;
        if (ercInterface == address(0)) {
            (bool sent, ) = winner.call{value: winnings}("");
            require(sent, "W11");
        } else {
            bool sent = TransferableToken(ercInterface).transfer(
                winner,
                winnings
            );
            require(sent, "W11");
        }
        emit WagerSettled(winner, amount * 2, settledWager.result, wagerId);
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
        (address partyOne, address partyTwo) = decodeParties(wager.parties);
        (
            uint80 createdBlock,
            uint80 expirationBlock,
            uint80 enterLimitBlock
        ) = decodeBlocks(wager.blockData);

        if (enterLimitBlock != 0 && partyTwo != address(0)) {
            require(block.number <= enterLimitBlock, "W16");
        } else if (enterLimitBlock == 0 && partyTwo != address(0)) {
            // more than half of wager time elapsed
            require(
                block.number <=
                    createdBlock + (expirationBlock - createdBlock / 2),
                "W16"
            );
        }
        require(
            wager.state == WagerState.active || // TODO; double check this
                wager.state == WagerState.created,
            "W2"
        );

        wager.state = WagerState.voided;
        wagers[wagerId] = wager;
        require(msg.sender == partyOne, "W4");

        (int style, address ercContract, uint256 amount) = decodeWagerEquity(
            wager.wagerEquityData
        );
        (bool sent, ) = partyOne.call{value: amount}("");
        require(sent, "W6");
        if (partyTwo != address(0) && style == 0) {
            (bool sentTwo, ) = partyTwo.call{value: amount}("");
            require(sentTwo, "W6");
        }

        emit WagerVoided(wagerId);
    }

    /// @notice decodeWagerEquity
    /// @dev Wager's equitiy data consists of <style> (int) <ercInterface> (address) <amount> (uint256) [** potentially <ids> (uint256) **]
    /// @param data wager equity data be decoded
    /// @return style int
    /// @return ercInterface address
    /// @return amount uint256
    function decodeWagerEquity(
        bytes memory data
    )
        public
        pure
        returns (
            int style,
            address ercInterface,
            uint256 amount /* uint256 ids */
        )
    {
        (style, ercInterface, amount) = abi.decode(
            data,
            (int, address, uint256)
        );
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
