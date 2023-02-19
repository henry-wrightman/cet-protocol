/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IWagerRegistry,
  IWagerRegistryInterface,
} from "../IWagerRegistry";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "partyAddr",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "partyWagerAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "partyWager",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "enterLimitBlock",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "expirationBlock",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "wagerModule",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "oracleModule",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "wagerId",
        type: "uint256",
      },
    ],
    name: "WagerCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "partyAddr",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "partyWager",
        type: "bytes",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "wagerId",
        type: "uint256",
      },
    ],
    name: "WagerEntered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "winner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "result",
        type: "bytes",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "wagerId",
        type: "uint256",
      },
    ],
    name: "WagerSettled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "wagerId",
        type: "uint256",
      },
    ],
    name: "WagerVoided",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes",
            name: "parties",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "partyOneWagerData",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "partyTwoWagerData",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "equityData",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "blockData",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "result",
            type: "bytes",
          },
          {
            internalType: "enum WagerState",
            name: "state",
            type: "uint8",
          },
          {
            internalType: "contract IWagerModule",
            name: "wagerModule",
            type: "address",
          },
          {
            internalType: "contract IWagerOracleModule",
            name: "oracleModule",
            type: "address",
          },
          {
            internalType: "address",
            name: "oracleSource",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "supplementalOracleData",
            type: "bytes",
          },
        ],
        internalType: "struct Wager",
        name: "wager",
        type: "tuple",
      },
    ],
    name: "createWager",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "wagerId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "partyTwoEquityData",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "partyTwoWager",
        type: "bytes",
      },
    ],
    name: "enterWager",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "startBlock",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endBlock",
        type: "uint256",
      },
    ],
    name: "executeBlockRange",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "wagerId",
        type: "uint256",
      },
    ],
    name: "settleWager",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "wagerId",
        type: "uint256",
      },
    ],
    name: "voidWager",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IWagerRegistry__factory {
  static readonly abi = _abi;
  static createInterface(): IWagerRegistryInterface {
    return new utils.Interface(_abi) as IWagerRegistryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IWagerRegistry {
    return new Contract(address, _abi, signerOrProvider) as IWagerRegistry;
  }
}
