module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: "eslint:recommended",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    "eol-last": 2,
    semi: [2, "never"],
    quotes: [2, "single", { avoidEscape: true }],
    "no-trailing-spaces": 2,
    "object-curly-spacing": [2, "always"]
  }
};

