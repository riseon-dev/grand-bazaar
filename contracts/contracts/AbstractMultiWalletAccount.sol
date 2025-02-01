// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

/*
  * AbstractMultiWalletAccount contract
  *
  * This contract is a simple contract that allows a user to deposit funds to an
  * operator held account and withdraw funds from it.
  *
*/
abstract contract AbstractMultiWalletAccount {
    /*
      * The operator of the account (the fund manager if it's a fund)
      * Operator should not be able to withdraw funds from account.
      * Operator can swap funds between account after verifying signature.
      * Operator can swap tokens to other tokens if permission is given by user.
    */
    address public operator;

    constructor(address _operator) {
        operator = _operator;
    }

    function deposit() external {
        address depositer = msg.sender;
    }

    function lock() external {}

    function unlock() external {}

    function withdraw() external {}

    modifier onlyOperator() {
        require(msg.sender == operator, "Only operator can call this function");
        _;
    }

    function receiveEthBalance() external payable onlyOperator {}

    receive() external payable onlyOperator {}

    fallback() external payable onlyOperator {}

    function withdrawEthBalance() external onlyOperator {
        uint256 balance = address(this).balance;
        address caller = msg.sender;
        (bool sent, bytes memory data) = caller.call{value: balance}("");
        require(sent, "Failed to send Ether");
    }
}