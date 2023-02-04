import { useAccount, useNetwork, useSigner } from "wagmi";
import { Account, Connect, DeploySteps, NetworkSwitcher } from "../components";
import { WagersList } from "../components/wagers";
import { useIsMounted } from "../hooks";
import type { NextPage } from "next";

const Page: NextPage = () => {
  const isMounted = useIsMounted();
  const { address } = useAccount();
  const { data: signer } = useSigner();
  const { chain } = useNetwork();

  return (
    // <div className="font-sans w-full flex flex-row items-center m-2 p-3 space-y-2 bg-lightgray">
    //   <div className="grid h-full border-[1px] p-5 rounded-xl border-black justify-items-center">
    //     <Connect />
    //     {isMounted && address && (
    //       <>
    //         <Account />
    //         {chain && signer && (
    //           <div className="pt-5">
    //             <DeploySteps signer={signer} signerAddress={address} chainId={chain.id} />
    //           </div>
    //         )}
    //       </>
    //     )}
    //   </div>
    <>
      <div className="min-h-screen bg-green-200 font-normal">
        <div className="flex flex-col md:p-5 md:flex-row lg:flex-row">
          <div className="sm:basis-full md:basis-1/3 lg:basis-1/3 justify-center m-2 md:h-[400px] lg:h-[400px]">
            <Connect />
            {isMounted && address && (
              <>
                <Account />
                {chain && signer && (
                  <div className="pt-2">
                    <DeploySteps
                      signer={signer}
                      signerAddress={address}
                      chainId={chain.id}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          <div className="h-[400px] sm:basis-full h-[500px] md:basis-9/12 lg:basis-9/12 overflow-scroll rounded-xl p-1 lg:p-3 m-2 shadow-sm bg-purple-800">
            <WagersList />
          </div>
        </div>
      </div>
      <div className="text-center bg-purple-800 text-white bottom-0 position-absolute">
        <span>Built with The Graph | Ethereum | ChainLink | UMA </span>
      </div>
    </>
    // {/* {isMounted && address && (
    //   <div className="w-full h-full m-10 p-5 rounded-xl border-black">
    //     <>Recent Wagers</>
    //   </div>
    // )} */}
    //</div>
  );
};

export default Page;
