// SPDX-License-Identifier: MIT

pragma solidity ^0.6.8;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
    @title PayoutWallet
    @dev adds support for a payout wallet
    Note: .
 */
contract PayoutWallet is Ownable
{
    event PayoutWalletSet(address payoutWallet_);

    address payable public payoutWallet;

    constructor(address payoutWallet_) internal {
        setPayoutWallet(payoutWallet_);
    }

    function setPayoutWallet(address payoutWallet_) public onlyOwner {
        require(payoutWallet_ != address(0), "The payout wallet must not be the zero address");
        require(payoutWallet_ != address(this), "The payout wallet must not be the contract itself");
        require(payoutWallet_ != payoutWallet, "The payout wallet must be different");
        payoutWallet = payable(payoutWallet_);
        emit PayoutWalletSet(payoutWallet);
    }
}
