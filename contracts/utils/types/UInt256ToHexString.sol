// SPDX-License-Identifier: MIT

pragma solidity 0.6.8;

library UInt256ToHexString {
    function toHexString(uint256 value) internal pure returns (string memory) {
        uint256 temp = value;
        uint256 length = 64;
        uint256 mask = 0xF;
        bytes memory buffer = new bytes(length);
        int256 k = int256(length - 1);
        while (temp != 0) {
            uint256 curr = (temp & mask);
            buffer[uint256(k--)] = curr > 9 ? bytes1(uint8(87 + curr)) : bytes1(uint8(48 + curr)); // 87 = 97 - 10
            temp = temp >> 4;
        }
        while (k >= 0) {
            buffer[uint256(k--)] = bytes1(uint8(48));
        }
        return string(buffer);
    }
}
