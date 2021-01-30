// SPDX-License-Identifier: MIT

pragma solidity 0.6.8;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
    @title PayoutWallet
    @dev adds support for a payout wallet
    Note: .
 */
contract PayoutWallet is Ownable {
    event PayoutWalletSet(address payoutWallet_);

    address payable public payoutWallet;

    constructor(address payoutWallet_) internal {
        setPayoutWallet(payoutWallet_);
    }

    function setPayoutWallet(address payoutWallet_) public onlyOwner {
        require(payoutWallet_ != address(0), "Payout: zero address");
        require(payoutWallet_ != address(this), "Payout: this contract as payout");
        require(payoutWallet_ != payoutWallet, "Payout: same payout wallet");
        payoutWallet = payable(payoutWallet_);
        emit PayoutWalletSet(payoutWallet);
    }
}
