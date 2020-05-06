pragma solidity ^0.6.6;
pragma experimental ABIEncoderV2;

import "./BitsMask.sol";

library UInt256Bits {

    struct Position {
        uint8 length;
        uint8 index;
    }

    /**
     * @dev extracts an integer value from certain bits in a uint256
     * @param integer uint256 the base number where to extract the value from.
     * @param position Position the length and index where to extract the value.
     * @return result uint256 the extracted value, shifted to the least significant bits.
     */
    function extract(uint256 integer, Position memory position) internal pure returns(uint256 result) {
        require(position.length > 0, "Invalid length");
        require(position.index + position.length <= 256, "Integer overflow");
        result = (integer & (BitsMask.make(position.length) << position.index)) >> position.index;
    }

    /**
     * @dev injects an number value into a uint256
     * @param integer uint256 the base number in which to inject the value.
     * @param value uint256 the value to inject.
     * @param position Position the length and index where to inject the value.
     * @return result uint256 the integer after injecting the value.
     */
    function inject(uint256 integer, uint256 value, Position memory position) public pure returns(uint256 result) {
        require(position.length > 0, "Invalid length");
        uint256 mask = BitsMask.make(position.length);
        require(value <= mask, "Too big value");
        require(position.index + position.length <= 256, "Integer overflow");

        // Clearing bits before injecting the value
        result = integer | ~(mask << position.index);

        result = result | (value << position.index);
    }
}
