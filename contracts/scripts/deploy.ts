import { ethers, run } from "hardhat"; // goerli
import { utils } from "ethers";
import { time, mineUpTo } from "@nomicfoundation/hardhat-network-helpers";

async function main() {
  //await mineUpTo(100);
  const HighLowWagerModule = await ethers.getContractFactory(
    "HighLowWagerModule"
  );
  const highLowWagerModule = await HighLowWagerModule.deploy();
  await highLowWagerModule.deployed();
  console.log("highlow wager module", highLowWagerModule.address);

  const NearestWagerModule = await ethers.getContractFactory(
    "NearestWagerModule"
  );
  const nearestWagerModule = await NearestWagerModule.deploy();
  await nearestWagerModule.deployed();
  console.log("nearest wager module", nearestWagerModule.address);

  const ChainLinkOracleModule = await ethers.getContractFactory(
    "ChainLinkOracleModule"
  );
  const chainLinkOracleModule = await ChainLinkOracleModule.deploy();
  await chainLinkOracleModule.deployed();
  console.log("chainlink module", chainLinkOracleModule.address);

  const TestChainLinkOracleSource = await ethers.getContractFactory(
    "TestChainLinkOracleSource"
  );
  const testChainLinkOracleSource = await TestChainLinkOracleSource.deploy();
  await testChainLinkOracleSource.deployed();
  console.log("testChainLinkOracleSource", testChainLinkOracleSource.address);

  const WagerRegistry = await ethers.getContractFactory("WagerRegistry");
  const wagerRegistry = await WagerRegistry.deploy();
  await wagerRegistry.deployed();
  console.log("registry", wagerRegistry.address);

  const EquityModule = await ethers.getContractFactory(
    "EquityModule"
  );
  const equityModule = await EquityModule.deploy();
  await equityModule.deployed();
  console.log("equityModule", equityModule.address);

  await wagerRegistry.setEquityModule(equityModule.address);

  // const WagerFactory = await ethers.getContractFactory("WagerFactory");
  // const wagerFactory = await WagerFactory.deploy(wagerRegistry.address);
  // await wagerFactory.deployed();
  // console.log("factory", wagerFactory.address);

  // console.log("setting factory wager modules");
  // await wagerFactory.setWagerModule("wm.highlow", highLowWagerModule.address);
  // await wagerFactory.setWagerModule("wm.nearest", nearestWagerModule.address);

  const WagerExecutor = await ethers.getContractFactory("WagerExecutor");
  const wagerExecutor = await WagerExecutor.deploy(wagerRegistry.address);
  await wagerExecutor.deployed();
  console.log("wager executor module", wagerExecutor.address);

  console.log("verifying..");

  try {
    await run("verify:verify", {
      contract:
        "contracts/modules/wagers/HighLowWagerModule.sol:HighLowWagerModule",
      address: highLowWagerModule.address,
    });
  } catch (error) {
    console.log(error);
  }
  try {
    await run("verify:verify", {
      contract:
        "contracts/modules/wagers/NearestWagerModule.sol:NearestWagerModule",
      address: nearestWagerModule.address,
    });
  } catch (error) {
    console.log(error);
  }
  try {
    await run("verify:verify", {
      contract:
        "contracts/modules/oracles/ChainLinkOracleModule.sol:ChainLinkOracleModule",
      address: chainLinkOracleModule.address,
    });
  } catch (error) {
    console.log(error);
  }
  try {
    await run("verify:verify", {
      contract: "contracts/WagerRegistry.sol:WagerRegistry",
      address: wagerRegistry.address,
    });
  } catch (error) {
    console.log(error);
  }
  try {
    await run("verify:verify", {
      contract: "contracts/modules/EquityModule.sol:EquityModule",
      address: equityModule.address,
    });
  } catch (error) {
    console.log(error);
  }
  // try {
  //   await run("verify:verify", {
  //     contract: "contracts/factory/WagerFactory.sol:WagerFactory",
  //     address: wagerFactory.address,
  //     constructorArguments: [
  //       wagerRegistry.address
  //     ]
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
  try {
    await run("verify:verify", {
      contract: "contracts/jobs/WagerExecutor.sol:WagerExecutor",
      address: wagerExecutor.address,
      constructorArguments: [wagerRegistry.address],
    });
  } catch (error) {
    console.log(error);
  }

  // const wagerCreationBlock = 8421890;
  // const blockData = utils.defaultAbiCoder.encode(
  //   ["uint80", "uint80", "uint80"],
  //   [0, wagerCreationBlock + 10, 0]
  // );
  // const partiesData = utils.defaultAbiCoder.encode(
  //   ["address", "address"],
  //   ["0xA44642B57a6a05E3d73BF8b440A009Cd8e9746Ae", "0x117b8bA3D500f79cF73F513f860F7bbb8a62D401"]
  // );
  // const partyOneWagerData = utils.defaultAbiCoder.encode(
  //   ["uint", "uint"],
  //   ["1", 20000]
  // );
  // const partyTwoWagerData = utils.defaultAbiCoder.encode(
  //   ["uint", "uint"],
  //   ["0", 20000]
  // );
  // await wagerRegistry.createWager(
  //   {
  //     parties: partiesData,
  //     partyOneWagerData: partyOneWagerData,
  //     partyTwoWagerData: partyTwoWagerData,
  //     wagerAmount: ethers.utils.parseEther("0.002"), // 1 ETH
  //     blockData: blockData,
  //     wagerOracleData: [],
  //     supplumentalWagerOracleData: [],
  //     result: [],
  //     state: ethers.BigNumber.from("1"),
  //     wagerModule: "0xfcC7DbC86f20b97f9E8FAA935AF23a465eab7e8A",
  //     oracleModule: "0x45Ec35A797ee1e89bCC5348ea6C9eFf4C8588Cdb",
  //     oracleSource: "0xA39434A63A52E749F02807ae27335515BA4b07F7",
  //   },
  //   { value: ethers.utils.parseEther("0.006") }
  // );

  // await wagerRegistry.enterWager(
  //   ethers.BigNumber.from("2"), partyTwoWagerData,
  // { value: ethers.utils.parseEther("0.002") });

  console.log("done");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
