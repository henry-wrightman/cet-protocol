import { useAccount, useConnect, useNetwork } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Account, Connect, App, NetworkSwitcher } from "../components";
import { WagersList, PriceFeed } from "../components/wagers";
import { Label } from "../components/common";
import { useIsMounted } from "../hooks";
import type { NextPage } from "next";
import Link from "next/link";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { useEffect } from 'react';
import {
  goerli,
} from "@wagmi/core/chains";

const Page: NextPage = () => {
  const isMounted = useIsMounted();
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  })
  const { chain } = useNetwork();

  useEffect(() => {
    if (!chain && !isConnected) {
      connect()
    }
  }, [isConnected, address, chain])

  return (
    <>
      {isMounted && !chain && (
        <div className="min-h-screen bg-green-200 font-normal">
          <div className="flex flex-row md:p-5 md:flex-row lg:flex-row justify-center">
            <div className="text-center sm:basis-full md:basis-1/3 lg:basis-1/3  m-2 p-3 shadow-md rounded-lg bg-white min-w-[250px] min-h-[50px] border-black border-[1px]">
              <div className="">
                <span className="text-center">
                  Please install a web3 wallet to continue!
                </span>
              </div>
              <div className="">
                <span className="text-center">
                  <a
                    className="text-blue-600"
                    href="https://metamask.io/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Metamask
                  </a>
                </span>
              </div>
              <div className="">
                <span className="text-center">
                  <a
                    className="text-blue-600"
                    href="https://walletconnect.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    WalletConnect
                  </a>
                </span>
              </div>
              <div className="">
                <span className="text-center">
                  <a
                    className="text-blue-600"
                    href="https://www.coinbase.com/wallet"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Coinbase Wallet
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {isMounted && chain && (chain.unsupported || chain.id !== goerli.id) && (
        <div className="min-h-screen bg-green-200 font-normal">
          <div className="flex flex-col md:p-5 md:flex-row lg:flex-row justify-center">
            <div className="sm:basis-full md:basis-1/3 lg:basis-1/3  m-2 p-3 shadow-md rounded-lg bg-white min-w-[250px] min-h-[50px] border-black border-[1px]">
              <span className="text-center">
                Currently only available on Goerli. Please switch networks!
              </span>
            </div>
          </div>
        </div>
      )}

      {isMounted && chain && !chain.unsupported && (
        <>
          <div className="min-h-screen bg-green-200 font-normal">
            <div className="hidden md:flex lg:flex">
              <div className="h-[10px] m-1 p-2 w-full text-left cursor-pointer">
                {/* TODO MENU */}
              </div>
            </div>
            <div className="flex flex-col md:p-5 md:flex-row lg:flex-row">
              <div className="flex-row">
                <div className="sm:basis-full md:basis-1/3 lg:basis-1/3 justify-center m-2 p-3 shadow-md rounded-lg bg-white min-w-[250px] min-h-[50px] border-black border-[1px]">
                  <Connect />
                </div>
                {isMounted && address && (
                  <div className="sm:basis-full md:basis-1/3 lg:basis-1/3 justify-center m-2 p-3 shadow-md rounded-lg bg-white min-h-[250px] overflow-hidden border-black border-[1px]">
                    {chain && isConnected && (
                      <div className="pt-2">
                        <App
                          signerAddress={address}
                          chainId={chain.id}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="flex-row sm:w-full md:w-9/12 lg:w-9/12 sm:basis-full md:basis-9/12 lg:basis-9/12">
                <div className="h-[40px] rounded-lg p-1 m-2 shadow-md bg-white border-black border-[1px]">
                  <PriceFeed />
                </div>
                <div className="md:h-[500px] lg:h-[500px] h-[500px] overflow-scroll rounded-lg p-1 lg:p-3 m-2 shadow-md bg-white border-black border-[1px]">
                  <WagersList />
                </div>
                <div className="hidden md:flex lg:flex flex-col">

                </div>
              </div>
            </div>
          </div>
          <div className="text-center bg-purple-800 text-white bottom-0 position-absolute p-2">
            <span>
              Built with The Graph | Ethereum  | Tegridy ❤️{" "}
            </span>
          </div>
        </>
      )}
    </>
  );
};

export default Page;
