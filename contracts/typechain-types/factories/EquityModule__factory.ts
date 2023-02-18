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
        name: "partyTwoEquityData",
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
            internalType: "contract IWagerOracleModule",
            name: "oracleModule",
            type: "address",
          },
          {
            internalType: "address",
            name: "oracleSource",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "supplumentalOracleData",
            type: "bytes",
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
            internalType: "contract IWagerOracleModule",
            name: "oracleModule",
            type: "address",
          },
          {
            internalType: "address",
            name: "oracleSource",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "supplumentalOracleData",
            type: "bytes",
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
        name: "equityData",
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
            internalType: "contract IWagerOracleModule",
            name: "oracleModule",
            type: "address",
          },
          {
            internalType: "address",
            name: "oracleSource",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "supplumentalOracleData",
            type: "bytes",
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
            internalType: "contract IWagerOracleModule",
            name: "oracleModule",
            type: "address",
          },
          {
            internalType: "address",
            name: "oracleSource",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "supplumentalOracleData",
            type: "bytes",
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
  "0x608060405234801561001057600080fd5b50612443806100206000396000f3fe6080604052600436106100555760003560e01c80633a3988311461005a57806346b212da1461008a5780636d0760da146100c75780637b4e3876146100f05780637b69476b1461010c5780639adb76401461014c575b600080fd5b610074600480360381019061006f919061172e565b61018a565b6040516100819190611e22565b60405180910390f35b34801561009657600080fd5b506100b160048036038101906100ac9190611856565b6106c4565b6040516100be9190611e44565b60405180910390f35b3480156100d357600080fd5b506100ee60048036038101906100e9919061180d565b610a50565b005b61010a600480360381019061010591906116e5565b610c93565b005b34801561011857600080fd5b50610133600480360381019061012e91906116e5565b611015565b6040516101439493929190611d22565b60405180910390f35b34801561015857600080fd5b50610173600480360381019061016e91906116e5565b611054565b604051610181929190611ca7565b60405180910390f35b61019261113a565b600080848060200190518101906101a991906116a5565b915091506000806000806101c08860600151611015565b9350935093509350600073ffffffffffffffffffffffffffffffffffffffff16836000600281106101f4576101f36121f0565b5b602002015173ffffffffffffffffffffffffffffffffffffffff1614156102c757813414610257576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161024e90611dc2565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff16146102c6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102bd90611de2565b60405180910390fd5b5b600073ffffffffffffffffffffffffffffffffffffffff16836001600281106102f3576102f26121f0565b5b602002015173ffffffffffffffffffffffffffffffffffffffff16146105d7576000808460016002811061032a576103296121f0565b5b602002015173ffffffffffffffffffffffffffffffffffffffff16876040516024016103569190611e44565b6040516020818303038152906040527f081812fc000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506040516103e09190611c7b565b6000604051808303816000865af19150503d806000811461041d576040519150601f19603f3d011682016040523d82523d6000602084013e610422565b606091505b509150915061043082611078565b3073ffffffffffffffffffffffffffffffffffffffff168180602001905181019061045b9190611638565b73ffffffffffffffffffffffffffffffffffffffff16146104b1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104a890611da2565b60405180910390fd5b600080866001600281106104c8576104c76121f0565b5b602002015173ffffffffffffffffffffffffffffffffffffffff166380ac58cd6040516024016104f89190611d67565b6040516020818303038152906040527f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506040516105829190611c7b565b6000604051808303816000865af19150503d80600081146105bf576040519150601f19603f3d011682016040523d82523d6000602084013e6105c4565b606091505b50915091506105d282611078565b505050505b836040518060400160405280856000600281106105f7576105f66121f0565b5b602002015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152508360405180604001604052808560006002811061067d5761067c6121f0565b5b602002015181526020018981525060405160200161069e9493929190611d22565b604051602081830303815290604052886060018190525087965050505050505092915050565b60008060008060006106d98760600151611015565b935093509350935060006001808111156106f6576106f56121c1565b5b856001811115610709576107086121c1565b5b146107145782610722565b6002836107219190611f93565b5b9050600073ffffffffffffffffffffffffffffffffffffffff16846000600281106107505761074f6121f0565b5b602002015173ffffffffffffffffffffffffffffffffffffffff1614156108235760008773ffffffffffffffffffffffffffffffffffffffff168260405161079790611c92565b60006040518083038185875af1925050503d80600081146107d4576040519150601f19603f3d011682016040523d82523d6000602084013e6107d9565b606091505b505090508061081d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161081490611e02565b60405180910390fd5b50610a42565b6000806108338a60000151611054565b9150915060008973ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16146108725782610874565b815b8a8b73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16146108c657866000600281106108bc576108bb6121f0565b5b60200201516108e0565b866001600281106108da576108d96121f0565b5b60200201515b6040516024016108f293929190611cd0565b6040516020818303038152906040527f42842e0e000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505090506000878b73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16146109ae5760016109b1565b60005b60ff16600281106109c5576109c46121f0565b5b602002015173ffffffffffffffffffffffffffffffffffffffff16826040516109ee9190611c7b565b6000604051808303816000865af19150503d8060008114610a2b576040519150601f19603f3d011682016040523d82523d6000602084013e610a30565b606091505b50509050610a3d81611078565b505050505b809550505050505092915050565b6000806000610a628460600151611015565b50925092509250600080610a798660000151611054565b91509150600073ffffffffffffffffffffffffffffffffffffffff1684600060028110610aa957610aa86121f0565b5b602002015173ffffffffffffffffffffffffffffffffffffffff161415610c8b5760008273ffffffffffffffffffffffffffffffffffffffff1684604051610af090611c92565b60006040518083038185875af1925050503d8060008114610b2d576040519150601f19603f3d011682016040523d82523d6000602084013e610b32565b606091505b5050905080610b76576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b6d90611d82565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614158015610bd65750600180811115610bc157610bc06121c1565b5b866001811115610bd457610bd36121c1565b5b145b15610c895760008273ffffffffffffffffffffffffffffffffffffffff1685604051610c0190611c92565b60006040518083038185875af1925050503d8060008114610c3e576040519150601f19603f3d011682016040523d82523d6000602084013e610c43565b606091505b5050905080610c87576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c7e90611d82565b60405180910390fd5b505b505b505050505050565b6000806000610ca184611015565b93509350935050813414610cea576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ce190611dc2565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff1683600060028110610d1657610d156121f0565b5b602002015173ffffffffffffffffffffffffffffffffffffffff161461100f5760008084600060028110610d4d57610d4c6121f0565b5b602002015173ffffffffffffffffffffffffffffffffffffffff1683600060028110610d7c57610d7b6121f0565b5b6020020151604051602401610d919190611e44565b6040516020818303038152906040527f081812fc000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050604051610e1b9190611c7b565b6000604051808303816000865af19150503d8060008114610e58576040519150601f19603f3d011682016040523d82523d6000602084013e610e5d565b606091505b5091509150610e6b82611078565b3073ffffffffffffffffffffffffffffffffffffffff1681806020019051810190610e969190611638565b73ffffffffffffffffffffffffffffffffffffffff1614610eec576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ee390611da2565b60405180910390fd5b600085600060028110610f0257610f016121f0565b5b602002015173ffffffffffffffffffffffffffffffffffffffff166380ac58cd604051602401610f329190611d67565b6040516020818303038152906040527f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050604051610fbc9190611c7b565b6000604051808303816000865af19150503d8060008114610ff9576040519150601f19603f3d011682016040523d82523d6000602084013e610ffe565b606091505b5050905061100b81611078565b5050505b50505050565b600061101f6111e8565b600061102961120a565b8480602001905181019061103d91906117a6565b809450819550829650839750505050509193509193565b6000808280602001905181019061106b9190611665565b8092508193505050915091565b61110e8160405160240161108c9190611d07565b6040516020818303038152906040527f32458eed000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050611111565b50565b60008151905060006a636f6e736f6c652e6c6f679050602083016000808483855afa5050505050565b60405180610160016040528060608152602001606081526020016060815260200160608152602001606081526020016060815260200160006003811115611184576111836121c1565b5b8152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001606081525090565b6040518060400160405280600290602082028036833780820191505090505090565b6040518060400160405280600290602082028036833780820191505090505090565b600061123f61123a84611e84565b611e5f565b905080828560208602820111156112595761125861225d565b5b60005b85811015611289578161126f8882611351565b84526020840193506020830192505060018101905061125c565b5050509392505050565b60006112a66112a184611eaa565b611e5f565b905080828560208602820111156112c0576112bf61225d565b5b60005b858110156112f057816112d68882611623565b8452602084019350602083019250506001810190506112c3565b5050509392505050565b600061130d61130884611ed0565b611e5f565b90508281526020810184848401111561132957611328612262565b5b61133484828561211f565b509392505050565b60008135905061134b8161237a565b92915050565b6000815190506113608161237a565b92915050565b60008151905061137581612391565b92915050565b600082601f8301126113905761138f61224e565b5b600261139d84828561122c565b91505092915050565b600082601f8301126113bb576113ba61224e565b5b60026113c8848285611293565b91505092915050565b600082601f8301126113e6576113e561224e565b5b81356113f68482602086016112fa565b91505092915050565b60008135905061140e816123a8565b92915050565b600081359050611423816123bf565b92915050565b600081359050611438816123d6565b92915050565b60008151905061144d816123e6565b92915050565b6000610160828403121561146a57611469612253565b5b611475610160611e5f565b9050600082013567ffffffffffffffff81111561149557611494612258565b5b6114a1848285016113d1565b600083015250602082013567ffffffffffffffff8111156114c5576114c4612258565b5b6114d1848285016113d1565b602083015250604082013567ffffffffffffffff8111156114f5576114f4612258565b5b611501848285016113d1565b604083015250606082013567ffffffffffffffff81111561152557611524612258565b5b611531848285016113d1565b606083015250608082013567ffffffffffffffff81111561155557611554612258565b5b611561848285016113d1565b60808301525060a082013567ffffffffffffffff81111561158557611584612258565b5b611591848285016113d1565b60a08301525060c06115a584828501611429565b60c08301525060e06115b9848285016113ff565b60e0830152506101006115ce84828501611414565b610100830152506101206115e48482850161133c565b6101208301525061014082013567ffffffffffffffff81111561160a57611609612258565b5b611616848285016113d1565b6101408301525092915050565b600081519050611632816123f6565b92915050565b60006020828403121561164e5761164d61226c565b5b600061165c84828501611366565b91505092915050565b6000806040838503121561167c5761167b61226c565b5b600061168a85828601611366565b925050602061169b85828601611366565b9150509250929050565b600080604083850312156116bc576116bb61226c565b5b60006116ca85828601611366565b92505060206116db85828601611623565b9150509250929050565b6000602082840312156116fb576116fa61226c565b5b600082013567ffffffffffffffff81111561171957611718612267565b5b611725848285016113d1565b91505092915050565b600080604083850312156117455761174461226c565b5b600083013567ffffffffffffffff81111561176357611762612267565b5b61176f858286016113d1565b925050602083013567ffffffffffffffff8111156117905761178f612267565b5b61179c85828601611453565b9150509250929050565b60008060008060c085870312156117c0576117bf61226c565b5b60006117ce8782880161143e565b94505060206117df8782880161137b565b93505060606117f087828801611623565b9250506080611801878288016113a6565b91505092959194509250565b6000602082840312156118235761182261226c565b5b600082013567ffffffffffffffff81111561184157611840612267565b5b61184d84828501611453565b91505092915050565b6000806040838503121561186d5761186c61226c565b5b600083013567ffffffffffffffff81111561188b5761188a612267565b5b61189785828601611453565b92505060206118a88582860161133c565b9150509250929050565b60006118be83836118e2565b60208301905092915050565b60006118d68383611c5d565b60208301905092915050565b6118eb81611fed565b82525050565b6118fa81611fed565b82525050565b61190981611f15565b6119138184611f50565b925061191e82611f01565b8060005b8381101561194f57815161193687826118b2565b965061194183611f36565b925050600181019050611922565b505050505050565b61196081611f20565b61196a8184611f5b565b925061197582611f0b565b8060005b838110156119a657815161198d87826118ca565b965061199883611f43565b925050600181019050611979565b505050505050565b6119b781612011565b82525050565b60006119c882611f2b565b6119d28185611f66565b93506119e281856020860161212e565b6119eb81612271565b840191505092915050565b6000611a0182611f2b565b611a0b8185611f77565b9350611a1b81856020860161212e565b80840191505092915050565b611a30816120a1565b82525050565b611a3f816120b3565b82525050565b611a4e816120c5565b82525050565b611a5d816120d7565b82525050565b611a6c816120e9565b82525050565b6000611a7f600283611f82565b9150611a8a82612282565b602082019050919050565b6000611aa2601e83611f82565b9150611aad826122ab565b602082019050919050565b6000611ac5600283611f82565b9150611ad0826122d4565b602082019050919050565b6000611ae8600083611f77565b9150611af3826122fd565b600082019050919050565b6000611b0b601883611f82565b9150611b1682612300565b602082019050919050565b6000611b2e600383611f82565b9150611b3982612329565b602082019050919050565b6000610160830160008301518482036000860152611b6282826119bd565b91505060208301518482036020860152611b7c82826119bd565b91505060408301518482036040860152611b9682826119bd565b91505060608301518482036060860152611bb082826119bd565b91505060808301518482036080860152611bca82826119bd565b91505060a083015184820360a0860152611be482826119bd565b91505060c0830151611bf960c0860182611a45565b5060e0830151611c0c60e0860182611a27565b50610100830151611c21610100860182611a36565b50610120830151611c366101208601826118e2565b50610140830151848203610140860152611c5082826119bd565b9150508091505092915050565b611c6681612087565b82525050565b611c7581612087565b82525050565b6000611c8782846119f6565b915081905092915050565b6000611c9d82611adb565b9150819050919050565b6000604082019050611cbc60008301856118f1565b611cc960208301846118f1565b9392505050565b6000606082019050611ce560008301866118f1565b611cf260208301856118f1565b611cff6040830184611c6c565b949350505050565b6000602082019050611d1c60008301846119ae565b92915050565b600060c082019050611d376000830187611a54565b611d446020830186611900565b611d516060830185611c6c565b611d5e6080830184611957565b95945050505050565b6000602082019050611d7c6000830184611a63565b92915050565b60006020820190508181036000830152611d9b81611a72565b9050919050565b60006020820190508181036000830152611dbb81611a95565b9050919050565b60006020820190508181036000830152611ddb81611ab8565b9050919050565b60006020820190508181036000830152611dfb81611afe565b9050919050565b60006020820190508181036000830152611e1b81611b21565b9050919050565b60006020820190508181036000830152611e3c8184611b44565b905092915050565b6000602082019050611e596000830184611c6c565b92915050565b6000611e69611e7a565b9050611e758282612161565b919050565b6000604051905090565b600067ffffffffffffffff821115611e9f57611e9e61221f565b5b602082029050919050565b600067ffffffffffffffff821115611ec557611ec461221f565b5b602082029050919050565b600067ffffffffffffffff821115611eeb57611eea61221f565b5b611ef482612271565b9050602081019050919050565b6000819050919050565b6000819050919050565b600060029050919050565b600060029050919050565b600081519050919050565b6000602082019050919050565b6000602082019050919050565b600081905092915050565b600081905092915050565b600082825260208201905092915050565b600081905092915050565b600082825260208201905092915050565b6000611f9e82612087565b9150611fa983612087565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615611fe257611fe1612192565b5b828202905092915050565b6000611ff882612067565b9050919050565b600061200a82612067565b9050919050565b60008115159050919050565b600061202882611fed565b9050919050565b600061203a82611fed565b9050919050565b600081905061204f82612352565b919050565b600081905061206282612366565b919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600063ffffffff82169050919050565b60006120ac826120fb565b9050919050565b60006120be826120fb565b9050919050565b60006120d082612041565b9050919050565b60006120e282612054565b9050919050565b60006120f482612091565b9050919050565b60006121068261210d565b9050919050565b600061211882612067565b9050919050565b82818337600083830152505050565b60005b8381101561214c578082015181840152602081019050612131565b8381111561215b576000848401525b50505050565b61216a82612271565b810181811067ffffffffffffffff821117156121895761218861221f565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f5736000000000000000000000000000000000000000000000000000000000000600082015250565b7f5265676973747279207265717569726573204e465420617070726f76616c0000600082015250565b7f5739000000000000000000000000000000000000000000000000000000000000600082015250565b50565b7f696e76616c696420776167657220636f6c6c61746572616c0000000000000000600082015250565b7f5731310000000000000000000000000000000000000000000000000000000000600082015250565b60048110612363576123626121c1565b5b50565b60028110612377576123766121c1565b5b50565b61238381611fed565b811461238e57600080fd5b50565b61239a81611fff565b81146123a557600080fd5b50565b6123b18161201d565b81146123bc57600080fd5b50565b6123c88161202f565b81146123d357600080fd5b50565b600481106123e357600080fd5b50565b600281106123f357600080fd5b50565b6123ff81612087565b811461240a57600080fd5b5056fea2646970667358221220b75dc0a1b87ec51555d9677610d6235820ff14b34b6e9f527245c6e987eea90164736f6c63430008070033";

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
