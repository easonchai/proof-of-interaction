import { ethers, ethernal, network } from "hardhat";

const generateRand = () => {
  return Math.floor(Math.random() * 2000);
};

const generateMessage = async (seed: number, signer: any) => {
  const data = (seed * generateRand()).toString();

  const hash = ethers.id(`\x19Ethereum Signed Message:\n${data.length}${data}`);
  const signature = await signer.signMessage(data);
  return {
    hash,
    signature,
  };
};

async function main() {
  const signer = await ethers.provider.getSigner();
  const address = await signer.getAddress();
  const firstWallet = new ethers.Wallet(
    process.env.PRIVATE_KEY || "",
    ethers.provider
  );
  const secondWallet = new ethers.Wallet(
    process.env.SECOND_PRIVATE_KEY || "",
    ethers.provider
  );
  const thirdWallet = new ethers.Wallet(
    process.env.THIRD_PRIVATE_KEY || "",
    ethers.provider
  );
  const poiVerifierUrl = "https://api.proofofinteraction.xyz/validation/";
  const nftBaseUri = "https://api.proofofinteraction.com/nft/";
  const poi = await ethers.deployContract("ProofOfInteraction", [
    poiVerifierUrl,
  ]);
  await poi.waitForDeployment();

  if (
    network.name === "localhost" ||
    network.name === "hardhat" ||
    network.name === "running"
  ) {
    await ethernal.push({
      name: "ProofOfInteraction",
      address: poi.target.toString(),
    });
  }
  console.log(`🧪 Proof of Interaction contract deployed to: ${poi.target}\n`);

  const oracle = await ethers.deployContract("Oracle", [[address]]);
  await oracle.waitForDeployment();
  console.log(`🔎 Oracle contract deployed to: ${oracle.target}\n`);

  const LocationBasedMinting = await ethers.getContractFactory(
    "LocationBasedMinting"
  );
  const nft = await LocationBasedMinting.deploy(nftBaseUri, address);
  await nft.waitForDeployment();
  console.log(
    `📍 Location-based Minting NFT contract deployed to: ${nft.target}\n`
  );

  await poi.setNFTAddress(nft.target);
  await poi.setOracleAddress(oracle.target);
  await nft.setMinter(poi.target);
  console.log("✅ Proof of Interaction contract configured\n");

  console.log(
    `npx hardhat verify --network ${network} ${poi.target} ${poiVerifierUrl}`
  );
  console.log(
    `npx hardhat verify --network ${network} --constructor-args utils/oracle.arguments.js ${oracle.target}`
  );
  console.log(
    `npx hardhat verify --network ${network} ${nft.target} "${nftBaseUri}" "${address}"`
  );

  if (network.name === "mantleTest" || network.name === "taiko") {
    // AA is not live yet!
    // Users need to save interaction data to the AA

    const pickRandomWallet = () => {
      const index = Math.floor(Math.random() * 3);
      switch (index) {
        case 0:
          return firstWallet;
        case 1:
          return secondWallet;
        case 2:
          return thirdWallet;
        default:
          return firstWallet;
      }
    };

    const randomData = new Date().getTime();
    for (let i = 0; i < 35; i++) {
      const wallet = pickRandomWallet();
      const message = await generateMessage(randomData, wallet);
      await poi.saveInteraction(message.hash, message.signature);
      await oracle.saveValidationRequest(
        `https://api.proofofinteraction.xyz/validation/${message.hash}`,
        message.hash,
        true
      );
      await poi.selectWinner(message.hash);
    }
  }

  // const tx = {
  //   nonce: 51,
  //   to: ethers.ZeroAddress,
  //   data: "0x",
  //   gasPrice: ethers.parseEther("0.00000000010000005"),
  // }; // costs 21000 gas
  // await signer.sendTransaction(tx);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
