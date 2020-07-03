// SPDX-License-Identifier: MIT

pragma solidity 0.6.8;

import "@openzeppelin/contracts/GSN/Context.sol";

/**
 * Contract module which allows derived contracts to implement a mechanism for
 * activating, or 'starting', a contract.
 *
 * This module is used through inheritance. It will make available the modifiers
 * `whenNotStarted` and `whenStarted`, which can be applied to the functions of
 * your contract. Those functions will only be 'startable' once the modifiers
 * are put in place.
 */
contract Startable is Context {

    event Started(address account);

    uint256 private _startedAt;

    /**
     * Modifier to make a function callable only when the contract has not started.
     */
    modifier whenNotStarted() {
        require(_startedAt == 0);
        _;
    }

    /**
     * Modifier to make a function callable only when the contract has started.
     */
    modifier whenStarted() {
        require(_startedAt != 0);
        _;
    }

    /**
     * Constructor.
     */
    constructor () internal {}

    /**
     * Returns the timestamp when the contract entered the started state.
     * @return The timestamp when the contract entered the started state.
     */
    function startedAt() public view returns (uint256) {
        return _startedAt;
    }

    /**
     * Triggers the started state.
     * @dev Emits the Started event when the function is successfully called.
     */
    function _start() internal virtual whenNotStarted {
        _startedAt = now;
        emit Started(_msgSender());
    }

}
