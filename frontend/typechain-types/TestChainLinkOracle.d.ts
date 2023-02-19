/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface TestChainLinkOracleInterface extends ethers.utils.Interface {
  functions: {
    "getResult((bytes,bytes,bytes,bytes,bytes,bytes,uint8,address,address,address,bytes))": FunctionFragment;
    "price()": FunctionFragment;
    "setPrice(int256)": FunctionFragment;
    "toBytes(uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "getResult",
    values: [
      {
        parties: BytesLike;
        partyOneWagerData: BytesLike;
        partyTwoWagerData: BytesLike;
        equityData: BytesLike;
        blockData: BytesLike;
        result: BytesLike;
        state: BigNumberish;
        wagerModule: string;
        oracleModule: string;
        oracleSource: string;
        supplumentalOracleData: BytesLike;
      }
    ]
  ): string;
  encodeFunctionData(functionFragment: "price", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setPrice",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "toBytes",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "getResult", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "price", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setPrice", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "toBytes", data: BytesLike): Result;

  events: {};
}

export class TestChainLinkOracle extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: TestChainLinkOracleInterface;

  functions: {
    getResult(
      arg0: {
        parties: BytesLike;
        partyOneWagerData: BytesLike;
        partyTwoWagerData: BytesLike;
        equityData: BytesLike;
        blockData: BytesLike;
        result: BytesLike;
        state: BigNumberish;
        wagerModule: string;
        oracleModule: string;
        oracleSource: string;
        supplumentalOracleData: BytesLike;
      },
      overrides?: CallOverrides
    ): Promise<[string]>;

    price(overrides?: CallOverrides): Promise<[BigNumber]>;

    setPrice(
      newPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    toBytes(
      x: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string] & { b: string }>;
  };

  getResult(
    arg0: {
      parties: BytesLike;
      partyOneWagerData: BytesLike;
      partyTwoWagerData: BytesLike;
      equityData: BytesLike;
      blockData: BytesLike;
      result: BytesLike;
      state: BigNumberish;
      wagerModule: string;
      oracleModule: string;
      oracleSource: string;
      supplumentalOracleData: BytesLike;
    },
    overrides?: CallOverrides
  ): Promise<string>;

  price(overrides?: CallOverrides): Promise<BigNumber>;

  setPrice(
    newPrice: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  toBytes(x: BigNumberish, overrides?: CallOverrides): Promise<string>;

  callStatic: {
    getResult(
      arg0: {
        parties: BytesLike;
        partyOneWagerData: BytesLike;
        partyTwoWagerData: BytesLike;
        equityData: BytesLike;
        blockData: BytesLike;
        result: BytesLike;
        state: BigNumberish;
        wagerModule: string;
        oracleModule: string;
        oracleSource: string;
        supplumentalOracleData: BytesLike;
      },
      overrides?: CallOverrides
    ): Promise<string>;

    price(overrides?: CallOverrides): Promise<BigNumber>;

    setPrice(newPrice: BigNumberish, overrides?: CallOverrides): Promise<void>;

    toBytes(x: BigNumberish, overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    getResult(
      arg0: {
        parties: BytesLike;
        partyOneWagerData: BytesLike;
        partyTwoWagerData: BytesLike;
        equityData: BytesLike;
        blockData: BytesLike;
        result: BytesLike;
        state: BigNumberish;
        wagerModule: string;
        oracleModule: string;
        oracleSource: string;
        supplumentalOracleData: BytesLike;
      },
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    price(overrides?: CallOverrides): Promise<BigNumber>;

    setPrice(
      newPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    toBytes(x: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    getResult(
      arg0: {
        parties: BytesLike;
        partyOneWagerData: BytesLike;
        partyTwoWagerData: BytesLike;
        equityData: BytesLike;
        blockData: BytesLike;
        result: BytesLike;
        state: BigNumberish;
        wagerModule: string;
        oracleModule: string;
        oracleSource: string;
        supplumentalOracleData: BytesLike;
      },
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    price(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setPrice(
      newPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    toBytes(
      x: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
