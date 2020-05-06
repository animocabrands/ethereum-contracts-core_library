
pragma solidity ^0.6.6;

library RichBytes32 {

    function toString(bytes32 _hash) internal pure returns (string memory) {
        return toString(_hash, 32);
    }

    function toString(bytes32 _hash, uint8 base) internal pure returns (string memory) {
        if (base == 32) {
            return toBase32String(_hash);
        } else {
            revert("Base must be 32");
        }
    }

    /**
     * @dev public function to convert bytes32 to string
     * @param _hash bytes32 _hash to convert
     * @return string string convert from given bytes32
     */
    function toBase32String(bytes32 _hash) public pure returns(string memory) {
        bytes32 base32Alphabet = 0x6162636465666768696A6B6C6D6E6F707172737475767778797A323334353637;
        uint256 i = uint256(_hash);
        uint256 k = 52;
        bytes memory bstr = new bytes(k);
        bstr[--k] = base32Alphabet[uint8((i % 8) << 2)]; // uint8 s = uint8((256 - skip) % 5);  // (i % (2**s)) << (5-s)
        i /= 8;
        while (k > 0) {
            bstr[--k] = base32Alphabet[i % 32];
            i /= 32;
        }
        return string(bstr);
    }
}