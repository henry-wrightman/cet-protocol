// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TestERC721 is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("MyTestToken", "MTT") {}

    function safeTransferFrom(from, to, tokenId) public returns (bool) {
        _safeTransferFrom(from, to, tokenId);
    }
}
