import { useAccount, useNetwork, useSigner } from "wagmi";
import { Account, Connect, App, NetworkSwitcher } from "../components";
import { WagersList, PriceFeed } from "../components/wagers";
import { Label } from "../components/common";
import { useIsMounted } from "../hooks";
import type { NextPage } from "next";
import Link from "next/link";

const Page: NextPage = () => {
  const isMounted = useIsMounted();
  const { address, isConnected } = useAccount();
  const { data: signer } = useSigner();
  const { chain } = useNetwork();

  return (
    <>
      <div className="min-h-screen bg-green-200 font-normal">
        {chain?.unsupported && (
          <div className="flex flex-col md:p-5 md:flex-row lg:flex-row">
            <div className="flex-row">
              <div className="sm:basis-full md:basis-1/3 lg:basis-1/3 justify-center m-2 p-3 shadow-md rounded-lg bg-white min-w-[250px] min-h-[50px] border-black border-[1px]">
                <span className="text-center">
                  Currently only available on Goerli. Please switch networks!
                </span>
              </div>
            </div>
          </div>
        )}
        {!chain?.unsupported && (
          <>
            <div className="hidden md:flex lg:flex">
              <div className="h-[30px] m-2 p-4 w-full text-left cursor-pointer">
                <Link href="">
                  <span className="m-2">github</span>
                </Link>
                <Link href="">
                  <span className="m-2">audit</span>
                </Link>
              </div>
            </div>
            <div className="flex flex-col md:p-5 md:flex-row lg:flex-row">
              <div className="flex-row">
                <div className="sm:basis-full md:basis-1/3 lg:basis-1/3 justify-center m-2 p-3 shadow-md rounded-lg bg-white min-w-[250px] min-h-[50px] border-black border-[1px]">
                  <Connect />
                  {isMounted && address && <Account />}
                </div>
                {isMounted && address && (
                  <div className="sm:basis-full md:basis-1/3 lg:basis-1/3 justify-center m-2 p-3 shadow-md rounded-lg bg-white min-h-[250px] overflow-hidden border-black border-[1px]">
                    {chain && signer && isConnected && (
                      <div className="pt-2">
                        <App
                          signer={signer}
                          signerAddress={address}
                          chainId={chain.id}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="flex-row sm:w-full md:w-9/12 lg:w-9/12 sm:basis-full md:basis-9/12 lg:basis-9/12">
                <div className="h-[50px] rounded-lg p-1 m-2 shadow-md bg-white border-black border-[1px]">
                  <PriceFeed />
                </div>
                <div className="md:h-[500px] lg:h-[500px] h-[500px] overflow-scroll rounded-lg p-1 lg:p-3 m-2 shadow-md bg-white border-black border-[1px]">
                  <WagersList />
                </div>
                <div className="hidden md:flex lg:flex flex-col">
                  <div className="flex flex-row-reverse h-[10px] pr-10 w-full">
                    <Label className="m-5" ping={true}>
                      chainlink
                    </Label>
                    <Label className="m-5" ping={true}>
                      the graph
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="text-center bg-purple-800 text-white bottom-0 position-absolute p-2">
        <span>Built with The Graph | Ethereum | ChainLink | Tegridy ❤️ </span>
      </div>
    </>
  );
};

export default Page;
