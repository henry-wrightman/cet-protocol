import Script from "next/script";
import { NextSeo } from "next-seo";
import * as React from "react";
import type { AppProps } from "next/app";
import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import {
  goerli,
} from "@wagmi/core/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import "../styles/globals.css";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID;

const { chains, publicClient } = configureChains(
  [goerli],
  [alchemyProvider({ apiKey: alchemyId! })],
)

const config = createConfig({
  autoConnect: true,
  publicClient: publicClient,
  connectors: [
    //new InjectedConnector({ chains }),
    new MetaMaskConnector({ chains, options: { shimDisconnect: true }}),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagxr.xyz",
        // jsonRpcUrl: `https://eth-mainnet.alchemyapi.io/v2/${alchemyId!}`,
      },
    }),
    // new WalletConnectConnector({
    //   chains,
    //   options: {
    //     showQrModal: true,
    //     projectId: 'wagxr.xyz',
    //   },
    // }),
  ],
})

const apolloClient = new ApolloClient({
  uri: "http://localhost:8000/subgraphs/name/WagerRegistry",
  cache: new InMemoryCache(),
});

function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <NextSeo
        title="wagxr.xyz"
        description=""
        canonical=""
        openGraph={{
          url: "",
          title: "wagxr.xyz",
          description: "",
          images: [
            {
              url: "",
              width: 1200,
              height: 630,
              alt: "wagxr.xyz",
              type: "image/png",
            },
          ],
          site_name: "wagxr.xyz",
        }}
        twitter={{
          handle: "@wagxr.xyz",
          cardType: "summary_large_image",
        }}
      />
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </WagmiConfig>
  );
}

export default App;
