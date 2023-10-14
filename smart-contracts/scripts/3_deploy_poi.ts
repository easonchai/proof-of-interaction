import { ethers, ethernal, network } from "hardhat";

async function main() {
  const signer = await ethers.provider.getSigner();
  const address = await signer.getAddress();
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

  // const tx = {
  //   nonce: 4,
  //   to: ethers.ZeroAddress,
  //   data: "0x",
  //   gasPrice: ethers.parseEther("0.00000000010000005"),
  // }; // costs 21000 gas

  // signer.sendTransaction(tx);

  await poi.setNFTAddress(nft.target);
  await poi.setOracleAddress(oracle.target);
  await nft.setOwner(address);
  await nft.setMinter(poi.target);
  console.log("✅ Proof of Interaction contract configured\n");

  console.log(
    `npx hardhat verify --network opTest ${poi.target} ${poiVerifierUrl}`
  );
  console.log(
    `npx hardhat verify --network opTest --constructor-args utils/oracle.arguments.js ${oracle.target}`
  );
  console.log(
    `npx hardhat verify --network opTest ${nft.target} "${nftBaseUri}" "${address}"`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
