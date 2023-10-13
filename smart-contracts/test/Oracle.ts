import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Oracle", function () {
  async function deployOracle() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Oracle = await ethers.getContractFactory("Oracle");
    const oracle = await Oracle.deploy([owner.address]);

    return {
      oracle,
      owner,
      otherAccount,
    };
  }

  describe("Deployment", function () {
    it("Should set the right baseURI", async function () {
      const { oracle, owner } = await loadFixture(deployOracle);

      expect(await oracle.validOracleNodes(owner.address)).to.equal(true);
    });
  });
});
