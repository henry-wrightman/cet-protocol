import { useQuery, gql } from "@apollo/client";
import { ethers } from "ethers";
import { useEffect, useCallback, useState, useReducer } from "react";
import { useNetwork } from "wagmi";
import { Wager, WagerResults } from "../../types";
import { NETWORK, MODULES, ORACLES, TICKERS } from "../../utils/constants";
import { getSubgraphClient } from "../../graphql/client";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Loading, Countdown, Button, Label } from "../common";
import { WagerRowDisplay } from ".";
import { useAccount } from "wagmi";

const WAGERS_QUERY = gql`
  {
    wagers {
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

const WAGER_QUERY_BY_ADDRESS = gql`
  query wagers($id: String!) {
    wagers(where: { partyOne: $id }) {
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

const WAGER_QUERY_BY_STATE = gql`
  query wagers($state: BigInt!) {
    wagers(where: { state: $state }) {
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

const WAGER_QUERY_LATEST = gql`
  {
    wagers(orderBy: createdBlock, orderDirection: desc) {
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

const WAGER_QUERY_CLOSEST_EXPIRATION = gql`
  {
    wagers(orderBy: expirationBlock, orderDirection: asc, where: { state: 0 }) {
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

const WAGER_QUERY_HOTTEST = gql`
  {
    wagers(
      orderBy: partyWager
      orderDirection: desc
      where: { or: [{ state: 0 }, { state: 1 }] }
    ) {
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

function reducer(state: WAGERS_QUERY_STATE, action: any) {
  switch (action.type) {
    case "all":
      return { ...state, query: WAGERS_QUERY };
    case "yours":
      return {
        ...state,
        query: WAGER_QUERY_BY_ADDRESS,
        queryParams: { id: action.user },
      };
    case "open":
      return {
        ...state,
        query: WAGER_QUERY_BY_STATE,
        queryParams: { state: 1 },
      };
    case "latest":
      return { ...state, query: WAGER_QUERY_LATEST };
    case "closest_expiration":
      return { ...state, query: WAGER_QUERY_CLOSEST_EXPIRATION };
    case "hottest":
      return { ...state, query: WAGER_QUERY_HOTTEST };
    default:
      throw new Error();
  }
}

type WAGERS_QUERY_STATE = {
  user: string;
  query: any;
  queryParams: any;
};

const INITIAL_STATE: WAGERS_QUERY_STATE = {
  user: "",
  query: WAGERS_QUERY,
  queryParams: null,
};

export const getWagerState = (state: string) => {
  switch (state) {
    case "1":
      return (
        <span className="p-1 bg-green-400 border-green rounded-md">open</span>
      );
    case "0":
      return (
        <span className="p-1 bg-blue-400 border-blue-400 rounded-md">
          active
        </span>
      );
    case "2":
      return (
        <span className="p-1 bg-purple-400 border-purple-400 rounded-md">
          completed
        </span>
      );
    case "3":
      return (
        <span className="p-1 bg-red-400 border-red-400 rounded-md">voided</span>
      );
    default:
      return "unknown";
  }
};

export const WagersList = () => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const network =
    chain && chain?.network ? (chain?.network as NETWORK) : "goerli";
  const [blocknumber, setBlocknumber] = useState(0);
  const [expandedWager, setExpandedWager] = useState<Wager | undefined>(
    undefined
  );
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { data, loading, error } = useQuery<WagerResults>(state.query, {
    client: getSubgraphClient(chain?.id!),
    variables: state.queryParams,
  });

  const getBlockNumber = useCallback(() => {
    ethers
      .getDefaultProvider(chain?.network || "goerli")
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
    if (blocknumber === 0) return Loading(10, 10);
    if (futureBlocks <= blocknumber)
      return <span className={"font-bold"}>expired</span>;
    return (
      <span>
        {formatDistanceToNow(
          new Date(Date.now() + (futureBlocks - blocknumber) * 12 * 1000)
        )}
      </span>
    );
  };

  const expandWagerRow = (wager: any) => {};

  if (loading) return <span>{Loading(100, 100)}</span>;
  if (error) return <pre>{error.message}</pre>;

  return (
    <>
      <div className="flex flex-col">
        <table className="w-full border-black-100 border-separate border-spacing-x-0 border-spacing-y-2 bg-white">
          <thead>
            <tr className="">
              <th className="p-1 text-black">
                <Button
                  className={"font-normal bg-purple-800 w-full h-[30px]"}
                  onClick={() => dispatch({ type: "all" })}
                >
                  All
                  {/* ({data && data.wagers.length > 0 ? data.wagers.length : ""}) */}
                </Button>
              </th>
              <th className="p-1 text-black">
                <Button
                  className={"font-normal bg-purple-800 w-full h-[30px]"}
                  onClick={() => dispatch({ type: "open" })}
                >
                  Open
                </Button>
              </th>
              {address && (
                <th className="p-1 text-black">
                  <Button
                    className={"font-normal bg-purple-800 w-full h-[30px]"}
                    onClick={() =>
                      dispatch({ type: "yours", user: address?.toLowerCase() })
                    }
                  >
                    Yours
                  </Button>
                </th>
              )}
              <th className="p-1 text-black">
                <Button
                  className={"font-normal bg-purple-800 w-full h-[30px]"}
                  onClick={() => dispatch({ type: "closest_expiration" })}
                >
                  Expiration
                </Button>
              </th>
              <th className="p-1 text-black">
                <Button
                  className={"font-normal bg-purple-800 w-full h-[30px]"}
                  onClick={() => dispatch({ type: "hottest" })}
                >
                  Hottest
                </Button>
              </th>
              <th className="p-1 text-black">
                <Button
                  className={"font-normal bg-purple-800 w-full h-[30px]"}
                  onClick={() => dispatch({ type: "latest" })}
                >
                  Latest
                </Button>
              </th>
            </tr>
            <tr></tr>
          </thead>
          <tbody></tbody>
        </table>
        <table className="w-full border-separate">
          <thead className="border-[2px] border-black">
            <tr>
              <th className="p-1 font-light text-black w-10">#</th>
              <th className="p-1 font-light text-black">Participants</th>
              <th className="p-1 font-light text-black">Wager</th>
              <th className="p-1 font-light text-black">Type</th>
              <th className="p-1 font-light text-black">State</th>
              <th className="p-1 font-light text-black">Expiration</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.wagers.length > 0 &&
              [...data.wagers].sort((a,b) => b.expirationBlock - a.expirationBlock).map((wager: Wager) => {
                if (!wager.partyOne.length || wager.partyOne.length <= 0)
                  return;
                const wagerModule = MODULES[network].filter(
                  (x) =>
                    x.address.toLowerCase() == wager.wagerModule.toLowerCase()
                )[0];
                const type = wagerModule.type;
                const ta =
                  data && wager
                    ? (Object.keys(TICKERS).filter(
                        (x) =>
                          ORACLES["CHAINLINK"][network][
                            x as TICKERS
                          ].toLowerCase() === wager.oracleImpl.toLowerCase()
                      )[0] as TICKERS)
                    : TICKERS["BTC/ETH"];

                return (
                  <>
                    <tr
                      className={`m-2 text-center cursor-pointer hover:text-white hover:bg-purple-500 h-[40px] ${
                        expandedWager && expandedWager.id == wager.id
                          ? "bg-purple-500 text-white"
                          : ""
                      }`}
                      key={wager.id}
                      onClick={() => {
                        if (expandedWager && expandedWager.id == wager.id) {
                          setExpandedWager(undefined);
                        } else {
                          setExpandedWager(wager);
                        }
                      }}
                    >
                      <td className="p-1 rounded-l-lg">{wager.id}</td>
                      <td className="p-1">
                        {
                          <span
                            className={`m-1 p-1 bg-${
                              wager.winner
                                ? wager.partyOne === wager.winner
                                  ? "green"
                                  : "red"
                                : "gray"
                            }-400 border-gray-400 rounded-md`}
                          >
                            {wager.partyOne.slice(0, 6)}
                          </span>
                        }{" "}
                        {wager.partyTwo ? (
                          <span
                            className={`p-1 bg-${
                              wager.winner
                                ? wager.partyTwo === wager.winner
                                  ? "green"
                                  : "red"
                                : "gray"
                            }-400 border-gray-400 rounded-md`}
                          >
                            {wager.partyTwo.slice(0, 6)}
                          </span>
                        ) : (
                          ""
                        )}
                      </td>
                      <td className="p-1">
                        {ethers.utils.formatEther(wager.partyWager).toString()}E
                      </td>
                      <td className="p-1">
                        {type.replace("wm.", "")} | {ta}
                      </td>
                      <td className={`text-white p-1`}>{getWagerState(wager.state)}</td>
                      <td className="p-1 rounded-r-lg">
                        {blocknumber == 0 ? (
                          Loading(20, 20)
                        ) : (
                          <>
                          {wager.state === "0" && wager?.expirationBlock <= blocknumber ? (
                            <span className={`${expandedWager && expandedWager.id == wager.id ? 'text-white' : ''} font-bold`}>requires settlement</span>
                          ) : (
                            <Countdown
                            targetDate={
                              Date.now() +
                              (wager?.expirationBlock - blocknumber) * 12 * 1000
                            }
                          ></Countdown>
                          )}
                          </>
                        )}
                      </td>
                    </tr>
                    {expandedWager && expandedWager.id == wager.id && (
                      <WagerRowDisplay
                        wager={wager}
                        blocknumber={blocknumber}
                      />
                    )}
                  </>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};
