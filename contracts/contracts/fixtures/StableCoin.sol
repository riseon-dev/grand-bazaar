// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract StableCoin is ERC20 {
    constructor(uint256 initialSupply) ERC20("TestStableCoin", "STUSD") {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }
}
