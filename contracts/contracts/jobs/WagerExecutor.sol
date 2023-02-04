// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/AutomationCompatible.sol";
import "../interfaces/IWagerRegistry.sol";

/**
 @title WagerExecutor
 @author Henry Wrightman

 ChainLink-compatible automation contract
 @notice upkeep scheduler for wager executions
 */

contract WagerExecutor is AutomationCompatibleInterface {
    uint public executions;
    address public registry;

    /**
     * Use an interval in seconds and a timestamp to slow execution of Upkeep
     */
    uint256 public immutable interval;
    uint256 public lastBlock;

    constructor(uint256 updateInterval, address registryAddress) {
        interval = updateInterval;
        lastBlock = block.number;
        executions = 0;
        registry = registryAddress;
    }

    function checkUpkeep(
        bytes calldata /* checkData */
    )
        external
        override
        returns (bool upkeepNeeded, bytes memory /* performData */)
    {
        upkeepNeeded = (block.number - lastBlock) > interval;
        if (upkeepNeeded) {
            IWagerRegistry(registry).executeBlockRange(lastBlock, block.number);
        }
    }

    function performUpkeep(bytes calldata /* performData */) external override {
        if ((block.number - lastBlock) > interval) {
            lastBlock = block.number;
            executions = executions + 1;
        }
    }
}
