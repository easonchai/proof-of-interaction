import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Location Based Minting", function () {
  async function deployLBM() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    const BASE_URI = "https://example.com/";
    const hash = ethers.id("random thing to hash");
    const tokenId = BigInt(hash);

    const LocationBasedMinting = await ethers.getContractFactory(
      "LocationBasedMinting"
    );
    const nft = await LocationBasedMinting.deploy(BASE_URI, owner.address);

    return {
      nft,
      BASE_URI,
      tokenId,
      owner,
      otherAccount,
    };
  }

  describe("Deployment", function () {
    it("Should set the right baseURI", async function () {
      const { nft, BASE_URI } = await loadFixture(deployLBM);

      expect(await nft.baseURI()).to.equal(`${BASE_URI}`);
    });

    it("Should set the right owner", async function () {
      const { nft, owner } = await loadFixture(deployLBM);

      expect(await nft.owner()).to.equal(owner.address);
    });
  });

  describe("Mint", function () {
    describe("Should allow only owner to mint NFT", function () {
      it("Should mint the NFT", async function () {
        const { nft, tokenId, otherAccount } = await loadFixture(deployLBM);

        await expect(await nft.mint(otherAccount.address, tokenId));
        await expect(await nft.ownerOf(tokenId)).equal(otherAccount.address);
      });

      it("Should not mint the NFT", async function () {
        const { nft, tokenId, otherAccount } = await loadFixture(deployLBM);

        await expect(
          nft.connect(otherAccount).mint(otherAccount.address, tokenId)
        ).revertedWith("Only owner can mint");
      });
    });
  });
});
