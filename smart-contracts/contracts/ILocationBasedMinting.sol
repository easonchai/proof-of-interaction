// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/interfaces/IERC721.sol";

interface ILocationBasedMinting is IERC721 {
    function owner() external view returns (address);
    function baseURI() external view returns (string memory);
    function setBaseURI(string memory) external;
    function mint(address, uint256) external;
}
