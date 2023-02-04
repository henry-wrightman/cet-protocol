// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "../../interfaces/wagers/IWagerModule.sol";
import "@uma/core/contracts/optimistic-oracle/interfaces/OptimisticOracleV2Interface.sol";

/**
 @title UMAOracleModule
 @author Henry Wrightman

 @notice UMA oracle module for wager price-related data resolution
 */

contract UMAOracleModule is IWagerOracle {
    IERC20 bondCurrency = IERC20(0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6); // Use Görli WETH as the bond currency.
    uint256 reward = 0; // Set the reward to 0 (so we dont have to fund it from this contract).

    /// @notice getResult
    /// @dev result is always bytes & up to wager module / inheritor to decode desired field(s)
    /// @param wager wager who needs to be settled & its result acquired
    /// @return bytes oracle result to be decoded
    function getResult(
        Wager memory wager
    ) external view override returns (bytes memory) {
        OptimisticOracleV2Interface oo = OptimisticOracleV2Interface(
            wager.oracleSource
        );
        (, uint80 expirationBlock, ) = abi.decode(
            wager.blockData,
            (uint80, uint80, uint80)
        );
        return
            toBytes(
                oo
                    .getRequest(
                        address(this),
                        bytes32(wager.supplumentalWagerOracleData),
                        expirationBlock,
                        wager.wagerOracleData
                    )
                    .resolvedPrice
            );
    }

    // Submit a data request to the Optimistic oracle.
    function requestData(Wager memory wager) public {
        OptimisticOracleV2Interface oo = OptimisticOracleV2Interface(
            address(wager.oracleModule)
        );
        (, uint80 expirationBlock, ) = abi.decode(
            wager.blockData,
            (uint80, uint80, uint80)
        );
        oo.requestPrice(
            bytes32(wager.supplumentalWagerOracleData),
            expirationBlock,
            wager.wagerOracleData,
            bondCurrency,
            reward
        );
        oo.setCustomLiveness(
            bytes32(wager.supplumentalWagerOracleData),
            expirationBlock,
            wager.wagerOracleData,
            30
        );
    }

    // Settle the request once it's gone through the liveness period of 30 seconds. This acts the finalize the voted on price.
    // In a real world use of the Optimistic Oracle this should be longer to give time to disputers to catch bat price proposals.
    function settleRequest(Wager memory wager) public {
        OptimisticOracleV2Interface oo = OptimisticOracleV2Interface(
            address(wager.oracleModule)
        );
        (, uint80 expirationBlock, ) = abi.decode(
            wager.blockData,
            (uint80, uint80, uint80)
        );
        oo.settle(
            address(this),
            bytes32(wager.supplumentalWagerOracleData),
            expirationBlock,
            wager.wagerOracleData
        );
    }

    function toBytes(int256 x) public pure returns (bytes memory b) {
        b = new bytes(32);
        assembly {
            mstore(add(b, 32), x)
        }
    }
}
