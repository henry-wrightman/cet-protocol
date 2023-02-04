/* eslint-disable camelcase */
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  TestChainLinkOracle,
  TestChainLinkOracle__factory,
  HighLowWagerModule,
  HighLowWagerModule__factory,
  WagerRegistry,
  WagerRegistry__factory,
  TestWagerExecutor,
  TestWagerExecutor__factory,
} from "../../typechain-types";
import { expect } from "chai";
import { ethers } from "hardhat";
import { utils } from "ethers";
import { formatBytes32String } from "ethers/lib/utils";
import { time, mine } from "@nomicfoundation/hardhat-network-helpers";

describe("WagerExecutor", function () {
  let creator: SignerWithAddress;
  let address1: SignerWithAddress;
  let address2: SignerWithAddress;
  let HighLowWagerModule: HighLowWagerModule__factory;
  let highLowWagerModule: HighLowWagerModule;
  let TestChainLinkOracle: TestChainLinkOracle__factory;
  let testChainLinkOracle: TestChainLinkOracle;
  let WagerRegistry: WagerRegistry__factory;
  let wagerRegistry: WagerRegistry;
  let TestWagerExecutor: TestWagerExecutor__factory;
  let testWagerExecutor: TestWagerExecutor;

  beforeEach(async function () {
    [creator, address1, address2] = await ethers.getSigners();

    HighLowWagerModule = await ethers.getContractFactory("HighLowWagerModule");
    highLowWagerModule = await HighLowWagerModule.deploy();
    await highLowWagerModule.deployed();

    TestChainLinkOracle = await ethers.getContractFactory(
      "TestChainLinkOracle"
    );
    testChainLinkOracle = await TestChainLinkOracle.deploy();
    await testChainLinkOracle.deployed();

    WagerRegistry = await ethers.getContractFactory("WagerRegistry");
    wagerRegistry = await WagerRegistry.deploy();
    await wagerRegistry.deployed();

    TestWagerExecutor = await ethers.getContractFactory("TestWagerExecutor");
    testWagerExecutor = await TestWagerExecutor.deploy(
      10,
      wagerRegistry.address
    );
    await testWagerExecutor.deployed();
  });

  describe("wagers", function () {
    describe("wager executor executes", function () {
      beforeEach(async function () {
        const partyOneWagerData = utils.defaultAbiCoder.encode(
          ["uint", "uint"],
          ["1", 20000]
        );
        const partyTwoWagerData = utils.defaultAbiCoder.encode(
          ["uint", "uint"],
          ["0", 20000]
        );
        const partiesData = utils.defaultAbiCoder.encode(
          ["address", "address"],
          [address1.address, address2.address]
        );
        for (let i = 0; i < 10; i++) {
          const wagerCreationBlock = await time.latestBlock();
          const wagerExpirationBlock = wagerCreationBlock + 50;
          const blockData = utils.defaultAbiCoder.encode(
            ["uint80", "uint80", "uint80"],
            [
              0,
              wagerExpirationBlock + Math.floor(Math.random() * (10 - 0) + 0),
              0,
            ]
          );

          await wagerRegistry.connect(address1).createWager(
            {
              parties: partiesData,
              partyOneWagerData: partyOneWagerData,
              partyTwoWagerData: [],
              wagerAmount: ethers.utils.parseEther("1.0"), // 1 ETH
              blockData: blockData,
              wagerOracleData: [],
              supplumentalWagerOracleData: [],
              result: [],
              state: ethers.BigNumber.from("1"),
              wagerModule: highLowWagerModule.address,
              oracleModule: testChainLinkOracle.address,
              oracleSource: ethers.constants.AddressZero,
            },
            { value: ethers.utils.parseEther("1.0") }
          );
          await wagerRegistry
            .connect(address2)
            .enterWager(i, partyTwoWagerData, {
              value: ethers.utils.parseEther("1.0"),
            });
        }
      });

      it("simulate executor scheduling per 10-11 blocks", async function () {
        // const startingBalCreator = await address1.getBalance();
        // const startingBalAddress2 = await address2.getBalance();
        // console.log(ethers.utils.formatEther(startingBalCreator));
        // console.log(ethers.utils.formatEther(startingBalAddress2));

        for (let i = 0; i < 40; i++) {
          await testWagerExecutor.performUpkeep([]);
          await mine(i);
          await testChainLinkOracle.setPrice(
            20000 + Math.floor(Math.random() * (1000 - -1000) + -1000)
          );
          await testWagerExecutor.checkUpkeep([]);
        }
        for (let i = 0; i < 10; i++) {
          const wager = await wagerRegistry.wagers(i);
          expect(wager.state).to.be.equal(2); // completed
        }
        // const endBalCreator = await address1.getBalance();
        // const endBalAddress2 = await address2.getBalance();
        // console.log(ethers.utils.formatEther(endBalCreator));
        // console.log(ethers.utils.formatEther(endBalAddress2));
      });
    });
  });
});
