async function sendAsync(provider, method, params) {
    return new Promise((resolve, reject) => {
        provider.send(
            {
                jsonrpc: '2.0',
                method: method,
                params: params,
                id: new Date().getTime()
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
    });
}

function createFixtureLoader(accounts, provider) {
    const snapshots = [];

    const hre = require('hardhat');
    if (hre.network.name === 'coverage' || hre.config.gasReporter.enabled) {
        // console.log('Instrumented EVM, evm_snapshot will not be used');
        return async (fixture, context) => {
            if (context !== undefined) {
                data = await fixture.bind(context, accounts, provider)();
            } else {
                data = await fixture(accounts, provider);
            }
        };
    }

    return async (fixture, context) => {
        const snapshot = snapshots.find((snapshot) => {
            return snapshot.fixture === fixture;
        });

        if (snapshot) {
            const _evmRevert = await sendAsync(snapshot.provider, 'evm_revert', [snapshot.id]);
            const evmSnapshot = await sendAsync(snapshot.provider, 'evm_snapshot', []);
            snapshot.id = evmSnapshot.result;
            return snapshot.data;
        } else {
            let data;
            if (context !== undefined) {
                data = await fixture.bind(context, accounts, provider)();
            } else {
                data = await fixture(accounts, provider);
            }
            const evmSnapshot = await sendAsync(provider, 'evm_snapshot', []);
            const id = evmSnapshot.result;
            snapshots.push({ fixture, data, id, provider });
            return data;
        }
    };
}

module.exports = {
    createFixtureLoader
};
