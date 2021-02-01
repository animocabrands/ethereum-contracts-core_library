const {artifacts} = require('hardhat');

const UInt256Bits = artifacts.require('UInt256BitsMock');

describe('UInt256Bits', function () {
  beforeEach(async function () {
    this.contract = await UInt256Bits.new();
  });

  const integers = [
    0,
    1,
    2,
    '0x1234567890abcdef',
    '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    '0xefffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe',
    '0xffffffffffffffffffffffffffffffff',
    '0xffffffffffffffffffffffffffffffff00000000000000000000000000000000',
  ];

  const values = [
    {value: 0, length: 1, index: 0},
    {value: 1, length: 1, index: 0},
    {value: 0, length: 1, index: 255},
    {value: 1, length: 1, index: 255},
    {value: 0, length: 8, index: 0},
    {value: 1, length: 8, index: 0},
    {value: 254, length: 8, index: 0},
    {value: 255, length: 8, index: 0},
    {value: 0, length: 8, index: 248},
    {value: 1, length: 8, index: 248},
    {value: 254, length: 8, index: 248},
    {value: 255, length: 8, index: 248},
    {value: 0, length: 123, index: 0},
    {value: 1, length: 123, index: 0},
    {value: '0xfffffffff', length: 123, index: 133},
    {value: '0xfffffffff', length: 123, index: 133},
  ];

  for (const integer of integers) {
    for (const value of values) {
      it(`matches after inject/extract: integer=${integer}, value=${value.value}, length=${value.length}, index=${value.index}`, async function () {
        await this.contract.requireInjectExtractValueUnchanged(integer, value.value, value.length, value.index);
      });
    }
  }
});
