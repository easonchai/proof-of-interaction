// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract LocationBasedMinting is ERC721 {
    uint256 public tokenId = 0;
    address public owner;
    string public baseURI;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can mint");
        _;
    }

    constructor(string memory _baseUri, address _owner) ERC721("Location-Based Proof Of Interaction", "POI") {
        baseURI = _baseUri;
        owner = _owner;
    }

    function mint(address to) public onlyOwner {
        uint256 _tokenId = tokenId;
        tokenId += 1;
        _mint(to, _tokenId);
    }

    function _baseURI() override internal view virtual returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory _baseURI) public onlyOwner {
        baseURI = _baseURI;
    }
}
