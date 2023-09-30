# wagxr.xyz

once connecting an ethereum-compatible wallet, a user is able do the following:

- create a wager
- enter a wager
- void a wager
- complete a wager

### wager registry
the wager registry manages both the storage of all wagers, as well as their respective aforementioned actions.

see [IWagerRegistry](https://github.com/henry-wrightman/cet-protocol/blob/main/contracts/contracts/interfaces/IWagerRegistry.sol)

### wager struct
a "wager" constitutes an on-chain aggreement that includes the following information":

```
    bytes parties; // party data; |partyOne|partyTwo|
    bytes partyOneWagerData; // wager data for wager module to discern; e.g |wagerStart|wagerValue|
    bytes partyTwoWagerData;
    bytes equityData; // wager equity data; |WagerType|ercContractAddr(s)|amount(s)|tokenId(s)|
    bytes blockData; // blocktime data; |created|expiration|enterLimit|
    bytes result; // wager outcome
    WagerState state;
    IWagerModule wagerModule; // wager semantics
    IWagerOracleModule oracleModule; // oracle module semantics
    address oracleSource; // oracle source
    bytes supplementalOracleData; // supplemental wager oracle data
```

see [IWagerModule](https://github.com/henry-wrightman/cet-protocol/blob/main/contracts/contracts/interfaces/wagers/IWagerModule.sol)

a wager's state `WagerState` is either `created`, `active`, `voided`, `completed`.

the semantics behind the wager (e.g HighLow) are isolated within their own modules, which adhere to `IWagerModule`, specifically the method `settle`.

the data source comes from `oracleSource`; the address of the Oracle contract. `IWagerOracleModule` defines said oracle's semantics i.e wrapping the actual oracles' implementation(s)

#### settlement
wager execution (wager settlement) is _attempted_ to be automated via ChainLink with an executor that executes block ranges incrementally over some defined cadance. its not functional until I reduce gas cost(s)

other than that, anyone could settle a wager granted they're willing to pay the gas fee to do so. ideally, an incentive mechanism could help motivate this facet of the "ecosystem". don't wanna create a token though.. perhaps i could just use ETH that's pulled from wager liquidity as a (fee) to the participants for naturally handling the wager's lifecycle.


built w help from [wagmi's example](https://github.com/wagmi-dev/wagmi/tree/main/examples)

## todos
- build in incentive mechanism that's essentially a "fee" deducted from each wager's liquidity during settlement which justify's the network's work managing the wager's lifecycle.


## Startup

Create an `.env` file in the root following `.env.example`

Install:

```
yarn install
```

Run:

```
yarn dev
```
