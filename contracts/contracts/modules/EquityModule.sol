import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
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
    function acceptEquity(bytes memory data) external payable override {
        (
            ,
            address[2] memory ercInterfaces,
            uint256 amount,
            uint256[2] memory ids
        ) = decodeWagerEquity(data);
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

    function acceptCounterEquity(
        bytes memory partyTwoData,
        Wager memory wager
    ) external payable override returns (Wager memory) {
        (address ercInterface, uint256 id) = abi.decode(
            partyTwoData,
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
    /// @dev
    /// @param data bytes equity data
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

    function decodeParties(
        bytes memory data
    ) public pure returns (address partyOne, address partyTwo) {
        (partyOne, partyTwo) = abi.decode(data, (address, address));
    }
}
