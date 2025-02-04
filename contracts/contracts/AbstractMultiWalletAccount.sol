// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "./lib/AddressSet.sol";
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

    /*
     * The set of tokens held in this contract
     */
    using AddressSet for AddressSet.Set;
    AddressSet.Set tokenSet;
    /*
     * The set of depositor who have funds in this contract
     */
    AddressSet.Set depositorSet;

    /*
     * This mapping stores user balances for each token (user => token => amount)
     */
    mapping(address => mapping(address => uint256)) public wallets;

    /*
     * This mapping stores total balances for each token
     */
    mapping(address => uint256) public contractTokenBalances;

    /*
     * this struct is used to pass parameters to swapOnUniswap function
     */
    struct SwapOnUniswapParams {
        address tokenAddressIn;
        address tokenAddressOut;
        address swapRouter;
        uint24 poolFee;
        uint256 amountIn;
        uint256 deadline;
        uint256 amountOutMinimum;
        uint160 sqrtPriceLimitX96;
        uint256 estimatedGasFees; // gas fee in base currency
    }

    event DepositEvent(address from, address tokenAddress, uint256 amountReceived);
    event WithdrawEvent(address to, address tokenAddress, uint256 amountSent);
    event SwapSucceeded(uint256 amountOut, address tokenOut, uint256 amountIn, address tokenIn, uint24 poolFee);

    constructor(address _operator, address _baseToken) {
        operator = _operator;
        baseToken = _baseToken;
        tokenSet.insert(_baseToken);
    }

    function deposit(uint256 amount) external {
        address depositor = msg.sender;

        IERC20 baseTokenContract = IERC20(baseToken);

        // check allowance
        uint256 allowance = baseTokenContract.allowance(msg.sender, address(this));
        require(allowance >= amount, "Allowance is not enough");

        // transfer
        bool sent = baseTokenContract.transferFrom(depositor, address(this), amount);
        require(sent, "Failed to deposit funds");

        // update balance
        wallets[depositor][baseToken] += amount;
        contractTokenBalances[baseToken] += amount;
        emit DepositEvent(msg.sender, baseToken, amount);
    }

    function withdraw(address tokenAddress) external {
        address withdrawer = msg.sender;
        uint256 balance = wallets[withdrawer][tokenAddress];
        require(balance > 0, "Insufficient balance");

        // update balance
        wallets[withdrawer][tokenAddress] = 0;
        contractTokenBalances[tokenAddress] -= balance;

        IERC20 tokenContract = IERC20(tokenAddress);

        // transfer
        bool sent = tokenContract.transfer(withdrawer, balance);
        require(sent, "Failed to withdraw funds");

        emit WithdrawEvent(withdrawer, tokenAddress, balance);
    }

    function checkBalance(address user, address tokenAddress) public view returns (uint256) {
        return wallets[user][tokenAddress];
    }

    function swapOnUniswap(SwapOnUniswapParams calldata swapParams) external onlyOperator {
        require(tokenSet.contains(swapParams.tokenAddressIn), "Token not supported");
        require(contractTokenBalances[swapParams.tokenAddressIn] >= swapParams.amountIn, "Insufficient balance");

        ISwapRouter swapRouter = ISwapRouter(swapParams.swapRouter);

        uint256 amountInAfterFee = swapParams.amountIn - swapParams.estimatedGasFees;

        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter.ExactInputSingleParams({
            tokenIn: swapParams.tokenAddressIn,
            tokenOut: swapParams.tokenAddressOut,
            fee: swapParams.poolFee,
            recipient: address(this),
            deadline: block.timestamp + swapParams.deadline,
            amountIn: amountInAfterFee,
            amountOutMinimum: swapParams.amountOutMinimum,
            sqrtPriceLimitX96: swapParams.sqrtPriceLimitX96
        });

        uint256 amountOut = swapRouter.exactInputSingle(params);
        require(amountOut >= swapParams.amountOutMinimum, "Uniswap swap failed");

        uint depositorCount = depositorSet.size();
        address[] memory depositors = new address[](depositorCount);
        depositors = depositorSet.values();

        uint256 contractTokenBalance = contractTokenBalances[swapParams.tokenAddressIn];

        for (uint i = 0; i < depositorCount; i++) {
            address depositor = depositors[i];
            uint256 balance = wallets[depositor][swapParams.tokenAddressIn];
            if (balance > 0) {
                // deduct tokenIn from users who have tokenIn
                uint256 depositorShare = (balance / contractTokenBalance);
                wallets[depositor][swapParams.tokenAddressIn] -= depositorShare * swapParams.amountIn;
                // update tokenOut balance for users
                wallets[depositor][swapParams.tokenAddressOut] += depositorShare * amountOut;
            }
        }
        // update contractTokenBalances
        contractTokenBalances[swapParams.tokenAddressIn] -= swapParams.amountIn;

        // add tokenOut to tokenSet
        tokenSet.insert(swapParams.tokenAddressOut);

        // update contractTokenBalances
        contractTokenBalances[swapParams.tokenAddressOut] += amountOut;

        // emit event
        emit SwapSucceeded(
            amountOut,
            swapParams.tokenAddressOut,
            swapParams.amountIn,
            swapParams.tokenAddressIn,
            swapParams.poolFee
        );
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
