
pragma solidity ^0.6.6;

library RichString {

    function toBytes32(string memory source) internal pure returns (bytes32 result) {
        return toBytes32(source, false); // no overflow allowed by default
    }

    function toBytes32(string memory source, bool allowOverflow) internal pure returns (bytes32 result) {
        bytes memory bytesStr = bytes(source);
        if (!allowOverflow) {
            require(bytesStr.length <= 32, "String overflow");
        }
        if (bytesStr.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(source, 32))
        }
    }
}