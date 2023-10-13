import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Proof Of Interaction", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployPOI() {
    const VERIFIER_URL = ethers.id("https://verifier.com/anything");

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const ProofOfInteraction = await ethers.getContractFactory(
      "ProofOfInteraction"
    );
    const proofOfInteraction = await ProofOfInteraction.deploy(VERIFIER_URL);

    return {
      proofOfInteraction,
      VERIFIER_URL,
      owner,
      otherAccount,
    };
  }

  describe("Deployment", function () {
    it("Should set the right verifierInfo", async function () {
      const { proofOfInteraction, VERIFIER_URL } = await loadFixture(deployPOI);

      expect(await proofOfInteraction.verifierInfo()).to.equal(VERIFIER_URL);
    });
  });

  describe("Proofs", function () {
    describe("Save Interactions", function () {
      it("Should save the interaction", async function () {
        const { proofOfInteraction } = await loadFixture(deployPOI);

        const hash =
          "0x31adbbd39bb10b8a425a13f5b5fff4afccc957c84c638fa5195aac241422656d";
        const signature =
          "0x4b7b2fe3d43b338e201a5320c6a7bff276035d7eac2836bfa4c3e307391b7abc0d5f4e36fea29cd49b0a754f4b8554d1b372b53f8ce70ce1f605aacb7a3681481c";

        await expect(proofOfInteraction.saveInteraction(hash, signature)).emit(
          proofOfInteraction,
          "Interaction"
        );
      });

      it("Should show the correct hash to signature", async function () {
        const { proofOfInteraction } = await loadFixture(deployPOI);

        const hash =
          "0x31adbbd39bb10b8a425a13f5b5fff4afccc957c84c638fa5195aac241422656d";
        const signature =
          "0x4b7b2fe3d43b338e201a5320c6a7bff276035d7eac2836bfa4c3e307391b7abc0d5f4e36fea29cd49b0a754f4b8554d1b372b53f8ce70ce1f605aacb7a3681481c";

        await expect(proofOfInteraction.saveInteraction(hash, signature)).emit(
          proofOfInteraction,
          "Interaction"
        );

        expect(await proofOfInteraction.hashToSignature(hash)).equal(signature);
      });

      it("Should show the correct address tied to the hash", async function () {
        const { proofOfInteraction, owner } = await loadFixture(deployPOI);

        const hash =
          "0x31adbbd39bb10b8a425a13f5b5fff4afccc957c84c638fa5195aac241422656d";
        const signature =
          "0x4b7b2fe3d43b338e201a5320c6a7bff276035d7eac2836bfa4c3e307391b7abc0d5f4e36fea29cd49b0a754f4b8554d1b372b53f8ce70ce1f605aacb7a3681481c";

        await expect(proofOfInteraction.saveInteraction(hash, signature)).emit(
          proofOfInteraction,
          "Interaction"
        );

        expect(await proofOfInteraction.hashToAddress(hash)).equal(
          "0xB540Aee8Fc7B5AA9A57a43c1B1685b5138cf7583"
        );
      });

      it("Shouldn't allow two of the same hashes", async function () {
        const { proofOfInteraction } = await loadFixture(deployPOI);

        const hash =
          "0x31adbbd39bb10b8a425a13f5b5fff4afccc957c84c638fa5195aac241422656d";
        const signature =
          "0x4b7b2fe3d43b338e201a5320c6a7bff276035d7eac2836bfa4c3e307391b7abc0d5f4e36fea29cd49b0a754f4b8554d1b372b53f8ce70ce1f605aacb7a3681481c";

        await expect(proofOfInteraction.saveInteraction(hash, signature)).emit(
          proofOfInteraction,
          "Interaction"
        );
        await expect(
          proofOfInteraction.saveInteraction(hash, signature)
        ).revertedWith("Interaction has been made before!");
      });
    });
  });

  describe("Verify", function () {
    describe("Signed message", function () {
      it("Should be able to retrieve the true owner", async function () {
        const { proofOfInteraction, owner, otherAccount } = await loadFixture(
          deployPOI
        );

        const message = "testing";
        const hash = ethers.id(
          `\x19Ethereum Signed Message:\n${message.length}${message}`
        );
        const signature = await owner.signMessage(message);

        await expect(
          proofOfInteraction
            .connect(otherAccount)
            .saveInteraction(hash, signature)
        ).emit(proofOfInteraction, "Interaction");
        expect(await proofOfInteraction.hashToAddress(hash)).equal(
          owner.address
        );
        expect(
          await proofOfInteraction.verifySigner(hash, signature, owner.address)
        ).equal(true);
        expect(await proofOfInteraction.recoverSigner(hash, signature)).equal(
          owner.address
        );
      });
    });
  });
});
