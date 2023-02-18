import {
  usePrepareContractWrite,
  useContractWrite,
  useNetwork,
  useWaitForTransaction,
} from "wagmi";
import { REGISTRY_ADDRESSES, NETWORK } from "../../utils/constants";
import { Transaction } from "../Transaction";
import { ethers, utils } from "ethers";
import REG_ABI from "../../../../subgraph/contractDeployments/0/WagerRegistry.json";
import { TransactionReceipt } from "@ethersproject/providers";

export const EnterWager = ({
  wagerId,
  wagerData,
  wagerAmount,
  successCallback,
}: {
  wagerId: string;
  wagerData: string;
  wagerAmount: string;
  successCallback?: (tx?: TransactionReceipt) => void;
}) => {
  const { chain } = useNetwork();
  const network =
    chain && chain?.network ? (chain?.network as NETWORK) : "goerli";
  
  const partyTwoEquityData = utils.defaultAbiCoder.encode(
    ["address", "uint256"],
    [ethers.constants.AddressZero, "0"]
  );
  const { config, error } = usePrepareContractWrite({
    address: REGISTRY_ADDRESSES[network],
    abi: REG_ABI,
    functionName: "enterWager",
    args: [ethers.BigNumber.from(wagerId), partyTwoEquityData, wagerData],
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
  const { data: tx, write } = useContractWrite(config);
  const { isLoading, isSuccess, data } = useWaitForTransaction({
    hash: tx?.hash,
  });

  return (
    <Transaction
      text="Confirm"
      buttonClassAdditions={"bg-gray-100 text-black font-bold"}
      tx={write}
      error={error}
      data={data}
      successCallback={successCallback}
      isLoading={isLoading}
      isSuccess={isSuccess}
    />
  );
};
