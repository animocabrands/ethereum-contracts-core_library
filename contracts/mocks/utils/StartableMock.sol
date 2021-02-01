// SPDX-License-Identifier: MIT

pragma solidity 0.6.8;

import "../../utils/Startable.sol";

contract StartableMock is Startable {
    constructor() public {}

    function start() external {
        _start();
    }

    function testWhenStarted() external view whenStarted {}

    function testWhenNotStarted() external view whenNotStarted {}
}
