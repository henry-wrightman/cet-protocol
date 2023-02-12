// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/AutomationCompatible.sol";
import "../interfaces/IWagerRegistry.sol";

contract TestWagerExecutor is AutomationCompatibleInterface {
    address public registry;

    uint256 public lastBlock;
    uint public executions;

    constructor(address registryAddress) {
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
        upkeepNeeded = (block.number - lastBlock) > 0;
        if (upkeepNeeded) {
            IWagerRegistry(registry).executeBlockRange(lastBlock, block.number);
            executions++;
        }
        lastBlock = block.number;
    }

    function performUpkeep(
        bytes calldata /* performData */
    ) external override {}
}
