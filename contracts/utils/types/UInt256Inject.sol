// SPDX-License-Identifier: MIT

pragma solidity ^0.6.8;

library UInt256Inject {

    /**
     * @dev injects an number value into a uint256
     * @param integer uint256 the base number in which to inject the value.
     * @param value uint256 the value to inject.
     * @param length uint256 the number of bits of the value to encode.
     * @param index uint256 the index of the first bit to store the value in the integer.
     * @return result uint256 the integer after injecting the value.
     */
    function inject(
        uint256 integer,
        uint256 value,
        uint256 length,
        uint256 index
    ) internal pure returns (uint256 result)
    {
        require(length > 0, "UInt256Inject: length is zero");
        require(index + length <= 256, "UInt256Inject: position out of bond");
        uint256 mask = (1 << length) - 1;
        require(value <= mask, "UInt256Inject: value overflow");

        // Clear bits at position before injecting the value
        result = integer & ~(mask << index);
        result = result | (value << index);
    }
}
