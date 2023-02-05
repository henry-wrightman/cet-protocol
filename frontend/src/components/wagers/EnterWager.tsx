import {
  usePrepareContractWrite,
  useContractWrite,
  useNetwork,
  useWaitForTransaction,
} from "wagmi";
import { REGISTRY_ADDRESSES, NETWORK } from "../../utils/constants";
import { Transaction } from "../Transaction";
import { ethers, utils, Transaction as T } from "ethers";
import REG_ABI from "../../../../subgraph/contractDeployments/0/WagerRegistry.json";

export const EnterWager = ({
  wagerId,
  wagerData,
  wagerAmount,
  successCallback,
}: {
  wagerId: string;
  wagerData: string;
  wagerAmount: string;
  successCallback?: (data: string) => void;
}) => {
  const { chain } = useNetwork();
  const network =
    chain && chain?.network ? (chain?.network as NETWORK) : "goerli";

  const { config, error } = usePrepareContractWrite({
    address: REGISTRY_ADDRESSES[network],
    abi: REG_ABI,
    functionName: "enterWager",
    args: [ethers.BigNumber.from(wagerId), wagerData],
    overrides: {
      value: ethers.utils.parseEther(wagerAmount),
    },
    onError: (err) => {
      console.log("err: " + err);
    },
    onSuccess: (res) => {
      console.log("suc" + res);
    },
  });
  const { data, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <Transaction
      text="Confirm"
      buttonClassAdditions={"bg-white text-black font-bold"}
      tx={write}
      error={error}
      data={data?.hash!}
      successCallback={successCallback}
      isLoading={isLoading}
      isSuccess={isSuccess}
    />
  );
};
