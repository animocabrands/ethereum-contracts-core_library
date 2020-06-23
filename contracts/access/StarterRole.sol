// SPDX-License-Identifier: MIT

pragma solidity 0.6.8;

import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * Contract module which allows derived contracts access control over
 * activating, or 'starting' the contract.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyStarter`, which can be applied to the startable functions of your
 * contract. Those functions will only be accessible to accounts with the
 * starter role once the modifer is put in place.
 */
contract StarterRole is AccessControl {

    event StarterAdded(address indexed account);
    event StarterRemoved(address indexed account);

    /**
     * Modifier to make a function callable only by accounts with the starter role.
     */
    modifier onlyStarter() {
        require(isStarter(_msgSender()), "StarterRole: caller does not have the Starter role");
        _;
    }

    /**
     * Constructor.
     */
    constructor () internal {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        emit StarterAdded(_msgSender());
    }

    /**
     * Validates whether or not the given account has been granted the starter role.
     * @param account The account to validate.
     * @return True if the account has been granted the starter role, false otherwise.
     */
    function isStarter(address account) public view returns (bool) {
        require(account != address(0), "StarterRole: address zero cannot be starter");
        return hasRole(DEFAULT_ADMIN_ROLE, account);
    }

    /**
     * Grants the starter role to a non-starter.
     * @param account The account to grant the starter role to.
     */
    function addStarter(address account) public onlyStarter {
        require(!isStarter(account), "StarterRole: add an account already starter");
        grantRole(DEFAULT_ADMIN_ROLE, account);
        emit StarterAdded(account);
    }

    /**
     * Renounces the granted starter role.
     */
    function renounceStarter() public onlyStarter {
        renounceRole(DEFAULT_ADMIN_ROLE, _msgSender());
        emit StarterRmoved(_msgSender());
    }

}
