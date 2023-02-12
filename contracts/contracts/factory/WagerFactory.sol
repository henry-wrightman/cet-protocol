// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "../interfaces/wagers/IWagerModule.sol";
import "../interfaces/IWagerRegistry.sol";

/**
 @title WagerFactory
 @author Henry Wrightman

 @notice factory contract for wager creation
 */

contract WagerFactory {
    struct WagerParameters {
        bytes parties;
        bytes partyOneWagerData;
        bytes blockData;
        bytes wagerEquityData;
        bytes wagerOracleData;
        bytes supplumentalWagerOracleData;
        string wagerModuleName;
        address oracleModule;
        address oracleSource;
    }

    address public registry;

    constructor(address _registry) {
        registry = _registry;
    }

    mapping(string => address) private wagerModules;

    /// @notice createWager
    /// @dev name must be valid
    /// @param params wager params constructed from WagerParameters
    function createWager(
        WagerParameters memory params
    ) external payable returns (uint256) {
        address moduleAddr = wagerModules[params.wagerModuleName];
        require(moduleAddr != address(0), "invalid wagerModule");

        return
            IWagerRegistry(registry).createWager{value: msg.value}(
                Wager(
                    params.parties,
                    params.partyOneWagerData,
                    "0x",
                    params.wagerEquityData,
                    params.blockData,
                    params.wagerOracleData,
                    params.supplumentalWagerOracleData,
                    "0x",
                    WagerState.created,
                    IWagerModule(moduleAddr),
                    IWagerOracle(params.oracleModule),
                    params.oracleSource
                )
            );
    }

    /// @notice setWagerModule
    /// @dev name must be valid
    /// @param name string name of the wager module's key
    /// @param wagerModuleAddr address wager module's contract address
    function setWagerModule(
        string memory name,
        address wagerModuleAddr
    ) external {
        wagerModules[name] = wagerModuleAddr;
    }
}
