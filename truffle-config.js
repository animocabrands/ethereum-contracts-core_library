require('chai').should();

module.exports = {
    plugins: ['truffle-security', 'solidity-coverage'],

    networks: {
        ganache: {
            network_id: '*', // eslint-disable-line camelcase
            host: 'localhost',
            port: 7545,
        },
    },
    compilers: {
        solc: {
            version: '0.6.7',
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200
                }
            }
        }
    }
};
