/*
https://github.com/OpenZeppelin/openzeppelin-contracts

The MIT License (MIT)

Copyright (c) 2016-2019 zOS Global Limited

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// SPDX-License-Identifier: MIT

pragma solidity 0.6.8;

import "../../algo/EnumMap.sol";

contract EnumMapMock {
    using EnumMap for EnumMap.Map;

    event OperationResult(bool result);

    EnumMap.Map private _map;

    function contains(uint256 key) public view returns (bool) {
        return _map.contains(bytes32(key));
    }

    function set(uint256 key, address value) public {
        bool result = _map.set(bytes32(key), bytes32(uint256(value)));
        emit OperationResult(result);
    }

    function remove(uint256 key) public {
        bool result = _map.remove(bytes32(key));
        emit OperationResult(result);
    }

    function length() public view returns (uint256) {
        return _map.length();
    }

    function at(uint256 index) public view returns (uint256 key, address value) {
        (bytes32 keyAsBytes32, bytes32 valueAsBytes32) = _map.at(index);
        return (uint256(keyAsBytes32), address(uint256(valueAsBytes32)));
    }


    function get(uint256 key) public view returns (address) {
        return address(uint256(_map.get(bytes32(key))));
    }
}
