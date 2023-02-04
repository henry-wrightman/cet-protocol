/* eslint-disable camelcase */
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  TestChainLinkOracle,
  TestChainLinkOracle__factory,
  HighLowWagerModule,
  HighLowWagerModule__factory,
  NearestWagerModule,
  NearestWagerModule__factory,
  WagerRegistry,
  WagerRegistry__factory,
  WagerFactory,
  WagerFactory__factory,
} from "../../../typechain-types";
import { expect } from "chai";
import { ethers } from "hardhat";
import { utils } from "ethers";
import { formatBytes32String } from "ethers/lib/utils";
import { time } from "@nomicfoundation/hardhat-network-helpers";

describe("WagerFactory", function () {
  let creator: SignerWithAddress;
  let address1: SignerWithAddress;
  let address2: SignerWithAddress;
  let HighLowWagerModule: HighLowWagerModule__factory;
  let highLowWagerModule: HighLowWagerModule;
  let NearestWagerModule: NearestWagerModule__factory;
  let nearestWagerModule: NearestWagerModule;
  let TestChainLinkOracle: TestChainLinkOracle__factory;
  let testChainLinkOracle: TestChainLinkOracle;
  let WagerFactory: WagerFactory__factory;
  let wagerFactory: WagerFactory;
  let WagerRegistry: WagerRegistry__factory;
  let wagerRegistry: WagerRegistry;

  beforeEach(async function () {
    [creator, address1, address2] = await ethers.getSigners();

    HighLowWagerModule = await ethers.getContractFactory("HighLowWagerModule");
    highLowWagerModule = await HighLowWagerModule.deploy();
    await highLowWagerModule.deployed();

    HighLowWagerModule = await ethers.getContractFactory("HighLowWagerModule");
    highLowWagerModule = await HighLowWagerModule.deploy();
    await highLowWagerModule.deployed();

    NearestWagerModule = await ethers.getContractFactory("NearestWagerModule");
    nearestWagerModule = await NearestWagerModule.deploy();
    await nearestWagerModule.deployed();

    TestChainLinkOracle = await ethers.getContractFactory(
      "TestChainLinkOracle"
    );
    testChainLinkOracle = await TestChainLinkOracle.deploy();
    await testChainLinkOracle.deployed();

    WagerRegistry = await ethers.getContractFactory("WagerRegistry");
    wagerRegistry = await WagerRegistry.deploy();
    await wagerRegistry.deployed();

    WagerFactory = await ethers.getContractFactory("WagerFactory");
    wagerFactory = await WagerFactory.deploy(wagerRegistry.address);
    await wagerFactory.deployed();

    wagerFactory.setWagerModule("wm.highlow", highLowWagerModule.address);
    wagerFactory.setWagerModule("wm.nearest", nearestWagerModule.address);
  });

  describe("wagers", function () {
    it("should create wager", async function () {
      const latestBlock = await time.latestBlock();
      const partiesData = utils.defaultAbiCoder.encode(
        ["address", "address"],
        [creator.address, ethers.constants.AddressZero]
      );
      const blockData = utils.defaultAbiCoder.encode(
        ["uint80", "uint80", "uint80"],
        [0, latestBlock + 100, 0]
      );
      const createdWagerId = await wagerFactory.callStatic.createWager(
        {
          parties: partiesData,
          partyOneWagerData: utils.defaultAbiCoder.encode(
            ["uint", "uint"],
            ["1", 20000]
          ),
          blockData: blockData,
          wagerOracleData: [],
          supplumentalWagerOracleData: [],
          wagerModuleName: "wm.highlow",
          oracleModule: testChainLinkOracle.address,
          oracleSource: ethers.constants.AddressZero,
        },
        { value: ethers.utils.parseEther("1.0") }
      );
      expect(createdWagerId).to.be.equal(0);
    });
  });
});
