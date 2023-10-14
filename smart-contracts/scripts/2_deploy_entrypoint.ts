import { ethers, network } from "hardhat";

async function main() {
  const entrypoint = await ethers.deployContract("EntryPoint", [], {
    gasLimit: 6e6,
  });
  await entrypoint.waitForDeployment();

  console.log(`✅ EntryPoint contract deployed to: ${entrypoint.target}\n`);

  const AA = await ethers.getContractFactory("POIAccountFactory");
  const aa = await AA.deploy(entrypoint.target, {
    gasLimit: "0x1000000",
  });
  await aa.waitForDeployment();

  console.log(`✅ POIAccountFactory contract deployed to: ${aa.target}\n`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
