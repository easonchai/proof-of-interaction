/* eslint-disable @next/next/no-img-element */
import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import clsx from "clsx";
import useGameStore, { Badge } from "../../utils/store";
import InfoModal from "./InfoModal";
import { Web3Button, useContract, useContractWrite } from "@thirdweb-dev/react";
import ProofOfInteraction from "@/contract/ProofOfInteraction";
import { ethers } from "ethers";
import theme from "@/styles/thirdwebConnect";
import HintModal from "./HintModal";

interface ITile {
  tile: Badge;
  className?: string;
}

function getPositionSuffix(num: number): string {
  if (num >= 11 && num <= 13) {
    return num + "th";
  }

  const lastDigit = num % 10;

  switch (lastDigit) {
    case 1:
      return num + "st";
    case 2:
      return num + "nd";
    case 3:
      return num + "rd";
    default:
      return num + "th";
  }
}

export default function Tile({ tile, className }: ITile) {
  const found = useMemo(() => {
    return tile.collected;
  }, [tile]);
  const type = useMemo(() => {
    if (found) return "Info";
    return "Hint";
  }, [found]);
  const [isOpen, setIsOpen] = useState(false);
  const { contract } = useContract(
    ProofOfInteraction.address,
    ProofOfInteraction.abi
  );
  const { mutateAsync, isLoading } = useContractWrite(contract, "selectWinner");
  const { mint } = useGameStore();

  const claimAsNFT = async () => {
    if (tile.tokenId && !tile.minted) {
      await mutateAsync({
        args: [
          ethers.utils.hexZeroPad(`0x${BigInt(tile.tokenId).toString(16)}`, 32),
        ],
      });
    }
  };

  return (
    <button
      className={clsx(
        "relative w-full md:max-w-[192px] flex items-center justify-center active:scale-90 transition-transform",
        className
      )}
      onClick={() => setIsOpen(true)}
    >
      <Image
        src={found ? tile.imageUrl : "/assets/locked-tile.svg"}
        alt=""
        width={384}
        height={384}
        layout="responsive"
        className={clsx(found ? "drop-shadow-claimed" : "")}
      />
      {type === "Hint" ? (
        <HintModal
          title={`Need help? Here's a hint for you ❤️`}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        >
          <div className="flex flex-col gap-4 items-center">
            <div className="flex max-w-[128px]">
              <Image
                src="/hug-heart.png"
                alt=""
                width={128}
                height={128}
                layout="responsive"
              />
            </div>
            <p className="text-brand-primaryDark text-center italic">
              {tile.hint}
            </p>
            <button
              className="font-bold rounded-md px-6 py-3 text-brand-primary"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </HintModal>
      ) : (
        <InfoModal
          title={`Congratulations! You've found ${tile.name}! 🎉`}
          description={`Let's take a look back at how you did!`}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        >
          <div className="flex flex-col gap-4 items-center">
            <div className="flex max-w-[128px]">
              <Image
                src={tile.imageUrl}
                alt=""
                width={128}
                height={128}
                layout="responsive"
                className="drop-shadow-brand"
              />
            </div>
            {tile.position && (
              <div className="flex flex-col w-full items-start">
                <p className="text-xl font-bold text-brand-primary">
                  Position #{tile.position}
                </p>
                <p className="text-brand-primaryDark">
                  You&apos;re the {getPositionSuffix(tile.position)} person who
                  found this treasure!
                </p>
              </div>
            )}
            <Web3Button
              className={clsx(
                isLoading || tile.minted ? "!opacity-70 cursor-not-allowed" : ""
              )}
              isDisabled={isLoading || tile.minted}
              contractAddress={ProofOfInteraction.address}
              contractAbi={ProofOfInteraction.abi}
              action={claimAsNFT}
              onSuccess={() => {
                toast.success("Your NFT is minted!");
                if (tile.tokenId) {
                  mint({
                    tokenId: tile.tokenId,
                  });
                }
              }}
              onError={(error: any) => {
                if (error) {
                  console.error({ error });
                  toast.error("Uh oh! Something wen't wrong!");
                }
              }}
              theme={theme}
              connectWallet={{
                btnTitle: "Log In To Play",
                modalTitle: "Log In via",
                modalSize: "wide",
                welcomeScreen: {
                  subtitle:
                    "Login with your email or continue as guest to get started",
                  title: "Experience the power of Proof of Interaction",
                  img: {
                    src: "/logo.png",
                    width: 150,
                    height: 150,
                  },
                },
              }}
            >
              {isLoading
                ? "Saving..."
                : tile.minted
                ? "Already minted!"
                : "Claim as NFT"}
            </Web3Button>
            <button
              className="font-bold rounded-md px-6 py-3 text-brand-primary"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </InfoModal>
      )}
    </button>
  );
}
