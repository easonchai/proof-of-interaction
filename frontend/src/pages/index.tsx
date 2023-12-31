import Image from "next/image";
import { DM_Sans } from "next/font/google";
import ProofOfInteraction from "@/contract/ProofOfInteraction";
import {
  useSigner,
  useContract,
  useContractWrite,
  ConnectWallet,
  Web3Button,
  useChain,
} from "@thirdweb-dev/react";
import { useContext, useEffect, useState } from "react";
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
import Confetti from "@/components/Confetti";
import Head from "next/head";
import {
  OptimismGoerli,
  TaikoJolnirL2,
  MantleTestnet,
} from "@thirdweb-dev/chains";
import ChainContext from "@/context/Chain";

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
  const { collect, history, trackHistory } = useGameStore();
  const hasHydrated = useHasHydrated();
  const signer = useSigner();
  const [contract, setContract] = useState<any>();
  const { mutateAsync, isLoading } = useContractWrite(
    contract,
    "saveInteraction"
  );

  const e = searchParams.get("e");
  const c = searchParams.get("c");
  const [geolocation, setGeolocation] = useState<GeolocationCoordinates>();
  const [isFirstTime, setIsFirstTime] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFound, setIsFound] = useState<boolean>(false);
  const [toastId, setToastId] = useState<string | null>(null);

  const { selectedChain, setSelectedChain } = useContext(ChainContext);
  const chain = useChain();

  useEffect(() => {
    if (chain?.chainId) {
      if (chain.chainId === OptimismGoerli.chainId) {
        setSelectedChain(OptimismGoerli);
      } else if (chain.chainId === TaikoJolnirL2.chainId) {
        setSelectedChain(TaikoJolnirL2);
      } else if (chain.chainId === MantleTestnet.chainId) {
        setSelectedChain(MantleTestnet);
      } else {
        setSelectedChain(OptimismGoerli);
      }
    }
  }, [chain?.chainId]);

  const saveAction = async (contract: any) => {
    setContract(contract);
    if (signer) {
      const encryptedData = `e=${e}&c=${c}`;
      const message = generatePoiMessageTemplate(encryptedData);

      // utils.id is equivalent to utils.keccak256(utils.toUtf8Bytes(VALUE))
      const hash = ethers.utils.id(
        `\x19Ethereum Signed Message:\n${message.length}${message}`
      );
      const signature = await signer.signMessage(message);

      if (contract) {
        const payload = {
          e,
          c,
          geolocation: geolocation
            ? JSON.stringify({
                latitude: geolocation.latitude,
                longitude: geolocation.longitude,
                altitude: geolocation.altitude,
              })
            : undefined,
          encryptedData: hash,
        } as ValidationRequestDto;

        API.post("/validation/api", payload)
          .then((res) => {
            if (res && res.data) {
              // console.log(res.data);
              collect(res.data);
            }
            trackHistory(`e=${e}&c=${c}`);
            toast.success("Validation saved on API");
          })
          .catch(() => toast.error("Error validating with API"));

        await mutateAsync({
          args: [hash, signature], // We store hash and signature so we can recover the original signer
        });

        // console.log(hash, "=>", signature);
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
              "Please enable location services to access Location Based NFTs 🌎. You can still continue to play this game!"
            );
          }
        }
      );
    }
  }, []);

  useEffect(() => {
    if (e && c) {
      const data = `e=${e}&c=${c}`;
      if (!history[data]) {
        setIsFound(true);
      }
    }
  }, [e, c]);

  const getContractAddress = () => {
    const help =
      chain?.chainId === TaikoJolnirL2.chainId
        ? "0xa1Ee1C974618d6459c3329B326074C82cDD3F952"
        : chain?.chainId === MantleTestnet.chainId
        ? "0x0A2134B97F973a2784B49e825E85EbD123a9fFD9"
        : ProofOfInteraction.address;
    return help;
  };

  // Check if wallet is new & not deployed yet
  // Thirdweb really need to up their game lmao, I can't keep searching through all their files to figure out how to do this
  useEffect(() => {
    const checkFirstTime = async () => {
      const erc4337Signer: any = signer;
      if (erc4337Signer && erc4337Signer.smartAccountAPI) {
        if (await erc4337Signer.smartAccountAPI.checkAccountPhantom()) {
          setIsFirstTime(true);
        }
      }
    };
    checkFirstTime();
  }, [signer]);

  return (
    <>
      <div>
        <Head>
          <title>Proof of Interaction - POISON 🔥</title>
        </Head>
      </div>
      {hasHydrated ? (
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
                img: {
                  src: "/logo.png",
                  width: 150,
                  height: 150,
                },
              }}
              modalTitleIconUrl={"/logo.png"}
            />
          </header>
          <div className="flex flex-col max-w-xl my-8 mb-16">
            <Badges />
          </div>

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
              href="/mantle"
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                Mantle Contracts{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  →
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                Discover and track these interactions
              </p>
            </a>

            <a
              href="/taiko"
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                Taiko Contracts{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  →
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                Discover and track these interactions
              </p>
            </a>

            <a
              href="/optimism"
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                Optimism Contracts{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  →
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                Discover and track these interactions
              </p>
            </a>
          </div>

          <BaseModal isOpen={isFound} setIsOpen={setIsFound} title>
            <div className="flex flex-col items-center justify-center gap-2 px-2 -mt-5">
              <h1 className="text-3xl mb-2 font-bold italic text-brand-primary text-center">
                🎉 <br /> Congratulations!
              </h1>
              <p className="text-lg text-brand-primary font-bold">
                You found a treasure!
              </p>
              <p className="text-brand-secondary text-center mb-4">
                Click the button below to save your interaction on the
                blockchain!
              </p>
              {e && c ? (
                <Web3Button
                  className={clsx(
                    isLoading ? "!opacity-70 cursor-not-allowed" : ""
                  )}
                  isDisabled={isLoading}
                  contractAddress={getContractAddress()}
                  contractAbi={ProofOfInteraction.abi}
                  action={saveAction}
                  onSuccess={() => {
                    toast.success("Signature saved on chain!");
                    toast.dismiss("loading");
                    setToastId(null);
                  }}
                  onError={(error: any) => {
                    if (error) {
                      console.error({ error });
                      toast.error("Uh oh! Something wen't wrong!");
                    }
                    toast.dismiss("loading");
                    setToastId(null);
                  }}
                  onSubmit={() => {
                    setIsFound(false);
                    if (isFirstTime) {
                      setIsOpen(true);
                      setIsFirstTime(false);
                    }
                    const toastId = toast.loading(
                      "Saving interaction... Please do not close this page.",
                      {
                        id: "loading",
                      }
                    );
                    setToastId(toastId);
                  }}
                  theme={theme}
                  connectWallet={{
                    btnTitle: "Log In To Continue",
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
                  {isLoading ? "Saving..." : "Save Interaction"}
                </Web3Button>
              ) : null}
            </div>
          </BaseModal>

          <BaseModal isOpen={isOpen} setIsOpen={setIsOpen} title>
            <div className="flex flex-col items-center justify-center gap-2 px-2 -mt-5">
              <h1 className="text-[4rem] mb-2">👋🏼</h1>
              <p className="text-xl text-brand-primary font-bold">
                Thank you for trying us out!
              </p>
              <p className="text-brand-secondary text-center">
                Since it&apos;s your first time, the initial saving may take a
                little while. This is because your account has to be initialized
                behind the scenes. Thank you for your patience!
              </p>
              <p className="text-xs italic text-brand-secondary mt-2 text-center">
                P.S. You&apos;re now using the blockchain without you even
                knowing! 🤫
              </p>
              <button
                className="bg-brand-primary font-bold rounded-md px-6 py-3 mt-4 text-white"
                onClick={() => setIsOpen(false)}
              >
                LFG! 🔥
              </button>
            </div>
          </BaseModal>
        </main>
      ) : (
        <></>
      )}
    </>
  );
}
