import { useQuery, gql } from "@apollo/client";
import { ethers } from "ethers";
import { useEffect, useCallback, useState } from "react";
import { useNetwork } from "wagmi";
import { Wager, WagerResults } from "../../types";
import { NETWORK } from "../../utils/constants";
import { getSubgraphClient } from "../../graphql/client";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Loading } from "../common";

const WAGERS_QUERY = gql`
  {
    wagers {
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
  const network =
    chain && chain?.network ? (chain?.network as NETWORK) : "goerli";
  const { data, loading, error } = useQuery<WagerResults>(WAGERS_QUERY, {
    client: getSubgraphClient(chain?.id!),
  });
  const [blocknumber, setBlocknumber] = useState(0);

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

  if (loading) return <span>{Loading(100, 100)}</span>;
  if (error) return <pre>{error.message}</pre>;

  return (
    <>
      <table className="w-full border-separate border-spacing-x-0 border-spacing-y-2">
        <thead>
          <tr>
            <th className="p-1 text-white">Participants</th>
            <th className="p-1 text-white">Wager</th>
            <th className="p-1 text-white">State</th>
            <th className="p-1 text-white">Expiration</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.wagers.length > 0 &&
            data.wagers.map((wager: Wager) => (
              <Link href={"/wager/" + wager.id} key={wager.id}>
                <tr
                  className="text-center cursor-pointer bg-gray-200 hover:text-white hover:bg-purple-500 h-[40px]"
                  key={wager.id}
                >
                  <td className="p-1 rounded-l-lg">
                    {
                      <span
                        className={`m-1 p-1 bg-${
                          wager.winner
                            ? wager.partyOne?.id === wager.winner
                              ? "green"
                              : "red"
                            : "gray"
                        }-400 border-gray-400 rounded-md`}
                      >
                        {wager.partyOne?.id.slice(0, 6)}
                      </span>
                    }{" "}
                    {wager.partyTwo ? (
                      <span
                        className={`p-1 bg-${
                          wager.winner
                            ? wager.partyTwo?.id === wager.winner
                              ? "green"
                              : "red"
                            : "gray"
                        }-400 border-gray-400 rounded-md`}
                      >
                        {wager.partyTwo?.id.slice(0, 6)}
                      </span>
                    ) : (
                      ""
                    )}
                  </td>
                  <td className="p-1">
                    {ethers.utils.formatEther(wager.partyWager).toString()}E
                  </td>
                  <td className="p-1">{getWagerState(wager.state)}</td>
                  <td className="p-1 rounded-r-lg">
                    {getBlockETA(wager?.expirationBlock)}
                  </td>
                </tr>
              </Link>
            ))}
        </tbody>
      </table>
    </>
  );
};
