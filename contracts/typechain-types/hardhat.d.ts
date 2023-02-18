/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "AutomationBase",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AutomationBase__factory>;
    getContractFactory(
      name: "AutomationCompatible",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AutomationCompatible__factory>;
    getContractFactory(
      name: "AggregatorV3Interface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AggregatorV3Interface__factory>;
    getContractFactory(
      name: "AutomationCompatibleInterface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AutomationCompatibleInterface__factory>;
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Metadata__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "ERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721__factory>;
    getContractFactory(
      name: "IERC721Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Metadata__factory>;
    getContractFactory(
      name: "IERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721__factory>;
    getContractFactory(
      name: "IERC721Receiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Receiver__factory>;
    getContractFactory(
      name: "ERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC165__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "FinderInterface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FinderInterface__factory>;
    getContractFactory(
      name: "OptimisticOracleV2Interface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OptimisticOracleV2Interface__factory>;
    getContractFactory(
      name: "IEquityModule",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IEquityModule__factory>;
    getContractFactory(
      name: "IWagerRegistry",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IWagerRegistry__factory>;
    getContractFactory(
      name: "IWagerOracle",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IWagerOracle__factory>;
    getContractFactory(
      name: "IWagerModule",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IWagerModule__factory>;
    getContractFactory(
      name: "WagerExecutor",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WagerExecutor__factory>;
    getContractFactory(
      name: "EquityModule",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.EquityModule__factory>;
    getContractFactory(
      name: "ChainLinkOracleModule",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ChainLinkOracleModule__factory>;
    getContractFactory(
      name: "UMAOracleModule",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.UMAOracleModule__factory>;
    getContractFactory(
      name: "HighLowWagerModule",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.HighLowWagerModule__factory>;
    getContractFactory(
      name: "NearestWagerModule",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.NearestWagerModule__factory>;
    getContractFactory(
      name: "TestChainLinkOracle",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestChainLinkOracle__factory>;
    getContractFactory(
      name: "TestChainLinkOracleSource",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestChainLinkOracleSource__factory>;
    getContractFactory(
      name: "TestERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestERC20__factory>;
    getContractFactory(
      name: "TestERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestERC721__factory>;
    getContractFactory(
      name: "TestWagerExecutor",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestWagerExecutor__factory>;
    getContractFactory(
      name: "WagerRegistry",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WagerRegistry__factory>;

    getContractAt(
      name: "AutomationBase",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AutomationBase>;
    getContractAt(
      name: "AutomationCompatible",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AutomationCompatible>;
    getContractAt(
      name: "AggregatorV3Interface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AggregatorV3Interface>;
    getContractAt(
      name: "AutomationCompatibleInterface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AutomationCompatibleInterface>;
    getContractAt(
      name: "ERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "IERC20Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Metadata>;
    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "ERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721>;
    getContractAt(
      name: "IERC721Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Metadata>;
    getContractAt(
      name: "IERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721>;
    getContractAt(
      name: "IERC721Receiver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Receiver>;
    getContractAt(
      name: "ERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC165>;
    getContractAt(
      name: "IERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165>;
    getContractAt(
      name: "FinderInterface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.FinderInterface>;
    getContractAt(
      name: "OptimisticOracleV2Interface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.OptimisticOracleV2Interface>;
    getContractAt(
      name: "IEquityModule",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IEquityModule>;
    getContractAt(
      name: "IWagerRegistry",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IWagerRegistry>;
    getContractAt(
      name: "IWagerOracle",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IWagerOracle>;
    getContractAt(
      name: "IWagerModule",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IWagerModule>;
    getContractAt(
      name: "WagerExecutor",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.WagerExecutor>;
    getContractAt(
      name: "EquityModule",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.EquityModule>;
    getContractAt(
      name: "ChainLinkOracleModule",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ChainLinkOracleModule>;
    getContractAt(
      name: "UMAOracleModule",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.UMAOracleModule>;
    getContractAt(
      name: "HighLowWagerModule",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.HighLowWagerModule>;
    getContractAt(
      name: "NearestWagerModule",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.NearestWagerModule>;
    getContractAt(
      name: "TestChainLinkOracle",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TestChainLinkOracle>;
    getContractAt(
      name: "TestChainLinkOracleSource",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TestChainLinkOracleSource>;
    getContractAt(
      name: "TestERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TestERC20>;
    getContractAt(
      name: "TestERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TestERC721>;
    getContractAt(
      name: "TestWagerExecutor",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TestWagerExecutor>;
    getContractAt(
      name: "WagerRegistry",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.WagerRegistry>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}
