pragma solidity ^0.6.7;

library UInt256ToHexString {

    function toHexString(uint256 value) internal pure returns (string memory) {
        uint256 temp = value;
        uint256 length = 64;
        uint256 mask = 0xF;
        bytes memory buffer = new bytes(length);
        int k = int(length - 1);
        while (temp != 0) {
            uint256 curr = (temp & mask);
            buffer[uint256(k--)] = curr > 9 ? byte(uint8(87 + curr)) : byte(uint8(48 + curr)); // 87 = 97 - 10
            temp = temp >> 4;
        }
        while (k >= 0) {
            buffer[uint256(k--)] = byte(uint8(48));
        }
        return string(buffer);
    }
}
