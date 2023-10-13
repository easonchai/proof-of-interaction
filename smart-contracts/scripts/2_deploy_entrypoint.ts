import { ethers, network } from "hardhat";

async function main() {
  if (
    network.name !== "localhost" &&
    network.name !== "hardhat" &&
    network.name !== "running"
  ) {
    console.log("⏭ Skipping Set Balance [Not running locally]");
    return;
  }

  const entrypoint = await ethers.deployContract("EntryPoint", [], {
    gasLimit: 6e6,
  });
  await entrypoint.waitForDeployment();

  console.log(`✅ EntryPoint contract deployed to: ${entrypoint.target}\n`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
