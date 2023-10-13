import { ethers, network } from "hardhat";
import { setBalance } from "@nomicfoundation/hardhat-network-helpers";

async function main() {
  if (
    network.name !== "localhost" &&
    network.name !== "hardhat" &&
    network.name !== "running"
  ) {
    console.log("⏭ Skipping Set Balance [Not running locally]");
    return;
  }

  const ETHKL_ADDRESS = "0x8CcdD40E7695aC76D196fBfa12E386E34D6cd837";
  const ACC_ABSTRACTION_ADDRESS = "0x7DDEEac57398c377203Aa7F9d4C96eeEb7158c5F";

  await setBalance(ETHKL_ADDRESS, 1000 * 1e18);
  await setBalance(ACC_ABSTRACTION_ADDRESS, 1000 * 1e18);

  console.log(
    `💰 ${ETHKL_ADDRESS} balance set!\n`,
    (await ethers.provider.getBalance(ETHKL_ADDRESS)).toString(),
    "\n"
  );
  console.log(
    `💰 ${ACC_ABSTRACTION_ADDRESS} balance set!\n`,
    (await ethers.provider.getBalance(ACC_ABSTRACTION_ADDRESS)).toString(),
    "\n"
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
