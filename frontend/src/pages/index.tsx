import Image from "next/image";
import { DM_Sans } from "next/font/google";
import ProofOfInteraction from "@/contract/ProofOfInteraction";
import {
  useSigner,
  useContract,
  useContractWrite,
  ConnectWallet,
  Web3Button,
  lightTheme,
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

const font = DM_Sans({ subsets: ["latin"] });
const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
};

export default function Home() {
  const searchParams = useSearchParams();
  const hasHydrated = useHasHydrated();
  const signer = useSigner();
  const { contract } = useContract(
    ProofOfInteraction.address,
    ProofOfInteraction.abi
  );
  const { mutateAsync, isLoading } = useContractWrite(
    contract,
    "saveInteraction"
  );

  const e = searchParams.get("e");
  const c = searchParams.get("c");
  const [geolocation, setGeolocation] = useState<GeolocationCoordinates>();

  // const e = "00000000000000000000000000000000";
  // const c = "0000000000000000";
  const saveAction = async () => {
    if (signer) {
      // const encryptedData = `e=${e}&c=${c}`;
      const encryptedData = new Date().toString();
      const message = generatePoiMessageTemplate(encryptedData);

      // utils.id is equivalent to utils.keccak256(utils.toUtf8Bytes(VALUE))
      const hash = ethers.utils.id(
        `\x19Ethereum Signed Message:\n${message.length}${message}`
      );
      const signature = await signer.signMessage(message);

      if (contract) {
        const payload = {
          e: "8177C60FE1BA3A2C78640C800CF1B961",
          c: "55C27913700F48BD",
          geolocation: geolocation
            ? {
                latitude: geolocation.latitude,
                longitude: geolocation.longitude,
                altitude: geolocation.altitude,
              }
            : undefined,
          encryptedData: hash,
        } as ValidationRequestDto;

        API.post("/validation/api", payload).then(() =>
          toast.success("Validation saved on API")
        );

        await mutateAsync({
          args: [hash, signature], // We store hash and signature so we can recover the original signer
        });

        console.log(hash, "=>", signature);
      }
    }
  };

  useEffect(() => {
    if (navigator) {
      navigator.geolocation.getCurrentPosition(
        (data) => {
          setGeolocation(data.coords);
          toast.success("📍 Location Based NFT Minting enabled!");
        },
        (error) => {
          console.error(error);
          setGeolocation(undefined);
          if (error.message === "User denied Geolocation") {
            toast(
              "Please enable location services to access Location Based NFTs 🌎"
            );
          }
        }
      );
    }
  }, []);

  return hasHydrated ? (
    <main
      className={`flex min-h-screen flex-col items-center justify-between px-4 py-8 lg:px-20 lg:py-16 text-brand-primaryDark ${font.className}`}
    >
      <header className="flex flex-row w-full items-center justify-between">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col"
        >
          <h1 className="font-bold text-2xl mb-2 text-brand-primary">
            Proof Of Interaction
          </h1>
          <span className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0 text-sm">
            By POISON 🔥{" "}
            {/* <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            width={100}
            height={24}
            priority
          /> */}
          </span>
        </Link>
        <ConnectWallet
          theme={lightTheme({
            colors: {
              accentText: "#2563eb",
              accentButtonBg: "#2563eb",
              borderColor: "#E2E8F0",
              separatorLine: "#E2E8F0",
              primaryText: "#1f3b8a",
              secondaryText: "#64748b",
              primaryButtonBg: "#2563eb",
              secondaryButtonText: "#1f3b8a",
            },
          })}
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

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-['']  before:lg:h-[360px]">
        <Image
          className="relative"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      {e && c ? (
        <Web3Button
          className={clsx(isLoading ? "opacity-70 cursor-not-allowed" : "")}
          isDisabled={isLoading}
          contractAddress={ProofOfInteraction.address}
          contractAbi={ProofOfInteraction.abi}
          action={saveAction}
          onSuccess={() => {
            toast.success("Signature saved on chain!");
          }}
          onError={(error: any) => {
            if (error) {
              console.error({ error });
              toast.error("Uh oh! Something wen't wrong!");
            }
          }}
        >
          Save Interaction
        </Web3Button>
      ) : null}

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://github.com/easonchai/proof-of-interaction"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            GitHub{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn more about the code and see how it&apos;s done
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Discover and deploy boilerplate example Next.js&nbsp;projects.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  ) : (
    <></>
  );
}
