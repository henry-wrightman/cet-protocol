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

interface FinderInterfaceInterface extends ethers.utils.Interface {
  functions: {
    "changeImplementationAddress(bytes32,address)": FunctionFragment;
    "getImplementationAddress(bytes32)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "changeImplementationAddress",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getImplementationAddress",
    values: [BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "changeImplementationAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getImplementationAddress",
    data: BytesLike
  ): Result;

  events: {};
}

export class FinderInterface extends BaseContract {
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

  interface: FinderInterfaceInterface;

  functions: {
    changeImplementationAddress(
      interfaceName: BytesLike,
      implementationAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getImplementationAddress(
      interfaceName: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;
  };

  changeImplementationAddress(
    interfaceName: BytesLike,
    implementationAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getImplementationAddress(
    interfaceName: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  callStatic: {
    changeImplementationAddress(
      interfaceName: BytesLike,
      implementationAddress: string,
      overrides?: CallOverrides
    ): Promise<void>;

    getImplementationAddress(
      interfaceName: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {};

  estimateGas: {
    changeImplementationAddress(
      interfaceName: BytesLike,
      implementationAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getImplementationAddress(
      interfaceName: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    changeImplementationAddress(
      interfaceName: BytesLike,
      implementationAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getImplementationAddress(
      interfaceName: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
