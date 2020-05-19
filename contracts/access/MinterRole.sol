pragma solidity ^0.6.8;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract MinterRole is AccessControl {

    event MinterAdded(address indexed account);
    event MinterRemoved(address indexed account);

    constructor () internal {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        emit MinterAdded(_msgSender());
    }

    modifier onlyMinter() {
        require(isMinter(_msgSender()), "MinterRole: caller does not have the Minter role");
        _;
    }

    function isMinter(address account) public view returns (bool) {
        require(account != address(0), "MinterRole: address zero cannot be minter");
        return hasRole(DEFAULT_ADMIN_ROLE, account);
    }

    function addMinter(address account) public onlyMinter {
        require(!isMinter(account), "MinterRole: add an account already minter");
        grantRole(DEFAULT_ADMIN_ROLE, account);
        emit MinterAdded(account);
    }

    function renounceMinter() public {
        require(isMinter(_msgSender()), "MinterRole: renounce by a non-minter");
        renounceRole(DEFAULT_ADMIN_ROLE, _msgSender());
        emit MinterRemoved(_msgSender());
    }

}
