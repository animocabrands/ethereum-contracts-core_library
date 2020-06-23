// SPDX-License-Identifier: MIT

pragma solidity 0.6.8;

import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * Contract module which allows derived contracts access control over token
 * minting operations.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyMinter`, which can be applied to the minting functions of your contract.
 * Those functions will only be accessible to accounts with the minter role
 * once the modifer is put in place.
 */
contract MinterRole is AccessControl {

    event MinterAdded(address indexed account);
    event MinterRemoved(address indexed account);

    /**
     * Modifier to make a function callable only by accounts with the minter role.
     */
    modifier onlyMinter() {
        require(isMinter(_msgSender()), "MinterRole: caller does not have the Minter role");
        _;
    }

    /**
     * Constructor.
     */
    constructor () internal {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        emit MinterAdded(_msgSender());
    }

    /**
     * Validates whether or not the given account has been granted the minter role.
     * @param account The account to validate.
     * @return True if the account has been granted the minter role, false otherwise.
     */
    function isMinter(address account) public view returns (bool) {
        require(account != address(0), "MinterRole: address zero cannot be minter");
        return hasRole(DEFAULT_ADMIN_ROLE, account);
    }

    /**
     * Grants the minter role to a non-minter.
     * @param account The account to grant the minter role to.
     */
    function addMinter(address account) public onlyMinter {
        require(!isMinter(account), "MinterRole: add an account already minter");
        grantRole(DEFAULT_ADMIN_ROLE, account);
        emit MinterAdded(account);
    }

    /**
     * Renounces the granted minter role.
     */
    function renounceMinter() public onlyMinter {
        renounceRole(DEFAULT_ADMIN_ROLE, _msgSender());
        emit MinterRemoved(_msgSender());
    }

}
