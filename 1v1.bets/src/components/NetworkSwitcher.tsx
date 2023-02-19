import { useNetwork } from "wagmi";
import { Button } from "./common/Button";
import { Error } from "./common/Error";
import { switchNetwork } from "@wagmi/core";
import { useState } from "react";

export const NetworkSwitcher = () => {
  const { chain, chains } = useNetwork();
  const [loading, setLoading] = useState(false);

  const _switchNetwork = async (chainId: number) => {
    console.log(chainId);
    try {
      setLoading(true);
      await switchNetwork({ chainId });
    } catch {
      console.log("failed to switch network");
      //errorToast("Please switch to correct network");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {chain?.unsupported && (
        <div>
          {chains.map((x) =>
            x.id === chain?.id ? null : (
              <Button
                key={x.id}
                onClick={() => _switchNetwork(x.id)}
                showLoader={loading}
              >
                {`Switch to: ${x.name}`}
              </Button>
            )
          )}
        </div>
      )}
    </div>
  );
};
