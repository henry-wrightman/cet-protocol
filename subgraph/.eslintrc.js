module.exports = {
  root: true,
  env: {
    browser: false,
    es2021: true,
    mocha: true,
    node: true
  },
  plugins: ["@shopify/assemblyscript"],
  extends: [
    "standard",
    "plugin:prettier/recommended",
    "plugin:node/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12
  },
  settings: {
    node: {
      tryExtensions: [".js", ".json", ".node", ".ts", ".d.ts"]
    }
  },
  ignorePatterns: ["generated/", "config/", "build/"],
  rules: {
    "node/no-unsupported-features/es-syntax": [
      "error",
      { ignores: ["modules"] }
    ]
  }
};
