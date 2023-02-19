/* eslint-disable camelcase */
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  TestChainLinkOracle,
  TestChainLinkOracle__factory,
  HighLowWagerModule,
  HighLowWagerModule__factory,
} from "../../../typechain-types";
import { expect } from "chai";
import { ethers } from "hardhat";
import { utils } from "ethers";
import { formatBytes32String } from "ethers/lib/utils";

describe("HighLowWagerModule", function () {
  let creator: SignerWithAddress;
  let address1: SignerWithAddress;
  let address2: SignerWithAddress;
  let HighLowWagerModule: HighLowWagerModule__factory;
  let highLowWagerModule: HighLowWagerModule;
  let TestChainLinkOracle: TestChainLinkOracle__factory;
  let testChainLinkOracle: TestChainLinkOracle;

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
  });

  describe("HighLow wagers [BTCUSD]", function () {
    const blockData = utils.defaultAbiCoder.encode(
      ["uint80", "uint80", "uint80"],
      [0, 1500, 0]
    );
    const equityData = utils.defaultAbiCoder.encode(
      ["int", "address[2]", "uint256", "uint256[2]"],
      [
        "1",
        [ethers.constants.AddressZero, ethers.constants.AddressZero],
        ethers.utils.parseEther("1.0"),
        ["0", "0"],
      ] // 1 ETH
    );
    const decimals = 8;

    it("partyOne should win", async function () {
      await testChainLinkOracle.setPrice(2340505921583); // 23400
      const partiesData = utils.defaultAbiCoder.encode(
        ["address", "address"],
        [address1.address, address2.address]
      );
      const [wager, winner] = await highLowWagerModule.callStatic.settle({
        parties: partiesData,
        partyOneWagerData: utils.defaultAbiCoder.encode(
          ["uint", "uint"],
          ["1", 20000 * 10 ** decimals]
        ),
        partyTwoWagerData: utils.defaultAbiCoder.encode(
          ["uint", "uint"],
          ["0", 20000 * 10 ** decimals]
        ),
        equityData: equityData,
        blockData: blockData,
        supplementalOracleData: [],
        result: [],
        state: ethers.BigNumber.from("1"),
        wagerModule: highLowWagerModule.address,
        oracleModule: testChainLinkOracle.address,
        oracleSource: ethers.constants.AddressZero,
      });
      expect(winner).to.equal(address1.address);
    });

    it("partyTwo should win", async function () {
      await testChainLinkOracle.setPrice(2340505921583); // 23400
      const partiesData = utils.defaultAbiCoder.encode(
        ["address", "address"],
        [address1.address, address2.address]
      );
      const [wager, winner] = await highLowWagerModule.callStatic.settle({
        parties: partiesData,
        partyOneWagerData: utils.defaultAbiCoder.encode(
          ["uint", "uint"],
          ["0", 20000 * 10 ** decimals]
        ),
        partyTwoWagerData: utils.defaultAbiCoder.encode(
          ["uint", "uint"],
          ["1", 20000 * 10 ** decimals]
        ),
        equityData: equityData,
        blockData: blockData,
        supplementalOracleData: [],
        result: [],
        state: ethers.BigNumber.from("1"),
        wagerModule: highLowWagerModule.address,
        oracleModule: testChainLinkOracle.address,
        oracleSource: ethers.constants.AddressZero,
      });
      expect(winner).to.equal(address2.address);
    });
  });
  describe("HighLow wagers [XAUUSD]", function () {
    const blockData = utils.defaultAbiCoder.encode(
      ["uint80", "uint80", "uint80"],
      [0, 1500, 0]
    );
    const equityData = utils.defaultAbiCoder.encode(
      ["int", "address[2]", "uint256", "uint256[2]"],
      [
        "1",
        [ethers.constants.AddressZero, ethers.constants.AddressZero],
        ethers.utils.parseEther("1.0"),
        ["0", "0"],
      ] // 1 ETH
    );
    const decimals = 18;

    it("partyOne should win", async function () {
      await testChainLinkOracle.setPrice("1865751481500000050000"); // 1865
      const partiesData = utils.defaultAbiCoder.encode(
        ["address", "address"],
        [address1.address, address2.address]
      );
      const [wager, winner] = await highLowWagerModule.callStatic.settle({
        parties: partiesData,
        partyOneWagerData: utils.defaultAbiCoder.encode(
          ["uint", "uint"],
          ["1", BigInt(1800 * 10 ** decimals)]
        ),
        partyTwoWagerData: utils.defaultAbiCoder.encode(
          ["uint", "uint"],
          ["0", BigInt(1800 * 10 ** decimals)]
        ),
        equityData: equityData,
        blockData: blockData,
        supplementalOracleData: [],
        result: [],
        state: ethers.BigNumber.from("1"),
        wagerModule: highLowWagerModule.address,
        oracleModule: testChainLinkOracle.address,
        oracleSource: ethers.constants.AddressZero,
      });
      expect(winner).to.equal(address1.address);
    });

    it("partyTwo should win", async function () {
      await testChainLinkOracle.setPrice("1865751481500000050000"); // 1865
      const partiesData = utils.defaultAbiCoder.encode(
        ["address", "address"],
        [address1.address, address2.address]
      );
      const [wager, winner] = await highLowWagerModule.callStatic.settle({
        parties: partiesData,
        partyOneWagerData: utils.defaultAbiCoder.encode(
          ["uint", "uint"],
          ["0", BigInt(1800 * 10 ** decimals)]
        ),
        partyTwoWagerData: utils.defaultAbiCoder.encode(
          ["uint", "uint"],
          ["1", BigInt(1800 * 10 ** decimals)]
        ),
        equityData: equityData,
        blockData: blockData,
        supplementalOracleData: [],
        result: [],
        state: ethers.BigNumber.from("1"),
        wagerModule: highLowWagerModule.address,
        oracleModule: testChainLinkOracle.address,
        oracleSource: ethers.constants.AddressZero,
      });
      expect(winner).to.equal(address2.address);
    });
  });
  describe("HighLow wagers [LINKETH]", function () {
    const blockData = utils.defaultAbiCoder.encode(
      ["uint80", "uint80", "uint80"],
      [0, 1500, 0]
    );
    const equityData = utils.defaultAbiCoder.encode(
      ["int", "address[2]", "uint256", "uint256[2]"],
      [
        "1",
        [ethers.constants.AddressZero, ethers.constants.AddressZero],
        ethers.utils.parseEther("1.0"),
        ["0", "0"],
      ] // 1 ETH
    );
    const decimals = 18;

    it("partyOne should win", async function () {
      await testChainLinkOracle.setPrice("4329926867255340"); // 0.000432
      const partiesData = utils.defaultAbiCoder.encode(
        ["address", "address"],
        [address1.address, address2.address]
      );
      const [wager, winner] = await highLowWagerModule.callStatic.settle({
        parties: partiesData,
        partyOneWagerData: utils.defaultAbiCoder.encode(
          ["uint", "uint"],
          ["1", BigInt(0.000432 * 10 ** decimals)]
        ),
        partyTwoWagerData: utils.defaultAbiCoder.encode(
          ["uint", "uint"],
          ["0", BigInt(0.000432 * 10 ** decimals)]
        ),
        equityData: equityData,
        blockData: blockData,
        supplementalOracleData: [],
        result: [],
        state: ethers.BigNumber.from("1"),
        wagerModule: highLowWagerModule.address,
        oracleModule: testChainLinkOracle.address,
        oracleSource: ethers.constants.AddressZero,
      });
      expect(winner).to.equal(address1.address);
    });

    it("partyTwo should win", async function () {
      await testChainLinkOracle.setPrice("4329926867255340"); // 0.000432
      const partiesData = utils.defaultAbiCoder.encode(
        ["address", "address"],
        [address1.address, address2.address]
      );
      const [wager, winner] = await highLowWagerModule.callStatic.settle({
        parties: partiesData,
        partyOneWagerData: utils.defaultAbiCoder.encode(
          ["uint", "uint"],
          ["0", BigInt(0.000432 * 10 ** decimals)]
        ),
        partyTwoWagerData: utils.defaultAbiCoder.encode(
          ["uint", "uint"],
          ["1", BigInt(0.000432 * 10 ** decimals)]
        ),
        equityData: equityData,
        blockData: blockData,
        supplementalOracleData: [],
        result: [],
        state: ethers.BigNumber.from("1"),
        wagerModule: highLowWagerModule.address,
        oracleModule: testChainLinkOracle.address,
        oracleSource: ethers.constants.AddressZero,
      });
      expect(winner).to.equal(address2.address);
    });
  });
  describe("HighLow wagers [EURUSD]", function () {
    const blockData = utils.defaultAbiCoder.encode(
      ["uint80", "uint80", "uint80"],
      [0, 1500, 0]
    );
    const equityData = utils.defaultAbiCoder.encode(
      ["int", "address[2]", "uint256", "uint256[2]"],
      [
        "1",
        [ethers.constants.AddressZero, ethers.constants.AddressZero],
        ethers.utils.parseEther("1.0"),
        ["0", "0"],
      ] // 1 ETH
    );
    const decimals = 8;

    it("partyOne should win", async function () {
      await testChainLinkOracle.setPrice("107382000"); // 1.0738
      const partiesData = utils.defaultAbiCoder.encode(
        ["address", "address"],
        [address1.address, address2.address]
      );
      const [wager, winner] = await highLowWagerModule.callStatic.settle({
        parties: partiesData,
        partyOneWagerData: utils.defaultAbiCoder.encode(
          ["uint", "uint"],
          ["1", BigInt(1.072 * 10 ** decimals)]
        ),
        partyTwoWagerData: utils.defaultAbiCoder.encode(
          ["uint", "uint"],
          ["0", BigInt(1.0745 * 10 ** decimals)]
        ),
        equityData: equityData,
        blockData: blockData,
        supplementalOracleData: [],
        result: [],
        state: ethers.BigNumber.from("1"),
        wagerModule: highLowWagerModule.address,
        oracleModule: testChainLinkOracle.address,
        oracleSource: ethers.constants.AddressZero,
      });
      expect(winner).to.equal(address1.address);
    });

    it("partyTwo should win", async function () {
      await testChainLinkOracle.setPrice("107382000"); // 1.0738
      const partiesData = utils.defaultAbiCoder.encode(
        ["address", "address"],
        [address1.address, address2.address]
      );
      const [wager, winner] = await highLowWagerModule.callStatic.settle({
        parties: partiesData,
        partyOneWagerData: utils.defaultAbiCoder.encode(
          ["uint", "uint"],
          ["0", BigInt(1.074 * 10 ** decimals)]
        ),
        partyTwoWagerData: utils.defaultAbiCoder.encode(
          ["uint", "uint"],
          ["1", BigInt(1.072 * 10 ** decimals)]
        ),
        equityData: equityData,
        blockData: blockData,
        supplementalOracleData: [],
        result: [],
        state: ethers.BigNumber.from("1"),
        wagerModule: highLowWagerModule.address,
        oracleModule: testChainLinkOracle.address,
        oracleSource: ethers.constants.AddressZero,
      });
      expect(winner).to.equal(address2.address);
    });
  });
});
