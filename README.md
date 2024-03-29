# conditional equity transfer protocol

### cet-protocol

this is a [poc](https://github.com/henry-wrightman/cet-protocol/contracts) of an on-chain conditional equity transfer protocol that is meaant to be somewhat composable with pluggable modules that account for the transfer conditions, equity, and oracle/data resolution. instead of using a central registry with potential proofs (e.g via Merkle Tree) & self-maintained, it strives to leverage external oracles for _specific_ conditional inquiries, such as ChainLink for conditions reliant on asset price.

## subgraphs
- https://api.thegraph.com/subgraphs/name/henry-wrightman/1v1-goerli (goerli)
- https://api.thegraph.com/subgraphs/name/henry-wrightman/1v1-mumbai (mumbai)

### [wagxr.xyz](https://wagxr.xyz)

this [dapp](https://github.com/henry-wrightman/cet-protocol/blob/main/wagxr.xyz/README.md) fascilitates the means for 1v1 style wagering on-chain; from creation to settlement via the cet protocol. wagers can be one-sided (e.g airdrops), two-sided (e.g wagers), transfer ERC20/ERC721s (hopefully ERC1155s), and validate against oracles like chainlink or UMA. 

### [airdrxp.xyz](https://airdrxp.xyz) (WIP)

this [dapp](https://github.com/henry-wrightman/cet-protocol/blob/main/airdrxp.xyz/README.md) demonstrates the cet-protocol for something like conditional airdrops, where NFTs could be dropped to recipients based off of on-chain preconditions reliant on an oracle.
