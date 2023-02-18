/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IEquityModule, IEquityModuleInterface } from "../IEquityModule";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "partyTwoData",
        type: "bytes",
      },
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
            name: "supplumentalOracleData",
            type: "bytes",
          },
        ],
        internalType: "struct Wager",
        name: "wager",
        type: "tuple",
      },
    ],
    name: "acceptCounterEquity",
    outputs: [
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
            name: "supplumentalOracleData",
            type: "bytes",
          },
        ],
        internalType: "struct Wager",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "equityData",
        type: "bytes",
      },
    ],
    name: "acceptEquity",
    outputs: [],
    stateMutability: "payable",
    type: "function",
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
            name: "supplumentalOracleData",
            type: "bytes",
          },
        ],
        internalType: "struct Wager",
        name: "wager",
        type: "tuple",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
    ],
    name: "settleEquity",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
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
            name: "supplumentalOracleData",
            type: "bytes",
          },
        ],
        internalType: "struct Wager",
        name: "wager",
        type: "tuple",
      },
    ],
    name: "voidEquity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IEquityModule__factory {
  static readonly abi = _abi;
  static createInterface(): IEquityModuleInterface {
    return new utils.Interface(_abi) as IEquityModuleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IEquityModule {
    return new Contract(address, _abi, signerOrProvider) as IEquityModule;
  }
}
