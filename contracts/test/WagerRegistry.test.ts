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
  TestERC721,
  TestERC721__factory,
  EquityModule,
  EquityModule__factory,
} from "../typechain-types";
import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber, utils } from "ethers";
import { time, mine } from "@nomicfoundation/hardhat-network-helpers";

describe("WagerRegistry", function () {
  let creator: SignerWithAddress;
  let address1: SignerWithAddress;
  let address2: SignerWithAddress;
  let HighLowWagerModule: HighLowWagerModule__factory;
  let highLowWagerModule: HighLowWagerModule;
  let TestChainLinkOracle: TestChainLinkOracle__factory;
  let testChainLinkOracle: TestChainLinkOracle;
  let WagerRegistry: WagerRegistry__factory;
  let wagerRegistry: WagerRegistry;
  let TestERC721: TestERC721__factory;
  let testERC721: TestERC721;
  let EquityModule: EquityModule__factory;
  let equityModule: EquityModule;

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

    TestERC721 = await ethers.getContractFactory("TestERC721");
    testERC721 = await TestERC721.deploy();
    await testERC721.deployed();

    EquityModule = await ethers.getContractFactory("EquityModule");
    equityModule = await EquityModule.deploy();
    await equityModule.deployed();

    WagerRegistry = await ethers.getContractFactory("WagerRegistry");
    wagerRegistry = await WagerRegistry.deploy();
    await wagerRegistry.deployed();

    await wagerRegistry.setEquityModule(equityModule.address);

    await testChainLinkOracle.setPrice(21000);
    await testERC721.mint(address1.address);
    await testERC721.mint(address2.address);
  });

  describe("wagers", function () {
    const partyOneWagerData = utils.defaultAbiCoder.encode(
      ["uint", "uint"],
      ["1", 20000]
    );
    const partyTwoWagerData = utils.defaultAbiCoder.encode(
      ["uint", "uint"],
      ["0", 20000]
    );
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
    const partyTwoEquityData = utils.defaultAbiCoder.encode(
      ["address", "uint256"],
      [ethers.constants.AddressZero, "0"]
    );

    describe("wager creation", function () {
      it("partyOne should create wager successfully", async function () {
        const latestBlock = await time.latestBlock();
        const blockData = utils.defaultAbiCoder.encode(
          ["uint80", "uint80", "uint80"],
          [latestBlock + 1, latestBlock + 1000, 0]
        );
        const partiesData = utils.defaultAbiCoder.encode(
          ["address", "address"],
          [creator.address, ethers.constants.AddressZero]
        );
        const createWagerTx = await wagerRegistry.createWager(
          {
            parties: partiesData,
            partyOneWagerData: partyOneWagerData,
            partyTwoWagerData: partyTwoWagerData,
            equityData: equityData,
            blockData: blockData,
            supplumentalOracleData: [],
            result: [],
            state: ethers.BigNumber.from("1"),
            wagerModule: highLowWagerModule.address,
            oracleModule: testChainLinkOracle.address,
            oracleSource: ethers.constants.AddressZero,
          },
          { value: ethers.utils.parseEther("1.0") }
        );

        const wager = await wagerRegistry.wagers(0);
        expect(wager.parties).to.be.equal(partiesData);
        expect(wager.partyOneWagerData).to.be.equal(partyOneWagerData);
        expect(wager.partyTwoWagerData).to.be.equal(partyTwoWagerData);
        expect(wager.equityData).to.be.equal(equityData);
        expect(wager.blockData).to.be.equal(blockData);
        expect(wager.wagerModule).to.be.equal(highLowWagerModule.address);
        expect(wager.oracleModule).to.be.equal(testChainLinkOracle.address);

        await expect(createWagerTx)
          .emit(wagerRegistry, "WagerCreated")
          .withArgs(
            creator.address,
            ethers.utils.parseEther("1.0"),
            partyOneWagerData,
            0,
            latestBlock + 1000,
            highLowWagerModule.address,
            ethers.constants.AddressZero,
            0
          );
      });
      it("partyOne should create wager, partyTwo should enter wager successfully", async function () {
        const latestBlock = await time.latestBlock();
        const blockData = utils.defaultAbiCoder.encode(
          ["uint80", "uint80", "uint80"],
          [0, latestBlock + 1000, latestBlock + 100]
        );
        const partiesData = utils.defaultAbiCoder.encode(
          ["address", "address"],
          [creator.address, ethers.constants.AddressZero]
        );
        await wagerRegistry.createWager(
          {
            parties: partiesData,
            partyOneWagerData: partyOneWagerData,
            partyTwoWagerData: partyTwoWagerData,
            equityData: equityData,
            blockData: blockData,
            supplumentalOracleData: [],
            result: [],
            state: ethers.BigNumber.from("1"),
            wagerModule: highLowWagerModule.address,
            oracleModule: testChainLinkOracle.address,
            oracleSource: ethers.constants.AddressZero,
          },
          { value: ethers.utils.parseEther("1.0") }
        );

        const enterWagerTx = await wagerRegistry
          .connect(address2)
          .enterWager(0, partyTwoEquityData, partyTwoWagerData, {
            value: ethers.utils.parseEther("1.0"),
          });

        await expect(enterWagerTx)
          .emit(wagerRegistry, "WagerEntered")
          .withArgs(address2.address, partyTwoWagerData, 0);
      });
      it("partyOne should create wager, partyTwo should enter wager, partyOne wins successfully happy path", async function () {
        const latestBlock = await time.latestBlock();
        const blockData = utils.defaultAbiCoder.encode(
          ["uint80", "uint80", "uint80"],
          [0, latestBlock + 100, latestBlock + 50]
        );
        const partiesData = utils.defaultAbiCoder.encode(
          ["address", "address"],
          [address1.address, ethers.constants.AddressZero]
        );
        await wagerRegistry.connect(address1).createWager(
          {
            parties: partiesData,
            partyOneWagerData: partyOneWagerData,
            partyTwoWagerData: partyTwoWagerData,
            equityData: equityData,
            blockData: blockData,
            supplumentalOracleData: [],
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
          .enterWager(0, partyTwoEquityData, partyTwoWagerData, {
            value: ethers.utils.parseEther("1.0"),
          });

        const address1BalStart = await address1.getBalance();

        await mine(latestBlock + 100);
        const executeWinnerTx = await wagerRegistry.settleWager(0);
        const receipt = await executeWinnerTx.wait();
        const gasUsed = receipt.gasUsed.mul(receipt.effectiveGasPrice);

        await expect(executeWinnerTx)
          .emit(wagerRegistry, "WagerSettled")
          .withArgs(
            address1.address,
            ethers.utils.parseEther("2.0"),
            utils.defaultAbiCoder.encode(["uint256"], [21000]),
            0
          );

        const address1BalEnd = await address1.getBalance();
        expect(address1BalEnd).to.be.equal(
          BigNumber.from(ethers.utils.parseEther("2.0")).add(address1BalStart)
        ); // wagerAmount (1) * 2 (recieving the full pot)
      });
      it("partyOne should create one-sided wager, partyTwo should enter wager, partyTwo wins successfully happy path", async function () {
        const latestBlock = await time.latestBlock();
        const blockData = utils.defaultAbiCoder.encode(
          ["uint80", "uint80", "uint80"],
          [0, latestBlock + 100, latestBlock + 50]
        );
        const partiesData = utils.defaultAbiCoder.encode(
          ["address", "address"],
          [address1.address, ethers.constants.AddressZero]
        );
        const equityData = utils.defaultAbiCoder.encode(
          ["int", "address[2]", "uint256", "uint256[2]"],
          [
            "0",
            [testERC721.address, ethers.constants.AddressZero],
            "0",
            ["0", "0"],
          ] // 1 NFT; id 0 // one-sided (required)
        );
        const partyTwoEquityData = utils.defaultAbiCoder.encode(
          ["address", "uint256"],
          [testERC721.address, "1"]
        );

        // NFT needs to be pre-approved to be used within a wager
        await testERC721.connect(address1).approve(equityModule.address, 0);

        await wagerRegistry.connect(address1).createWager({
          parties: partiesData,
          partyOneWagerData: partyTwoWagerData,
          partyTwoWagerData: [], // data flipped, such that partyTwo wins
          equityData: equityData,
          blockData: blockData,
          supplumentalOracleData: [],
          result: [],
          state: ethers.BigNumber.from("1"),
          wagerModule: highLowWagerModule.address,
          oracleModule: testChainLinkOracle.address,
          oracleSource: ethers.constants.AddressZero,
        });

        const rbal = await testERC721.getApproved(0);
        expect(rbal).to.be.equal(equityModule.address);

        // NFT needs to be pre-approved to be used within a wager
        await testERC721.connect(address2).approve(equityModule.address, 1);

        await wagerRegistry
          .connect(address2)
          .enterWager(0, partyTwoEquityData, partyOneWagerData, {
            value: ethers.utils.parseEther("1.0"),
          });

        await mine(latestBlock + 100);
        const executeWinnerTx = await wagerRegistry.settleWager(0);
        const receipt = await executeWinnerTx.wait();
        const gasUsed = receipt.gasUsed.mul(receipt.effectiveGasPrice);

        const a1bal_after = await testERC721.balanceOf(address1.address);
        expect(a1bal_after).to.be.equal("0"); // NFT transferred to address 2
        const a2bal_after = await testERC721.balanceOf(address2.address);
        expect(a2bal_after).to.be.equal("2"); // NFT transferred to address 2 (his & his winnings)

        await expect(executeWinnerTx)
          .emit(wagerRegistry, "WagerSettled")
          .withArgs(
            address2.address,
            "0",
            utils.defaultAbiCoder.encode(["uint256"], [21000]),
            0
          );
      });
    });
    describe("wager entering", function () {
      beforeEach(async function () {
        const wagerCreationBlock = await time.latestBlock();
        const blockData = utils.defaultAbiCoder.encode(
          ["uint80", "uint80", "uint80"],
          [0, wagerCreationBlock + 100, wagerCreationBlock + 10]
        );
        const partiesData = utils.defaultAbiCoder.encode(
          ["address", "address"],
          [creator.address, ethers.constants.AddressZero]
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
        await wagerRegistry.createWager(
          {
            parties: partiesData,
            partyOneWagerData: partyOneWagerData,
            partyTwoWagerData: [],
            equityData: equityData,
            blockData: blockData,
            supplumentalOracleData: [],
            result: [],
            state: ethers.BigNumber.from("1"),
            wagerModule: highLowWagerModule.address,
            oracleModule: testChainLinkOracle.address,
            oracleSource: ethers.constants.AddressZero,
          },
          { value: ethers.utils.parseEther("1.0") }
        );
      });

      it("partyTwo can enter wager successfully", async function () {
        const enterPartyData = utils.defaultAbiCoder.encode(
          ["address", "address"],
          [creator.address, address2.address]
        );
        const partyTwoEnterData = utils.defaultAbiCoder.encode(
          ["uint", "uint"],
          ["0", 20000]
        );
        await wagerRegistry
          .connect(address2)
          .enterWager(0, partyTwoEquityData, partyTwoEnterData, {
            value: ethers.utils.parseEther("1.0"),
          });

        const wager = await wagerRegistry.wagers(0);
        expect(wager.parties).to.be.equal(enterPartyData);
        expect(wager.partyTwoWagerData).to.be.equal(partyTwoEnterData);
      });
      it("partyTwo cannot enter wager; insufficient bal", async function () {
        const partyTwoWagerData = utils.defaultAbiCoder.encode(
          ["uint", "uint"],
          ["0", 20000]
        );
        const badWagerTx = wagerRegistry
          .connect(address2)
          .enterWager(0, partyTwoEquityData, partyTwoWagerData, {
            value: ethers.utils.parseEther("0.5"),
          });

        await expect(badWagerTx).to.be.revertedWith("W9");
      });
      it("partyTwo cannot enter wager; wager doesn't exist", async function () {
        const partyTwoWagerData = utils.defaultAbiCoder.encode(
          ["uint", "uint"],
          ["0", 20000]
        );
        const badWagerTx = wagerRegistry
          .connect(address2)
          .enterWager(15, partyTwoEquityData, partyTwoWagerData, {
            value: ethers.utils.parseEther("0.5"),
          });

        await expect(badWagerTx).to.be.revertedWith("W1");
      });
      it("partyTwo cannot enter wager; invalid wager state (already entered)", async function () {
        const partyTwoWagerData = utils.defaultAbiCoder.encode(
          ["uint", "uint"],
          ["0", 20000]
        );

        await wagerRegistry
          .connect(address2)
          .enterWager(0, partyTwoEquityData, partyTwoWagerData, {
            value: ethers.utils.parseEther("1.0"),
          });
        const badWagerTx = wagerRegistry
          .connect(address2)
          .enterWager(0, partyTwoEquityData, partyTwoWagerData, {
            value: ethers.utils.parseEther("1.0"),
          });

        await expect(badWagerTx).to.be.revertedWith("W2");
      });
      it("partyTwo cannot enter wager; matches wagerOne's wager data", async function () {
        const partyTwoWagerData = partyOneWagerData;

        const badWagerTx = wagerRegistry
          .connect(address2)
          .enterWager(0, partyTwoEquityData, partyTwoWagerData, {
            value: ethers.utils.parseEther("1.0"),
          });

        await expect(badWagerTx).to.be.revertedWith("W18");
      });
      it("partyTwo cannot enter wager; wager already expired", async function () {
        const partyTwoWagerData = utils.defaultAbiCoder.encode(
          ["uint", "uint"],
          ["0", 20000]
        );

        const wager = await wagerRegistry.wagers(0);
        await mine(wager.expirationBlock);

        const badWagerTx = wagerRegistry
          .connect(address2)
          .enterWager(15, partyTwoEquityData, partyTwoWagerData, {
            value: ethers.utils.parseEther("1.0"),
          });

        expect(badWagerTx).to.be.revertedWith("W7");
      });
      it("partyTwo cannot enter wager; sender is partyOne", async function () {
        const partyTwoWagerData = utils.defaultAbiCoder.encode(
          ["uint", "uint"],
          ["0", 20000]
        );

        const badWagerTx = wagerRegistry.enterWager(15, partyTwoWagerData, {
          value: ethers.utils.parseEther("1.0"),
        });

        expect(badWagerTx).to.be.revertedWith("W8");
      });
      it("partyTwo cannot enter wager; invalid partyTwoWager data", async function () {
        const badWagerTx = wagerRegistry.enterWager(
          15,
          partyTwoEquityData,
          [],
          {
            value: ethers.utils.parseEther("1.0"),
          }
        );

        expect(badWagerTx).to.be.revertedWith("W10");
      });
    });
    describe("wager voiding", function () {
      beforeEach(async function () {
        const wagerCreationBlock = await time.latestBlock();
        const blockData = utils.defaultAbiCoder.encode(
          ["uint80", "uint80", "uint80"],
          [0, wagerCreationBlock + 100, wagerCreationBlock + 10]
        );
        const partiesData = utils.defaultAbiCoder.encode(
          ["address", "address"],
          [address1.address, ethers.constants.AddressZero]
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
        await wagerRegistry.connect(address1).createWager(
          {
            parties: partiesData,
            partyOneWagerData: partyOneWagerData,
            partyTwoWagerData: partyTwoWagerData,
            equityData: equityData,
            blockData: blockData,
            supplumentalOracleData: [],
            result: [],
            state: ethers.BigNumber.from("1"),
            wagerModule: highLowWagerModule.address,
            oracleModule: testChainLinkOracle.address,
            oracleSource: ethers.constants.AddressZero,
          },
          { value: ethers.utils.parseEther("1.0") }
        );
      });

      it("partyOne can void wager & be refunded successfully", async function () {
        const address1BalStart = await address1.getBalance();
        const contractBalStart = await ethers.provider.getBalance(
          equityModule.address
        );

        const tx = await wagerRegistry.connect(address1).voidWager(0);
        const receipt = await tx.wait();
        const gasUsed = receipt.gasUsed.mul(receipt.effectiveGasPrice);

        const wager = await wagerRegistry.wagers(0);
        const address1BalEnd = await address1.getBalance();
        const contractBalEnd = await ethers.provider.getBalance(
          equityModule.address
        );

        expect(wager.state).to.be.equal(3);
        expect(address1BalEnd).to.be.equal(
          BigNumber.from(ethers.utils.parseEther("1.0"))
            .add(address1BalStart)
            .sub(gasUsed)
        ); // refund to recipient
        expect(contractBalEnd).to.be.equal(
          BigNumber.from(ethers.utils.parseEther("1.0")).sub(contractBalStart)
        ); // refund from contract
      });
    });
  });
});
