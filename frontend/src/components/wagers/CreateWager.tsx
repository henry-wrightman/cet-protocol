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
import useDebounce from "../../hooks/useDebounce";
import { TransactionReceipt } from "@ethersproject/providers";

export const CreateWager = ({
  signerAddress,
  wagerData,
  wagerAmount,
  wagerExpirationBlock,
  wagerModule,
  oracleModule,
  oracleSource,
  successCallback,
}: {
  signerAddress: string;
  wagerData: string | never[];
  wagerAmount: string;
  wagerExpirationBlock: number;
  wagerModule: string;
  oracleModule: string;
  oracleSource: string;
  successCallback?: (tx?: TransactionReceipt) => void;
}) => {
  const { chain } = useNetwork();
  const network =
    chain && chain?.network ? (chain?.network as NETWORK) : "goerli";

  const blockData = utils.defaultAbiCoder.encode(
    ["uint80", "uint80", "uint80"],
    [0, wagerExpirationBlock, 0]
  );
  const partiesData = utils.defaultAbiCoder.encode(
    ["address", "address"],
    [signerAddress, ethers.constants.AddressZero]
  );
  // const equityData = utils.defaultAbiCoder.encode(
  //   ["int", "address[2]", "uint256", "uint256[2]"],
  //   ["1", [ethers.constants.AddressZero, ethers.constants.AddressZero], ethers.utils.parseEther("1.0"), ["", ""]] // 1 ETH
  // );
  const wagerAmtD = useDebounce(wagerAmount, 2000);
  const wagerDataD = useDebounce(wagerData, 2000);
  const blockDataD = useDebounce(blockData, 2000);
  const partiesDataD = useDebounce(partiesData, 2000);
  const { config, error } = usePrepareContractWrite({
    address: REGISTRY_ADDRESSES[network],
    abi: REG_ABI,
    functionName: "createWager",
    args: [
      {
        parties: partiesDataD,
        partyOneWagerData: wagerDataD,
        partyTwoWagerData: [],
        wagerAmount: ethers.utils.parseEther(wagerAmtD), // equityData: equityData
        blockData: blockDataD,
        wagerOracleData: [],
        supplumentalWagerOracleData: [],
        result: [],
        state: ethers.BigNumber.from("1"),
        wagerModule,
        oracleModule,
        oracleSource,
      },
    ],
    overrides: {
      value: ethers.utils.parseEther(wagerAmtD),
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
      tx={write}
      buttonClassAdditions={"bg-gray-100 text-black font-bold"}
      error={error}
      data={data}
      successCallback={successCallback}
      isLoading={isLoading}
      isSuccess={isSuccess}
    />
  );
};
