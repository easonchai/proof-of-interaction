const ProofOfInteraction = {
  _format: "hh-sol-artifact-1",
  contractName: "ProofOfInteraction",
  address: "0x368E5cFAcFe5605091C33520d9bf64fbEAEA725C",
  sourceName: "contracts/ProofOfInteraction.sol",
  abi: [
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "verifierUrl",
          type: "bytes32",
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
          name: "interactor",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bytes32",
          name: "data",
          type: "bytes32",
        },
      ],
      name: "Interaction",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      name: "hashToAddress",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
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
      name: "hashToSignature",
      outputs: [
        {
          internalType: "bytes",
          name: "",
          type: "bytes",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "nftContract",
      outputs: [
        {
          internalType: "contract ILocationBasedMinting",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "oracle",
      outputs: [
        {
          internalType: "contract IOracle",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_messageHash",
          type: "bytes32",
        },
        {
          internalType: "bytes",
          name: "_signature",
          type: "bytes",
        },
      ],
      name: "recoverSigner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "encryptedData",
          type: "bytes32",
        },
        {
          internalType: "bytes",
          name: "signature",
          type: "bytes",
        },
      ],
      name: "saveInteraction",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "winningHash",
          type: "bytes32",
        },
      ],
      name: "selectWinner",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "nftAddress",
          type: "address",
        },
      ],
      name: "setNFTAddress",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "oracleAddress",
          type: "address",
        },
      ],
      name: "setOracleAddress",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes",
          name: "sig",
          type: "bytes",
        },
      ],
      name: "splitSignature",
      outputs: [
        {
          internalType: "bytes32",
          name: "r",
          type: "bytes32",
        },
        {
          internalType: "bytes32",
          name: "s",
          type: "bytes32",
        },
        {
          internalType: "uint8",
          name: "v",
          type: "uint8",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [],
      name: "verifierInfo",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "messageHash",
          type: "bytes32",
        },
        {
          internalType: "bytes",
          name: "signature",
          type: "bytes",
        },
        {
          internalType: "address",
          name: "_signer",
          type: "address",
        },
      ],
      name: "verifySigner",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
  ],
  bytecode:
    "0x608060405234801561001057600080fd5b5060405161112a38038061112a83398101604081905261002f91610049565b600055600380546001600160a01b03191633179055610062565b60006020828403121561005b57600080fd5b5051919050565b6110b9806100716000396000f3fe608060405234801561001057600080fd5b50600436106100df5760003560e01c8063820b635f1161008c57806397aba7f91161006657806397aba7f914610215578063a7bb580314610228578063b2b553b114610259578063d56d229d1461027057600080fd5b8063820b635f1461019f5780638da5cb5b146101bf5780639050a11d146101df57600080fd5b806369d03738116100bd57806369d03738146101345780636be505f5146101475780637dc0d1d01461015a57600080fd5b80631e81e656146100e45780634c69c00f1461010c5780635834111c14610121575b600080fd5b6100f76100f2366004610d27565b610290565b60405190151581526020015b60405180910390f35b61011f61011a366004610d7e565b6102d2565b005b61011f61012f366004610da0565b6103c5565b61011f610142366004610d7e565b6105d5565b61011f610155366004610de7565b6106c3565b60045461017a9073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610103565b6101b26101ad366004610de7565b610a5f565b6040516101039190610e00565b60035461017a9073ffffffffffffffffffffffffffffffffffffffff1681565b61017a6101ed366004610de7565b60026020526000908152604090205473ffffffffffffffffffffffffffffffffffffffff1681565b61017a610223366004610da0565b610af9565b61023b610236366004610e6c565b610b96565b60408051938452602084019290925260ff1690820152606001610103565b61026260005481565b604051908152602001610103565b60055461017a9073ffffffffffffffffffffffffffffffffffffffff1681565b60008173ffffffffffffffffffffffffffffffffffffffff166102b38585610af9565b73ffffffffffffffffffffffffffffffffffffffff1614949350505050565b60035473ffffffffffffffffffffffffffffffffffffffff16331461037e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f4f6e6c79206f776e65722063616e2063616c6c20746869732066756e6374696f60448201527f6e2e00000000000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b600480547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b600082815260016020526040902080546103de90610ea9565b15905061046d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f496e746572616374696f6e20686173206265656e206d616465206265666f726560448201527f21000000000000000000000000000000000000000000000000000000000000006064820152608401610375565b60008281526002602052604090205473ffffffffffffffffffffffffffffffffffffffff161561051f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f496e746572616374696f6e20686173206265656e206d616465206265666f726560448201527f21000000000000000000000000000000000000000000000000000000000000006064820152608401610375565b600061052b8383610af9565b60008481526001602052604090209091506105468382610f47565b5060008381526002602090815260409182902080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff851690811790915582519081529081018590527fbf716434bf381af6fa1055c8756bebd8b3970bdc6b94de865b498695661052e4910160405180910390a1505050565b60035473ffffffffffffffffffffffffffffffffffffffff16331461067c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f4f6e6c79206f776e65722063616e2063616c6c20746869732066756e6374696f60448201527f6e2e0000000000000000000000000000000000000000000000000000000000006064820152608401610375565b600580547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b600081815260016020526040812080546106dc90610ea9565b80601f016020809104026020016040519081016040528092919081815260200182805461070890610ea9565b80156107555780601f1061072a57610100808354040283529160200191610755565b820191906000526020600020905b81548152906001019060200180831161073857829003601f168201915b5050505050905080516000036107ed576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f496e746572616374696f6e20686173206e6f74206265656e206d61646520626560448201527f666f7265210000000000000000000000000000000000000000000000000000006064820152608401610375565b60008281526002602052604090205473ffffffffffffffffffffffffffffffffffffffff1661089e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f496e746572616374696f6e20686173206e6f74206265656e206d61646520626560448201527f666f7265210000000000000000000000000000000000000000000000000000006064820152608401610375565b600480546040517fe28c380200000000000000000000000000000000000000000000000000000000815291820184905273ffffffffffffffffffffffffffffffffffffffff169063e28c380290602401602060405180830381865afa15801561090b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061092f9190611061565b15156001146109c0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603e60248201527f4f7261636c6520686173206e6f742076616c696461746564207468697320696e60448201527f746572616374696f6e20796574206f72206974277320696e76616c69642100006064820152608401610375565b600554600083815260026020526040908190205490517f40c10f1900000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff9182166004820152602481018590529116906340c10f1990604401600060405180830381600087803b158015610a4357600080fd5b505af1158015610a57573d6000803e3d6000fd5b505050505050565b60016020526000908152604090208054610a7890610ea9565b80601f0160208091040260200160405190810160405280929190818152602001828054610aa490610ea9565b8015610af15780601f10610ac657610100808354040283529160200191610af1565b820191906000526020600020905b815481529060010190602001808311610ad457829003601f168201915b505050505081565b600080600080610b0885610b96565b6040805160008152602081018083528b905260ff8316918101919091526060810184905260808101839052929550909350915060019060a0016020604051602081039080840390855afa158015610b63573d6000803e3d6000fd5b50506040517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe00151979650505050505050565b60008060008351604114610c06576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f696e76616c6964207369676e6174757265206c656e67746800000000000000006044820152606401610375565b50505060208101516040820151606090920151909260009190911a90565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600082601f830112610c6457600080fd5b813567ffffffffffffffff80821115610c7f57610c7f610c24565b604051601f83017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f01168101908282118183101715610cc557610cc5610c24565b81604052838152866020858801011115610cde57600080fd5b836020870160208301376000602085830101528094505050505092915050565b803573ffffffffffffffffffffffffffffffffffffffff81168114610d2257600080fd5b919050565b600080600060608486031215610d3c57600080fd5b83359250602084013567ffffffffffffffff811115610d5a57600080fd5b610d6686828701610c53565b925050610d7560408501610cfe565b90509250925092565b600060208284031215610d9057600080fd5b610d9982610cfe565b9392505050565b60008060408385031215610db357600080fd5b82359150602083013567ffffffffffffffff811115610dd157600080fd5b610ddd85828601610c53565b9150509250929050565b600060208284031215610df957600080fd5b5035919050565b600060208083528351808285015260005b81811015610e2d57858101830151858201604001528201610e11565b5060006040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b600060208284031215610e7e57600080fd5b813567ffffffffffffffff811115610e9557600080fd5b610ea184828501610c53565b949350505050565b600181811c90821680610ebd57607f821691505b602082108103610ef6577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b601f821115610f4257600081815260208120601f850160051c81016020861015610f235750805b601f850160051c820191505b81811015610a5757828155600101610f2f565b505050565b815167ffffffffffffffff811115610f6157610f61610c24565b610f7581610f6f8454610ea9565b84610efc565b602080601f831160018114610fc85760008415610f925750858301515b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600386901b1c1916600185901b178555610a57565b6000858152602081207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08616915b8281101561101557888601518255948401946001909101908401610ff6565b508582101561105157878501517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600388901b60f8161c191681555b5050505050600190811b01905550565b60006020828403121561107357600080fd5b81518015158114610d9957600080fdfea2646970667358221220436a58cb157fb23d462350a1dbb4d08bb8c9f1b50a2d7439880567ab55289b6264736f6c63430008140033",
  deployedBytecode:
    "0x608060405234801561001057600080fd5b50600436106100df5760003560e01c8063820b635f1161008c57806397aba7f91161006657806397aba7f914610215578063a7bb580314610228578063b2b553b114610259578063d56d229d1461027057600080fd5b8063820b635f1461019f5780638da5cb5b146101bf5780639050a11d146101df57600080fd5b806369d03738116100bd57806369d03738146101345780636be505f5146101475780637dc0d1d01461015a57600080fd5b80631e81e656146100e45780634c69c00f1461010c5780635834111c14610121575b600080fd5b6100f76100f2366004610d27565b610290565b60405190151581526020015b60405180910390f35b61011f61011a366004610d7e565b6102d2565b005b61011f61012f366004610da0565b6103c5565b61011f610142366004610d7e565b6105d5565b61011f610155366004610de7565b6106c3565b60045461017a9073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610103565b6101b26101ad366004610de7565b610a5f565b6040516101039190610e00565b60035461017a9073ffffffffffffffffffffffffffffffffffffffff1681565b61017a6101ed366004610de7565b60026020526000908152604090205473ffffffffffffffffffffffffffffffffffffffff1681565b61017a610223366004610da0565b610af9565b61023b610236366004610e6c565b610b96565b60408051938452602084019290925260ff1690820152606001610103565b61026260005481565b604051908152602001610103565b60055461017a9073ffffffffffffffffffffffffffffffffffffffff1681565b60008173ffffffffffffffffffffffffffffffffffffffff166102b38585610af9565b73ffffffffffffffffffffffffffffffffffffffff1614949350505050565b60035473ffffffffffffffffffffffffffffffffffffffff16331461037e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f4f6e6c79206f776e65722063616e2063616c6c20746869732066756e6374696f60448201527f6e2e00000000000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b600480547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b600082815260016020526040902080546103de90610ea9565b15905061046d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f496e746572616374696f6e20686173206265656e206d616465206265666f726560448201527f21000000000000000000000000000000000000000000000000000000000000006064820152608401610375565b60008281526002602052604090205473ffffffffffffffffffffffffffffffffffffffff161561051f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f496e746572616374696f6e20686173206265656e206d616465206265666f726560448201527f21000000000000000000000000000000000000000000000000000000000000006064820152608401610375565b600061052b8383610af9565b60008481526001602052604090209091506105468382610f47565b5060008381526002602090815260409182902080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff851690811790915582519081529081018590527fbf716434bf381af6fa1055c8756bebd8b3970bdc6b94de865b498695661052e4910160405180910390a1505050565b60035473ffffffffffffffffffffffffffffffffffffffff16331461067c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f4f6e6c79206f776e65722063616e2063616c6c20746869732066756e6374696f60448201527f6e2e0000000000000000000000000000000000000000000000000000000000006064820152608401610375565b600580547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b600081815260016020526040812080546106dc90610ea9565b80601f016020809104026020016040519081016040528092919081815260200182805461070890610ea9565b80156107555780601f1061072a57610100808354040283529160200191610755565b820191906000526020600020905b81548152906001019060200180831161073857829003601f168201915b5050505050905080516000036107ed576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f496e746572616374696f6e20686173206e6f74206265656e206d61646520626560448201527f666f7265210000000000000000000000000000000000000000000000000000006064820152608401610375565b60008281526002602052604090205473ffffffffffffffffffffffffffffffffffffffff1661089e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f496e746572616374696f6e20686173206e6f74206265656e206d61646520626560448201527f666f7265210000000000000000000000000000000000000000000000000000006064820152608401610375565b600480546040517fe28c380200000000000000000000000000000000000000000000000000000000815291820184905273ffffffffffffffffffffffffffffffffffffffff169063e28c380290602401602060405180830381865afa15801561090b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061092f9190611061565b15156001146109c0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603e60248201527f4f7261636c6520686173206e6f742076616c696461746564207468697320696e60448201527f746572616374696f6e20796574206f72206974277320696e76616c69642100006064820152608401610375565b600554600083815260026020526040908190205490517f40c10f1900000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff9182166004820152602481018590529116906340c10f1990604401600060405180830381600087803b158015610a4357600080fd5b505af1158015610a57573d6000803e3d6000fd5b505050505050565b60016020526000908152604090208054610a7890610ea9565b80601f0160208091040260200160405190810160405280929190818152602001828054610aa490610ea9565b8015610af15780601f10610ac657610100808354040283529160200191610af1565b820191906000526020600020905b815481529060010190602001808311610ad457829003601f168201915b505050505081565b600080600080610b0885610b96565b6040805160008152602081018083528b905260ff8316918101919091526060810184905260808101839052929550909350915060019060a0016020604051602081039080840390855afa158015610b63573d6000803e3d6000fd5b50506040517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe00151979650505050505050565b60008060008351604114610c06576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f696e76616c6964207369676e6174757265206c656e67746800000000000000006044820152606401610375565b50505060208101516040820151606090920151909260009190911a90565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600082601f830112610c6457600080fd5b813567ffffffffffffffff80821115610c7f57610c7f610c24565b604051601f83017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f01168101908282118183101715610cc557610cc5610c24565b81604052838152866020858801011115610cde57600080fd5b836020870160208301376000602085830101528094505050505092915050565b803573ffffffffffffffffffffffffffffffffffffffff81168114610d2257600080fd5b919050565b600080600060608486031215610d3c57600080fd5b83359250602084013567ffffffffffffffff811115610d5a57600080fd5b610d6686828701610c53565b925050610d7560408501610cfe565b90509250925092565b600060208284031215610d9057600080fd5b610d9982610cfe565b9392505050565b60008060408385031215610db357600080fd5b82359150602083013567ffffffffffffffff811115610dd157600080fd5b610ddd85828601610c53565b9150509250929050565b600060208284031215610df957600080fd5b5035919050565b600060208083528351808285015260005b81811015610e2d57858101830151858201604001528201610e11565b5060006040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b600060208284031215610e7e57600080fd5b813567ffffffffffffffff811115610e9557600080fd5b610ea184828501610c53565b949350505050565b600181811c90821680610ebd57607f821691505b602082108103610ef6577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b601f821115610f4257600081815260208120601f850160051c81016020861015610f235750805b601f850160051c820191505b81811015610a5757828155600101610f2f565b505050565b815167ffffffffffffffff811115610f6157610f61610c24565b610f7581610f6f8454610ea9565b84610efc565b602080601f831160018114610fc85760008415610f925750858301515b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600386901b1c1916600185901b178555610a57565b6000858152602081207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08616915b8281101561101557888601518255948401946001909101908401610ff6565b508582101561105157878501517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600388901b60f8161c191681555b5050505050600190811b01905550565b60006020828403121561107357600080fd5b81518015158114610d9957600080fdfea2646970667358221220436a58cb157fb23d462350a1dbb4d08bb8c9f1b50a2d7439880567ab55289b6264736f6c63430008140033",
  linkReferences: {},
  deployedLinkReferences: {},
};

export default ProofOfInteraction;
