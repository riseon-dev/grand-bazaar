// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";
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
    /*
      * The base token of the account (the token in which the account is denominated)
      * All funds in the account are in base token.
    */
    address public baseToken;


    // user => token => amount
    mapping(address => mapping(address => uint256)) public wallets;

    event DepositEvent(address from, address tokenAddress, uint256 amountReceived);

    constructor(address _operator, address _baseToken) {
        operator = _operator;
        baseToken = _baseToken;
    }

    function deposit(uint256 amount) external {
        address depositer = msg.sender;

        IERC20 baseTokenContract = IERC20(baseToken);

        // check allowance
        uint256 allowance = baseTokenContract.allowance(msg.sender, address(this));
        require(allowance >= amount, "Allowance is not enough");

        // transfer
        bool sent = baseTokenContract.transferFrom(depositer, address(this), amount);
        require(sent, "Failed to deposit funds");

        wallets[depositer][baseToken] += amount;
        emit DepositEvent(msg.sender, baseToken,  amount);
    }

    function withdraw(address tokenAddress) external {
        address withdrawer = msg.sender;
        uint256 balance = wallets[withdrawer][tokenAddress];
        require(balance > 0, "Insufficient balance");

        IERC20 tokenContract = IERC20(tokenAddress);

        // transfer
        bool sent = tokenContract.transfer(withdrawer, balance);
        require(sent, "Failed to withdraw funds");

        wallets[withdrawer][tokenAddress] = 0;
    }

    function checkBalance(address user, address tokenAddress) public view returns (uint256) {
        return wallets[user][tokenAddress];
    }

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