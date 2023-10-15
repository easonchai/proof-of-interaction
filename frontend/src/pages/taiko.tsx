import Image from "next/image";
import { DM_Sans } from "next/font/google";
import ProofOfInteraction from "@/contract/ProofOfInteraction";
import {
  useSigner,
  useContract,
  useContractWrite,
  ConnectWallet,
  Web3Button,
} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import { API } from "../../utils/axios";
import { generatePoiMessageTemplate } from "../../utils/poi";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import { ValidationRequestDto } from "@/apis/validation";
import Link from "next/link";
import theme from "@/styles/thirdwebConnect";
import BaseModal from "@/components/BaseModal";
import useGameStore from "../../utils/store";
import Badges from "@/components/Badges";
import Head from "next/head";

const font = DM_Sans({ subsets: ["latin"] });
const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
};
const POI_ADDRESS = "0xa1Ee1C974618d6459c3329B326074C82cDD3F952";
const ORACLE_ADDRESS = "0x507DFC84cDAE4f69d1bef2F7376224f2767fE09b";
const NFT_ADDRESS = "0x9fc5491Dc9D5166edeaCB0C10DB1f87F3312202b";
const EXPLORER_URL = "https://explorer.jolnir.taiko.xyz/address";

export default function Home() {
  const hasHydrated = useHasHydrated();

  return (
    <>
      <div>
        <Head>
          <title>Taiko Deployments | Proof of Interaction - POISON 🔥</title>
        </Head>
      </div>
      {hasHydrated ? (
        <main
          className={`flex min-h-screen flex-col items-center px-4 py-8 lg:px-20 lg:py-16 text-brand-primaryDark ${font.className}`}
        >
          <header className="flex flex-row w-full items-center justify-between">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col"
            >
              <h1 className="font-bold text-lg lg:text-2xl mb-2 text-brand-primary">
                Proof Of Interaction
              </h1>
              <span className="pointer-events-none flex place-items-center gap-2 lg:pointer-events-auto text-sm">
                By POISON 🔥
              </span>
            </Link>
            <ConnectWallet
              theme={theme}
              btnTitle={"Log In To Play"}
              modalTitle={"Log In via"}
              modalSize={"wide"}
              welcomeScreen={{
                subtitle:
                  "Login with your email or continue as guest to get started",
                title: "Experience the power of Proof of Interaction",
              }}
              // modalTitleIconUrl={"asdasd"}
            />
          </header>
          <div className="flex flex-col my-16 gap-y-6 w-full items-start justify-start">
            <Link href="/">&lt; Back</Link>
            <div className="flex flex-col">
              <h1 className="font-bold text-2xl text-brand-primary">
                Taiko Smart Contract Addresses
              </h1>
              <p>Click on the address to navigate to the block explorer</p>
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold text-brand-primary text-lg">
                Proof Of Interaction
              </h2>
              <Link
                href={`${EXPLORER_URL}/${POI_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className=""
              >
                {POI_ADDRESS}
              </Link>
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold text-brand-primary text-lg">Oracle</h2>
              <Link
                href={`${EXPLORER_URL}/${ORACLE_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className=""
              >
                {ORACLE_ADDRESS}
              </Link>
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold text-brand-primary text-lg">
                Location Based NFT
              </h2>
              <Link
                href={`${EXPLORER_URL}/${NFT_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className=""
              >
                {NFT_ADDRESS}
              </Link>
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold text-brand-primary text-lg">
                EntryPoint
              </h2>
              <Link
                href={`${EXPLORER_URL}/0x21Cda22E89F689F8E503F6F802aa452Fce66c6ff`}
                target="_blank"
                rel="noopener noreferrer"
                className=""
              >
                0x21Cda22E89F689F8E503F6F802aa452Fce66c6ff
              </Link>
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold text-brand-primary text-lg">
                AA Wallet Factory
              </h2>
              <Link
                href={`${EXPLORER_URL}/0xf1F9dC41407183AE2706e4618CA3A30bd1A644d2`}
                target="_blank"
                rel="noopener noreferrer"
                className=""
              >
                0xf1F9dC41407183AE2706e4618CA3A30bd1A644d2
              </Link>
            </div>
          </div>
          <Image
            className="mb-4"
            src="/assets/taiko-tile.png"
            alt="Taiko Logo"
            width={180}
            height={180}
            priority
          />
          <p>We ❤️ Taiko, and so should you!</p>
        </main>
      ) : (
        <></>
      )}
    </>
  );
}
