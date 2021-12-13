/* eslint-disable arrow-body-style */
const express = require('express');
const JSBI = require('jsbi');
const BigNumber = require('bignumber.js');
const { Drip } = require('js-conflux-sdk');
const cfx = require('../utils/conflux');
const db = require('../db/db');

const COINBASE = '0x170ddf9b9750c575db453eea6a041f4c8536785a';
const PRIVATE_KEY = Buffer.from('4bb79797807812587dd6e02b39fee03056c11eec5ec599609d9175a1275a9a10', 'hex');
const AMOUNT_TOKEN = JSBI.BigInt('100000000000000000000');
const MIN_SPAN = 60 * 60 * 1000;
const faucetAccount = cfx.wallet.addPrivateKey(PRIVATE_KEY);

const router = express.Router();
const ResponseWrapper = require('../utils/responseWrapper');
const { isAccountAddress } = require('../utils/validator');

router.get('/status', (req, res, next) => {
  cfx.getBalance(COINBASE).then((balance) => {
    const number = new BigNumber(balance);
    if (number.isGreaterThanOrEqualTo(AMOUNT_TOKEN)) {
      res.send(ResponseWrapper.ok({
        serviceReady: true,
        balance: number.dividedBy(AMOUNT_TOKEN).toNumber(),
      }));
    } else {
      res.send(ResponseWrapper.error(1, 'Balance not enough'));
    }
  }).catch((err) => {
    res.send(ResponseWrapper.error(2, 'Full node error:', err));
  });
});

router.get('/ask', async (req, res, next) => {
  const account = req.query.address;
  if (!isAccountAddress(account)) {
    res.send(ResponseWrapper.error(1, 'Parameter error: expect a lowercase string or checksum address started with 0x'));
    return Promise.resolve();
  }

  let tooSoon = false;
  await db.getUsers().findOne({ account }).then((user) => {
    if (user) {
      const span = Date.now() - user._id.getTimestamp();
      if (span < MIN_SPAN) {
        res.send(ResponseWrapper.error(3, `Error: one account can only get one time for every 1 hour, now is only ${span / 1000} secs`, MIN_SPAN - span));
        tooSoon = true;
      }
    }
    return Promise.resolve();
  });

  if (tooSoon) {
    return Promise.resolve();
  }

  const options = {
    from: faucetAccount.address,
    to: account,
    value: Drip.fromCFX(100),
  };
  //
  return cfx.cfx.sendTransaction(options).then((result) => {
    return db.getUsers().deleteOne({ account })
      .then(() => db.getUsers().insertOne({ account }))
      .then(() => {
        res.send(ResponseWrapper.ok({
          tx: result,
        }));
        return Promise.resolve();
      });
  }).catch((err) => {
    res.send(ResponseWrapper.error(2, `Full node error or transaction not valid:${err}`));
    console.log('err options 1:', options);
  });
});

module.exports = router;
