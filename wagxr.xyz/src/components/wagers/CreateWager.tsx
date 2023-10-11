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
  const equityData = utils.defaultAbiCoder.encode(
    ["int", "address[2]", "uint256", "uint256[2]"],
    [
      "1",
      [ethers.constants.AddressZero, ethers.constants.AddressZero],
      ethers.utils.parseEther(wagerAmount),
      ["0", "0"],
    ]
  ); // 2-sided
  const equityDataD = useDebounce(equityData, 2000);
  const wagerDataD = useDebounce(wagerData, 2000);
  const blockDataD = useDebounce(blockData, 2000);
  const partiesDataD = useDebounce(partiesData, 2000);
  const { config, error } = usePrepareContractWrite({
    address: `0x${REGISTRY_ADDRESSES[network]}`,
    abi: REG_ABI,
    functionName: "createWager",
    value: ethers.utils.parseEther(wagerAmount).toBigInt(),
    args: [
      {
        parties: partiesDataD,
        partyOneWagerData: wagerDataD,
        partyTwoWagerData: [],
        equityData: equityDataD,
        blockData: blockDataD,
        supplementalOracleData: [],
        result: [],
        state: ethers.BigNumber.from("1"),
        wagerModule,
        oracleModule,
        oracleSource,
      },
    ],
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
