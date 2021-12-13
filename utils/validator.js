const isHexHash = hash => /^0x([a-f]|[0-9]|[A-F])*$/.test(hash);
const isAccountAddress = hash => isHexHash(hash) && hash.length === 42 && hash.startsWith('0x1');

module.exports = {
  isAccountAddress,
};
