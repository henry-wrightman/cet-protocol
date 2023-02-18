// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// import "../interfaces/IEquityModule.sol";
// import "../interfaces/wagers/IWagerModule.sol";

// /**
//  @title EquityModule
//  @author Henry Wrightman

//  @notice equity module to handle equity data & settlements
//  */

// contract EquityModule is IEquityModule {
//     /// @notice handleSettlement
//     /// @dev
//     /// @param data bytes equity data
//     function handleSettlement(
//         bytes memory data
//     ) external override {
        
//     }

//     /// @notice decodeWagerEquity
//     /// @dev Wager's equitiy data consists of <style> (WagerStyle) <ercInterface> (address) <amount> (uint256) [** potentially <ids> (uint256) **]
//     /// @param data wager equity data be decoded
//     /// @return style WagerType (int) oneSided vs twoSided
//     /// @return ercContracts address[1] ; 2 address slots for NFTs
//     /// @return amount uint256 amount
//     /// @return ids uint256[1] ; 2 id slots for NFTs
//     function decodeWagerEquity(
//         bytes memory data
//     )
//         public
//         pure
//         returns (
//             WagerType style,
//             address[2] memory ercContracts,
//             uint256 amount,
//             uint256[2] memory ids
//         )
//     {
//         (style, ercContracts, amount, ids) = abi.decode(
//             data,
//             (WagerType, address[2], uint256, uint256[2])
//         );
//     }
// }
