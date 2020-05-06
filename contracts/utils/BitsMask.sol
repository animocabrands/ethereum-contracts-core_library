pragma solidity ^0.6.6;

library BitsMask {

    /**
     * @dev creates a bits mask of a specified length.
     * The mask applies on the least significant bits of the uint256.
     * @param maskLength uint8 the number of bits to be part of the mask.
     * @return uint256 the mask.
     */
    function make(uint8 maskLength) public pure returns(uint256) {
        return (1 << uint256(maskLength)) - 1;
    }

}
