// SPDX-License-Identifier: MIT

pragma solidity 0.6.8;

import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * Contract module which allows derived contracts to implement a mechanism for
 * pausing a contract.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyPauser`, which can be applied to the pausable functions of your
 * contract. Those functions will only be accessible to accounts with the
 * pauser role once the modifer is put in place.
 */
contract PauserRole is AccessControl {
    event PauserAdded(address indexed account);
    event PauserRemoved(address indexed account);

    /**
     * Modifier to make a function callable only by accounts with the pauser role.
     */
    modifier onlyPauser() {
        require(isPauser(_msgSender()), "PauserRole: not a Pauser");
        _;
    }

    /**
     * Constructor.
     */
    constructor() internal {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        emit PauserAdded(_msgSender());
    }

    /**
     * Validates whether or not the given account has been granted the pauser role.
     * @param account The account to validate.
     * @return True if the account has been granted the pauser role, false otherwise.
     */
    function isPauser(address account) public view returns (bool) {
        return hasRole(DEFAULT_ADMIN_ROLE, account);
    }

    /**
     * Grants the pauser role to a non-pauser.
     * @param account The account to grant the pauser role to.
     */
    function addPauser(address account) public onlyPauser {
        require(!isPauser(account), "PauserRole: already Pauser");
        grantRole(DEFAULT_ADMIN_ROLE, account);
        emit PauserAdded(account);
    }

    /**
     * Renounces the granted pauser role.
     */
    function renouncePauser() public onlyPauser {
        renounceRole(DEFAULT_ADMIN_ROLE, _msgSender());
        emit PauserRemoved(_msgSender());
    }
}
