const { Conflux } = require('js-conflux-sdk');

const cfxProvider = 'https://test.confluxrpc.com';
// const cfxProvider = 'http://13.67.73.51:12537';
// const cfxProvider = 'http://18.144.1.36:12537';
// const cfxTestProvider = 'http://47.95.29.28:12537';

const cfx = new Conflux({
  url: cfxProvider,
  defaultGasPrice: 200,
  logger: console,
  networkId: 1,
});

module.exports = cfx;
