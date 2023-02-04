/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WagerFactory, WagerFactoryInterface } from "../WagerFactory";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_registry",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes",
            name: "parties",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "partyOneWagerData",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "blockData",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "wagerOracleData",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "supplumentalWagerOracleData",
            type: "bytes",
          },
          {
            internalType: "string",
            name: "wagerModuleName",
            type: "string",
          },
          {
            internalType: "address",
            name: "oracleModule",
            type: "address",
          },
          {
            internalType: "address",
            name: "oracleSource",
            type: "address",
          },
        ],
        internalType: "struct WagerFactory.WagerParameters",
        name: "params",
        type: "tuple",
      },
    ],
    name: "createWager",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
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
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "address",
        name: "wagerModuleAddr",
        type: "address",
      },
    ],
    name: "setWagerModule",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50604051610e06380380610e068339818101604052810190610032919061008d565b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050610108565b600081519050610087816100f1565b92915050565b6000602082840312156100a3576100a26100ec565b5b60006100b184828501610078565b91505092915050565b60006100c5826100cc565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600080fd5b6100fa816100ba565b811461010557600080fd5b50565b610cef806101176000396000f3fe6080604052600436106100345760003560e01c80633a9c8fe7146100395780636aa1daf4146100625780637b10399914610092575b600080fd5b34801561004557600080fd5b50610060600480360381019061005b9190610656565b6100bd565b005b61007c600480360381019061007791906106b2565b61011e565b60405161008991906109c0565b60405180910390f35b34801561009e57600080fd5b506100a76103b6565b6040516100b49190610963565b60405180910390f35b806001836040516100ce919061094c565b908152602001604051809103902060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050565b60008060018360a00151604051610135919061094c565b908152602001604051809103902060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156101d6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101cd9061097e565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663e26c53443460405180610180016040528087600001518152602001876020015181526020016040518060400160405280600281526020017f307800000000000000000000000000000000000000000000000000000000000081525081526020013481526020018760400151815260200187606001518152602001876080015181526020016040518060400160405280600281526020017f30780000000000000000000000000000000000000000000000000000000000008152508152602001600160038111156102e1576102e0610bc1565b5b81526020018573ffffffffffffffffffffffffffffffffffffffff1681526020018760c0015173ffffffffffffffffffffffffffffffffffffffff1681526020018760e0015173ffffffffffffffffffffffffffffffffffffffff168152506040518363ffffffff1660e01b815260040161035c919061099e565b6020604051808303818588803b15801561037557600080fd5b505af1158015610389573d6000803e3d6000fd5b50505050506040513d601f19601f820116820180604052508101906103ae91906106fb565b915050919050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006103ed6103e884610a00565b6109db565b90508281526020810184848401111561040957610408610c2e565b5b610414848285610b4e565b509392505050565b600061042f61042a84610a31565b6109db565b90508281526020810184848401111561044b5761044a610c2e565b5b610456848285610b4e565b509392505050565b60008135905061046d81610c8b565b92915050565b600082601f83011261048857610487610c1f565b5b81356104988482602086016103da565b91505092915050565b600082601f8301126104b6576104b5610c1f565b5b81356104c684826020860161041c565b91505092915050565b600061010082840312156104e6576104e5610c24565b5b6104f16101006109db565b9050600082013567ffffffffffffffff81111561051157610510610c29565b5b61051d84828501610473565b600083015250602082013567ffffffffffffffff81111561054157610540610c29565b5b61054d84828501610473565b602083015250604082013567ffffffffffffffff81111561057157610570610c29565b5b61057d84828501610473565b604083015250606082013567ffffffffffffffff8111156105a1576105a0610c29565b5b6105ad84828501610473565b606083015250608082013567ffffffffffffffff8111156105d1576105d0610c29565b5b6105dd84828501610473565b60808301525060a082013567ffffffffffffffff81111561060157610600610c29565b5b61060d848285016104a1565b60a08301525060c06106218482850161045e565b60c08301525060e06106358482850161045e565b60e08301525092915050565b60008151905061065081610ca2565b92915050565b6000806040838503121561066d5761066c610c38565b5b600083013567ffffffffffffffff81111561068b5761068a610c33565b5b610697858286016104a1565b92505060206106a88582860161045e565b9150509250929050565b6000602082840312156106c8576106c7610c38565b5b600082013567ffffffffffffffff8111156106e6576106e5610c33565b5b6106f2848285016104cf565b91505092915050565b60006020828403121561071157610710610c38565b5b600061071f84828501610641565b91505092915050565b61073181610aa5565b82525050565b61074081610aa5565b82525050565b600061075182610a62565b61075b8185610a78565b935061076b818560208601610b5d565b61077481610c3d565b840191505092915050565b61078881610af4565b82525050565b61079781610b06565b82525050565b6107a681610b18565b82525050565b60006107b782610a6d565b6107c18185610a9a565b93506107d1818560208601610b5d565b80840191505092915050565b60006107ea601383610a89565b91506107f582610c4e565b602082019050919050565b600061018083016000830151848203600086015261081e8282610746565b915050602083015184820360208601526108388282610746565b915050604083015184820360408601526108528282610746565b9150506060830151610867606086018261092e565b506080830151848203608086015261087f8282610746565b91505060a083015184820360a08601526108998282610746565b91505060c083015184820360c08601526108b38282610746565b91505060e083015184820360e08601526108cd8282610746565b9150506101008301516108e461010086018261079d565b506101208301516108f961012086018261077f565b5061014083015161090e61014086018261078e565b50610160830151610923610160860182610728565b508091505092915050565b61093781610aea565b82525050565b61094681610aea565b82525050565b600061095882846107ac565b915081905092915050565b60006020820190506109786000830184610737565b92915050565b60006020820190508181036000830152610997816107dd565b9050919050565b600060208201905081810360008301526109b88184610800565b905092915050565b60006020820190506109d5600083018461093d565b92915050565b60006109e56109f6565b90506109f18282610b90565b919050565b6000604051905090565b600067ffffffffffffffff821115610a1b57610a1a610bf0565b5b610a2482610c3d565b9050602081019050919050565b600067ffffffffffffffff821115610a4c57610a4b610bf0565b5b610a5582610c3d565b9050602081019050919050565b600081519050919050565b600081519050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600081905092915050565b6000610ab082610aca565b9050919050565b6000819050610ac582610c77565b919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6000610aff82610b2a565b9050919050565b6000610b1182610b2a565b9050919050565b6000610b2382610ab7565b9050919050565b6000610b3582610b3c565b9050919050565b6000610b4782610aca565b9050919050565b82818337600083830152505050565b60005b83811015610b7b578082015181840152602081019050610b60565b83811115610b8a576000848401525b50505050565b610b9982610c3d565b810181811067ffffffffffffffff82111715610bb857610bb7610bf0565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f696e76616c69642077616765724d6f64756c6500000000000000000000000000600082015250565b60048110610c8857610c87610bc1565b5b50565b610c9481610aa5565b8114610c9f57600080fd5b50565b610cab81610aea565b8114610cb657600080fd5b5056fea2646970667358221220ce5cc6490a78039091ffef790543fd5b1c60e7eaf0344094942c475136c71eae64736f6c63430008070033";

export class WagerFactory__factory extends ContractFactory {
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
    _registry: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<WagerFactory> {
    return super.deploy(_registry, overrides || {}) as Promise<WagerFactory>;
  }
  getDeployTransaction(
    _registry: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_registry, overrides || {});
  }
  attach(address: string): WagerFactory {
    return super.attach(address) as WagerFactory;
  }
  connect(signer: Signer): WagerFactory__factory {
    return super.connect(signer) as WagerFactory__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): WagerFactoryInterface {
    return new utils.Interface(_abi) as WagerFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): WagerFactory {
    return new Contract(address, _abi, signerOrProvider) as WagerFactory;
  }
}
