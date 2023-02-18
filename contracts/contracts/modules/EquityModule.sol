// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "../interfaces/IEquityModule.sol";
import "../interfaces/wagers/IWagerModule.sol";
import "hardhat/console.sol";

/**
 @title EquityModule
 @author Henry Wrightman

 @notice equity module to handle equity data & settlements for registry

 TODO: make gated only by registry
 */

contract EquityModule is IEquityModule {
    /// @notice acceptEquity
    /// @dev handles the creator party's equity creating a wager
    /// @param equityData wager's equity data
    function acceptEquity(bytes memory equityData) external payable override {
        (
            ,
            address[2] memory ercInterfaces,
            uint256 amount,
            uint256[2] memory ids
        ) = decodeWagerEquity(equityData);
        require(msg.value == amount, "W9");
        if (ercInterfaces[0] != address(0)) {
            (bool success, bytes memory addressData) = ercInterfaces[0].call(
                abi.encodeWithSignature("getApproved(uint256)", ids[0])
            );
            console.log(success);
            require(
                abi.decode(addressData, (address)) == address(this),
                "Registry requires NFT approval"
            );
            (bool success2, ) = ercInterfaces[0].call(
                abi.encodeWithSignature("supportsInterface(bytes4)", 0x80ac58cd)
            );
            console.log(success2);
        }
    }

    /// @notice acceptCounterEquity
    /// @dev handles the counter party's equity entering a wager
    /// @param partyTwoEquityData party two's equity data
    /// @param wager wager being entered
    /// @return wager updated wager w accepted counter party & their equity
    function acceptCounterEquity(
        bytes memory partyTwoEquityData,
        Wager memory wager
    ) external payable override returns (Wager memory) {
        (address ercInterface, uint256 id) = abi.decode(
            partyTwoEquityData,
            (address, uint256)
        );
        (
            WagerType style,
            address[2] memory ercInterfaces,
            uint256 amount,
            uint256[2] memory ids
        ) = decodeWagerEquity(wager.equityData);
        if (ercInterfaces[0] == address(0)) {
            require(msg.value == amount, "W9");
            require(ercInterface == address(0), "invalid wager collateral");
        }
        if (ercInterfaces[1] != address(0)) {
            (bool success, bytes memory addressData) = ercInterfaces[1].call(
                abi.encodeWithSignature("getApproved(uint256)", id)
            );
            console.log(success);
            require(
                abi.decode(addressData, (address)) == address(this),
                "Registry requires NFT approval"
            );
            (bool success2, bytes memory boolData) = ercInterfaces[1].call(
                abi.encodeWithSignature("supportsInterface(bytes4)", 0x80ac58cd)
            );
            console.log(success2);
        }
        wager.equityData = abi.encode(
            style,
            [ercInterfaces[0], ercInterface],
            amount,
            [ids[0], id]
        );
        return wager;
    }

    /// @notice settleEquity
    /// @dev handles the equity settlment of a wager being settled
    /// @param wager wager to be settled
    /// @param recipient address of recipient recieving settled funds
    /// @return settledAmount uint256 amount settled
    function settleEquity(
        Wager memory wager,
        address recipient
    ) external override returns (uint256) {
        (
            WagerType style,
            address[2] memory ercInterfaces,
            uint256 amount,
            uint256[2] memory ids
        ) = decodeWagerEquity(wager.equityData);
        uint256 winnings = style == WagerType.twoSided ? (amount * 2) : amount;
        if (ercInterfaces[0] == address(0)) {
            (bool sent, ) = recipient.call{value: winnings}("");
            require(sent, "W11");
        } else {
            (address partyOne, address partyTwo) = decodeParties(wager.parties);
            bytes memory data = abi.encodeWithSignature(
                "safeTransferFrom(address,address,uint256)",
                partyOne == recipient ? partyTwo : partyOne,
                recipient,
                partyOne == recipient ? ids[1] : ids[0]
            );
            (bool sent, ) = ercInterfaces[partyOne == recipient ? 0 : 1].call(
                data
            );
            console.log(sent);
        }
        return winnings;
    }

    /// @notice voidEquity
    /// @dev handles the equity distribution of a wager being voided
    /// @param wager wager being voided
    function voidEquity(Wager memory wager) external override {
        (
            WagerType style,
            address[2] memory ercInterfaces,
            uint256 amount,

        ) = decodeWagerEquity(wager.equityData);
        (address partyOne, address partyTwo) = decodeParties(wager.parties);

        if (ercInterfaces[0] == address(0)) {
            (bool sent, ) = partyOne.call{value: amount}("");
            require(sent, "W6");
            if (partyTwo != address(0) && style == WagerType.twoSided) {
                (bool sentTwo, ) = partyTwo.call{value: amount}("");
                require(sentTwo, "W6");
            }
        }
    }

    /// @notice decodeWagerEquity
    /// @dev Wager's equitiy data consists of <style> (WagerStyle) <ercInterface> (address) <amount> (uint256) [** potentially <ids> (uint256) **]
    /// @param data wager equity data be decoded
    /// @return style WagerType (int) oneSided vs twoSided
    /// @return ercContracts address[1] ; 2 address slots for NFTs
    /// @return amount uint256 amount
    /// @return ids uint256[1] ; 2 id slots for NFTs
    function decodeWagerEquity(
        bytes memory data
    )
        public
        pure
        returns (
            WagerType style,
            address[2] memory ercContracts,
            uint256 amount,
            uint256[2] memory ids
        )
    {
        (style, ercContracts, amount, ids) = abi.decode(
            data,
            (WagerType, address[2], uint256, uint256[2])
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
}
