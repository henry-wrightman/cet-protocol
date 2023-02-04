import { ethers } from "ethers";
import { Interface } from "ethers/lib/utils";

export const FACTORY_ADDRESS = ""; // factory
export const REGISTRY_CONTRACT_ADDRESS_MAINNET = "";

export const REGISTRY_ABI =
  '[{"inputs":[{"components":[{"internalType":"address","name":"partyOne","type":"address"},{"internalType":"bytes","name":"partyOneWager","type":"bytes"},{"internalType":"address","name":"partyTwo","type":"address"},{"internalType":"bytes","name":"partyTwoWager","type":"bytes"},{"internalType":"uint256","name":"partyWagerAmount","type":"uint256"},{"internalType":"uint256","name":"createdBlock","type":"uint256"},{"internalType":"uint80","name":"expirationBlock","type":"uint80"},{"internalType":"enum WagerState","name":"state","type":"uint8"},{"internalType":"contract IWagerModule","name":"wagerModule","type":"address"},{"internalType":"contract IWagerOracle","name":"oracleImpl","type":"address"}],"internalType":"struct Wager","name":"wager","type":"tuple"}],"name":"createWager","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"}]';

export const FACTORY_ABI =
  '[{"inputs":[{"internalType":"WagerParameters","name":"params","type":"WagerParameters"}],"name":"createWager","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"external","type":"function"}]';

export const WM_NAMES = ["wm.highlow", "wm.nearest"];
export const WM_HIGHLOW = "wm.highlow";
export const WM_NEAREST = "wm.nearest";

export const WAGER_AMOUNT = ethers.utils.parseEther("5");

export type NETWORK = "goerli" | "hardhat" | "mainnet";

type WagerModule = {
  type: string;
  address: string;
};
type ModuleEntries = { [key in NETWORK]: WagerModule[] };
type NetworkEntries = { [key in NETWORK]: string };

export const REGISTRY_ADDRESSES: NetworkEntries = {
  goerli: "0x1B28f36915C24a7ADc6c544C34eE68f63fE649B0",
  hardhat: "0xdc64a140aa3e981100a9beca4e685f962f0cf6c9",
  mainnet: "",
};

export const MODULES: ModuleEntries = {
  goerli: [
    {
      type: WM_HIGHLOW,
      address: "0x53d0bc3bFD6De22DACA014024Bd113Ff2F4557B3",
    },
    {
      type: WM_NEAREST,
      address: "0x4080A33d561aeb06b71aCE3EA1eb6a6DcFc1caDC",
    },
    {
      type: "oracle.chainlink",
      address: "0x2CadA81B2a080dbB7E59BcA49cde8D158A47f81D", // executor: 0x8012333A8077632bb03948675F08205ef36AF650
    },
  ],
  hardhat: [
    {
      type: WM_HIGHLOW,
      address: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
    },
    {
      type: WM_NEAREST,
      address: "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512",
    },
    {
      type: "oracle.chainlink",
      address: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
    },
  ],
  mainnet: [
    {
      type: WM_HIGHLOW,
      address: "",
    },
    {
      type: WM_NEAREST,
      address: "",
    },
  ],
};

export const SUBGRAPHS: NetworkEntries = {
  hardhat: "http://localhost:8000/subgraphs/name/WagerRegistry",
  goerli: "https://api.thegraph.com/subgraphs/name/henry-wrightman/1v1-goerli",
  mainnet: "",
};

export const enum ORACLE_TYPES {
  CHAINLINK = "CHAINLINK",
  UMA = "UMA",
}
export enum TICKERS {
  BTCUSD = "BTCUSD",
  BTCETH = "BTCETH",
  EURUSD = "EURUSD",
  JPYUSD = "JPYUSD",
  LINKETH = "LINKETH",
  XAUUSD = "XAUUSD",
}
type OracleSource = {
  [key in TICKERS]: string;
};
type OracleEntries = {
  [key in ORACLE_TYPES]: { [key in NETWORK]: OracleSource };
};

export const ORACLES: OracleEntries = {
  CHAINLINK: {
    goerli: {
      BTCUSD: "0xA39434A63A52E749F02807ae27335515BA4b07F7",
      BTCETH: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
      EURUSD: "0x44390589104C9164407A0E0562a9DBe6C24A0E05",
      JPYUSD: "0x982B232303af1EFfB49939b81AD6866B2E4eeD0B",
      LINKETH: "0xb4c4a493AB6356497713A78FFA6c60FB53517c63",
      XAUUSD: "0x7b219F57a8e9C7303204Af681e9fA69d17ef626f",
    },
    mainnet: {
      BTCUSD: "",
      BTCETH: "",
      EURUSD: "",
      JPYUSD: "",
      LINKETH: "",
      XAUUSD: "",
    },
    hardhat: {
      BTCUSD: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
      BTCETH: "",
      EURUSD: "",
      JPYUSD: "",
      LINKETH: "",
      XAUUSD: "",
    },
  },
  UMA: {
    goerli: {
      BTCUSD: "",
      BTCETH: "",
      EURUSD: "",
      JPYUSD: "",
      LINKETH: "",
      XAUUSD: "",
    },
    mainnet: {
      BTCUSD: "",
      BTCETH: "",
      EURUSD: "",
      JPYUSD: "",
      LINKETH: "",
      XAUUSD: "",
    },
    hardhat: {
      BTCUSD: "",
      BTCETH: "",
      EURUSD: "",
      JPYUSD: "",
      LINKETH: "",
      XAUUSD: "",
    },
  },
} as const;
