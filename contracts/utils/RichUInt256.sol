pragma solidity = 0.6.2;

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
            revert("Base must be iether 10 or 16");
        }
    }

    function toDecimalString(uint256 i) internal pure returns (string memory) {
        if (i == 0) {
            return "0";
        }

        uint256 j = i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }

        bytes memory bstr = new bytes(len);
        uint256 k = len - 1;
        while (i != 0) {
            bstr[k--] = bytes1(uint8(48 + (i % 10)));
            i /= 10;
        }

        return string(bstr);
    }

    function toHexString(uint256 i) internal pure returns (string memory) {
        uint length = 64;
        uint mask = 15;
        bytes memory bstr = new bytes(length);
        int k = int(length - 1);
        while (i != 0) {
            uint curr = (i & mask);
            bstr[uint(k--)] = curr > 9 ? byte(uint8(87 + curr)) : byte(uint8(48 + curr)); // 87 = 97 - 10
            i = i >> 4;
        }
        while (k >= 0) {
            bstr[uint(k--)] = byte(uint8(48));
        }
        return string(bstr);
    }
}
