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
      
      {isMounted && (
        <div className="min-h-screen bg-blue-200 font-normal text-center">
          <div className="flex flex-col md:p-5 md:flex-row lg:flex-row justify-center">
            <div className="sm:basis-full md:basis-1/3 lg:basis-1/3  m-2 p-3 shadow-md rounded-lg bg-white min-w-[250px] min-h-[50px] border-black border-[1px]">
              <span className="">
                Coming Soon
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
