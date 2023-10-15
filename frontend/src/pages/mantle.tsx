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
const POI_ADDRESS = "0x0A2134B97F973a2784B49e825E85EbD123a9fFD9";
const ORACLE_ADDRESS = "0xa8eb4D756e773899599FbaE14151FfD7f7332cb4";
const NFT_ADDRESS = "0x7fc098dcCBc2E194ca51c9313b8cb6AAc39AA983";
const EXPLORER_URL = "https://explorer.testnet.mantle.xyz/address";

export default function Home() {
  const hasHydrated = useHasHydrated();

  return (
    <>
      <div>
        <Head>
          <title>Mantle Deployments | Proof of Interaction - POISON 🔥</title>
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
                Mantle Smart Contract Addresses
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
                href={`${EXPLORER_URL}/0x3063e94A589D99F29Ae789Ba6171645D3828860D`}
                target="_blank"
                rel="noopener noreferrer"
                className=""
              >
                0x3063e94A589D99F29Ae789Ba6171645D3828860D
              </Link>
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold text-brand-primary text-lg">
                AA Wallet Factory
              </h2>
              <Link
                href={`${EXPLORER_URL}/0x126b53E88c993ec0e9a03A9c374D7fBbE9D53e7B`}
                target="_blank"
                rel="noopener noreferrer"
                className=""
              >
                0x126b53E88c993ec0e9a03A9c374D7fBbE9D53e7B
              </Link>
            </div>
          </div>
          <Image
            className="mb-4"
            src="/assets/mantle-tile.png"
            alt="Mantle Logo"
            width={180}
            height={180}
            priority
          />
          <p>We ❤️ Mantle, this app about to be mental! 🤯</p>
        </main>
      ) : (
        <></>
      )}
    </>
  );
}
