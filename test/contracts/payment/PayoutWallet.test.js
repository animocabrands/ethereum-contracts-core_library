const { accounts, contract } = require('@openzeppelin/test-environment');
const { expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { ZeroAddress } = require('../../../src/constants');

const PayoutWallet = contract.fromArtifact('PayoutWalletMock');

describe.only('PayoutWallet', function () {
    const [
        creator,
        other,
        payoutWallet,
        otherPayoutWallet,
        ...otherAccounts
    ] = accounts;

    beforeEach(async function () {
        this.contract = await PayoutWallet.new(payoutWallet, { from: creator });
    });

    it('should fail if not sent by the owner', async function () {
        await expectRevert(
            this.contract.setPayoutWallet(otherPayoutWallet, { from: other }),
            "Ownable: caller is not the owner");
    });

    it('should fail if setting to the zero address', async function () {
        await expectRevert(
            this.contract.setPayoutWallet(ZeroAddress, { from: creator }),
            "The payout wallet must not be the zero address");
    });

    it('should fail when wallet is the contract itself', async function () {
        await expectRevert(
            this.contract.setPayoutWallet(this.contract.address, { from: creator }),
            "The payout wallet must not be the contract itself");
    });

    it('should fail when setting with the existing wallet', async function () {
        await expectRevert(
            this.contract.setPayoutWallet(payoutWallet, { from: creator }),
            "The payout wallet must be different");
    });

    it('should update the payout wallet', async function () {
        let current = await this.contract.payoutWallet();
        current.should.be.equal(payoutWallet);
        const receipt = await this.contract.setPayoutWallet(otherPayoutWallet, { from: creator });
        current = await this.contract.payoutWallet();
        current.should.be.equal(otherPayoutWallet);
        expectEvent(receipt, "PayoutWalletSet", { payoutWallet_: otherPayoutWallet });
    });
});
