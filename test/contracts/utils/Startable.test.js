const {artifacts, accounts} = require('hardhat');
const {expectEvent, expectRevert} = require('@openzeppelin/test-helpers');
const {Zero} = require('../../../src/constants');

const Startable = artifacts.require('StartableMock');

describe('Startable', function () {
  const [creator, ...otherAccounts] = accounts;

  beforeEach(async function () {
    this.contract = await Startable.new({from: creator});
  });

  context('when not started yet', function () {
    it('should not have set the `_startedAt` state member', async function () {
      const startedAt = await this.contract.startedAt();
      startedAt.should.be.bignumber.equal(Zero);
    });

    it('should fail if calling a function with the `whenStarted` modifier', async function () {
      await expectRevert(this.contract.testWhenStarted(), 'Startable: not started');
    });

    it('should successfully call a function with the `whenNotStarted` modifier', async function () {
      await this.contract.testWhenNotStarted();
      true.should.be.true;
    });
  });

  context('when started', function () {
    beforeEach(async function () {
      this.receipt = await this.contract.start({from: creator});
    });

    it('should emit the `Started` event', async function () {
      expectEvent(this.receipt, 'Started', {
        account: creator,
      });
    });

    it('should have set the `_startedAt` state member', async function () {
      const startedAt = await this.contract.startedAt();
      startedAt.should.be.bignumber.gt(Zero);
    });

    it('should fail if calling a function with the `whenNotStarted` modifier', async function () {
      await expectRevert(this.contract.testWhenNotStarted(), 'Startable: started');
    });

    it('should successfully call a function with the `whenStarted` modifier', async function () {
      await this.contract.testWhenStarted();
      true.should.be.true;
    });
  });
});
