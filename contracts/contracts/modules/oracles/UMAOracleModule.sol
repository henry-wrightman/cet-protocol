// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "../../interfaces/wagers/IWagerModule.sol";
import "@uma/core/contracts/optimistic-oracle/interfaces/OptimisticOracleV2Interface.sol";

/**
 @title UMAOracleModule
 @author Henry Wrightman

 @notice UMA oracle module for wager price-related data resolution
 */

contract UMAOracleModule is IWagerOracleModule {
    IERC20 bondCurrency = IERC20(0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6); // Use Görli WETH as the bond currency.
    uint256 reward = 0; // Set the reward to 0 (so we dont have to fund it from this contract).

    /// @notice getResult
    /// @dev result is always bytes & up to wager module / inheritor to decode desired field(s)
    /// @param wager wager who needs to be settled & its result acquired
    /// @return bytes oracle result to be decoded
    function getResult(
        Wager memory wager
    ) external view override returns (bytes memory) {
        (bytes memory ancilliaryData, bytes32 identifier) = decodeOracleData(
            wager.supplementalOracleData
        );

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
                        identifier,
                        expirationBlock,
                        ancilliaryData
                    )
                    .resolvedPrice
            );
    }

    // Submit a data request to the Optimistic oracle.
    function requestData(Wager memory wager) public {
        (bytes memory ancilliaryData, bytes32 identifier) = decodeOracleData(
            wager.supplementalOracleData
        );
        OptimisticOracleV2Interface oo = OptimisticOracleV2Interface(
            address(wager.oracleModule)
        );
        (, uint80 expirationBlock, ) = abi.decode(
            wager.blockData,
            (uint80, uint80, uint80)
        );
        oo.requestPrice(
            identifier,
            expirationBlock,
            ancilliaryData,
            bondCurrency,
            reward
        );
        oo.setCustomLiveness(identifier, expirationBlock, ancilliaryData, 30);
    }

    // Settle the request once it's gone through the liveness period of 30 seconds. This acts the finalize the voted on price.
    // In a real world use of the Optimistic Oracle this should be longer to give time to disputers to catch bat price proposals.
    function settleRequest(Wager memory wager) public {
        (bytes memory ancilliaryData, bytes32 identifier) = decodeOracleData(
            wager.supplementalOracleData
        );
        OptimisticOracleV2Interface oo = OptimisticOracleV2Interface(
            address(wager.oracleModule)
        );
        (, uint80 expirationBlock, ) = abi.decode(
            wager.blockData,
            (uint80, uint80, uint80)
        );
        oo.settle(address(this), identifier, expirationBlock, ancilliaryData);
    }

    function toBytes(int256 x) public pure returns (bytes memory b) {
        b = new bytes(32);
        assembly {
            mstore(add(b, 32), x)
        }
    }

    function decodeOracleData(
        bytes memory data
    ) public pure returns (bytes memory ancillaryData, bytes32 identifier) {
        (ancillaryData, identifier) = abi.decode(data, (bytes, bytes32));
    }
}
