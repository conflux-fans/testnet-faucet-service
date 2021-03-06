module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "no-unused-vars": ["error", { "argsIgnorePattern": "next", "varsIgnorePattern": "^_" }],
    "no-console": 0,
    "no-underscore-dangle": 0
  },
};
