/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IWagerModule, IWagerModuleInterface } from "../IWagerModule";

const _abi = [
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
            name: "wagerOracleData",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "supplumentalWagerOracleData",
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
            internalType: "contract IWagerOracle",
            name: "oracleModule",
            type: "address",
          },
          {
            internalType: "address",
            name: "oracleSource",
            type: "address",
          },
        ],
        internalType: "struct Wager",
        name: "wager",
        type: "tuple",
      },
    ],
    name: "settle",
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
            name: "wagerOracleData",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "supplumentalWagerOracleData",
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
            internalType: "contract IWagerOracle",
            name: "oracleModule",
            type: "address",
          },
          {
            internalType: "address",
            name: "oracleSource",
            type: "address",
          },
        ],
        internalType: "struct Wager",
        name: "",
        type: "tuple",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IWagerModule__factory {
  static readonly abi = _abi;
  static createInterface(): IWagerModuleInterface {
    return new utils.Interface(_abi) as IWagerModuleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IWagerModule {
    return new Contract(address, _abi, signerOrProvider) as IWagerModule;
  }
}