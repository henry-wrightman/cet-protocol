import {
  usePrepareContractWrite,
  useContractWrite,
  useNetwork,
  useWaitForTransaction,
} from "wagmi";
import { REGISTRY_ADDRESSES, NETWORK } from "../../utils/constants";
import { Transaction } from "../Transaction";
import { ethers } from "ethers";
import REG_ABI from "../../../../subgraph/contractDeployments/0/WagerRegistry.json";

export const SettleWager = ({ wagerId }: { wagerId: string }) => {
  const { chain } = useNetwork();
  const network =
    chain && chain?.network ? (chain?.network as NETWORK) : "goerli";

  const { config, error } = usePrepareContractWrite({
    address: REGISTRY_ADDRESSES[network],
    abi: REG_ABI,
    functionName: "settleWager",
    args: [ethers.BigNumber.from(wagerId)],
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
      text="Settle Wager"
      tx={write}
      data={data?.hash!}
      error={error}
      isLoading={isLoading}
      isSuccess={isSuccess}
    />
  );
};
