import { ethers, ethernal, network } from "hardhat";

async function main() {
  const poi = await ethers.deployContract("ProofOfInteraction", [
    ethers.id("https://google.com"),
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
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
