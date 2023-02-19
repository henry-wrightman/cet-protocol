import { useQuery, gql } from "@apollo/client";
import { ethers, utils } from "ethers";
import { Wager, WagerResult } from "../../types";
import { useContractRead, useNetwork, useAccount } from "wagmi";
import EAC_ABI from "../../../../subgraph/contractDeployments/0/EACAggregatorProxy.json";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import {
  getWagerState,
  WagerConfirmationButton,
  WAGER_FORM_TYPE,
} from "../../components/wagers";
import { Loading, Button, Countdown, Label } from "../../components/common";
import {
  MODULES,
  ORACLES,
  NETWORK,
  WM_NEAREST,
  WM_HIGHLOW,
  TICKERS,
  TICKER_DECIMALS,
} from "../../utils/constants";
import {
  WagerOptions,
  EnterWager,
  constructWagerData,
  SettleWager,
  VoidWager,
} from "../../components/wagers";
import { useForm, SubmitHandler } from "react-hook-form";
import { getSubgraphClient } from "../../graphql/client";
import { getSubgraphClient as getPriceSubgraphClient } from "../../graphql/client_2";
import { Connect } from "../../components/Connect";
import { formatDistanceToNow } from "date-fns";

const WAGER_QUERY = gql`
  query wager($id: String!) {
    wager(id: $id) {
      id
      partyOne
      partyTwo
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

const PRICE_FEED_QUERY = gql`
  query prices($first: Int!, $tickers: [String]!) {
    prices(
      where: { assetPair_in: $tickers }
      orderBy: timestamp
      first: $first
      orderDirection: desc
    ) {
      price
      assetPair {
        id
      }
    }
  }
`;

type PriceResults = {
  prices: Price[];
};

type Price = {
  price: string;
  assetPair: AssetPair;
};

type AssetPair = {
  id: string;
};

const decodeWagerData = (_type: string, data: string) => {
  if (data.length == 0) return;
  switch (_type) {
    case "wm.highlow":
      return utils.defaultAbiCoder.decode(["uint", "uint"], data);
    case "wm.nearest":
      return utils.defaultAbiCoder.decode(["uint256"], data);

    default:
      return;
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

  const form = useForm<WAGER_FORM_TYPE>({
    defaultValues: {
      wager: "",
      wagerTicker: "",
      wagerType: "",
      wagerExpirationBlock: 0,
    },
  });
  const { setValue, register, watch, handleSubmit, getValues, formState } =
    form;
  const onSubmit: SubmitHandler<WAGER_FORM_TYPE> = async (data: any) => {
    console.log(data);
  };

  const { data, loading, error } = useQuery<WagerResult>(WAGER_QUERY, {
    variables: { id },
    client: getSubgraphClient(chain?.id!),
  });
  const {
    data: priceData,
    loading: priceLoading,
    error: errorLoading,
  } = useQuery<PriceResults>(PRICE_FEED_QUERY, {
    client: getPriceSubgraphClient(chain?.id!),
    variables: { first: 1000, tickers: Object.keys(TICKERS).map((x) => x) }, // , timestamp: Date.now()
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
      : TICKERS["BTC/ETH"];
  let currentPrice =
    priceData && priceData.prices.length > 0
      ? priceData.prices.filter((x) => x.assetPair.id == ticker)[0].price
      : "0";

  useEffect(() => {
    if (blocknumber == 0) {
      ethers
        .getDefaultProvider(chain?.network || "goerli")
        .getBlockNumber()
        .then((res) => {
          setBlocknumber(res);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain?.id]);

  if (loading || priceLoading) return Loading();
  if (error || errorLoading)
    return (
      <pre>
        {error ? error.message : errorLoading ? errorLoading.message : null}
      </pre>
    );
  if (!data?.wager) return <pre>{"no wager"}</pre>;

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
    data?.wager.partyOne.toLowerCase() === address!.toLowerCase();

  const wagerMetadata =
    wagerType == WM_HIGHLOW
      ? "(start: " +
        parseFloat(partyOneWager![1].toString()) /
          10 ** TICKER_DECIMALS[ticker as TICKERS]["oracle"] +
        ")"
      : "";

  const enterPartyData = watch("wager")
    ? constructWagerData(
        wagerType,
        [
          BigInt(
            parseFloat(watch("wager")) *
              10 ** TICKER_DECIMALS[ticker as TICKERS]["oracle"] || 0
          ).toString(),
          BigInt(
            parseFloat(currentPrice) *
              10 ** TICKER_DECIMALS[ticker as TICKERS]["oracle"]
          ).toString(),
        ],
        TICKER_DECIMALS[ticker as TICKERS]["oracle"]
      )
    : null;

  setValue("wagerTicker", ticker);
  setValue("partyOne", data?.wager.partyOne.slice(0, 6));
  setValue("wagerAmount", ethers.utils.formatEther(data?.wager.partyWager));
  setValue("wagerExpirationBlock", data?.wager.expirationBlock);
  setValue("wagerType", wagerType);

  const authorized = isConnected && address;

  const potentialEnter =
    authorized &&
    data?.wager.state! == "1" &&
    !isPartyOne &&
    isConnected &&
    partyOneWager != enterPartyData &&
    blocknumber <= data?.wager.expirationBlock;
  const potentialSettle =
    authorized &&
    blocknumber >= data?.wager.expirationBlock &&
    data?.wager?.state == "0";
  const potentialVoid =
    authorized &&
    isPartyOne &&
    (data?.wager?.state == "0" || data?.wager?.state == "1");
  const enterReady = watch("wager") != null && data?.wager?.state == "1";

  return (
    <div className="min-h-screen bg-green-200 font-normal border-white border-[1px]">
      <div className="flex flex-col md:flex-row lg:flex-row">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="sm:basis-full md:basis-1/4 lg:basis-1/4"
        >
          <div
            className={`${
              potentialSettle || potentialVoid || potentialEnter
                ? "sm:basis-full md:basis-1/4 lg:basis-1/4 m-4 p-3 shadow-md rounded-lg bg-white border-black border-[1px]"
                : ""
            } ${potentialEnter ? "h-fit" : "h-fit"}`}
          >
            {potentialEnter && (
              <>
                <WagerOptions
                  wagerType={wagerType}
                  currentPrice={(
                    parseFloat(currentPrice) /
                    10 ** TICKER_DECIMALS[ticker as TICKERS]["subgraph"]
                  ).toLocaleString(undefined, { minimumFractionDigits: 4 })}
                  ticker={ticker}
                  form={form}
                />
                <WagerConfirmationButton
                  wager={getValues()}
                  ready={enterReady}
                  trigger={
                    <Button type="submit" className="w-full mt-4">
                      Enter Wager
                    </Button>
                  }
                >
                  {enterReady ? (
                    <EnterWager
                      wagerId={data?.wager.id!}
                      wagerAmount={ethers.utils
                        .formatEther(data?.wager.partyWager!)
                        .toString()}
                      wagerData={enterPartyData || "0x"}
                    />
                  ) : (
                    <Label>{}</Label>
                  )}
                </WagerConfirmationButton>
              </>
            )}
            {!isConnected && !address && (
              <div className="sm:basis-full md:basis-1/4 lg:basis-1/4 justify-center m-2 p-3 shadow-md rounded-lg bg-white min-w-[250px] min-h-[50px] border-black border-[1px]">
                <Connect />
              </div>
            )}
            {potentialSettle && <SettleWager wagerId={data?.wager.id!} />}
            {potentialVoid && <VoidWager wagerId={data?.wager.id!} />}
          </div>
        </form>
        <div className="m-4 sm:basis-full md:basis-1/3 lg:basis-1/3 pt-4 p-2 rounded-lg bg-white border-black border-[1px]">
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
                        {data?.wager.partyOne.slice(0, 6)}
                      </span>
                    }
                  </td>
                </tr>
                <tr className="bg-gray-200 text-left h-[40px]">
                  <td className="p-1 font-bold border rounded-l-md">
                    Party One&apos;s Bet
                  </td>
                  <td className="p-1 text-right border rounded-r-md">
                    {wagerType == "wm.highlow"
                      ? partyOneWager![0].toString()
                      : parseFloat(partyOneWager![0].toString()) /
                        10 ** TICKER_DECIMALS[ticker as TICKERS]["oracle"]}
                  </td>
                </tr>
                <tr className="bg-gray-200 text-left h-[40px]">
                  <td className="p-1 font-bold border rounded-l-md">
                    Party Two
                  </td>
                  <td className="p-1 text-right border rounded-r-md">
                    {data?.wager.partyTwo ? (
                      <span className="p-1 bg-gray-400 border-gray-400 rounded-md">
                        {data?.wager.partyTwo.slice(0, 6)}
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
                      ? parseFloat(partyTwoWager![0].toString()) /
                        10 ** TICKER_DECIMALS[ticker as TICKERS]["oracle"]
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
                    {wagerType.replace("wm.", "")} {wagerMetadata}
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
                      ? parseFloat(wagerResult![0].toString()) /
                        10 ** TICKER_DECIMALS[ticker as TICKERS]["oracle"]
                      : "TBA"}
                  </td>
                </tr>
                <tr className="bg-gray-200 text-left h-[40px]">
                  <td className="p-1 font-bold border rounded-l-md">
                    Expiration
                  </td>
                  <td className="p-1 text-right border rounded-r-md">
                    {/* <Countdown start={getBlockETA(data?.wager.expirationBlock)} /> */}
                    {blocknumber == 0 ? (
                      Loading(20, 20)
                    ) : (
                      <Countdown
                        targetDate={
                          Date.now() +
                          (data?.wager?.expirationBlock - blocknumber) *
                            12 *
                            1000
                        }
                      ></Countdown>
                    )}
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
