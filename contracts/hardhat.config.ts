import "@nomiclabs/hardhat-etherscan";
import "@nomicfoundation/hardhat-chai-matchers";
import "@typechain/hardhat";
import * as dotenv from "dotenv";
import fs from "fs";
import "hardhat-contract-sizer";
import "hardhat-gas-reporter";
import { HardhatUserConfig, subtask, task, types } from "hardhat/config";
import "solidity-coverage";

dotenv.config();

export const config: HardhatUserConfig = {
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    coinmarketcap: process.env.CMC_API_KEY,
    currency: "USD",
  },

  networks: {
    hardhat: {},
    goerli: {
      url: process.env.GOERLI_URL || "",
      accounts:
        process.env.TESTNET_PRIVATE_KEY !== undefined
          ? [process.env.TESTNET_PRIVATE_KEY]
          : [],
    },
    mainnet: {
      chainId: 1,
      url: process.env.ETHEREUM_MAINNET_URL || "",
      accounts:
        process.env.HOT_WALLET_DEPLOYER_KEY !== undefined
          ? [process.env.HOT_WALLET_DEPLOYER_KEY]
          : [],
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.7",
        settings: {
          optimizer: {
            enabled: false,
            runs: 200,
          },
        },
      },
    ],
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

function getSortedFiles(dependenciesGraph: any) {
  // eslint-disable-next-line node/no-extraneous-require
  const tsort = require("tsort");
  const graph = tsort();

  const filesMap = {};
  const resolvedFiles = dependenciesGraph.getResolvedFiles();
  // @ts-ignore
  resolvedFiles.forEach((f: any) => (filesMap[f.sourceName] = f));

  for (const [from, deps] of dependenciesGraph.entries()) {
    for (const to of deps) {
      graph.add(to.sourceName, from.sourceName);
    }
  }

  const topologicalSortedNames = graph.sort();

  // If an entry has no dependency it won't be included in the graph, so we
  // add them and then dedup the array
  const withEntries = topologicalSortedNames.concat(
    resolvedFiles.map((f: any) => f.sourceName)
  );

  const sortedNames = [...new Set(withEntries)];
  // @ts-ignore
  return sortedNames.map((n) => filesMap[n]);
}
// @ts-ignore
function getFileWithoutImports(resolvedFile) {
  const IMPORT_SOLIDITY_REGEX = /^\s*import(\s+)[\s\S]*?;\s*$/gm;

  return resolvedFile.content.rawContent
    .replace(IMPORT_SOLIDITY_REGEX, "")
    .trim();
}

subtask(
  "flat:get-flattened-sources",
  "Returns all contracts and their dependencies flattened"
)
  .addOptionalParam("file", undefined, undefined, types.any)
  .addOptionalParam("output", undefined, undefined, types.string)
  .setAction(async ({ file, output }: any, { run }: any) => {
    const dependencyGraph = await run("flat:get-dependency-graph", { file });
    console.log(dependencyGraph);

    let flattened = "";

    if (dependencyGraph.getResolvedFiles().length === 0) {
      return flattened;
    }

    const sortedFiles = getSortedFiles(dependencyGraph);

    let isFirst = true;
    for (const file of sortedFiles) {
      if (!isFirst) {
        flattened += "\n";
      }
      flattened += `// File ${file.getVersionedName()}\n`;
      flattened += `${getFileWithoutImports(file)}\n`;

      isFirst = false;
    }

    // Remove every line started with "// SPDX-License-Identifier:"
    flattened = flattened.replace(
      /SPDX-License-Identifier:/gm,
      "License-Identifier:"
    );

    // flattened = `// SPDX-License-Identifier: MIXED\n\n${flattened}`

    // Remove every line started with "pragma experimental ABIEncoderV2;" except the first one
    flattened = flattened.replace(
      /pragma experimental ABIEncoderV2;\n/gm,
      (
        (i) => (m: any) =>
          !i++ ? m : ""
      )(0)
    );

    flattened = flattened.trim();
    const flatDir = output.split("/")[0];
    if (!fs.existsSync(flatDir)) {
      fs.mkdirSync(flatDir, { recursive: true });
    }
    if (output) {
      console.log("Writing to", output);
      fs.writeFileSync(output, flattened);
      return "";
    }
    return flattened;
  });

subtask("flat:get-dependency-graph")
  .addOptionalParam("files", undefined, undefined, types.any)
  .setAction(async ({ file }, { run }) => {
    const sourcePaths = [file].map((f: any) => fs.realpathSync(f));

    const sourceNames = await run("compile:solidity:get-source-names", {
      sourcePaths,
    });
    console.log(`got source names ${sourceNames}`);
    const dependencyGraph = await run("compile:solidity:get-dependency-graph", {
      sourceNames,
    });

    return dependencyGraph;
  });

task("flat", "Flattens and prints contracts and their dependencies").setAction(
  // eslint-disable-next-line no-empty-pattern
  async ({}, { run }) => {
    const files = [
      // Replace me with contract names
      // ["contracts/LookbookMintingModule.sol", "flattened/LookbookMintingModule_flat.sol"],
      [
        "contracts/IT02MintingModule.sol",
        "flattened/IT02MintingModule_flat.sol",
      ],
    ];

    await Promise.all(
      files.map(async (file) => {
        console.log(
          await run("flat:get-flattened-sources", {
            file: file[0],
            output: file[1],
          })
        );
      })
    );
  }
);

export default config;
