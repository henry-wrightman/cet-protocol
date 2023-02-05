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

export const CreateWager = ({
  signerAddress,
  wagerData,
  wagerAmount,
  wagerExpirationBlock,
  wagerModule,
  oracleModule,
  oracleSource,
}: {
  signerAddress: string;
  wagerData: string | never[];
  wagerAmount: string;
  wagerExpirationBlock: number;
  wagerModule: string;
  oracleModule: string;
  oracleSource: string;
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
        wagerAmount: ethers.utils.parseEther(wagerAmtD),
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
  const { data, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <Transaction
      text="Confirm"
      tx={write}
      buttonClassAdditions={"bg-white text-black font-bold"}
      error={error}
      isLoading={isLoading}
      isSuccess={isSuccess}
    />
  );
};
