const Oracle = {
  _format: "hh-sol-artifact-1",
  contractName: "Oracle",
  address: "0xFa41eD391D157bAddbA6bb60a294d28C4165f007",
  sourceName: "contracts/Oracle.sol",
  abi: [
    {
      inputs: [
        {
          internalType: "address[]",
          name: "_validOracleNodes",
          type: "address[]",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "oracleNode",
          type: "address",
        },
        {
          indexed: false,
          internalType: "string",
          name: "urlQueried",
          type: "string",
        },
        {
          indexed: false,
          internalType: "bytes32",
          name: "dataValidated",
          type: "bytes32",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "agreedValue",
          type: "bool",
        },
      ],
      name: "UpdatedValidation",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_urlQueried",
          type: "string",
        },
        {
          internalType: "bytes32",
          name: "_dataValidated",
          type: "bytes32",
        },
        {
          internalType: "bool",
          name: "response",
          type: "bool",
        },
      ],
      name: "saveValidationRequest",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "validOracleNodes",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      name: "validations",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
  bytecode:
    "0x608060405234801561001057600080fd5b506040516105e53803806105e583398101604081905261002f916100cf565b60005b815181101561009657600180600084848151811061005257610052610193565b6020908102919091018101516001600160a01b03168252810191909152604001600020805460ff19169115159190911790558061008e816101a9565b915050610032565b50506101d0565b634e487b7160e01b600052604160045260246000fd5b80516001600160a01b03811681146100ca57600080fd5b919050565b600060208083850312156100e257600080fd5b82516001600160401b03808211156100f957600080fd5b818501915085601f83011261010d57600080fd5b81518181111561011f5761011f61009d565b8060051b604051601f19603f830116810181811085821117156101445761014461009d565b60405291825284820192508381018501918883111561016257600080fd5b938501935b8285101561018757610178856100b3565b84529385019392850192610167565b98975050505050505050565b634e487b7160e01b600052603260045260246000fd5b6000600182016101c957634e487b7160e01b600052601160045260246000fd5b5060010190565b610406806101df6000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063497b11d11461004657806390b73af91461005b578063e28c380214610092575b600080fd5b6100596100543660046101f7565b6100b5565b005b61007e6100693660046102e0565b60016020526000908152604090205460ff1681565b604051901515815260200160405180910390f35b61007e6100a036600461031d565b60006020819052908152604090205460ff1681565b3360009081526001602081905260409091205460ff16151514610138576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f4e6f7420612076616c6964206f7261636c65206e6f64652e0000000000000000604482015260640160405180910390fd5b6000828152602081905260409081902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016831515179055517f6119598a05a27364bd3db3f97f9f6a81cd6d1d3e9420abe603d84bfd13b65054906101a6903390869086908690610336565b60405180910390a1505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b803580151581146101f257600080fd5b919050565b60008060006060848603121561020c57600080fd5b833567ffffffffffffffff8082111561022457600080fd5b818601915086601f83011261023857600080fd5b81358181111561024a5761024a6101b3565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f01168101908382118183101715610290576102906101b3565b816040528281528960208487010111156102a957600080fd5b826020860160208301376000602084830101528097505050505050602084013591506102d7604085016101e2565b90509250925092565b6000602082840312156102f257600080fd5b813573ffffffffffffffffffffffffffffffffffffffff8116811461031657600080fd5b9392505050565b60006020828403121561032f57600080fd5b5035919050565b73ffffffffffffffffffffffffffffffffffffffff8516815260006020608081840152855180608085015260005b818110156103805787810183015185820160a001528201610364565b50600060a0828601015260a07fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505083604083015282151560608301529594505050505056fea2646970667358221220523f359f91c4936c654509bb9fcacf538132969493a5d74c05853bc26f4d1d6164736f6c63430008140033",
  deployedBytecode:
    "0x608060405234801561001057600080fd5b50600436106100415760003560e01c8063497b11d11461004657806390b73af91461005b578063e28c380214610092575b600080fd5b6100596100543660046101f7565b6100b5565b005b61007e6100693660046102e0565b60016020526000908152604090205460ff1681565b604051901515815260200160405180910390f35b61007e6100a036600461031d565b60006020819052908152604090205460ff1681565b3360009081526001602081905260409091205460ff16151514610138576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f4e6f7420612076616c6964206f7261636c65206e6f64652e0000000000000000604482015260640160405180910390fd5b6000828152602081905260409081902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016831515179055517f6119598a05a27364bd3db3f97f9f6a81cd6d1d3e9420abe603d84bfd13b65054906101a6903390869086908690610336565b60405180910390a1505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b803580151581146101f257600080fd5b919050565b60008060006060848603121561020c57600080fd5b833567ffffffffffffffff8082111561022457600080fd5b818601915086601f83011261023857600080fd5b81358181111561024a5761024a6101b3565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f01168101908382118183101715610290576102906101b3565b816040528281528960208487010111156102a957600080fd5b826020860160208301376000602084830101528097505050505050602084013591506102d7604085016101e2565b90509250925092565b6000602082840312156102f257600080fd5b813573ffffffffffffffffffffffffffffffffffffffff8116811461031657600080fd5b9392505050565b60006020828403121561032f57600080fd5b5035919050565b73ffffffffffffffffffffffffffffffffffffffff8516815260006020608081840152855180608085015260005b818110156103805787810183015185820160a001528201610364565b50600060a0828601015260a07fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505083604083015282151560608301529594505050505056fea2646970667358221220523f359f91c4936c654509bb9fcacf538132969493a5d74c05853bc26f4d1d6164736f6c63430008140033",
  linkReferences: {},
  deployedLinkReferences: {},
};

export default Oracle;
