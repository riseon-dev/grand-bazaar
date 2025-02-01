// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {AbstractMultiWalletAccount} from "./AbstractMultiWalletAccount.sol";
import {IAccount} from "@account-abstraction/contracts/interfaces/IAccount.sol";
import {PackedUserOperation} from "@account-abstraction/contracts/interfaces/IAccount.sol";


contract MultiWalletAccount is AbstractMultiWalletAccount, IAccount {
    constructor(address _operator) AbstractMultiWalletAccount(_operator) {}

    function validateUserOp(
        PackedUserOperation calldata userOp,
        bytes32 userOpHash,
        uint256 missingAccountFunds
    ) external returns (uint256 validationData) {
        require(msg.sender == operator, "WA: user not operator");
        return 0;
    }
}