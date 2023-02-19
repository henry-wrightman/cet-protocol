// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class WagerCreated extends ethereum.Event {
  get params(): WagerCreated__Params {
    return new WagerCreated__Params(this);
  }
}

export class WagerCreated__Params {
  _event: WagerCreated;

  constructor(event: WagerCreated) {
    this._event = event;
  }

  get partyAddr(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get partyWagerAmount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get partyWager(): Bytes {
    return this._event.parameters[2].value.toBytes();
  }

  get enterLimitBlock(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get expirationBlock(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get wagerModule(): Address {
    return this._event.parameters[5].value.toAddress();
  }

  get oracleModule(): Address {
    return this._event.parameters[6].value.toAddress();
  }

  get wagerId(): BigInt {
    return this._event.parameters[7].value.toBigInt();
  }
}

export class WagerEntered extends ethereum.Event {
  get params(): WagerEntered__Params {
    return new WagerEntered__Params(this);
  }
}

export class WagerEntered__Params {
  _event: WagerEntered;

  constructor(event: WagerEntered) {
    this._event = event;
  }

  get partyAddr(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get partyWager(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }

  get wagerId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class WagerSettled extends ethereum.Event {
  get params(): WagerSettled__Params {
    return new WagerSettled__Params(this);
  }
}

export class WagerSettled__Params {
  _event: WagerSettled;

  constructor(event: WagerSettled) {
    this._event = event;
  }

  get winner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get result(): Bytes {
    return this._event.parameters[2].value.toBytes();
  }

  get wagerId(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class WagerVoided extends ethereum.Event {
  get params(): WagerVoided__Params {
    return new WagerVoided__Params(this);
  }
}

export class WagerVoided__Params {
  _event: WagerVoided;

  constructor(event: WagerVoided) {
    this._event = event;
  }

  get wagerId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class WagerRegistry__decodeBlocksResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;

  constructor(value0: BigInt, value1: BigInt, value2: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    return map;
  }
}

export class WagerRegistry__decodePartiesResult {
  value0: Address;
  value1: Address;

  constructor(value0: Address, value1: Address) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromAddress(this.value1));
    return map;
  }
}

export class WagerRegistry__wagersResult {
  value0: Bytes;
  value1: Bytes;
  value2: Bytes;
  value3: Bytes;
  value4: Bytes;
  value5: Bytes;
  value6: i32;
  value7: Address;
  value8: Address;
  value9: Address;
  value10: Bytes;

  constructor(
    value0: Bytes,
    value1: Bytes,
    value2: Bytes,
    value3: Bytes,
    value4: Bytes,
    value5: Bytes,
    value6: i32,
    value7: Address,
    value8: Address,
    value9: Address,
    value10: Bytes
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
    this.value6 = value6;
    this.value7 = value7;
    this.value8 = value8;
    this.value9 = value9;
    this.value10 = value10;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromBytes(this.value0));
    map.set("value1", ethereum.Value.fromBytes(this.value1));
    map.set("value2", ethereum.Value.fromBytes(this.value2));
    map.set("value3", ethereum.Value.fromBytes(this.value3));
    map.set("value4", ethereum.Value.fromBytes(this.value4));
    map.set("value5", ethereum.Value.fromBytes(this.value5));
    map.set(
      "value6",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value6))
    );
    map.set("value7", ethereum.Value.fromAddress(this.value7));
    map.set("value8", ethereum.Value.fromAddress(this.value8));
    map.set("value9", ethereum.Value.fromAddress(this.value9));
    map.set("value10", ethereum.Value.fromBytes(this.value10));
    return map;
  }
}

export class WagerRegistry extends ethereum.SmartContract {
  static bind(address: Address): WagerRegistry {
    return new WagerRegistry("WagerRegistry", address);
  }

  decodeBlocks(data: Bytes): WagerRegistry__decodeBlocksResult {
    let result = super.call(
      "decodeBlocks",
      "decodeBlocks(bytes):(uint80,uint80,uint80)",
      [ethereum.Value.fromBytes(data)]
    );

    return new WagerRegistry__decodeBlocksResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt()
    );
  }

  try_decodeBlocks(
    data: Bytes
  ): ethereum.CallResult<WagerRegistry__decodeBlocksResult> {
    let result = super.tryCall(
      "decodeBlocks",
      "decodeBlocks(bytes):(uint80,uint80,uint80)",
      [ethereum.Value.fromBytes(data)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new WagerRegistry__decodeBlocksResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBigInt()
      )
    );
  }

  decodeParties(data: Bytes): WagerRegistry__decodePartiesResult {
    let result = super.call(
      "decodeParties",
      "decodeParties(bytes):(address,address)",
      [ethereum.Value.fromBytes(data)]
    );

    return new WagerRegistry__decodePartiesResult(
      result[0].toAddress(),
      result[1].toAddress()
    );
  }

  try_decodeParties(
    data: Bytes
  ): ethereum.CallResult<WagerRegistry__decodePartiesResult> {
    let result = super.tryCall(
      "decodeParties",
      "decodeParties(bytes):(address,address)",
      [ethereum.Value.fromBytes(data)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new WagerRegistry__decodePartiesResult(
        value[0].toAddress(),
        value[1].toAddress()
      )
    );
  }

  equityModule(): Address {
    let result = super.call("equityModule", "equityModule():(address)", []);

    return result[0].toAddress();
  }

  try_equityModule(): ethereum.CallResult<Address> {
    let result = super.tryCall("equityModule", "equityModule():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  executionSchedule(param0: BigInt, param1: BigInt): BigInt {
    let result = super.call(
      "executionSchedule",
      "executionSchedule(uint256,uint256):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );

    return result[0].toBigInt();
  }

  try_executionSchedule(
    param0: BigInt,
    param1: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "executionSchedule",
      "executionSchedule(uint256,uint256):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  wagers(param0: BigInt): WagerRegistry__wagersResult {
    let result = super.call(
      "wagers",
      "wagers(uint256):(bytes,bytes,bytes,bytes,bytes,bytes,uint8,address,address,address,bytes)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return new WagerRegistry__wagersResult(
      result[0].toBytes(),
      result[1].toBytes(),
      result[2].toBytes(),
      result[3].toBytes(),
      result[4].toBytes(),
      result[5].toBytes(),
      result[6].toI32(),
      result[7].toAddress(),
      result[8].toAddress(),
      result[9].toAddress(),
      result[10].toBytes()
    );
  }

  try_wagers(param0: BigInt): ethereum.CallResult<WagerRegistry__wagersResult> {
    let result = super.tryCall(
      "wagers",
      "wagers(uint256):(bytes,bytes,bytes,bytes,bytes,bytes,uint8,address,address,address,bytes)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new WagerRegistry__wagersResult(
        value[0].toBytes(),
        value[1].toBytes(),
        value[2].toBytes(),
        value[3].toBytes(),
        value[4].toBytes(),
        value[5].toBytes(),
        value[6].toI32(),
        value[7].toAddress(),
        value[8].toAddress(),
        value[9].toAddress(),
        value[10].toBytes()
      )
    );
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class CreateWagerCall extends ethereum.Call {
  get inputs(): CreateWagerCall__Inputs {
    return new CreateWagerCall__Inputs(this);
  }

  get outputs(): CreateWagerCall__Outputs {
    return new CreateWagerCall__Outputs(this);
  }
}

export class CreateWagerCall__Inputs {
  _call: CreateWagerCall;

  constructor(call: CreateWagerCall) {
    this._call = call;
  }

  get wager(): CreateWagerCallWagerStruct {
    return changetype<CreateWagerCallWagerStruct>(
      this._call.inputValues[0].value.toTuple()
    );
  }
}

export class CreateWagerCall__Outputs {
  _call: CreateWagerCall;

  constructor(call: CreateWagerCall) {
    this._call = call;
  }
}

export class CreateWagerCallWagerStruct extends ethereum.Tuple {
  get parties(): Bytes {
    return this[0].toBytes();
  }

  get partyOneWagerData(): Bytes {
    return this[1].toBytes();
  }

  get partyTwoWagerData(): Bytes {
    return this[2].toBytes();
  }

  get equityData(): Bytes {
    return this[3].toBytes();
  }

  get blockData(): Bytes {
    return this[4].toBytes();
  }

  get result(): Bytes {
    return this[5].toBytes();
  }

  get state(): i32 {
    return this[6].toI32();
  }

  get wagerModule(): Address {
    return this[7].toAddress();
  }

  get oracleModule(): Address {
    return this[8].toAddress();
  }

  get oracleSource(): Address {
    return this[9].toAddress();
  }

  get supplumentalOracleData(): Bytes {
    return this[10].toBytes();
  }
}

export class EnterWagerCall extends ethereum.Call {
  get inputs(): EnterWagerCall__Inputs {
    return new EnterWagerCall__Inputs(this);
  }

  get outputs(): EnterWagerCall__Outputs {
    return new EnterWagerCall__Outputs(this);
  }
}

export class EnterWagerCall__Inputs {
  _call: EnterWagerCall;

  constructor(call: EnterWagerCall) {
    this._call = call;
  }

  get wagerId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get partyTwoEquityData(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }

  get partyTwoWagerData(): Bytes {
    return this._call.inputValues[2].value.toBytes();
  }
}

export class EnterWagerCall__Outputs {
  _call: EnterWagerCall;

  constructor(call: EnterWagerCall) {
    this._call = call;
  }
}

export class ExecuteBlockRangeCall extends ethereum.Call {
  get inputs(): ExecuteBlockRangeCall__Inputs {
    return new ExecuteBlockRangeCall__Inputs(this);
  }

  get outputs(): ExecuteBlockRangeCall__Outputs {
    return new ExecuteBlockRangeCall__Outputs(this);
  }
}

export class ExecuteBlockRangeCall__Inputs {
  _call: ExecuteBlockRangeCall;

  constructor(call: ExecuteBlockRangeCall) {
    this._call = call;
  }

  get startBlock(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get endBlock(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ExecuteBlockRangeCall__Outputs {
  _call: ExecuteBlockRangeCall;

  constructor(call: ExecuteBlockRangeCall) {
    this._call = call;
  }
}

export class SetEquityModuleCall extends ethereum.Call {
  get inputs(): SetEquityModuleCall__Inputs {
    return new SetEquityModuleCall__Inputs(this);
  }

  get outputs(): SetEquityModuleCall__Outputs {
    return new SetEquityModuleCall__Outputs(this);
  }
}

export class SetEquityModuleCall__Inputs {
  _call: SetEquityModuleCall;

  constructor(call: SetEquityModuleCall) {
    this._call = call;
  }

  get moduleAddr(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetEquityModuleCall__Outputs {
  _call: SetEquityModuleCall;

  constructor(call: SetEquityModuleCall) {
    this._call = call;
  }
}

export class SettleWagerCall extends ethereum.Call {
  get inputs(): SettleWagerCall__Inputs {
    return new SettleWagerCall__Inputs(this);
  }

  get outputs(): SettleWagerCall__Outputs {
    return new SettleWagerCall__Outputs(this);
  }
}

export class SettleWagerCall__Inputs {
  _call: SettleWagerCall;

  constructor(call: SettleWagerCall) {
    this._call = call;
  }

  get wagerId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SettleWagerCall__Outputs {
  _call: SettleWagerCall;

  constructor(call: SettleWagerCall) {
    this._call = call;
  }
}

export class VoidWagerCall extends ethereum.Call {
  get inputs(): VoidWagerCall__Inputs {
    return new VoidWagerCall__Inputs(this);
  }

  get outputs(): VoidWagerCall__Outputs {
    return new VoidWagerCall__Outputs(this);
  }
}

export class VoidWagerCall__Inputs {
  _call: VoidWagerCall;

  constructor(call: VoidWagerCall) {
    this._call = call;
  }

  get wagerId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class VoidWagerCall__Outputs {
  _call: VoidWagerCall;

  constructor(call: VoidWagerCall) {
    this._call = call;
  }
}
