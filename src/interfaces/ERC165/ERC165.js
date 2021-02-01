const {makeInterfaceId} = require('@openzeppelin/test-helpers');

const ERC165_Functions = ['supportsInterface(bytes4)'];

module.exports = {
  ERC165: {
    name: 'ERC165',
    functions: ERC165_Functions,
    id: makeInterfaceId.ERC165(ERC165_Functions),
  }, // 0x01ffc9a7
};
