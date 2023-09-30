# cet-protocol contracts

## Deployments

TODO

## Setup:

Create a `.env` file in this folder with the vars in `.env.template`.

Run `yarn install` and then `yarn compile`.

## Commands:

Compile contracts & generate types with [Typechain](https://github.com/dethcrypto/TypeChain):

```shell
yarn compile
```

Clean up (need to run if you change contract names to generate new types):

```shell
yarn clean
```

Lint/format & fix `contracts`, `scripts`, & `tests`:

```shell
yarn lint
```

Test:

```shell
yarn test
```

Test with coverage:

```shell
yarn coverage
```

Test with gas report:

```shell
yarn test-gas-report
```

Get contract sizes:

```shell
yarn size
```

Run a script:

```shell
yarn hardhat run --network <network-name> scripts/<script-name>.ts
```

Verify contract on Etherscan:

```shell
yarn hardhat verify --network <network-name> <contract-address> <contract-params>
```