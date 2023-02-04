# Project nosweat.bet

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

## SCA:

[Slither](https://github.com/crytic/slither)

Add your contract names in the `Flat` task in [`hardhat.config.ts`](https://github.com/passage-protocol/hardhat-starter/blob/master/hardhat.config.ts#L159)

1. install slither via docker `docker pull trailofbits/eth-security-toolbox`

2. flatten the contracts `yarn flat`

3. enter the slither docker container and mount the flattened contracts
   `docker run -it trailofbits/eth-security-toolbox`

4. in different window, copy contracts to container
   `docker cp $(pwd)/flattened/. <containerId>:/home/ethsec/contracts/`

5. inside container, update the compiler `solc-select use 0.8.11`

6. inside container, run the analysis `slither /home/ethsec/contracts`

## Performance optimizations

For faster runs of your tests and scripts, consider skipping ts-node's type checking by setting the environment variable `TS_NODE_TRANSPILE_ONLY` to `1` in hardhat's environment. For more details see [the documentation](https://hardhat.org/guides/typescript.html#performance-optimizations).
