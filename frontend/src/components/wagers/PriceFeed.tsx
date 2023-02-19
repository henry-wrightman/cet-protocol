import { useQuery, gql } from "@apollo/client";
import { ethers } from "ethers";
import { useEffect, useCallback, useState, useReducer } from "react";
import { useNetwork } from "wagmi";
import { Wager, WagerResults } from "../../types";
import {
  NETWORK,
  MODULES,
  ORACLES,
  TICKERS,
  TICKER_DECIMALS,
} from "../../utils/constants";
import { getSubgraphClient } from "../../graphql/client_2";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Loading, Countdown, Button, Label } from "../common";
import { useAccount } from "wagmi";
import Marquee from "react-fast-marquee";

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

type WAGERS_QUERY_STATE = {
  user: string;
  query: any;
  queryParams: any;
};

type MarqueeEntry = {
  ticker: string;
  price: number;
};

export const PriceFeed = () => {
  const { chain } = useNetwork();
  const network =
    chain && chain?.network ? (chain?.network as NETWORK) : "goerli";
  const { data, loading, error } = useQuery<PriceResults>(PRICE_FEED_QUERY, {
    client: getSubgraphClient(chain?.id!),
    variables: { first: 1000, tickers: Object.keys(TICKERS).map((x) => x) }, // , timestamp: Date.now()
  });

  if (loading) return <span>{Loading(30, 30)}</span>;
  if (error) return <pre>{error.message}</pre>;

  return (
    <>
      {data && data.prices.length > 0 && (
        <Marquee speed={40}>
          {Object.keys(TICKERS).map((ticker) => {
            return (
              <>
                <span
                  key={ticker}
                  className="font-medium p-1 ml-1 mr-1 bg-purple-200 border-green rounded-md"
                >
                  <span className="font-light text-sm">{ticker}</span>{" "}
                  {(
                    parseInt(
                      data.prices.filter((x) => x.assetPair.id == ticker)[0]
                        .price
                    ) /
                    10 ** TICKER_DECIMALS[ticker as TICKERS]
                  ).toLocaleString()}
                </span>
              </>
            );
          })}
        </Marquee>
      )}
    </>
  );
};
