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

const font = DM_Sans({ subsets: ["latin"] });
const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
};
const POI_ADDRESS = "0x377B94782f9fb202DE2b9c49a10c14dAFB312782";
const ORACLE_ADDRESS = "0x0B12308d1ADfe3e0abc6Ed5DD6E19e7707E1143B";
const NFT_ADDRESS = "0x507DFC84cDAE4f69d1bef2F7376224f2767fE09b";
const AA_ADDRESS = "0x9fc5491dc9d5166edeacb0c10db1f87f3312202b";
const EXPLORER_URL = "https://explorer.jolnir.taiko.xyz/address";

export default function Home() {
  const hasHydrated = useHasHydrated();

  return hasHydrated ? (
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
          switchToActiveChain={true}
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
            Smart Contract Addresses
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
            AA Wallet Factory
          </h2>
          <Link
            href={`${EXPLORER_URL}/${AA_ADDRESS}`}
            target="_blank"
            rel="noopener noreferrer"
            className=""
          >
            {AA_ADDRESS}
          </Link>
        </div>
      </div>
    </main>
  ) : (
    <></>
  );
}
