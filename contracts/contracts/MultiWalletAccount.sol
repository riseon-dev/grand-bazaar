// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {AbstractMultiWalletAccount} from "./AbstractMultiWalletAccount.sol";

contract MultiWalletAccount is AbstractMultiWalletAccount {
    constructor(address _operator, address _baseToken) AbstractMultiWalletAccount(_operator, _baseToken) {}
}