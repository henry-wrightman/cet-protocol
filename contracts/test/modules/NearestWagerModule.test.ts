/* eslint-disable camelcase */
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  TestChainLinkOracle,
  TestChainLinkOracle__factory,
  NearestWagerModule,
  NearestWagerModule__factory,
} from "../../../typechain-types";
import { expect } from "chai";
import { ethers } from "hardhat";
import { formatBytes32String } from "ethers/lib/utils";
import { utils } from "ethers";

describe("NearestWagerModule", function () {
  let creator: SignerWithAddress;
  let address1: SignerWithAddress;
  let address2: SignerWithAddress;
  let NearestWagerModule: NearestWagerModule__factory;
  let nearestWagerModule: NearestWagerModule;
  let TestChainLinkOracle: TestChainLinkOracle__factory;
  let testChainLinkOracle: TestChainLinkOracle;

  beforeEach(async function () {
    [creator, address1, address2] = await ethers.getSigners();

    NearestWagerModule = await ethers.getContractFactory("NearestWagerModule");
    nearestWagerModule = await NearestWagerModule.deploy();
    await nearestWagerModule.deployed();

    TestChainLinkOracle = await ethers.getContractFactory(
      "TestChainLinkOracle"
    );
    testChainLinkOracle = await TestChainLinkOracle.deploy();
    await testChainLinkOracle.deployed();
  });

  describe("Nearest wagers [BTCUSD]", function () {
    const blockData = utils.defaultAbiCoder.encode(
      ["uint80", "uint80", "uint80"],
      [0, 1500, 0]
    );
    const equityData = utils.defaultAbiCoder.encode(
      ["address", "uint256"],
      [ethers.constants.AddressZero, ethers.utils.parseEther("1.0")] // 1 ETH
    );
    const decimals = 8;

    it("partyOne should win", async function () {
      await testChainLinkOracle.setPrice(2340505921583); // 23400
      const partiesData = utils.defaultAbiCoder.encode(
        ["address", "address"],
        [address1.address, address2.address]
      );
      const [wager, winner] = await nearestWagerModule.callStatic.settle({
        parties: partiesData,
        partyOneWagerData: utils.defaultAbiCoder.encode(
          ["uint256"],
          [21000 * 10 ** decimals]
        ),
        partyTwoWagerData: utils.defaultAbiCoder.encode(
          ["uint256"],
          [19005 * 10 ** decimals]
        ),
        wagerEquityData: equityData,
        blockData: blockData,
        wagerOracleData: [],
        supplumentalWagerOracleData: [],
        result: [],
        state: ethers.BigNumber.from("1"),
        wagerModule: nearestWagerModule.address,
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
      const [wager, winner] = await nearestWagerModule.callStatic.settle({
        parties: partiesData,
        partyOneWagerData: utils.defaultAbiCoder.encode(
          ["uint256"],
          [19050 * 10 ** decimals]
        ),
        partyTwoWagerData: utils.defaultAbiCoder.encode(
          ["uint256"],
          [21000 * 10 ** decimals]
        ),
        wagerEquityData: equityData,
        blockData: blockData,
        wagerOracleData: [],
        supplumentalWagerOracleData: [],
        result: [],
        state: ethers.BigNumber.from("1"),
        wagerModule: nearestWagerModule.address,
        oracleModule: testChainLinkOracle.address,
        oracleSource: ethers.constants.AddressZero,
      });
      expect(winner).to.equal(address2.address);
    });
  });
  describe("Nearest wagers [XAUUSD]", function () {
    const blockData = utils.defaultAbiCoder.encode(
      ["uint80", "uint80", "uint80"],
      [0, 1500, 0]
    );
    const equityData = utils.defaultAbiCoder.encode(
      ["address", "uint256"],
      [ethers.constants.AddressZero, ethers.utils.parseEther("1.0")] // 1 ETH
    );
    const decimals = 18;

    it("partyOne should win", async function () {
      await testChainLinkOracle.setPrice("1865751481500000050000"); // 1865
      const partiesData = utils.defaultAbiCoder.encode(
        ["address", "address"],
        [address1.address, address2.address]
      );

      const [wager, winner] = await nearestWagerModule.callStatic.settle({
        parties: partiesData,
        partyOneWagerData: utils.defaultAbiCoder.encode(
          ["uint256"],
          [BigInt(1850 * 10 ** decimals)]
        ),
        partyTwoWagerData: utils.defaultAbiCoder.encode(
          ["uint256"],
          [BigInt(1890 * 10 ** decimals)]
        ),
        wagerEquityData: equityData,
        blockData: blockData,
        wagerOracleData: [],
        supplumentalWagerOracleData: [],
        result: [],
        state: ethers.BigNumber.from("1"),
        wagerModule: nearestWagerModule.address,
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
      const [wager, winner] = await nearestWagerModule.callStatic.settle({
        parties: partiesData,
        partyOneWagerData: utils.defaultAbiCoder.encode(
          ["uint256"],
          [BigInt(1950 * 10 ** decimals)]
        ),
        partyTwoWagerData: utils.defaultAbiCoder.encode(
          ["uint256"],
          [BigInt(1840 * 10 ** decimals)]
        ),
        wagerEquityData: equityData,
        blockData: blockData,
        wagerOracleData: [],
        supplumentalWagerOracleData: [],
        result: [],
        state: ethers.BigNumber.from("1"),
        wagerModule: nearestWagerModule.address,
        oracleModule: testChainLinkOracle.address,
        oracleSource: ethers.constants.AddressZero,
      });
      expect(winner).to.equal(address2.address);
    });
  });
  describe("Nearest wagers [LINKETH]", function () {
    const blockData = utils.defaultAbiCoder.encode(
      ["uint80", "uint80", "uint80"],
      [0, 1500, 0]
    );
    const equityData = utils.defaultAbiCoder.encode(
      ["address", "uint256"],
      [ethers.constants.AddressZero, ethers.utils.parseEther("1.0")] // 1 ETH
    );
    const decimals = 18;

    it("partyOne should win", async function () {
      await testChainLinkOracle.setPrice("4329926867255340"); // 0.000432
      const partiesData = utils.defaultAbiCoder.encode(
        ["address", "address"],
        [address1.address, address2.address]
      );

      const [wager, winner] = await nearestWagerModule.callStatic.settle({
        parties: partiesData,
        partyOneWagerData: utils.defaultAbiCoder.encode(
          ["uint256"],
          [BigInt(0.000433 * 10 ** decimals)]
        ),
        partyTwoWagerData: utils.defaultAbiCoder.encode(
          ["uint256"],
          [BigInt(0.000432 * 10 ** decimals)]
        ),
        wagerEquityData: equityData,
        blockData: blockData,
        wagerOracleData: [],
        supplumentalWagerOracleData: [],
        result: [],
        state: ethers.BigNumber.from("1"),
        wagerModule: nearestWagerModule.address,
        oracleModule: testChainLinkOracle.address,
        oracleSource: ethers.constants.AddressZero,
      });
      expect(winner).to.equal(address1.address);
    });

    it("partyTwo should win", async function () {
      await testChainLinkOracle.setPrice("4529926867255340"); // 0.000452
      const partiesData = utils.defaultAbiCoder.encode(
        ["address", "address"],
        [address1.address, address2.address]
      );
      const [wager, winner] = await nearestWagerModule.callStatic.settle({
        parties: partiesData,
        partyOneWagerData: utils.defaultAbiCoder.encode(
          ["uint256"],
          [BigInt(0.000431 * 10 ** decimals)]
        ),
        partyTwoWagerData: utils.defaultAbiCoder.encode(
          ["uint256"],
          [BigInt(0.000436 * 10 ** decimals)]
        ),
        wagerEquityData: equityData,
        blockData: blockData,
        wagerOracleData: [],
        supplumentalWagerOracleData: [],
        result: [],
        state: ethers.BigNumber.from("1"),
        wagerModule: nearestWagerModule.address,
        oracleModule: testChainLinkOracle.address,
        oracleSource: ethers.constants.AddressZero,
      });
      expect(winner).to.equal(address2.address);
    });
  });
});
