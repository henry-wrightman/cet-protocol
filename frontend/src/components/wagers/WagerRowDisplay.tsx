import { useQuery, gql } from "@apollo/client";
import { ethers, utils } from "ethers";
import { useEffect, useCallback, useState, useReducer } from "react";
import { useNetwork } from "wagmi";
import { Wager, WagerResults } from "../../types";
import {
  MODULES,
  ORACLES,
  NETWORK,
  WM_NEAREST,
  WM_HIGHLOW,
  TICKERS,
  TICKER_DECIMALS,
} from "../../utils/constants";
import { getSubgraphClient } from "../../graphql/client";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Loading, Countdown, Button, Label } from "../common";
import { getWagerState, SettleWager, VoidWager } from "../wagers";
import { useAccount } from "wagmi";

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

export const WagerRowDisplay = ({
  wager,
  blocknumber,
}: {
  wager: Wager;
  blocknumber: number;
}) => {
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  console.log(wager);

  const network =
    chain && chain?.network ? (chain?.network as NETWORK) : "goerli";
  const ticker = wager
    ? (Object.keys(TICKERS).filter(
        (x) =>
          ORACLES["CHAINLINK"][network][x as TICKERS].toLowerCase() ===
          wager.oracleImpl.toLowerCase()
      )[0] as TICKERS)
    : TICKERS["BTC/ETH"];

  const wagerType = MODULES[network].filter(
    (x) => x.address.toLowerCase() == wager.wagerModule.toLowerCase()
  )[0].type;
  const partyOneWager =
    wager && wager.partyOneWager
      ? decodeWagerData(wagerType, wager.partyOneWager)
      : "";
  const partyTwoWager =
    wager && wager.partyTwoWager
      ? decodeWagerData(wagerType, wager.partyTwoWager)
      : "";
  const wagerResult =
    wager && wager.result ? decodeWagerResult(wager.result) : "";
  const isPartyOne =
    address &&
    wager &&
    wager.partyOne &&
    wager.partyOne.toLowerCase() === address!.toLowerCase();

  const wagerMetadata =
    wagerType == WM_HIGHLOW
      ? "(start: " +
        parseInt(partyOneWager![1].toString()) /
          10 ** TICKER_DECIMALS[ticker as TICKERS] +
        ")"
      : "";

  const potentialEnter =
    wager.state! == "1" &&
    !isPartyOne &&
    isConnected &&
    blocknumber <= wager.expirationBlock;

  const potentialSettle =
    blocknumber >= wager.expirationBlock && wager.state == "0";
  const potentialVoid =
    isPartyOne && (wager.state == "0" || wager.state == "1");

  return (
    <>
      {wager && (
        <>
          <tr className="m-1 bg-gray-200 text-left h-[40px]">
            <td className="p-2 rounded-l-lg font-bold border-2 bg-gray-100"></td>
            <td className="p-2 font-bold border-2 bg-gray-100">
              <span className="m-1 float-left">Party One&apos;s Bet</span>

              <span className="m-1 float-right font-normal">
                {wagerType == "wm.highlow"
                  ? partyOneWager![0].toString()
                  : parseInt(partyOneWager![0].toString()) /
                    10 ** TICKER_DECIMALS[ticker as TICKERS]}
              </span>
            </td>
            <td className="p-2 font-bold border-2 bg-gray-100">
              <span className="m-1 float-left">Party Two&apos;s Bet</span>

              <span className="m-1 float-right font-normal">
                {partyTwoWager
                  ? parseInt(partyTwoWager![0].toString()) /
                    10 ** TICKER_DECIMALS[ticker as TICKERS]
                  : "TBA"}
              </span>
            </td>
            <td className="p-2 font-bold border-2 bg-gray-100">
              <span className="m-1 float-left">Winner</span>

              <span className="m-1 float-right font-normal">
                {wager.winner ? (
                  <span className="p-1 bg-green-400 border-gray-400 rounded-md">
                    {wager.winner.slice(0, 6)}
                  </span>
                ) : (
                  "TBA"
                )}
              </span>
            </td>
            <td className={`p-3 font-bold border-2 bg-gray-100`}>
              <span className="m-1 float-left">Outcome</span>

              <span className="m-1 float-right font-normal">
                {wagerResult
                  ? wagerResult![0].toString().length >
                    TICKER_DECIMALS[ticker as TICKERS]
                    ? parseInt(wagerResult![0].toString()) /
                      10 ** TICKER_DECIMALS[ticker as TICKERS]
                    : wagerResult![0].toString()
                  : "TBA"}
              </span>
            </td>
            {potentialEnter && (
              <td className="p-2 rounded-r-lg font-bold border-2 bg-gray-100">
                <Button type="submit" className="w-full font-normal">
                  <Link href={"/wager/" + wager.id} key={wager.id}>
                    Enter
                  </Link>
                </Button>
              </td>
            )}
            {(potentialVoid || potentialSettle) && (
              <td className="p-2 rounded-r-lg font-bold border-2 bg-gray-100">
                {potentialSettle && (
                  <SettleWager wagerId={wager.id} buttonText={"Settle"} />
                )}
                {!potentialSettle && potentialVoid && (
                  <VoidWager wagerId={wager.id} buttonText={"Void"} />
                )}
              </td>
            )}
            {!potentialEnter && !potentialSettle && !potentialVoid && (
              <td className="p-2 rounded-r-lg font-bold border-2 bg-gray-100"></td>
            )}
          </tr>
        </>
      )}
    </>
  );
};
