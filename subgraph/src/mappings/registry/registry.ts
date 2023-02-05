import { BigInt, Bytes, store } from "@graphprotocol/graph-ts";
import {
  WagerCreated,
  WagerEntered,
  WagerSettled,
  WagerVoided,
  WagerWithdraw
} from "../../../generated/WagerRegistry/WagerRegistry";

import { Registry, Wager, WagerParty } from "../../../generated/schema";

import { ZERO, ZERO_ADDRESS_STRING } from "../common";

function getOrCreateRegistry(address: string, timestamp: BigInt): Registry {
  let registry = Registry.load(address);

  if (registry == null) {
    registry = new Registry(address);
    registry.wagerIds = [];
    registry.save();
  }

  return registry as Registry;
}

function getOrCreateWagerParty(address: string): WagerParty {
  let wagerParty = WagerParty.load(address);

  if (wagerParty == null) {
    wagerParty = new WagerParty(address);
    wagerParty.wagerIds = [];
    wagerParty.save();
  }

  return wagerParty as WagerParty;
}

export function handleWagerCreated(event: WagerCreated): void {
  let registry = getOrCreateRegistry(
    event.address.toHex(),
    event.block.timestamp
  );
  let wagerPartyOne = getOrCreateWagerParty(event.params.partyAddr.toHex());

  const wager = new Wager(event.params.wagerId.toString());
  wager.partyOne = event.params.partyAddr;
  wager.partyWager = event.params.partyWagerAmount;
  wager.partyOneWager = event.params.partyWager;
  wager.state = BigInt.fromI32(1); // created
  wager.createdBlock = event.params.createdBlock;
  wager.expirationBlock = event.params.expirationBlock;
  wager.wagerModule = event.params.wagerModule;
  wager.oracleImpl = event.params.oracleModule;
  wager.registry = registry.id;

  wagerPartyOne.wagerIds = wagerPartyOne.wagerIds.concat([wager.id]);
  registry.wagerIds = registry.wagerIds.concat([wager.id]);
  
  registry.save();
  wagerPartyOne.save();
  wager.save();
}

export function handleWagerEntered(event: WagerEntered): void {
  let wagerPartyTwo = getOrCreateWagerParty(event.params.partyAddr.toHex());

  const wager = new Wager(event.params.wagerId.toString());
  wagerPartyTwo.wagerIds = wagerPartyTwo.wagerIds.concat([wager.id]);
  wager.partyTwo = event.params.partyAddr;
  wager.partyTwoWager = event.params.partyWager;
  wager.state = BigInt.fromI32(0); // active

  wagerPartyTwo.save();
  wager.save();
}

export function handleWagerSettled(event: WagerSettled): void {
  const wager = new Wager(event.params.wagerId.toString());
  wager.winner = event.params.winner;
  wager.state = BigInt.fromI32(2); // completed
  wager.result = event.params.result;
  wager.save();
}

export function handleWagerVoided(event: WagerVoided): void {
  const wager = new Wager(event.params.wagerId.toString());
  wager.state = BigInt.fromI32(3); // voided
  wager.save();
}
