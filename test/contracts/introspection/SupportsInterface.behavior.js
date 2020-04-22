function shouldSupportInterfaces(interfaces) {

    describe('ERC165 supportsInterface(bytes4)', function () {
        beforeEach(function () {
            this.contract = this.mock || this.token;
        });

        for (const interface of interfaces) {
            describe(interface.name, function () {

                it('is supported', async function () {
                    (await this.contract.supportsInterface(interface.id)).should.equal(true);
                });

                it('should use less than 30k gas', async function () {
                    (await this.contract.supportsInterface.estimateGas(interface.id)).should.be.lte(30000);
                });
            });
        }
    });
}

module.exports = shouldSupportInterfaces;
