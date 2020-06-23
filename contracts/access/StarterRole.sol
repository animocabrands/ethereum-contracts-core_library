// SPDX-License-Identifier: MIT

pragma solidity 0.6.8;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract StarterRole is AccessControl {

    event StarterAdded(address indexed account);
    event StarterRemoved(address indexed account);

    constructor () internal {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        emit StarterAdded(_msgSender());
    }

    modifier onlyStarter() {
        require(isStarter(_msgSender()), "Starter: caller does not have the Starter role");
        _;
    }

    function isStarter(address account) public view returns (bool) {
        require(account != address(0), "StarterRole: address zero cannot be starter");
        return hasRole(DEFAULT_ADMIN_ROLE, account);
    }

    function addStarter(address account) public onlyStarter {
        require(!isStarter(account), "StarterRole: add an account already starter");
        grantRole(DEFAULT_ADMIN_ROLE, account);
        emit StarterAdded(account);
    }

    function renounceStarter() public {
        require(isStarter(_msgSender()), "StarterRole: renounce by a non-starter");
        renounceRole(DEFAULT_ADMIN_ROLE, _msgSender());
        emit StarterRmoved(_msgSender());
    }

}
