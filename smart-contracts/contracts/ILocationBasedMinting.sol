// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/interfaces/IERC721.sol";

interface ILocationBasedMinting is IERC721 {
    function tokenId() external view returns (uint256);
    function owner() external view returns (address);
    function baseURI() external view returns (string memory);
    function setBaseURI(string) external;
    function mint(address) external;
}
