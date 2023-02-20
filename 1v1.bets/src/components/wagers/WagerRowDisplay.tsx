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
import { getWagerState, SettleWager, VoidWager } from ".";
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

  const wagerMetadataValue = partyOneWager
    ? parseInt(partyOneWager![1].toString()) /
      10 ** TICKER_DECIMALS[ticker as TICKERS]["oracle"]
    : "";
  const wagerMetadata =
    wagerType == WM_HIGHLOW
      ? "(start: " +
        wagerMetadataValue.toLocaleString(undefined, {
          minimumFractionDigits:
            wagerMetadataValue > 0 && wagerMetadataValue < 1 ? 4 : 0,
        }) +
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

  const partyOneWagerValue = partyOneWager
    ? parseInt(partyOneWager![0].toString()) /
      10 ** TICKER_DECIMALS[ticker as TICKERS]["oracle"]
    : 0;
  const partyOneWagerFormatted =
    wagerType == "wm.highlow"
      ? partyOneWager![0].toString()
      : partyOneWagerValue.toLocaleString(undefined, {
          minimumFractionDigits:
            partyOneWagerValue > 0 && partyOneWagerValue < 1 ? 4 : 0,
        });

  const partyTwoWagerValue = partyTwoWager
    ? parseInt(partyTwoWager![0].toString()) /
      10 ** TICKER_DECIMALS[ticker as TICKERS]["oracle"]
    : 0;
  const partyTwoWagerFormatted = partyTwoWager
    ? partyTwoWagerValue.toLocaleString(undefined, {
        minimumFractionDigits:
          partyTwoWagerValue > 0 && partyTwoWagerValue < 1 ? 4 : 0,
      })
    : "TBA";

  const wagerResultValue = wagerResult
    ? parseInt(wagerResult![0].toString()) /
      10 ** TICKER_DECIMALS[ticker as TICKERS]["oracle"]
    : 0;
  const wagerResultFormatted = wagerResult
    ? wagerResultValue.toLocaleString(undefined, {
        minimumFractionDigits:
          wagerResultValue > 0 && wagerResultValue < 1 ? 4 : 0,
      })
    : "TBA";

  return (
    <>
      {wager && (
        <>
          <tr className="m-1 bg-gray-200 text-left h-[40px] text-sm">
            <td className="p-2 rounded-l-lg font-bold border-2 bg-gray-100"></td>
            <td className="p-2 font-bold border-2 bg-gray-100">
              <span className="m-1 float-left">Party One&apos;s Wager</span>

              <span className="m-1 float-right font-normal">
                {partyOneWagerFormatted}
              </span>
            </td>
            <td className="p-2 font-bold border-2 bg-gray-100">
              <span className="m-1 float-left">Party Two&apos;s Wager</span>

              <span className="m-1 float-right font-normal">
                {partyTwoWagerFormatted}
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
            <td className={`p-2 font-bold border-2 bg-gray-100`}>
              <span className="m-1 float-left">Outcome</span>
              {wagerMetadata && (
                <span className="m-1 float-right font-normal">
                  {wagerMetadata}
                </span>
              )}

              <span className="m-1 float-right font-normal">
                {wagerResultFormatted}
              </span>
            </td>
            {potentialEnter && (
              <td className="p-2 rounded-r-lg font-bold border-2 bg-gray-100">
                <div className="flex flex-col items-center">
                  <Button
                    type="submit"
                    className="w-3/4 float-center font-normal"
                  >
                    <Link href={"/wager/" + wager.id} key={wager.id}>
                      Enter
                    </Link>
                  </Button>
                </div>
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
