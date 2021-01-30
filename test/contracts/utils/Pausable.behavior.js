const {accounts, web3} = require('hardhat');
const {createFixtureLoader} = require('../../../test/utils/fixture');
const {expectEvent, expectRevert} = require('@openzeppelin/test-helpers');

function shouldBehaveLikePausableContract({revertMessages, deploy}) {
  describe('like a Pausable contract', function () {
    const [pauser, other] = accounts;

    const fixtureLoader = createFixtureLoader(accounts, web3.eth.currentProvider);

    const fixture = async function () {
      this.pausable = await deploy(pauser);
    };

    beforeEach(async function () {
      await fixtureLoader(fixture, this);
    });

    let receipt;
    const options = {from: pauser};

    describe('pause()', function () {
      it('reverts when already paused', async function () {
        await this.pausable.pause(options);
        await expectRevert(this.pausable.pause(options), revertMessages.AlreadyPaused);
      });

      it('reverts if paused by an unauthorized accounts', async function () {
        await expectRevert(this.pausable.pause({from: other}), revertMessages.NotPauser);
      });

      context('when successful', function () {
        beforeEach(async function () {
          receipt = await this.pausable.pause(options);
        });

        it('pauses the contract', async function () {
          (await this.pausable.paused()).should.be.equal(true);
        });

        it('emits an Paused event', async function () {
          expectEvent(receipt, 'Paused', {account: pauser});
        });
      });
    });

    describe('unpause()', function () {
      beforeEach(async function () {
        await this.pausable.pause(options);
      });

      it('reverts when already unpaused', async function () {
        await this.pausable.unpause(options);
        await expectRevert(this.pausable.unpause(options), revertMessages.AlreadyUnpaused);
      });

      it('reverts if unpaused by an unauthorized accounts', async function () {
        await expectRevert(this.pausable.unpause({from: other}), revertMessages.NotPauser);
      });

      context('when successful', function () {
        beforeEach(async function () {
          receipt = await this.pausable.unpause(options);
        });

        it('unpauses the contract', async function () {
          (await this.pausable.paused()).should.be.equal(false);
        });

        it('emits an Unpaused event', async function () {
          expectEvent(receipt, 'Unpaused', {account: pauser});
        });
      });
    });
  });
}

module.exports = {
  shouldBehaveLikePausableContract,
};
