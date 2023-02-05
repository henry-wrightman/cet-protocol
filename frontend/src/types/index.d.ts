export type WagerResults = {
  wagers: Wager[];
};

export type WagerResult = {
  wager: Wager;
};

export type WagerParty = {
  id: string;
  wagerIds: string[];
  uri: string;
};

export type Wager = {
  id: string;
  partyOne: string;
  partyOneWager: string;
  partyTwo: string;
  partyTwoWager: string;
  expirationBlock: number;
  partyWager: string;
  state: string;
  result: string;
  winner: string;
  wagerModule: string;
  oracleImpl: string;
};
