import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-ethernal";
import "@nomicfoundation/hardhat-verify";
// import "hardhat-gas-reporter";
import * as dotenv from "dotenv";

dotenv.config();

const optimizedComilerSettings = {
  version: "0.8.20",
  settings: {
    optimizer: { enabled: true, runs: 1000000 },
    viaIR: true,
  },
};

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
        settings: {
          optimizer: { enabled: true, runs: 1000000 },
        },
      },
    ],
    overrides: {
      "contracts/core/EntryPoint.sol": optimizedComilerSettings,
      "contracts/samples/SimpleAccount.sol": optimizedComilerSettings,
    },
  },
  defaultNetwork: "running",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    running: {
      url: "http://127.0.0.1:8545",
      chainId: 1337,
    },
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY || ""],
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY || ""],
    },
    opTest: {
      url: `https://opt-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY || ""],
    },
    mantle: {
      url: "https://rpc.mantle.xyz", //mainnet
      accounts: [process.env.PRIVATE_KEY ?? ""],
    },
    mantleTest: {
      url: "https://rpc.testnet.mantle.xyz", // testnet
      accounts: [process.env.PRIVATE_KEY ?? ""],
    },
    taiko: {
      url: "https://rpc.jolnir.taiko.xyz",
      accounts: [process.env.PRIVATE_KEY ?? ""],
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHERSCAN_API_KEY,
    customChains: [
      {
        network: "taiko",
        chainId: 167007,
        urls: {
          apiURL: "https://blockscoutapi.jolnir.taiko.xyz/api",
          browserURL: "https://explorer.jolnir.taiko.xyz",
        },
      },
      {
        network: "mantleTest",
        chainId: 5001,
        urls: {
          apiURL: "https://explorer.testnet.mantle.xyz/api",
          browserURL: "https://explorer.testnet.mantle.xyz",
        },
      },
    ],
  },
  // gasReporter: {
  //   enabled: true,
  // },
  // ethernal: {
  //   apiToken: process.env.ETHERNAL_API_KEY,
  //   disableSync: false, // If set to true, plugin will not sync blocks & txs
  //   disableTrace: false, // If set to true, plugin won't trace transaction
  //   workspace: undefined, // Set the workspace to use, will default to the default workspace (latest one used in the dashboard). It is also possible to set it through the ETHERNAL_WORKSPACE env variable
  //   uploadAst: false, // If set to true, plugin will upload AST, and you'll be able to use the storage feature (longer sync time though)
  //   disabled: false, // If set to true, the plugin will be disabled, nohting will be synced, ethernal.push won't do anything either
  //   resetOnStart: undefined, // Pass a workspace name to reset it automatically when restarting the node, note that if the workspace doesn't exist it won't error
  //   serverSync: false, // Only available on public explorer plans - If set to true, blocks & txs will be synced by the server. For this to work, your chain needs to be accessible from the internet. Also, trace won't be synced for now when this is enabled.
  //   skipFirstBlock: false, // If set to true, the first block will be skipped. This is mostly useful to avoid having the first block synced with its tx when starting a mainnet fork
  //   verbose: false,
  // },
};

export default config;
