require('chai').should();

module.exports = {
    plugins: ['truffle-security', 'solidity-coverage', 'truffle-plugin-verify'],

    networks: {
        ganache: {
            network_id: '*', // eslint-disable-line camelcase
            host: 'localhost',
            port: 7545,
        },
    },

    compilers: {
        solc: {
            version: '0.6.8',
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200
                }
            }
        }
    }

    // Necessary to use the command `npm run publish`
    // api_keys: {
    //     etherscan: 'etherscanAPIKey'
    // },
};
