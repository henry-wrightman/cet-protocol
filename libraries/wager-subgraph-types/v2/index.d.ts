export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigInt: any;
  Bytes: any;
};

export type Registry = {
  __typename?: 'Registry';
  id: Scalars['ID'];
  wagerIds: Array<Scalars['String']>;
  wagers: Array<Wager>;
};

export type Wager = {
  __typename?: 'Wager';
  createdBlock: Scalars['BigInt'];
  expirationBlock: Scalars['BigInt'];
  id: Scalars['String'];
  oracleImpl: Scalars['Bytes'];
  partyOne: Scalars['Bytes'];
  partyOneWager: Scalars['Bytes'];
  partyTwo?: Maybe<Scalars['Bytes']>;
  partyTwoWager?: Maybe<Scalars['Bytes']>;
  partyWager: Scalars['BigInt'];
  registry: Registry;
  result?: Maybe<Scalars['Bytes']>;
  state: Scalars['BigInt'];
  supplumentalWagerOracleData?: Maybe<Scalars['Bytes']>;
  wagerModule: Scalars['Bytes'];
  wagerOracleData?: Maybe<Scalars['Bytes']>;
  winner?: Maybe<Scalars['Bytes']>;
};

export type WagerParty = {
  __typename?: 'WagerParty';
  id: Scalars['ID'];
  uri?: Maybe<Scalars['String']>;
  wagerIds: Array<Scalars['String']>;
};
