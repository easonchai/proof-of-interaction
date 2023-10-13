// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IOracle {
    function saveValidationRequest (
        string memory _urlQueried,
        bytes32 _dataValidated,
        bool response
    ) external;

    event UpdatedValidation (
        address indexed oracleNode,
        string urlQueried,
        bytes32 dataValidated,
        bool agreedValue
    );

    function validations(bytes32) external view returns (bool);
    function validOracleNodes(address) external view returns (bool);
}
