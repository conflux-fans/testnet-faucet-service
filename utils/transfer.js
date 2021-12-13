const { Drip } = require('js-conflux-sdk');

const ADDRESS = '0x170ddf9b9750c575db453eea6a041f4c8536785a';
//const ADDRESS = '0x170ddf9b9750c575db453eea6a041f4c8536785a';

const PRIVATE_KEY = '0x46b9e861b63d3509c88b7817275a30d22d62c8cd8fa6486ddee35ef0d8e0495f';

const cfx = require('../utils/conflux');

const account = cfx.Account(PRIVATE_KEY); // create account instance
console.log(account.address); // 0xbbd9e9be525ab967e633bcdaeac8bd5723ed4d6b

async function main() {
  const txHash = await cfx.sendTransaction({
    from: account,
    to: ADDRESS,
    value: Drip.fromCFX(10000000000000),
  });
  console.log(txHash); // 0x4cda8297fc16e2d02018f0ffd484a3f9d38b1f500fe78d1a8451633e354f0c97
}

main().catch(e => console.error(e));
