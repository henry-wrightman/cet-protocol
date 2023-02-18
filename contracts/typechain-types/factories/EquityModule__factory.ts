/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { EquityModule, EquityModuleInterface } from "../EquityModule";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "partyTwoData",
        type: "bytes",
      },
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
            name: "partyTwoWagerData",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "equityData",
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
            internalType: "bytes",
            name: "result",
            type: "bytes",
          },
          {
            internalType: "enum WagerState",
            name: "state",
            type: "uint8",
          },
          {
            internalType: "contract IWagerModule",
            name: "wagerModule",
            type: "address",
          },
          {
            internalType: "contract IWagerOracle",
            name: "oracleModule",
            type: "address",
          },
          {
            internalType: "address",
            name: "oracleSource",
            type: "address",
          },
        ],
        internalType: "struct Wager",
        name: "wager",
        type: "tuple",
      },
    ],
    name: "acceptCounterEquity",
    outputs: [
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
            name: "partyTwoWagerData",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "equityData",
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
            internalType: "bytes",
            name: "result",
            type: "bytes",
          },
          {
            internalType: "enum WagerState",
            name: "state",
            type: "uint8",
          },
          {
            internalType: "contract IWagerModule",
            name: "wagerModule",
            type: "address",
          },
          {
            internalType: "contract IWagerOracle",
            name: "oracleModule",
            type: "address",
          },
          {
            internalType: "address",
            name: "oracleSource",
            type: "address",
          },
        ],
        internalType: "struct Wager",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "acceptEquity",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "decodeParties",
    outputs: [
      {
        internalType: "address",
        name: "partyOne",
        type: "address",
      },
      {
        internalType: "address",
        name: "partyTwo",
        type: "address",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "decodeWagerEquity",
    outputs: [
      {
        internalType: "enum WagerType",
        name: "style",
        type: "uint8",
      },
      {
        internalType: "address[2]",
        name: "ercContracts",
        type: "address[2]",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256[2]",
        name: "ids",
        type: "uint256[2]",
      },
    ],
    stateMutability: "pure",
    type: "function",
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
            name: "partyTwoWagerData",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "equityData",
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
            internalType: "bytes",
            name: "result",
            type: "bytes",
          },
          {
            internalType: "enum WagerState",
            name: "state",
            type: "uint8",
          },
          {
            internalType: "contract IWagerModule",
            name: "wagerModule",
            type: "address",
          },
          {
            internalType: "contract IWagerOracle",
            name: "oracleModule",
            type: "address",
          },
          {
            internalType: "address",
            name: "oracleSource",
            type: "address",
          },
        ],
        internalType: "struct Wager",
        name: "wager",
        type: "tuple",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
    ],
    name: "settleEquity",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
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
            name: "partyTwoWagerData",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "equityData",
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
            internalType: "bytes",
            name: "result",
            type: "bytes",
          },
          {
            internalType: "enum WagerState",
            name: "state",
            type: "uint8",
          },
          {
            internalType: "contract IWagerModule",
            name: "wagerModule",
            type: "address",
          },
          {
            internalType: "contract IWagerOracle",
            name: "oracleModule",
            type: "address",
          },
          {
            internalType: "address",
            name: "oracleSource",
            type: "address",
          },
        ],
        internalType: "struct Wager",
        name: "wager",
        type: "tuple",
      },
    ],
    name: "voidEquity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50612498806100206000396000f3fe6080604052600436106100555760003560e01c806344afbc371461005a5780637b4e3876146100975780637b69476b146100b357806382190e93146100f35780639adb764014610123578063d21b026614610161575b600080fd5b34801561006657600080fd5b50610081600480360381019061007c919061188f565b61018a565b60405161008e9190611e99565b60405180910390f35b6100b160048036038101906100ac919061171e565b610516565b005b3480156100bf57600080fd5b506100da60048036038101906100d5919061171e565b610898565b6040516100ea9493929190611d77565b60405180910390f35b61010d60048036038101906101089190611767565b6108d7565b60405161011a9190611e77565b60405180910390f35b34801561012f57600080fd5b5061014a6004803603810190610145919061171e565b610e11565b604051610158929190611cfc565b60405180910390f35b34801561016d57600080fd5b5061018860048036038101906101839190611846565b610e35565b005b600080600080600061019f8760600151610898565b935093509350935060006001808111156101bc576101bb612216565b5b8560018111156101cf576101ce612216565b5b146101da57826101e8565b6002836101e79190611fe8565b5b9050600073ffffffffffffffffffffffffffffffffffffffff168460006002811061021657610215612245565b5b602002015173ffffffffffffffffffffffffffffffffffffffff1614156102e95760008773ffffffffffffffffffffffffffffffffffffffff168260405161025d90611ce7565b60006040518083038185875af1925050503d806000811461029a576040519150601f19603f3d011682016040523d82523d6000602084013e61029f565b606091505b50509050806102e3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102da90611e57565b60405180910390fd5b50610508565b6000806102f98a60000151610e11565b9150915060008973ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614610338578261033a565b815b8a8b73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff161461038c578660006002811061038257610381612245565b5b60200201516103a6565b866001600281106103a05761039f612245565b5b60200201515b6040516024016103b893929190611d25565b6040516020818303038152906040527f42842e0e000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505090506000878b73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614610474576001610477565b60005b60ff166002811061048b5761048a612245565b5b602002015173ffffffffffffffffffffffffffffffffffffffff16826040516104b49190611cd0565b6000604051808303816000865af19150503d80600081146104f1576040519150601f19603f3d011682016040523d82523d6000602084013e6104f6565b606091505b5050905061050381611078565b505050505b809550505050505092915050565b600080600061052484610898565b9350935093505081341461056d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161056490611e17565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168360006002811061059957610598612245565b5b602002015173ffffffffffffffffffffffffffffffffffffffff161461089257600080846000600281106105d0576105cf612245565b5b602002015173ffffffffffffffffffffffffffffffffffffffff16836000600281106105ff576105fe612245565b5b60200201516040516024016106149190611e99565b6040516020818303038152906040527f081812fc000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505060405161069e9190611cd0565b6000604051808303816000865af19150503d80600081146106db576040519150601f19603f3d011682016040523d82523d6000602084013e6106e0565b606091505b50915091506106ee82611078565b3073ffffffffffffffffffffffffffffffffffffffff16818060200190518101906107199190611671565b73ffffffffffffffffffffffffffffffffffffffff161461076f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161076690611df7565b60405180910390fd5b60008560006002811061078557610784612245565b5b602002015173ffffffffffffffffffffffffffffffffffffffff166380ac58cd6040516024016107b59190611dbc565b6040516020818303038152906040527f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505060405161083f9190611cd0565b6000604051808303816000865af19150503d806000811461087c576040519150601f19603f3d011682016040523d82523d6000602084013e610881565b606091505b5050905061088e81611078565b5050505b50505050565b60006108a261113a565b60006108ac61115c565b848060200190518101906108c091906117df565b809450819550829650839750505050509193509193565b6108df61117e565b600080848060200190518101906108f691906116de565b9150915060008060008061090d8860600151610898565b9350935093509350600073ffffffffffffffffffffffffffffffffffffffff168360006002811061094157610940612245565b5b602002015173ffffffffffffffffffffffffffffffffffffffff161415610a14578134146109a4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161099b90611e17565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff1614610a13576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a0a90611e37565b60405180910390fd5b5b600073ffffffffffffffffffffffffffffffffffffffff1683600160028110610a4057610a3f612245565b5b602002015173ffffffffffffffffffffffffffffffffffffffff1614610d245760008084600160028110610a7757610a76612245565b5b602002015173ffffffffffffffffffffffffffffffffffffffff1687604051602401610aa39190611e99565b6040516020818303038152906040527f081812fc000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050604051610b2d9190611cd0565b6000604051808303816000865af19150503d8060008114610b6a576040519150601f19603f3d011682016040523d82523d6000602084013e610b6f565b606091505b5091509150610b7d82611078565b3073ffffffffffffffffffffffffffffffffffffffff1681806020019051810190610ba89190611671565b73ffffffffffffffffffffffffffffffffffffffff1614610bfe576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bf590611df7565b60405180910390fd5b60008086600160028110610c1557610c14612245565b5b602002015173ffffffffffffffffffffffffffffffffffffffff166380ac58cd604051602401610c459190611dbc565b6040516020818303038152906040527f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050604051610ccf9190611cd0565b6000604051808303816000865af19150503d8060008114610d0c576040519150601f19603f3d011682016040523d82523d6000602084013e610d11565b606091505b5091509150610d1f82611078565b505050505b83604051806040016040528085600060028110610d4457610d43612245565b5b602002015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681525083604051806040016040528085600060028110610dca57610dc9612245565b5b6020020151815260200189815250604051602001610deb9493929190611d77565b604051602081830303815290604052886060018190525087965050505050505092915050565b60008082806020019051810190610e28919061169e565b8092508193505050915091565b6000806000610e478460600151610898565b50925092509250600080610e5e8660000151610e11565b91509150600073ffffffffffffffffffffffffffffffffffffffff1684600060028110610e8e57610e8d612245565b5b602002015173ffffffffffffffffffffffffffffffffffffffff1614156110705760008273ffffffffffffffffffffffffffffffffffffffff1684604051610ed590611ce7565b60006040518083038185875af1925050503d8060008114610f12576040519150601f19603f3d011682016040523d82523d6000602084013e610f17565b606091505b5050905080610f5b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f5290611dd7565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614158015610fbb5750600180811115610fa657610fa5612216565b5b866001811115610fb957610fb8612216565b5b145b1561106e5760008273ffffffffffffffffffffffffffffffffffffffff1685604051610fe690611ce7565b60006040518083038185875af1925050503d8060008114611023576040519150601f19603f3d011682016040523d82523d6000602084013e611028565b606091505b505090508061106c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161106390611dd7565b60405180910390fd5b505b505b505050505050565b61110e8160405160240161108c9190611d5c565b6040516020818303038152906040527f32458eed000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050611111565b50565b60008151905060006a636f6e736f6c652e6c6f679050602083016000808483855afa5050505050565b6040518060400160405280600290602082028036833780820191505090505090565b6040518060400160405280600290602082028036833780820191505090505090565b6040518061018001604052806060815260200160608152602001606081526020016060815260200160608152602001606081526020016060815260200160608152602001600060038111156111d6576111d5612216565b5b8152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff1681525090565b600061124661124184611ed9565b611eb4565b905080828560208602820111156112605761125f6122b2565b5b60005b8581101561129057816112768882611358565b845260208401935060208301925050600181019050611263565b5050509392505050565b60006112ad6112a884611eff565b611eb4565b905080828560208602820111156112c7576112c66122b2565b5b60005b858110156112f757816112dd888261165c565b8452602084019350602083019250506001810190506112ca565b5050509392505050565b600061131461130f84611f25565b611eb4565b9050828152602081018484840111156113305761132f6122b7565b5b61133b848285612174565b509392505050565b600081359050611352816123cf565b92915050565b600081519050611367816123cf565b92915050565b60008151905061137c816123e6565b92915050565b600082601f830112611397576113966122a3565b5b60026113a4848285611233565b91505092915050565b600082601f8301126113c2576113c16122a3565b5b60026113cf84828561129a565b91505092915050565b600082601f8301126113ed576113ec6122a3565b5b81356113fd848260208601611301565b91505092915050565b600081359050611415816123fd565b92915050565b60008135905061142a81612414565b92915050565b60008135905061143f8161242b565b92915050565b6000815190506114548161243b565b92915050565b60006101808284031215611471576114706122a8565b5b61147c610180611eb4565b9050600082013567ffffffffffffffff81111561149c5761149b6122ad565b5b6114a8848285016113d8565b600083015250602082013567ffffffffffffffff8111156114cc576114cb6122ad565b5b6114d8848285016113d8565b602083015250604082013567ffffffffffffffff8111156114fc576114fb6122ad565b5b611508848285016113d8565b604083015250606082013567ffffffffffffffff81111561152c5761152b6122ad565b5b611538848285016113d8565b606083015250608082013567ffffffffffffffff81111561155c5761155b6122ad565b5b611568848285016113d8565b60808301525060a082013567ffffffffffffffff81111561158c5761158b6122ad565b5b611598848285016113d8565b60a08301525060c082013567ffffffffffffffff8111156115bc576115bb6122ad565b5b6115c8848285016113d8565b60c08301525060e082013567ffffffffffffffff8111156115ec576115eb6122ad565b5b6115f8848285016113d8565b60e08301525061010061160d84828501611430565b6101008301525061012061162384828501611406565b610120830152506101406116398482850161141b565b6101408301525061016061164f84828501611343565b6101608301525092915050565b60008151905061166b8161244b565b92915050565b600060208284031215611687576116866122c1565b5b60006116958482850161136d565b91505092915050565b600080604083850312156116b5576116b46122c1565b5b60006116c38582860161136d565b92505060206116d48582860161136d565b9150509250929050565b600080604083850312156116f5576116f46122c1565b5b60006117038582860161136d565b92505060206117148582860161165c565b9150509250929050565b600060208284031215611734576117336122c1565b5b600082013567ffffffffffffffff811115611752576117516122bc565b5b61175e848285016113d8565b91505092915050565b6000806040838503121561177e5761177d6122c1565b5b600083013567ffffffffffffffff81111561179c5761179b6122bc565b5b6117a8858286016113d8565b925050602083013567ffffffffffffffff8111156117c9576117c86122bc565b5b6117d58582860161145a565b9150509250929050565b60008060008060c085870312156117f9576117f86122c1565b5b600061180787828801611445565b945050602061181887828801611382565b93505060606118298782880161165c565b925050608061183a878288016113ad565b91505092959194509250565b60006020828403121561185c5761185b6122c1565b5b600082013567ffffffffffffffff81111561187a576118796122bc565b5b6118868482850161145a565b91505092915050565b600080604083850312156118a6576118a56122c1565b5b600083013567ffffffffffffffff8111156118c4576118c36122bc565b5b6118d08582860161145a565b92505060206118e185828601611343565b9150509250929050565b60006118f7838361191b565b60208301905092915050565b600061190f8383611cb2565b60208301905092915050565b61192481612042565b82525050565b61193381612042565b82525050565b61194281611f6a565b61194c8184611fa5565b925061195782611f56565b8060005b8381101561198857815161196f87826118eb565b965061197a83611f8b565b92505060018101905061195b565b505050505050565b61199981611f75565b6119a38184611fb0565b92506119ae82611f60565b8060005b838110156119df5781516119c68782611903565b96506119d183611f98565b9250506001810190506119b2565b505050505050565b6119f081612066565b82525050565b6000611a0182611f80565b611a0b8185611fbb565b9350611a1b818560208601612183565b611a24816122c6565b840191505092915050565b6000611a3a82611f80565b611a448185611fcc565b9350611a54818560208601612183565b80840191505092915050565b611a69816120f6565b82525050565b611a7881612108565b82525050565b611a878161211a565b82525050565b611a968161212c565b82525050565b611aa58161213e565b82525050565b6000611ab8600283611fd7565b9150611ac3826122d7565b602082019050919050565b6000611adb601e83611fd7565b9150611ae682612300565b602082019050919050565b6000611afe600283611fd7565b9150611b0982612329565b602082019050919050565b6000611b21600083611fcc565b9150611b2c82612352565b600082019050919050565b6000611b44601883611fd7565b9150611b4f82612355565b602082019050919050565b6000611b67600383611fd7565b9150611b728261237e565b602082019050919050565b6000610180830160008301518482036000860152611b9b82826119f6565b91505060208301518482036020860152611bb582826119f6565b91505060408301518482036040860152611bcf82826119f6565b91505060608301518482036060860152611be982826119f6565b91505060808301518482036080860152611c0382826119f6565b91505060a083015184820360a0860152611c1d82826119f6565b91505060c083015184820360c0860152611c3782826119f6565b91505060e083015184820360e0860152611c5182826119f6565b915050610100830151611c68610100860182611a7e565b50610120830151611c7d610120860182611a60565b50610140830151611c92610140860182611a6f565b50610160830151611ca761016086018261191b565b508091505092915050565b611cbb816120dc565b82525050565b611cca816120dc565b82525050565b6000611cdc8284611a2f565b915081905092915050565b6000611cf282611b14565b9150819050919050565b6000604082019050611d11600083018561192a565b611d1e602083018461192a565b9392505050565b6000606082019050611d3a600083018661192a565b611d47602083018561192a565b611d546040830184611cc1565b949350505050565b6000602082019050611d7160008301846119e7565b92915050565b600060c082019050611d8c6000830187611a8d565b611d996020830186611939565b611da66060830185611cc1565b611db36080830184611990565b95945050505050565b6000602082019050611dd16000830184611a9c565b92915050565b60006020820190508181036000830152611df081611aab565b9050919050565b60006020820190508181036000830152611e1081611ace565b9050919050565b60006020820190508181036000830152611e3081611af1565b9050919050565b60006020820190508181036000830152611e5081611b37565b9050919050565b60006020820190508181036000830152611e7081611b5a565b9050919050565b60006020820190508181036000830152611e918184611b7d565b905092915050565b6000602082019050611eae6000830184611cc1565b92915050565b6000611ebe611ecf565b9050611eca82826121b6565b919050565b6000604051905090565b600067ffffffffffffffff821115611ef457611ef3612274565b5b602082029050919050565b600067ffffffffffffffff821115611f1a57611f19612274565b5b602082029050919050565b600067ffffffffffffffff821115611f4057611f3f612274565b5b611f49826122c6565b9050602081019050919050565b6000819050919050565b6000819050919050565b600060029050919050565b600060029050919050565b600081519050919050565b6000602082019050919050565b6000602082019050919050565b600081905092915050565b600081905092915050565b600082825260208201905092915050565b600081905092915050565b600082825260208201905092915050565b6000611ff3826120dc565b9150611ffe836120dc565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615612037576120366121e7565b5b828202905092915050565b600061204d826120bc565b9050919050565b600061205f826120bc565b9050919050565b60008115159050919050565b600061207d82612042565b9050919050565b600061208f82612042565b9050919050565b60008190506120a4826123a7565b919050565b60008190506120b7826123bb565b919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600063ffffffff82169050919050565b600061210182612150565b9050919050565b600061211382612150565b9050919050565b600061212582612096565b9050919050565b6000612137826120a9565b9050919050565b6000612149826120e6565b9050919050565b600061215b82612162565b9050919050565b600061216d826120bc565b9050919050565b82818337600083830152505050565b60005b838110156121a1578082015181840152602081019050612186565b838111156121b0576000848401525b50505050565b6121bf826122c6565b810181811067ffffffffffffffff821117156121de576121dd612274565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f5736000000000000000000000000000000000000000000000000000000000000600082015250565b7f5265676973747279207265717569726573204e465420617070726f76616c0000600082015250565b7f5739000000000000000000000000000000000000000000000000000000000000600082015250565b50565b7f696e76616c696420776167657220636f6c6c61746572616c0000000000000000600082015250565b7f5731310000000000000000000000000000000000000000000000000000000000600082015250565b600481106123b8576123b7612216565b5b50565b600281106123cc576123cb612216565b5b50565b6123d881612042565b81146123e357600080fd5b50565b6123ef81612054565b81146123fa57600080fd5b50565b61240681612072565b811461241157600080fd5b50565b61241d81612084565b811461242857600080fd5b50565b6004811061243857600080fd5b50565b6002811061244857600080fd5b50565b612454816120dc565b811461245f57600080fd5b5056fea26469706673582212200f195f3fcc351e2ec8af399f2e8c323f9dcc4c337e3086b4fd28fed103dbeeb064736f6c63430008070033";

export class EquityModule__factory extends ContractFactory {
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
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<EquityModule> {
    return super.deploy(overrides || {}) as Promise<EquityModule>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): EquityModule {
    return super.attach(address) as EquityModule;
  }
  connect(signer: Signer): EquityModule__factory {
    return super.connect(signer) as EquityModule__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): EquityModuleInterface {
    return new utils.Interface(_abi) as EquityModuleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): EquityModule {
    return new Contract(address, _abi, signerOrProvider) as EquityModule;
  }
}
