/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ERC721, ERC721Interface } from "../ERC721";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
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
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
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
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
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
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620026da380380620026da83398181016040528101906200003791906200019f565b81600090805190602001906200004f92919062000071565b5080600190805190602001906200006892919062000071565b505050620003a8565b8280546200007f90620002b9565b90600052602060002090601f016020900481019282620000a35760008555620000ef565b82601f10620000be57805160ff1916838001178555620000ef565b82800160010185558215620000ef579182015b82811115620000ee578251825591602001919060010190620000d1565b5b509050620000fe919062000102565b5090565b5b808211156200011d57600081600090555060010162000103565b5090565b60006200013862000132846200024d565b62000224565b90508281526020810184848401111562000157576200015662000388565b5b6200016484828562000283565b509392505050565b600082601f83011262000184576200018362000383565b5b81516200019684826020860162000121565b91505092915050565b60008060408385031215620001b957620001b862000392565b5b600083015167ffffffffffffffff811115620001da57620001d96200038d565b5b620001e8858286016200016c565b925050602083015167ffffffffffffffff8111156200020c576200020b6200038d565b5b6200021a858286016200016c565b9150509250929050565b60006200023062000243565b90506200023e8282620002ef565b919050565b6000604051905090565b600067ffffffffffffffff8211156200026b576200026a62000354565b5b620002768262000397565b9050602081019050919050565b60005b83811015620002a357808201518184015260208101905062000286565b83811115620002b3576000848401525b50505050565b60006002820490506001821680620002d257607f821691505b60208210811415620002e957620002e862000325565b5b50919050565b620002fa8262000397565b810181811067ffffffffffffffff821117156200031c576200031b62000354565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b61232280620003b86000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c80636352211e1161008c578063a22cb46511610066578063a22cb46514610224578063b88d4fde14610240578063c87b56dd1461025c578063e985e9c51461028c576100cf565b80636352211e146101a657806370a08231146101d657806395d89b4114610206576100cf565b806301ffc9a7146100d457806306fdde0314610104578063081812fc14610122578063095ea7b31461015257806323b872dd1461016e57806342842e0e1461018a575b600080fd5b6100ee60048036038101906100e99190611863565b6102bc565b6040516100fb9190611b80565b60405180910390f35b61010c61039e565b6040516101199190611b9b565b60405180910390f35b61013c600480360381019061013791906118bd565b610430565b6040516101499190611b19565b60405180910390f35b61016c60048036038101906101679190611823565b610476565b005b6101886004803603810190610183919061170d565b61058e565b005b6101a4600480360381019061019f919061170d565b6105ee565b005b6101c060048036038101906101bb91906118bd565b61060e565b6040516101cd9190611b19565b60405180910390f35b6101f060048036038101906101eb91906116a0565b610695565b6040516101fd9190611cdd565b60405180910390f35b61020e61074d565b60405161021b9190611b9b565b60405180910390f35b61023e600480360381019061023991906117e3565b6107df565b005b61025a60048036038101906102559190611760565b6107f5565b005b610276600480360381019061027191906118bd565b610857565b6040516102839190611b9b565b60405180910390f35b6102a660048036038101906102a191906116cd565b6108bf565b6040516102b39190611b80565b60405180910390f35b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061038757507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b80610397575061039682610953565b5b9050919050565b6060600080546103ad90611ed1565b80601f01602080910402602001604051908101604052809291908181526020018280546103d990611ed1565b80156104265780601f106103fb57610100808354040283529160200191610426565b820191906000526020600020905b81548152906001019060200180831161040957829003601f168201915b5050505050905090565b600061043b826109bd565b6004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60006104818261060e565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614156104f2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104e990611c9d565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff16610511610a08565b73ffffffffffffffffffffffffffffffffffffffff161480610540575061053f8161053a610a08565b6108bf565b5b61057f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161057690611cbd565b60405180910390fd5b6105898383610a10565b505050565b61059f610599610a08565b82610ac9565b6105de576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105d590611bbd565b60405180910390fd5b6105e9838383610b5e565b505050565b610609838383604051806020016040528060008152506107f5565b505050565b60008061061a83610e58565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561068c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161068390611c7d565b60405180910390fd5b80915050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610706576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106fd90611c5d565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60606001805461075c90611ed1565b80601f016020809104026020016040519081016040528092919081815260200182805461078890611ed1565b80156107d55780601f106107aa576101008083540402835291602001916107d5565b820191906000526020600020905b8154815290600101906020018083116107b857829003601f168201915b5050505050905090565b6107f16107ea610a08565b8383610e95565b5050565b610806610800610a08565b83610ac9565b610845576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161083c90611bbd565b60405180910390fd5b61085184848484611002565b50505050565b6060610862826109bd565b600061086c61105e565b9050600081511161088c57604051806020016040528060008152506108b7565b8061089684611075565b6040516020016108a7929190611af5565b6040516020818303038152906040525b915050919050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b6109c68161114d565b610a05576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109fc90611c7d565b60405180910390fd5b50565b600033905090565b816004600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16610a838361060e565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600080610ad58361060e565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480610b175750610b1681856108bf565b5b80610b5557508373ffffffffffffffffffffffffffffffffffffffff16610b3d84610430565b73ffffffffffffffffffffffffffffffffffffffff16145b91505092915050565b8273ffffffffffffffffffffffffffffffffffffffff16610b7e8261060e565b73ffffffffffffffffffffffffffffffffffffffff1614610bd4576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bcb90611bfd565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610c44576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c3b90611c1d565b60405180910390fd5b610c51838383600161118e565b8273ffffffffffffffffffffffffffffffffffffffff16610c718261060e565b73ffffffffffffffffffffffffffffffffffffffff1614610cc7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cbe90611bfd565b60405180910390fd5b6004600082815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055506001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4610e5383838360016112b4565b505050565b60006002600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610f04576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610efb90611c3d565b60405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051610ff59190611b80565b60405180910390a3505050565b61100d848484610b5e565b611019848484846112ba565b611058576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161104f90611bdd565b60405180910390fd5b50505050565b606060405180602001604052806000815250905090565b60606000600161108484611451565b01905060008167ffffffffffffffff8111156110a3576110a2611fc1565b5b6040519080825280601f01601f1916602001820160405280156110d55781602001600182028036833780820191505090505b509050600082602001820190505b600115611142578080600190039150507f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a858161112c5761112b611f63565b5b049450600085141561113d57611142565b6110e3565b819350505050919050565b60008073ffffffffffffffffffffffffffffffffffffffff1661116f83610e58565b73ffffffffffffffffffffffffffffffffffffffff1614159050919050565b60018111156112ae57600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16146112225780600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461121a9190611de7565b925050819055505b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16146112ad5780600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546112a59190611d91565b925050819055505b5b50505050565b50505050565b60006112db8473ffffffffffffffffffffffffffffffffffffffff166115a4565b15611444578373ffffffffffffffffffffffffffffffffffffffff1663150b7a02611304610a08565b8786866040518563ffffffff1660e01b81526004016113269493929190611b34565b602060405180830381600087803b15801561134057600080fd5b505af192505050801561137157506040513d601f19601f8201168201806040525081019061136e9190611890565b60015b6113f4573d80600081146113a1576040519150601f19603f3d011682016040523d82523d6000602084013e6113a6565b606091505b506000815114156113ec576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113e390611bdd565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614915050611449565b600190505b949350505050565b600080600090507a184f03e93ff9f4daa797ed6e38ed64bf6a1f01000000000000000083106114af577a184f03e93ff9f4daa797ed6e38ed64bf6a1f01000000000000000083816114a5576114a4611f63565b5b0492506040810190505b6d04ee2d6d415b85acef810000000083106114ec576d04ee2d6d415b85acef810000000083816114e2576114e1611f63565b5b0492506020810190505b662386f26fc10000831061151b57662386f26fc10000838161151157611510611f63565b5b0492506010810190505b6305f5e1008310611544576305f5e100838161153a57611539611f63565b5b0492506008810190505b612710831061156957612710838161155f5761155e611f63565b5b0492506004810190505b6064831061158c576064838161158257611581611f63565b5b0492506002810190505b600a831061159b576001810190505b80915050919050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b60006115da6115d584611d1d565b611cf8565b9050828152602081018484840111156115f6576115f5611ff5565b5b611601848285611e8f565b509392505050565b60008135905061161881612290565b92915050565b60008135905061162d816122a7565b92915050565b600081359050611642816122be565b92915050565b600081519050611657816122be565b92915050565b600082601f83011261167257611671611ff0565b5b81356116828482602086016115c7565b91505092915050565b60008135905061169a816122d5565b92915050565b6000602082840312156116b6576116b5611fff565b5b60006116c484828501611609565b91505092915050565b600080604083850312156116e4576116e3611fff565b5b60006116f285828601611609565b925050602061170385828601611609565b9150509250929050565b60008060006060848603121561172657611725611fff565b5b600061173486828701611609565b935050602061174586828701611609565b92505060406117568682870161168b565b9150509250925092565b6000806000806080858703121561177a57611779611fff565b5b600061178887828801611609565b945050602061179987828801611609565b93505060406117aa8782880161168b565b925050606085013567ffffffffffffffff8111156117cb576117ca611ffa565b5b6117d78782880161165d565b91505092959194509250565b600080604083850312156117fa576117f9611fff565b5b600061180885828601611609565b92505060206118198582860161161e565b9150509250929050565b6000806040838503121561183a57611839611fff565b5b600061184885828601611609565b92505060206118598582860161168b565b9150509250929050565b60006020828403121561187957611878611fff565b5b600061188784828501611633565b91505092915050565b6000602082840312156118a6576118a5611fff565b5b60006118b484828501611648565b91505092915050565b6000602082840312156118d3576118d2611fff565b5b60006118e18482850161168b565b91505092915050565b6118f381611e1b565b82525050565b61190281611e2d565b82525050565b600061191382611d4e565b61191d8185611d64565b935061192d818560208601611e9e565b61193681612004565b840191505092915050565b600061194c82611d59565b6119568185611d75565b9350611966818560208601611e9e565b61196f81612004565b840191505092915050565b600061198582611d59565b61198f8185611d86565b935061199f818560208601611e9e565b80840191505092915050565b60006119b8602d83611d75565b91506119c382612015565b604082019050919050565b60006119db603283611d75565b91506119e682612064565b604082019050919050565b60006119fe602583611d75565b9150611a09826120b3565b604082019050919050565b6000611a21602483611d75565b9150611a2c82612102565b604082019050919050565b6000611a44601983611d75565b9150611a4f82612151565b602082019050919050565b6000611a67602983611d75565b9150611a728261217a565b604082019050919050565b6000611a8a601883611d75565b9150611a95826121c9565b602082019050919050565b6000611aad602183611d75565b9150611ab8826121f2565b604082019050919050565b6000611ad0603d83611d75565b9150611adb82612241565b604082019050919050565b611aef81611e85565b82525050565b6000611b01828561197a565b9150611b0d828461197a565b91508190509392505050565b6000602082019050611b2e60008301846118ea565b92915050565b6000608082019050611b4960008301876118ea565b611b5660208301866118ea565b611b636040830185611ae6565b8181036060830152611b758184611908565b905095945050505050565b6000602082019050611b9560008301846118f9565b92915050565b60006020820190508181036000830152611bb58184611941565b905092915050565b60006020820190508181036000830152611bd6816119ab565b9050919050565b60006020820190508181036000830152611bf6816119ce565b9050919050565b60006020820190508181036000830152611c16816119f1565b9050919050565b60006020820190508181036000830152611c3681611a14565b9050919050565b60006020820190508181036000830152611c5681611a37565b9050919050565b60006020820190508181036000830152611c7681611a5a565b9050919050565b60006020820190508181036000830152611c9681611a7d565b9050919050565b60006020820190508181036000830152611cb681611aa0565b9050919050565b60006020820190508181036000830152611cd681611ac3565b9050919050565b6000602082019050611cf26000830184611ae6565b92915050565b6000611d02611d13565b9050611d0e8282611f03565b919050565b6000604051905090565b600067ffffffffffffffff821115611d3857611d37611fc1565b5b611d4182612004565b9050602081019050919050565b600081519050919050565b600081519050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600081905092915050565b6000611d9c82611e85565b9150611da783611e85565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115611ddc57611ddb611f34565b5b828201905092915050565b6000611df282611e85565b9150611dfd83611e85565b925082821015611e1057611e0f611f34565b5b828203905092915050565b6000611e2682611e65565b9050919050565b60008115159050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b83811015611ebc578082015181840152602081019050611ea1565b83811115611ecb576000848401525b50505050565b60006002820490506001821680611ee957607f821691505b60208210811415611efd57611efc611f92565b5b50919050565b611f0c82612004565b810181811067ffffffffffffffff82111715611f2b57611f2a611fc1565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560008201527f72206f7220617070726f76656400000000000000000000000000000000000000602082015250565b7f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560008201527f63656976657220696d706c656d656e7465720000000000000000000000000000602082015250565b7f4552433732313a207472616e736665722066726f6d20696e636f72726563742060008201527f6f776e6572000000000000000000000000000000000000000000000000000000602082015250565b7f4552433732313a207472616e7366657220746f20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b7f4552433732313a20617070726f766520746f2063616c6c657200000000000000600082015250565b7f4552433732313a2061646472657373207a65726f206973206e6f74206120766160008201527f6c6964206f776e65720000000000000000000000000000000000000000000000602082015250565b7f4552433732313a20696e76616c696420746f6b656e2049440000000000000000600082015250565b7f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560008201527f7200000000000000000000000000000000000000000000000000000000000000602082015250565b7f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60008201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c000000602082015250565b61229981611e1b565b81146122a457600080fd5b50565b6122b081611e2d565b81146122bb57600080fd5b50565b6122c781611e39565b81146122d257600080fd5b50565b6122de81611e85565b81146122e957600080fd5b5056fea264697066735822122000f396becd1b72bbaa6fe5ad0f6157d38c58cf0db11c35873b9d631a13aa571664736f6c63430008070033";

export class ERC721__factory extends ContractFactory {
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
    name_: string,
    symbol_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ERC721> {
    return super.deploy(name_, symbol_, overrides || {}) as Promise<ERC721>;
  }
  getDeployTransaction(
    name_: string,
    symbol_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name_, symbol_, overrides || {});
  }
  attach(address: string): ERC721 {
    return super.attach(address) as ERC721;
  }
  connect(signer: Signer): ERC721__factory {
    return super.connect(signer) as ERC721__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC721Interface {
    return new utils.Interface(_abi) as ERC721Interface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): ERC721 {
    return new Contract(address, _abi, signerOrProvider) as ERC721;
  }
}
