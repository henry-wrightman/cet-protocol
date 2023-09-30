import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import fetch from "cross-fetch";
import { SUBGRAPHS } from "../utils/constants";

// TODO move the chainIds into an enum
const mainnetConfig = SUBGRAPHS["mainnet"];
const mainnetClient = new ApolloClient({
  link: new HttpLink({ uri: mainnetConfig, fetch }),
  cache: new InMemoryCache(),
});

const localhostConfig = SUBGRAPHS["hardhat"];
const localhostClient = new ApolloClient({
  link: new HttpLink({ uri: localhostConfig, fetch }),
  cache: new InMemoryCache(),
});
const goerliConfig = SUBGRAPHS["goerli"];
const goerliClient = new ApolloClient({
  link: new HttpLink({ uri: goerliConfig, fetch }),
  cache: new InMemoryCache(),
});

export const getSubgraphClient = (chainId: number) => {
  switch (chainId) {
    case 1:
      return mainnetClient;
    case 31337:
      return localhostClient;
    case 5:
      return goerliClient;
    // case 10:
    //   return optimismClient;
    // case 420:
    //   return opGoerliClient;
    // case 137:
    //   return polygonClient;
    // case 80001:
    //   return mumbaiClient;
    default:
      return goerliClient; // TODO update to homestead?
  }
};
