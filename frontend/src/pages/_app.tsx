import "@/styles/globals.css";
import { OptimismGoerli } from "@thirdweb-dev/chains";
import {
  ThirdwebProvider,
  smartWallet,
  localWallet,
} from "@thirdweb-dev/react";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

const config = {
  chain: OptimismGoerli,
  factoryAddress: "0x687A7B2A09EBCE0aaEEFd660dACe6d6F96a57375",
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  gasless: true,
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
      activeChain={OptimismGoerli}
      supportedChains={[OptimismGoerli]}
      supportedWallets={[
        smartWallet(
          localWallet({
            persist: true,
          }),
          config
        ),
      ]}
      // sdkOptions={{
      //   gassless: {
      //     openzeppelin: {
      //       relayerUrl: process.env.NEXT_PUBLIC_RELAYER_URL,
      //     },
      //   },
      // }}
    >
      <Component {...pageProps} />
      <Toaster position="top-center" reverseOrder={false} />
    </ThirdwebProvider>
  );
}
