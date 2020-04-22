// const { GSNDevProvider } = require('@openzeppelin/gsn-provider');
require('chai').should();

module.exports = {
  accounts: {
    ether: 1e6,
  },

  contracts: {
    type: 'truffle',
  },

  setupProvider: (baseProvider) => {
    return baseProvider;
    // const { accounts } = require('@openzeppelin/test-environment');
    // return new GSNDevProvider(baseProvider, {
    //   txfee: 70,
    //   useGSN: false,
    //   ownerAddress: accounts[8],
    //   relayerAddress: accounts[9],
    // });
  },
};