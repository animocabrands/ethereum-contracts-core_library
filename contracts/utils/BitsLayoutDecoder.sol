pragma solidity ^0.6.6;
pragma experimental ABIEncoderV2;

import "./RichString.sol";
import "./UInt256Bits.sol";
import "../algo/EnumMap.sol";

contract BitsLayoutDecoder {

    using RichString for string;
    using EnumMap for EnumMap.Map;
    using UInt256Bits for uint256;

    EnumMap.Map internal _bitsLayout;

    function getAttribute(uint256 integer, string memory name) public view returns(uint256) {
        uint256 integerPosition = uint256(_bitsLayout.get(name.toBytes32()));
        return integer.extract(UInt256Bits.Position(
            uint8(integerPosition.extract(UInt256Bits.Position(8, 0))),
            uint8(integerPosition.extract(UInt256Bits.Position(8, 8)))
        ));
    }

    function _updateLayout(string[] memory names, UInt256Bits.Position[] memory positions) internal {
        require(names.length == positions.length, "Inconsistent array lengths");
        _clearLayout();
        uint256 l = names.length;
        for (uint256 i = 0; i < l; i++) {
            uint256 position = 0;
            position.inject(positions[i].length, UInt256Bits.Position(8, 0));
            position.inject(positions[i].index, UInt256Bits.Position(8, 8));
            _bitsLayout.set(names[i].toBytes32(), bytes32(position));
        }
    }

    function _clearLayout() internal {
        while(_bitsLayout.length() > 0) {
            (bytes32 key, ) = _bitsLayout.at(0);
            _bitsLayout.remove(key);
        }
    }

}
