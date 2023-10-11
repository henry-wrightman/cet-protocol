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
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface WagerRegistryInterface extends ethers.utils.Interface {
  functions: {
    "createWager((bytes,bytes,bytes,bytes,bytes,bytes,uint8,address,address,address,bytes))": FunctionFragment;
    "decodeBlocks(bytes)": FunctionFragment;
    "decodeParties(bytes)": FunctionFragment;
    "enterWager(uint256,bytes,bytes)": FunctionFragment;
    "equityModule()": FunctionFragment;
    "executeBlockRange(uint256,uint256)": FunctionFragment;
    "executionSchedule(uint256,uint256)": FunctionFragment;
    "setEquityModule(address)": FunctionFragment;
    "settleWager(uint256)": FunctionFragment;
    "voidWager(uint256)": FunctionFragment;
    "wagers(uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "createWager",
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
        supplementalOracleData: BytesLike;
      }
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "decodeBlocks",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "decodeParties",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "enterWager",
    values: [BigNumberish, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "equityModule",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "executeBlockRange",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "executionSchedule",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setEquityModule",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "settleWager",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "voidWager",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "wagers",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "createWager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "decodeBlocks",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "decodeParties",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "enterWager", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "equityModule",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "executeBlockRange",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "executionSchedule",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setEquityModule",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "settleWager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "voidWager", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "wagers", data: BytesLike): Result;

  events: {
    "WagerCreated(address,uint256,bytes,uint256,uint256,address,address,uint256)": EventFragment;
    "WagerEntered(address,bytes,uint256)": EventFragment;
    "WagerSettled(address,uint256,bytes,uint256)": EventFragment;
    "WagerVoided(uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "WagerCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "WagerEntered"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "WagerSettled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "WagerVoided"): EventFragment;
}

export type WagerCreatedEvent = TypedEvent<
  [
    string,
    BigNumber,
    string,
    BigNumber,
    BigNumber,
    string,
    string,
    BigNumber
  ] & {
    partyAddr: string;
    partyWagerAmount: BigNumber;
    partyWager: string;
    enterLimitBlock: BigNumber;
    expirationBlock: BigNumber;
    wagerModule: string;
    oracleModule: string;
    wagerId: BigNumber;
  }
>;

export type WagerEnteredEvent = TypedEvent<
  [string, string, BigNumber] & {
    partyAddr: string;
    partyWager: string;
    wagerId: BigNumber;
  }
>;

export type WagerSettledEvent = TypedEvent<
  [string, BigNumber, string, BigNumber] & {
    winner: string;
    amount: BigNumber;
    result: string;
    wagerId: BigNumber;
  }
>;

export type WagerVoidedEvent = TypedEvent<[BigNumber] & { wagerId: BigNumber }>;

export class WagerRegistry extends BaseContract {
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

  interface: WagerRegistryInterface;

  functions: {
    createWager(
      wager: {
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
        supplementalOracleData: BytesLike;
      },
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    decodeBlocks(
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        createdBlock: BigNumber;
        expirationBlock: BigNumber;
        enterLimitBlock: BigNumber;
      }
    >;

    decodeParties(
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string, string] & { partyOne: string; partyTwo: string }>;

    enterWager(
      wagerId: BigNumberish,
      partyTwoEquityData: BytesLike,
      partyTwoWagerData: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    equityModule(overrides?: CallOverrides): Promise<[string]>;

    executeBlockRange(
      startBlock: BigNumberish,
      endBlock: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    executionSchedule(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    setEquityModule(
      moduleAddr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    settleWager(
      wagerId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    voidWager(
      wagerId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    wagers(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        string,
        string,
        string,
        string,
        string,
        string,
        number,
        string,
        string,
        string,
        string
      ] & {
        parties: string;
        partyOneWagerData: string;
        partyTwoWagerData: string;
        equityData: string;
        blockData: string;
        result: string;
        state: number;
        wagerModule: string;
        oracleModule: string;
        oracleSource: string;
        supplementalOracleData: string;
      }
    >;
  };

  createWager(
    wager: {
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
      supplementalOracleData: BytesLike;
    },
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  decodeBlocks(
    data: BytesLike,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber] & {
      createdBlock: BigNumber;
      expirationBlock: BigNumber;
      enterLimitBlock: BigNumber;
    }
  >;

  decodeParties(
    data: BytesLike,
    overrides?: CallOverrides
  ): Promise<[string, string] & { partyOne: string; partyTwo: string }>;

  enterWager(
    wagerId: BigNumberish,
    partyTwoEquityData: BytesLike,
    partyTwoWagerData: BytesLike,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  equityModule(overrides?: CallOverrides): Promise<string>;

  executeBlockRange(
    startBlock: BigNumberish,
    endBlock: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  executionSchedule(
    arg0: BigNumberish,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  setEquityModule(
    moduleAddr: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  settleWager(
    wagerId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  voidWager(
    wagerId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  wagers(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [
      string,
      string,
      string,
      string,
      string,
      string,
      number,
      string,
      string,
      string,
      string
    ] & {
      parties: string;
      partyOneWagerData: string;
      partyTwoWagerData: string;
      equityData: string;
      blockData: string;
      result: string;
      state: number;
      wagerModule: string;
      oracleModule: string;
      oracleSource: string;
      supplementalOracleData: string;
    }
  >;

  callStatic: {
    createWager(
      wager: {
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
        supplementalOracleData: BytesLike;
      },
      overrides?: CallOverrides
    ): Promise<void>;

    decodeBlocks(
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        createdBlock: BigNumber;
        expirationBlock: BigNumber;
        enterLimitBlock: BigNumber;
      }
    >;

    decodeParties(
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string, string] & { partyOne: string; partyTwo: string }>;

    enterWager(
      wagerId: BigNumberish,
      partyTwoEquityData: BytesLike,
      partyTwoWagerData: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    equityModule(overrides?: CallOverrides): Promise<string>;

    executeBlockRange(
      startBlock: BigNumberish,
      endBlock: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    executionSchedule(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setEquityModule(
      moduleAddr: string,
      overrides?: CallOverrides
    ): Promise<void>;

    settleWager(
      wagerId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    voidWager(wagerId: BigNumberish, overrides?: CallOverrides): Promise<void>;

    wagers(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        string,
        string,
        string,
        string,
        string,
        string,
        number,
        string,
        string,
        string,
        string
      ] & {
        parties: string;
        partyOneWagerData: string;
        partyTwoWagerData: string;
        equityData: string;
        blockData: string;
        result: string;
        state: number;
        wagerModule: string;
        oracleModule: string;
        oracleSource: string;
        supplementalOracleData: string;
      }
    >;
  };

  filters: {
    "WagerCreated(address,uint256,bytes,uint256,uint256,address,address,uint256)"(
      partyAddr?: string | null,
      partyWagerAmount?: null,
      partyWager?: null,
      enterLimitBlock?: null,
      expirationBlock?: null,
      wagerModule?: null,
      oracleModule?: null,
      wagerId?: BigNumberish | null
    ): TypedEventFilter<
      [
        string,
        BigNumber,
        string,
        BigNumber,
        BigNumber,
        string,
        string,
        BigNumber
      ],
      {
        partyAddr: string;
        partyWagerAmount: BigNumber;
        partyWager: string;
        enterLimitBlock: BigNumber;
        expirationBlock: BigNumber;
        wagerModule: string;
        oracleModule: string;
        wagerId: BigNumber;
      }
    >;

    WagerCreated(
      partyAddr?: string | null,
      partyWagerAmount?: null,
      partyWager?: null,
      enterLimitBlock?: null,
      expirationBlock?: null,
      wagerModule?: null,
      oracleModule?: null,
      wagerId?: BigNumberish | null
    ): TypedEventFilter<
      [
        string,
        BigNumber,
        string,
        BigNumber,
        BigNumber,
        string,
        string,
        BigNumber
      ],
      {
        partyAddr: string;
        partyWagerAmount: BigNumber;
        partyWager: string;
        enterLimitBlock: BigNumber;
        expirationBlock: BigNumber;
        wagerModule: string;
        oracleModule: string;
        wagerId: BigNumber;
      }
    >;

    "WagerEntered(address,bytes,uint256)"(
      partyAddr?: string | null,
      partyWager?: null,
      wagerId?: BigNumberish | null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { partyAddr: string; partyWager: string; wagerId: BigNumber }
    >;

    WagerEntered(
      partyAddr?: string | null,
      partyWager?: null,
      wagerId?: BigNumberish | null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { partyAddr: string; partyWager: string; wagerId: BigNumber }
    >;

    "WagerSettled(address,uint256,bytes,uint256)"(
      winner?: string | null,
      amount?: null,
      result?: null,
      wagerId?: BigNumberish | null
    ): TypedEventFilter<
      [string, BigNumber, string, BigNumber],
      { winner: string; amount: BigNumber; result: string; wagerId: BigNumber }
    >;

    WagerSettled(
      winner?: string | null,
      amount?: null,
      result?: null,
      wagerId?: BigNumberish | null
    ): TypedEventFilter<
      [string, BigNumber, string, BigNumber],
      { winner: string; amount: BigNumber; result: string; wagerId: BigNumber }
    >;

    "WagerVoided(uint256)"(
      wagerId?: BigNumberish | null
    ): TypedEventFilter<[BigNumber], { wagerId: BigNumber }>;

    WagerVoided(
      wagerId?: BigNumberish | null
    ): TypedEventFilter<[BigNumber], { wagerId: BigNumber }>;
  };

  estimateGas: {
    createWager(
      wager: {
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
        supplementalOracleData: BytesLike;
      },
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    decodeBlocks(
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    decodeParties(
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    enterWager(
      wagerId: BigNumberish,
      partyTwoEquityData: BytesLike,
      partyTwoWagerData: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    equityModule(overrides?: CallOverrides): Promise<BigNumber>;

    executeBlockRange(
      startBlock: BigNumberish,
      endBlock: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    executionSchedule(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setEquityModule(
      moduleAddr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    settleWager(
      wagerId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    voidWager(
      wagerId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    wagers(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    createWager(
      wager: {
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
        supplementalOracleData: BytesLike;
      },
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    decodeBlocks(
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    decodeParties(
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    enterWager(
      wagerId: BigNumberish,
      partyTwoEquityData: BytesLike,
      partyTwoWagerData: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    equityModule(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    executeBlockRange(
      startBlock: BigNumberish,
      endBlock: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    executionSchedule(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setEquityModule(
      moduleAddr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    settleWager(
      wagerId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    voidWager(
      wagerId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    wagers(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}