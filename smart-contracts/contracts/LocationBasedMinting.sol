// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract LocationBasedMinting is ERC721 {
    address public owner;
    address public minter;
    string public baseURI;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can do admin actions");
        _;
    }

    modifier onlyMinter() {
        require(msg.sender == minter, "Only minter can mint");
        _;
    }

    constructor(string memory _baseUri, address _owner) ERC721("Location-Based Proof Of Interaction", "POI") {
        baseURI = _baseUri;
        owner = _owner;
    }

    function mint(address to, uint256 tokenId) public onlyMinter {
        _mint(to, tokenId);
    }

    function _baseURI() override internal view virtual returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory _baseUri) public onlyOwner {
        baseURI = _baseUri;
    }

    function setOwner(address _owner) public onlyOwner {
        owner = _owner;
    }

    function setMinter(address _minter) public onlyOwner {
        minter = _minter;
    }
}
