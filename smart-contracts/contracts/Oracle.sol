// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/**
 * Sample basic Oracle as a proof of concept of what it can achieve
 * In this example, there is obviously only one oracle node, but realistically there will be hundreds
 */
contract Oracle {
    mapping(bytes32 => bool) public validations;
    mapping(address => bool) public validOracleNodes;

    modifier onlyValidNodes {
        require(validOracleNodes[msg.sender] == true, "Not a valid oracle node.");
        _;
    }

    // Triggered when the oracle saves and commits the data on chain
    event UpdatedValidation (
        address oracleNode,
        string urlQueried,
        bytes32 dataValidated,
        bool agreedValue
    );

    constructor(address[] memory _validOracleNodes) {
        for (uint i = 0; i < _validOracleNodes.length; i++) {
            validOracleNodes[_validOracleNodes[i]] = true;
        }
    }

    function saveValidationRequest (
        string memory _urlQueried,
        bytes32 _dataValidated,
        bool response
    )
    public onlyValidNodes
    {
        validations[_dataValidated] = response;

        emit UpdatedValidation(msg.sender, _urlQueried, _dataValidated, response);
    }
}
