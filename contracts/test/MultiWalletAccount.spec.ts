import {loadFixture} from '@nomicfoundation/hardhat-toolbox-viem/network-helpers';
import {expect} from 'chai';
import hre from 'hardhat';
import {getAddress, getContract, parseEther} from 'viem';
import {getBalance} from 'viem/actions';

async function deployContracts() {
  const [deployer, operator, user1] = await hre.viem.getWalletClients();

  const publicClient = await hre.viem.getPublicClient();

  const deployStableCoin = async (operatorAddress: string) => {
    const stableCoin = await hre.viem.deployContract(
      // eslint-disable-next-line
      // @ts-ignore
      'StableCoin',
      [parseEther('1000000'), operatorAddress],
      {},
    );

    return stableCoin;
  };

  const deployMultiWallet = async (stableCoinAddress: string) => {
    const multiWallet = await hre.viem.deployContract(
      // eslint-disable-next-line
      // @ts-ignore
      'MultiWalletAccount',
      [operator.account.address, stableCoinAddress],
      {},
    );
    return multiWallet;
  };

  const stableCoin = await deployStableCoin(operator.account.address);
  const multiWallet = await deployMultiWallet(stableCoin.address);

  // send some stable coins to user1
  const stableCoinContract = getContract({
    address: stableCoin.address,
    abi: stableCoin.abi,
    client: operator,
  });
  // eslint-disable-next-line
  // @ts-ignore
  await stableCoinContract.write.transfer([
    user1.account.address,
    parseEther('20'),
  ]);

  return {
    deployer,
    operator,
    user1,
    stableCoin,
    multiWallet,
    publicClient,
  };
}

describe('MultiWalletAccount', function () {
  describe('Deployment', () => {
    it('should require one operator and a base token to deploy', async () => {
      const {stableCoin, multiWallet} = await loadFixture(deployContracts);

      // eslint-disable-next-line
      expect(stableCoin).to.be.ok;
      // eslint-disable-next-line
      expect(multiWallet).to.be.ok;
    });

    it('should have the correct operator && stable coin address', async () => {
      const {operator, multiWallet, stableCoin} =
        await loadFixture(deployContracts);

      // eslint-disable-next-line
      // @ts-ignore
      expect(await multiWallet.read.operator()).to.equal(
        getAddress(operator.account.address),
      );

      // eslint-disable-next-line
      // @ts-ignore
      expect(await multiWallet.read.baseToken()).to.equal(
        getAddress(stableCoin.address),
      );
    });
  });

  describe('Only Operator functions', function () {
    it('should throw an error if person other than operator tries to deposit eth', async () => {
      const {multiWallet, user1} = await loadFixture(deployContracts);

      const ethAmount = parseEther('1');

      await expect(
        user1.sendTransaction({
          to: multiWallet.address,
          value: ethAmount,
        }),
      ).to.be.rejectedWith('Only operator can call this function');
    });

    it('should allow operator to deposit eth', async () => {
      const {multiWallet, operator} = await loadFixture(deployContracts);

      const ethAmount = parseEther('1');

      await expect(
        operator.sendTransaction({
          to: multiWallet.address,
          value: ethAmount,
        }),
      ).to.be.fulfilled;
    });

    it('should allow operator to withdraw eth', async () => {
      const {multiWallet, operator, publicClient} =
        await loadFixture(deployContracts);

      const ethAmount = parseEther('1');
      // check balance
      const balanceBefore = await getBalance(publicClient, {
        address: multiWallet.address,
      });
      expect(balanceBefore).to.equal(0);

      // send 1 eth
      await operator.sendTransaction({
        to: multiWallet.address,
        value: ethAmount,
      });

      // check balance
      const balanceAfter = await getBalance(publicClient, {
        address: multiWallet.address,
      });
      expect(balanceAfter).to.equal(ethAmount);

      // withdraw 1 eth
      const multiWalletContract = getContract({
        address: multiWallet.address,
        abi: multiWallet.abi,
        client: operator,
      });

      // eslint-disable-next-line
      // @ts-ignore
      await expect(multiWalletContract.write.withdrawEthBalance(ethAmount)).to
        .be.fulfilled;
      const balanceAfterWithdraw = await getBalance(publicClient, {
        address: multiWallet.address,
      });
      expect(balanceAfterWithdraw).to.equal(0);
    });

    it('should throw an error if someone other than operator tries to withdraw eth', async () => {
      const {multiWallet, operator, publicClient, user1} =
        await loadFixture(deployContracts);

      const ethAmount = parseEther('1');
      // check balance
      const balanceBefore = await getBalance(publicClient, {
        address: multiWallet.address,
      });
      expect(balanceBefore).to.equal(0);

      // send 1 eth
      await operator.sendTransaction({
        to: multiWallet.address,
        value: ethAmount,
      });

      // check balance
      const balanceAfter = await getBalance(publicClient, {
        address: multiWallet.address,
      });
      expect(balanceAfter).to.equal(ethAmount);

      // withdraw 1 eth
      const multiWalletContract = getContract({
        address: multiWallet.address,
        abi: multiWallet.abi,
        client: user1,
      });

      await expect(
        // eslint-disable-next-line
        // @ts-ignore
        multiWalletContract.write.withdrawEthBalance(ethAmount),
      ).to.be.rejectedWith('Only operator can call this function');
      const balanceAfterWithdraw = await getBalance(publicClient, {
        address: multiWallet.address,
      });
      expect(balanceAfterWithdraw).to.equal(parseEther('1'));
    });
  });

  describe.only('User functions', function () {
    // deposit base token
    it('should allow user to deposit base token', async () => {
      const {multiWallet, stableCoin, user1} =
        await loadFixture(deployContracts);

      const multiWalletContract = getContract({
        address: multiWallet.address,
        abi: multiWallet.abi,
        client: user1,
      });

      const stableCoinContract = getContract({
        address: stableCoin.address,
        abi: stableCoin.abi,
        client: user1,
      });

      await expect(
        // eslint-disable-next-line
        // @ts-ignore
        stableCoinContract.write.approve([
          multiWallet.address,
          parseEther('5'),
        ]),
      ).to.be.fulfilled;
      // eslint-disable-next-line
      // @ts-ignore
      await expect(multiWalletContract.write.deposit([parseEther('5')])).to.be
        .fulfilled;

      // check balance of base token
      // eslint-disable-next-line
      // @ts-ignore
      const balance = await stableCoinContract.read.balanceOf([
        multiWalletContract.address,
      ]);
      expect(balance).to.equal(parseEther('5'));

      // eslint-disable-next-line
      // @ts-ignore
      const getStorageBalance = await multiWalletContract.read.checkBalance([
        user1.account.address,
        stableCoin.address,
      ]);
      expect(getStorageBalance).to.equal(parseEther('5'));
    });
    // unlock base token
    // lock base token
    // withdraw base token
  });
});
