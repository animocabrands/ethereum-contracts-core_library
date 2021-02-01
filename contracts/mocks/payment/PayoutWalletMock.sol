// SPDX-License-Identifier: MIT

pragma solidity 0.6.8;

import "../../payment/PayoutWallet.sol";

contract PayoutWalletMock is PayoutWallet {
    constructor(address payoutWallet_) public PayoutWallet(payoutWallet_) {}
}
