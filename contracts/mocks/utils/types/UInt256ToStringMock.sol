// SPDX-License-Identifier: MIT

pragma solidity 0.6.8;

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
