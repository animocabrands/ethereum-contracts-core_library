const BN = require('web3-utils').BN;
const interfaces = require('./interfaces/ERC165');

// BigNumber
const Zero = new BN('0');
const One = new BN('1');
const Two = new BN('2');
const Three = new BN('3');
const Four = new BN('4');
const Five = new BN('5');

const MaxUInt256 = new BN('2').pow(new BN('256')).sub(new BN('1'));
const MaxInt256 = new BN('2').pow(new BN('255')).sub(new BN('1'));
const MinInt256 = new BN('2').pow(new BN('255')).sub(new BN('-1'));

// Address
const EthAddress = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
const ZeroAddress = '0x0000000000000000000000000000000000000000';

// Byte
const EmptyByte = '0x00';
const NonEmptyByte = '0xFF';

// ERC165 Interface Ids, Bytes4
const ERC165_InterfaceId = interfaces.ERC165.id;

// Bytes4
const ZeroBytes4 = '0x00000000';
const NonZeroBytes4 = '0x12345678';

// Bytes32
const ZeroBytes32 = '0x0000000000000000000000000000000000000000000000000000000000000000';
const NonZeroBytes32 = '0x1234567890ABCDEF1234567890ABCDEF1234567890ABCDEF1234567890ABCDEF';

module.exports = {
  // BigNumber
  Zero,
  One,
  Two,
  Three,
  Four,
  Five,
  MaxUInt256,
  MaxInt256,
  MinInt256,
  BN: {
    Zero,
    One,
    Two,
    Three,
    Four,
    Five,
    MaxUInt256,
    MaxInt256,
    MinInt256,
  },

  // Address
  ZeroAddress,
  EthAddress,
  Address: {
    Zero: ZeroAddress,
    Eth: EthAddress,
  },

  // Byte
  EmptyByte,
  NonEmptyByte,
  Byte: {
    Empty: EmptyByte,
    NonEmpty: NonEmptyByte,
  },

  // Bytes4
  ZeroBytes4,
  NonZeroBytes4,
  ERC165_InterfaceId,
  Bytes4: {
    Zero: ZeroBytes4,
    NonZero: NonZeroBytes4,
    ERC165_InterfaceId,
  },

  // Bytes32
  ZeroBytes32,
  NonZeroBytes32,
  Bytes32: {
    Zero: ZeroBytes32,
    NonZero: NonZeroBytes32,
  },
};
