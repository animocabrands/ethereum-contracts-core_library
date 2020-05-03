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
        require(payoutWallet != address(this), "The payout wallet must not be the contract itself");
        _payoutWallet = payable(payoutWallet);
        emit PayoutWalletSet(_payoutWallet);
    }
}