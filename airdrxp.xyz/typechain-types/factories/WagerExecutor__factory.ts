/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WagerExecutor, WagerExecutorInterface } from "../WagerExecutor";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "registryAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "checkUpkeep",
    outputs: [
      {
        internalType: "bool",
        name: "upkeepNeeded",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "executions",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastBlock",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "performUpkeep",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "registry",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161066b38038061066b8339818101604052810190610032919061009c565b436001819055506000600281905550806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050610117565b60008151905061009681610100565b92915050565b6000602082840312156100b2576100b16100fb565b5b60006100c084828501610087565b91505092915050565b60006100d4826100db565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600080fd5b610109816100c9565b811461011457600080fd5b50565b610545806101266000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80634585e33b1461005c5780636e04ff0d146100785780637b103999146100a9578063806b984f146100c7578063b21f4517146100e5575b600080fd5b61007660048036038101906100719190610260565b610103565b005b610092600480360381019061008d9190610260565b610107565b6040516100a092919061032e565b60405180910390f35b6100b16101da565b6040516100be9190610313565b60405180910390f35b6100cf6101fe565b6040516100dc919061035e565b60405180910390f35b6100ed610204565b6040516100fa919061035e565b60405180910390f35b5050565b6000606060006001544361011b91906103be565b11915081156101cc5760008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d0030911600154436040518363ffffffff1660e01b8152600401610181929190610379565b600060405180830381600087803b15801561019b57600080fd5b505af11580156101af573d6000803e3d6000fd5b50505050600260008154809291906101c69061046d565b91905055505b436001819055509250929050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60015481565b60025481565b60008083601f8401126102205761021f6104ea565b5b8235905067ffffffffffffffff81111561023d5761023c6104e5565b5b602083019150836001820283011115610259576102586104ef565b5b9250929050565b60008060208385031215610277576102766104f9565b5b600083013567ffffffffffffffff811115610295576102946104f4565b5b6102a18582860161020a565b92509250509250929050565b6102b6816103f2565b82525050565b6102c581610404565b82525050565b60006102d6826103a2565b6102e081856103ad565b93506102f081856020860161043a565b6102f9816104fe565b840191505092915050565b61030d81610430565b82525050565b600060208201905061032860008301846102ad565b92915050565b600060408201905061034360008301856102bc565b818103602083015261035581846102cb565b90509392505050565b60006020820190506103736000830184610304565b92915050565b600060408201905061038e6000830185610304565b61039b6020830184610304565b9392505050565b600081519050919050565b600082825260208201905092915050565b60006103c982610430565b91506103d483610430565b9250828210156103e7576103e66104b6565b5b828203905092915050565b60006103fd82610410565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60005b8381101561045857808201518184015260208101905061043d565b83811115610467576000848401525b50505050565b600061047882610430565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156104ab576104aa6104b6565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f830116905091905056fea26469706673582212201ae76307f04dbc61c9ed8713b34f68a5e26cda48e338d676aab432951f1538a264736f6c63430008070033";

export class WagerExecutor__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    registryAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<WagerExecutor> {
    return super.deploy(
      registryAddress,
      overrides || {}
    ) as Promise<WagerExecutor>;
  }
  getDeployTransaction(
    registryAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(registryAddress, overrides || {});
  }
  attach(address: string): WagerExecutor {
    return super.attach(address) as WagerExecutor;
  }
  connect(signer: Signer): WagerExecutor__factory {
    return super.connect(signer) as WagerExecutor__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): WagerExecutorInterface {
    return new utils.Interface(_abi) as WagerExecutorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): WagerExecutor {
    return new Contract(address, _abi, signerOrProvider) as WagerExecutor;
  }
}
