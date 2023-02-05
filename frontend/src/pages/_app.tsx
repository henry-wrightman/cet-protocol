import Script from "next/script";
import { NextSeo } from "next-seo";
import * as React from "react";
import type { AppProps } from "next/app";
import { WagmiConfig, createClient, configureChains } from "wagmi";
import {
  localhost,
  goerli,
  mainnet,
  optimism,
  optimismGoerli,
  polygonMumbai,
  polygon,
  hardhat,
} from "@wagmi/core/chains";
import NextHead from "next/head";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import "../styles/globals.css";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID;

const { chains, provider } = configureChains(
  [
    goerli,
    mainnet,
    // optimism,
    // optimismGoerli,
    polygonMumbai,
    polygon,
    hardhat,
  ],
  [
    alchemyProvider({ apiKey: alchemyId!, priority: 0 }),
    publicProvider({ priority: 1 }),
  ]
);

const client = createClient({
  autoConnect: true,
  provider,
  connectors: [
    //new InjectedConnector({ chains }),
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "1v1.bet",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
  ],
});

const apolloClient = new ApolloClient({
  uri: "http://localhost:8000/subgraphs/name/WagerRegistry",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <NextSeo
        title="1v1.bets"
        description=""
        canonical=""
        openGraph={{
          url: "",
          title: "1v1.bets",
          description: "",
          images: [
            {
              url: "",
              width: 1200,
              height: 630,
              alt: "1v1.bets",
              type: "image/png",
            },
          ],
          site_name: "1v1.bets",
        }}
        twitter={{
          handle: "@1v1.bets",
          cardType: "summary_large_image",
        }}
      />
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </WagmiConfig>
  );
}

export default MyApp;
