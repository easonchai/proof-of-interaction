// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract ProofOfInteraction {
    /**
     * This is arbitrary, meaning that it could be a link to their site, to their verifying link, etc. 
     * It can also be in a different format/structure if it makes more sense that way!
     */
    bytes32 public verifierInfo;

    /**
     * From this mapping, we get to ensure that if the hash already exists, most likely its already interacted with, 
     * so it cannot be pushed on chain/repeated
     *
     * We also get to ensure that we can verify authenticity from the hash to the signature
     */
    mapping(bytes32 => bytes) public hashToSignature;
    mapping(bytes32 => address) public hashToAddress;
    address public owner;

    event Interaction(address interactor, bytes32 data);

    // In this example, we will use verifier info as the verifierUrl
    constructor(bytes32 verifierUrl) {
        verifierInfo = verifierUrl;
        owner = msg.sender;
    }

    modifier onlyOwner () {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    function saveInteraction(bytes32 encryptedData, bytes memory signature) public {
        require(hashToSignature[encryptedData].length == 0, "Interaction has been made before!");
        require(hashToAddress[encryptedData] == address(0x0), "Interaction has been made before!");

        hashToSignature[encryptedData] = signature;
        hashToAddress[encryptedData] = msg.sender;

        emit Interaction(recoverSigner(encryptedData, signature), encryptedData);

        // Perform some logic to choose a winner? Check that you're the first? Match a specific hash?
    }

    // Just imagine how you can now automate winners to be selected because of this 'Proof of Interaction'
    // Or make it fully callable by everyone and reward the caller with a prize (like calling liquidations)

    // Perhaps you can have a function that can be used to verify the signer of the message to handle reward payouts, etc
    function verifySigner(
        bytes32 messageHash,
        bytes memory signature,
        address _signer
    ) public pure returns (bool) {
        return recoverSigner(messageHash, signature) == _signer;
    }

    function recoverSigner(
        bytes32 _messageHash,
        bytes memory _signature
    ) public pure returns (address) {
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);

        return ecrecover(_messageHash, v, r, s);
    }

    function splitSignature(
        bytes memory sig
    ) public pure returns (bytes32 r, bytes32 s, uint8 v) {
        require(sig.length == 65, "invalid signature length");

        assembly {
            // first 32 bytes, after the length prefix
            r := mload(add(sig, 32))
            // second 32 bytes
            s := mload(add(sig, 64))
            // final byte (first byte of the next 32 bytes)
            v := byte(0, mload(add(sig, 96)))
        }

        // implicitly return (r, s, v)
    }
}
