export type WagerResults = {
  wagers: Wager[];
};

export type WagerResult = {
  wager: Wager;
};

export type WagerParty = {
  id: string;
  wagerIds: string[];
};

export type Wager = {
  id: string;
  partyOne: WagerParty;
  partyOneWager: string;
  partyTwo: WagerParty;
  partyTwoWager: string;
  expirationBlock: number;
  partyWager: string;
  state: string;
  result: string;
  winner: string;
  wagerModule: string;
  oracleImpl: string;
};
