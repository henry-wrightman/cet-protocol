import { useQuery, gql } from "@apollo/client";
import { ethers, utils } from "ethers";
import { Wager, WagerResult } from "../../types";
import { useContractRead, useNetwork, useAccount } from "wagmi";
import EAC_ABI from "../../../../subgraph/contractDeployments/0/EACAggregatorProxy.json";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import { getWagerState } from "../../components/wagers/WagersList";
import { Loading } from "../../components/common";
import {
  MODULES,
  ORACLES,
  NETWORK,
  WM_NEAREST,
  WM_HIGHLOW,
  TICKERS,
} from "../../utils/constants";
import {
  WagerOptions,
  OracleRoundResponse,
  EnterWager,
  constructWagerData,
  SettleWager,
  VoidWager,
} from "../../components/wagers";
import { useForm, SubmitHandler } from "react-hook-form";
import { getSubgraphClient } from "../../graphql/client";
import { Connect } from "../../components/Connect";
import { formatDistanceToNow } from "date-fns";
import useDebounce from "../../hooks/useDebounce";

const WAGER_QUERY = gql`
  query wager($id: String!) {
    wager(id: $id) {
      id
      partyOne {
        id
      }
      partyTwo {
        id
      }
      partyOneWager
      partyTwoWager
      expirationBlock
      partyWager
      state
      result
      winner
      wagerModule
      oracleImpl
    }
  }
`;

type EnterWagerForm = {
  wager: string;
  wagerAmount: string;
};

const decodeWagerData = (_type: string, data: string) => {
  switch (_type) {
    case "wm.highlow":
      return utils.defaultAbiCoder.decode(["uint", "uint"], data);
    case "wm.nearest":
      return utils.defaultAbiCoder.decode(["uint256"], data);

    default:
      return null;
  }
};

const decodeWagerResult = (data: string) => {
  if (!data) return "TBA";
  return utils.defaultAbiCoder.decode(["uint256"], data);
};

const W: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const [blocknumber, setBlocknumber] = useState(0);
  const { data, loading, error } = useQuery<WagerResult>(WAGER_QUERY, {
    variables: { id },
    client: getSubgraphClient(chain?.id!),
  });
  const {
    setValue,
    register,
    watch,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<EnterWagerForm>({
    defaultValues: {
      wager: "",
    },
  });
  const network =
    chain && chain?.network ? (chain?.network as NETWORK) : "goerli";
  const ticker =
    data && data?.wager
      ? (Object.keys(TICKERS).filter(
          (x) =>
            ORACLES["CHAINLINK"][network][x as TICKERS].toLowerCase() ===
            data?.wager.oracleImpl.toLowerCase()
        )[0] as TICKERS)
      : TICKERS.BTCETH;
  console.log(ticker);
  const onSubmit: SubmitHandler<EnterWagerForm> = async (
    data: EnterWagerForm
  ) => {
    console.log(data);
  };

  const useOracleRead = (): [string, number] => {
    const networkD = useDebounce(network, 60000);
    const tickerD = useDebounce(ticker, 1000);

    const decimalRead = useContractRead({
      address: ORACLES["CHAINLINK"][networkD][tickerD], // chainlink oracle
      abi: EAC_ABI,
      functionName: "decimals",
    });
    const decimalReadResult: number =
      decimalRead && decimalRead.data ? (decimalRead.data as number) : 1;

    const contractRead = useContractRead({
      address: ORACLES["CHAINLINK"][networkD][tickerD], // chainlink oracle
      abi: EAC_ABI,
      functionName: "latestRoundData",
    });
    const readResult =
      contractRead && contractRead.data
        ? (contractRead.data as OracleRoundResponse)
        : null;
    let currentPrice = readResult
      ? (parseInt(readResult.answer.toString()) / 10 ** decimalReadResult)
          .toFixed(3)
          .toString()
      : "";

    console.log(currentPrice);
    return [currentPrice, decimalReadResult];
  };

  let [currentPrice, decimals]: [string, number] = useOracleRead();

  const getBlockNumber = useCallback(() => {
    ethers
      .getDefaultProvider(chain?.network)
      .getBlockNumber()
      .then((res) => {
        setBlocknumber(res);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (blocknumber == 0) {
      getBlockNumber();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getBlockETA = (futureBlocks: number) => {
    if (blocknumber === 0) return Loading(20, 20);
    if (futureBlocks <= blocknumber) return "expired";
    return formatDistanceToNow(
      new Date(Date.now() + (futureBlocks - blocknumber) * 12 * 1000)
    );
  };

  if (loading) return Loading();
  if (error) return <pre>{error.message}</pre>;
  if (!data?.wager) return <pre>{"no wagers"}</pre>;

  const wagerType = MODULES[network].filter(
    (x) => x.address.toLowerCase() == data?.wager.wagerModule.toLowerCase()
  )[0].type;
  const partyOneWager =
    data && data?.wager && data?.wager.partyOneWager
      ? decodeWagerData(wagerType, data?.wager.partyOneWager)
      : "";
  const partyTwoWager =
    data && data?.wager && data?.wager.partyTwoWager
      ? decodeWagerData(wagerType, data?.wager.partyTwoWager)
      : "";
  const wagerResult =
    data && data?.wager && data?.wager.result
      ? decodeWagerResult(data?.wager.result)
      : "";
  const isPartyOne =
    address &&
    data &&
    data?.wager &&
    data?.wager.partyOne &&
    data?.wager.partyOne?.id.toLowerCase() === address!.toLowerCase();

  const wagerMetadata =
    wagerType == WM_HIGHLOW
      ? "(start: " +
        parseInt(partyOneWager![1].toString()) / 10 ** decimals +
        ")"
      : "";

  const enterPartyData = watch("wager")
    ? constructWagerData(
        wagerType,
        [watch("wager"), parseInt(currentPrice).toFixed(0).toString()],
        decimals
      )
    : null;

  // TODO: enforce checks against party wager's to disallow parity
  // console.log(partyOneWager![0].toString() == watch("wager"));
  // console.log(partyOneWager![0] == enterPartyData);
  // console.log(enterPartyData);

  return (
    <div className="min-h-screen bg-green-200 font-normal justify-center items-center">
      <div className="flex flex-col md:flex-row lg:flex-row">
        <div
          className={`sm:basis-full md:basis-1/3 lg:basis-1/3 justify-center m-2 p-3 ${
            data?.wager.state! == "1" ? "shadow-md rounded-lg bg-gray-200" : ""
          } h-[300px]`}
        >
          {}
          {data?.wager.state! == "1" &&
            !isPartyOne &&
            isConnected &&
            partyOneWager != enterPartyData && (
              <>
                <WagerOptions
                  wagerType={wagerType}
                  currentPrice={currentPrice}
                  ticker={ticker}
                  watch={watch}
                  setValue={setValue}
                  register={register}
                />
                {watch("wager") && data?.wager?.state == "1" && (
                  <EnterWager
                    wagerId={data?.wager.id!}
                    wagerAmount={ethers.utils
                      .formatEther(data?.wager.partyWager!)
                      .toString()}
                    wagerData={enterPartyData || "0x"}
                  />
                )}
              </>
            )}
          {!isConnected && !address && (
            <>
              <Connect />
            </>
          )}
          {blocknumber >= data?.wager.expirationBlock &&
            data?.wager?.state == "0" && (
              <SettleWager wagerId={data?.wager.id!} />
            )}
          {data?.wager.expirationBlock >= blocknumber &&
            isPartyOne &&
            (data?.wager?.state == "0" || data?.wager?.state == "1") && (
              <VoidWager wagerId={data?.wager.id!} />
            )}
        </div>
        <div className="m-4 sm:basis-full md:basis-1/2 lg:basis-1/2 pt-4 p-2 rounded-lg bg-purple-800">
          <table className="w-full border-separate border-spacing-x-0 border-spacing-y-2">
            {data && data.wager && (
              <>
                <tr className="bg-gray-200 text-left h-[40px]">
                  <td className="p-1 font-bold border rounded-l-md">
                    Party One
                  </td>
                  <td className="p-1 text-right border rounded-r-md">
                    {
                      <span className="p-1 bg-gray-400 border-gray-400 rounded-md">
                        {data?.wager.partyOne?.id.slice(0, 6)}
                      </span>
                    }
                  </td>
                </tr>
                <tr className="bg-gray-200 text-left h-[40px]">
                  <td className="p-1 font-bold border rounded-l-md">
                    Party One&apos;s Bet
                  </td>
                  <td className="p-1 text-right border rounded-r-md">
                    {partyOneWager![0].toString().length > decimals
                      ? parseInt(partyOneWager![0].toString()) / 10 ** decimals
                      : partyOneWager![0].toString()}
                  </td>
                </tr>
                <tr className="bg-gray-200 text-left h-[40px]">
                  <td className="p-1 font-bold border rounded-l-md">
                    Party Two
                  </td>
                  <td className="p-1 text-right border rounded-r-md">
                    {data?.wager.partyTwo ? (
                      <span className="p-1 bg-gray-400 border-gray-400 rounded-md">
                        {data?.wager.partyTwo?.id.slice(0, 6)}
                      </span>
                    ) : (
                      "TBA"
                    )}
                  </td>
                </tr>
                <tr className="bg-gray-200 text-left h-[40px]">
                  <td className="p-1 font-bold border rounded-l-md">
                    Party Two&apos;s Bet
                  </td>
                  <td className="p-1 text-right border rounded-r-md">
                    {partyTwoWager
                      ? partyTwoWager![0].toString().length > decimals
                        ? parseInt(partyTwoWager![0].toString()) /
                          10 ** decimals
                        : partyTwoWager![0].toString()
                      : "TBA"}
                  </td>
                </tr>
                <tr className="bg-gray-200 text-left h-[40px]">
                  <td className="p-1 font-bold border rounded-l-md">Wager</td>
                  <td className="p-1 text-right border rounded-r-md">
                    {ethers.utils
                      .formatEther(data?.wager.partyWager)
                      .toString()}
                    E
                  </td>
                </tr>
                <tr className="bg-gray-200 text-left h-[40px]">
                  <td className="border p-1 font-bold border rounded-l-md">
                    Type
                  </td>
                  <td className="border p-1 text-right border rounded-r-md">
                    {wagerType} {wagerMetadata}
                  </td>
                </tr>
                <tr className="bg-gray-200 text-left h-[40px]">
                  <td className="p-1 font-bold border rounded-l-md">State</td>
                  <td className="p-1 text-right border rounded-r-md">
                    {getWagerState(data?.wager.state)}
                  </td>
                </tr>
                <tr className="bg-gray-200 text-left h-[40px]">
                  <td className="p-1 font-bold border rounded-l-md">Winner</td>
                  <td className="p-1 text-right border rounded-r-md">
                    {data?.wager.winner ? (
                      <span className="p-1 bg-green-400 border-gray-400 rounded-md">
                        {data?.wager.winner.slice(0, 6)}
                      </span>
                    ) : (
                      "TBA"
                    )}
                  </td>
                </tr>
                <tr className="bg-gray-200 text-left h-[40px]">
                  <td className="p-1 font-bold border rounded-l-md">Outcome</td>
                  <td className="p-1 text-right border rounded-r-md">
                    {wagerResult
                      ? (wagerResult![0].toString() / 10 ** decimals).toFixed(4)
                      : "TBA"}
                  </td>
                </tr>
                <tr className="bg-gray-200 text-left h-[40px]">
                  <td className="p-1 font-bold border rounded-l-md">
                    Expiration
                  </td>
                  <td className="p-1 text-right border rounded-r-md">
                    {/* <Countdown start={getBlockETA(data?.wager.expirationBlock)} /> */}
                    {getBlockETA(data?.wager.expirationBlock)}
                  </td>
                </tr>
              </>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default W;
