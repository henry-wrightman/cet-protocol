# conditional equity transfer protocol

feel free to fork, contribute, mock/critique etc. i have a feeling these types of "settlement" protos might grow a bit more prominent, so decided to try and make one (crudely)

### cet-protocol

this is a [poc](https://github.com/henry-wrightman/cet-protocol/contracts) of an on-chain conditional equity transfer protocol that is meaant to be somewhat composable with pluggable modules that account for the transfer conditions, equity, and oracle/data resolution.

## subgraphs
- https://api.thegraph.com/subgraphs/name/henry-wrightman/1v1-goerli (goerli)
- https://api.thegraph.com/subgraphs/name/henry-wrightman/1v1-mumbai (mumbai)

### [wagxr.xyz](https://wagxr.xyz)

this [dapp](https://github.com/henry-wrightman/cet-protocol/blob/main/wagxr.xyz/README.md) fascilitates the means for 1v1 style wagering on-chain; from creation to settlement via the cet protocol. wagers can be one-sided (e.g airdrops), two-sided (e.g wagers), transfer ERC20/ERC721s (hopefully ERC1155s), and validate against oracles like chainlink or UMA. 

### [airdrxp.xyz](https://airdrxp.xyz) (WIP)

WIP
