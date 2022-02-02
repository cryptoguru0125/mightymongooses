pragma solidity ^0.5.7;

import "./Roles.sol";

contract RetailerRole {
  using Roles for Roles.Role;

  event RetailerAdded(address indexed account);
  event RetailerRemoved(address indexed account);

  Roles.Role private retailers;

  // In the constructor make the address that deploys this contract the 1st retailer
  constructor() public {
    _addRetailer(msg.sender);
  }

  modifier onlyRetailer() {
    require(isRetailer(msg.sender), "You do not have the farmer role.");
    _;
  }

  function isRetailer(address account) public view returns (bool) {
    return retailers.has(account);
  }

  function addRetailer(address account) public onlyRetailer {
    _addRetailer(account);
  }

  function renounceRetailer() public {
    _removeRetailer(msg.sender);
  }

  function _addRetailer(address account) internal {
    retailers.add(account);
    emit RetailerAdded(account);
  }

  function _removeRetailer(address account) internal {
    retailers.remove(account);
    emit RetailerRemoved(account);
  }
}