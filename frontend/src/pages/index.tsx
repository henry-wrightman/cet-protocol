import { useAccount, useNetwork, useSigner } from "wagmi";
import { Account, Connect, App, NetworkSwitcher } from "../components";
import { WagersList } from "../components/wagers";
import { useIsMounted } from "../hooks";
import type { NextPage } from "next";

const Page: NextPage = () => {
  const isMounted = useIsMounted();
  const { address } = useAccount();
  const { data: signer } = useSigner();
  const { chain } = useNetwork();

  return (
    <>
      <div className="min-h-screen bg-green-200 font-normal">
        <div className="flex flex-col md:p-5 md:flex-row lg:flex-row">
          <div className="sm:basis-full md:basis-1/3 lg:basis-1/3 justify-center m-2 p-3 shadow-md rounded-lg bg-gray-200">
            <Connect />
            {isMounted && address && (
              <>
                <Account />
                {chain && signer && (
                  <div className="pt-2">
                    <App
                      signer={signer}
                      signerAddress={address}
                      chainId={chain.id}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          <div className="md:h-[500px] lg:h-[500px] sm:basis-full md:basis-9/12 lg:basis-9/12 overflow-scroll rounded-xl p-1 lg:p-3 m-2 shadow-sm bg-purple-800">
            <WagersList />
          </div>
        </div>
      </div>
      <div className="text-center bg-purple-800 text-white bottom-0 position-absolute">
        <span>Built with The Graph | Ethereum | ChainLink | UMA </span>
      </div>
    </>
  );
};

export default Page;
