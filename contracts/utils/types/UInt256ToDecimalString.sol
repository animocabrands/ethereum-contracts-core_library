// SPDX-License-Identifier: MIT

pragma solidity ^0.6.8;

library UInt256ToDecimalString {

    function toDecimalString(uint256 value) internal pure returns (string memory) {
        // Inspired by OpenZeppelin's String.toString() implementation - MIT licence
        // https://github.com/OpenZeppelin/openzeppelin-contracts/blob/8b10cb38d8fedf34f2d89b0ed604f2dceb76d6a9/contracts/utils/Strings.sol
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        uint256 index = digits - 1;
        temp = value;
        while (temp != 0) {
            buffer[index--] = byte(uint8(48 + temp % 10));
            temp /= 10;
        }
        return string(buffer);
    }
}
