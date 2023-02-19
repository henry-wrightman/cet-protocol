// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Registry extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Registry entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Registry must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Registry", id.toString(), this);
    }
  }

  static load(id: string): Registry | null {
    return changetype<Registry | null>(store.get("Registry", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get wagers(): Array<string> {
    let value = this.get("wagers");
    return value!.toStringArray();
  }

  set wagers(value: Array<string>) {
    this.set("wagers", Value.fromStringArray(value));
  }

  get wagerIds(): Array<string> {
    let value = this.get("wagerIds");
    return value!.toStringArray();
  }

  set wagerIds(value: Array<string>) {
    this.set("wagerIds", Value.fromStringArray(value));
  }
}

export class Wager extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Wager entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Wager must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Wager", id.toString(), this);
    }
  }

  static load(id: string): Wager | null {
    return changetype<Wager | null>(store.get("Wager", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get partyOne(): Bytes {
    let value = this.get("partyOne");
    return value!.toBytes();
  }

  set partyOne(value: Bytes) {
    this.set("partyOne", Value.fromBytes(value));
  }

  get partyTwo(): Bytes | null {
    let value = this.get("partyTwo");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set partyTwo(value: Bytes | null) {
    if (!value) {
      this.unset("partyTwo");
    } else {
      this.set("partyTwo", Value.fromBytes(<Bytes>value));
    }
  }

  get partyWager(): BigInt {
    let value = this.get("partyWager");
    return value!.toBigInt();
  }

  set partyWager(value: BigInt) {
    this.set("partyWager", Value.fromBigInt(value));
  }

  get partyOneWager(): Bytes {
    let value = this.get("partyOneWager");
    return value!.toBytes();
  }

  set partyOneWager(value: Bytes) {
    this.set("partyOneWager", Value.fromBytes(value));
  }

  get partyTwoWager(): Bytes | null {
    let value = this.get("partyTwoWager");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set partyTwoWager(value: Bytes | null) {
    if (!value) {
      this.unset("partyTwoWager");
    } else {
      this.set("partyTwoWager", Value.fromBytes(<Bytes>value));
    }
  }

  get createdBlock(): BigInt {
    let value = this.get("createdBlock");
    return value!.toBigInt();
  }

  set createdBlock(value: BigInt) {
    this.set("createdBlock", Value.fromBigInt(value));
  }

  get enterLimitBlock(): BigInt {
    let value = this.get("enterLimitBlock");
    return value!.toBigInt();
  }

  set enterLimitBlock(value: BigInt) {
    this.set("enterLimitBlock", Value.fromBigInt(value));
  }

  get expirationBlock(): BigInt {
    let value = this.get("expirationBlock");
    return value!.toBigInt();
  }

  set expirationBlock(value: BigInt) {
    this.set("expirationBlock", Value.fromBigInt(value));
  }

  get supplementalOracleData(): Bytes | null {
    let value = this.get("supplementalOracleData");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set supplementalOracleData(value: Bytes | null) {
    if (!value) {
      this.unset("supplementalOracleData");
    } else {
      this.set("supplementalOracleData", Value.fromBytes(<Bytes>value));
    }
  }

  get result(): Bytes | null {
    let value = this.get("result");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set result(value: Bytes | null) {
    if (!value) {
      this.unset("result");
    } else {
      this.set("result", Value.fromBytes(<Bytes>value));
    }
  }

  get state(): BigInt {
    let value = this.get("state");
    return value!.toBigInt();
  }

  set state(value: BigInt) {
    this.set("state", Value.fromBigInt(value));
  }

  get wagerModule(): Bytes {
    let value = this.get("wagerModule");
    return value!.toBytes();
  }

  set wagerModule(value: Bytes) {
    this.set("wagerModule", Value.fromBytes(value));
  }

  get oracleImpl(): Bytes {
    let value = this.get("oracleImpl");
    return value!.toBytes();
  }

  set oracleImpl(value: Bytes) {
    this.set("oracleImpl", Value.fromBytes(value));
  }

  get registry(): string {
    let value = this.get("registry");
    return value!.toString();
  }

  set registry(value: string) {
    this.set("registry", Value.fromString(value));
  }

  get winner(): Bytes | null {
    let value = this.get("winner");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set winner(value: Bytes | null) {
    if (!value) {
      this.unset("winner");
    } else {
      this.set("winner", Value.fromBytes(<Bytes>value));
    }
  }
}

export class WagerParty extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save WagerParty entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type WagerParty must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("WagerParty", id.toString(), this);
    }
  }

  static load(id: string): WagerParty | null {
    return changetype<WagerParty | null>(store.get("WagerParty", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get wagerIds(): Array<string> {
    let value = this.get("wagerIds");
    return value!.toStringArray();
  }

  set wagerIds(value: Array<string>) {
    this.set("wagerIds", Value.fromStringArray(value));
  }

  get uri(): string | null {
    let value = this.get("uri");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set uri(value: string | null) {
    if (!value) {
      this.unset("uri");
    } else {
      this.set("uri", Value.fromString(<string>value));
    }
  }
}
