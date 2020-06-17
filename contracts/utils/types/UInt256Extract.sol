// SPDX-License-Identifier: MIT

pragma solidity 0.6.8;

library UInt256Extract {

    /**
     * @dev extracts an integer value from certain bits in a uint256
     * @param integer uint256 the base number where to extract the value from.
     * @param length uint256 the number of bits of the value to decode.
     * @param index uint256 the index of the first bit in integer where the value is stored.
     * @return result uint256 the extracted value, shifted to the least significant bits.
     */
    function extract(
        uint256 integer,
        uint256 length,
        uint256 index
    ) internal pure returns (uint256)
    {
        require(length > 0, "UInt256Extract: length is zero");
        require(index + length <= 256, "UInt256Extract: position out of bond");
        uint256 mask = (1 << length) - 1;
        return (integer >> index) & mask;
    }
}
