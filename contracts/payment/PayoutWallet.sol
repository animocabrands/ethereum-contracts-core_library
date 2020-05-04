pragma solidity ^0.6.6;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
    @title PayoutWallet
    @dev adds support for a payout wallet
    Note: .
 */
contract PayoutWallet is Ownable
{
    event PayoutWalletSet(address payoutWallet);

    address payable public _payoutWallet;

    constructor(address payoutWallet) internal {
        setPayoutWallet(payoutWallet);
    }

    function setPayoutWallet(address payoutWallet) public onlyOwner {
        require(payoutWallet != address(0), "The payout wallet must not be the zero address");
        require(payoutWallet != address(this), "The payout wallet must not be the contract itself");
        require(payoutWallet != _payoutWallet, "The payout wallet must be different");
        _payoutWallet = payable(payoutWallet);
        emit PayoutWalletSet(_payoutWallet);
    }
}