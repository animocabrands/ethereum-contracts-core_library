function shouldSupportInterfaces(interfaces) {
  describe('ERC165 supportsInterface(bytes4)', function () {
    beforeEach(function () {
      this.contract = this.contract || this.mock || this.token;
    });

    for (const interface of interfaces) {
      describe(interface.name, function () {
        it('is supported', async function () {
          (await this.contract.supportsInterface(interface.id)).should.equal(true);
        });

        it('should use less than 25k gas [ @skip-on-coverage ]', async function () {
          (await this.contract.supportsInterface.estimateGas(interface.id)).should.be.lte(25000);
        });
      });
    }
  });
}

module.exports = {
  shouldSupportInterfaces,
};
