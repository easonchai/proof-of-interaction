import { DM_Sans } from "next/font/google";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import theme from "@/styles/thirdwebConnect";
import ProofOfInteraction from "@/contract/ProofOfInteraction";
import Oracle from "@/contract/Oracle";
import Head from "next/head";

const font = DM_Sans({ subsets: ["latin"] });
const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
};
const POI_ADDRESS = ProofOfInteraction.address;
const ORACLE_ADDRESS = Oracle.address;
const NFT_ADDRESS = "0x05c03A8bb760cfbBA289A19086d9BB0A766da261";
const AA_ADDRESS = "0x9fc5491dc9d5166edeacb0c10db1f87f3312202b";
const EXPLORER_URL = "https://goerli-optimism.etherscan.io/address";

export default function Home() {
  const hasHydrated = useHasHydrated();

  return (
    <>
      <div>
        <Head>
          <title>Optimism Deployments | Proof of Interaction - POISON 🔥</title>
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
      )}
    </>
  );
}
