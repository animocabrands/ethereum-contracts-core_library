pragma solidity ^0.6.7;

library RichUInt256 {

    function toString(uint256 i) internal pure returns (string memory) {
        return toString(i, 10);
    }

    function toString(uint256 i, uint8 base) internal pure returns (string memory) {
        if (base == 10) {
            return toDecimalString(i);
        } else if (base == 16) {
            return toHexString(i);
        } else {
            revert("RichUInt256: toString unsupported base");
        }
    }

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


pragma solidity ^0.6.7;

import "../../../utils/types/UInt256ToDecimalString.sol";
import "../../../utils/types/UInt256ToHexString.sol";

library UInt256ToStringMock {

    using UInt256ToDecimalString for uint256;
    using UInt256ToHexString for uint256;

    function toDecimalString(uint256 value) external pure returns (string memory result) {
        result = value.toDecimalString();
    }

    function toHexString(uint256 value) external pure returns (string memory result) {
        result = value.toHexString();
    }
}