import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import {getAddress, parseGwei} from "viem";
//import {
//   createPublicClient,
//   createWalletClient,
//   formatEther,
//   formatUnits,
//   getContract,
//   http,
//   parseAbi,
//   parseEther,
//   parseUnits,
//   getAddress,
//   parseGwei
// } from 'viem';


async function deployContracts () {
  const [deployer, operator, user1] = await hre.viem.getWalletClients();

  const publicClient = await hre.viem.getPublicClient();

  const deployStableCoin = async () => {
    const stableCoin = await hre.viem.deployContract("StableCoin", [
      parseGwei('1000000'),
    ], {});

    return stableCoin;
  }

  const deployMultiWallet = async (stableCoinAddress: string) => {
    // eslint-disable-next-line
    // @ts-ignore
    const multiWallet = await hre.viem.deployContract("MultiWalletAccount", [
      operator.account.address,
      stableCoinAddress,
    ], {});
    return multiWallet;
  }

  const stableCoin = await deployStableCoin();
  const multiWallet = await deployMultiWallet(stableCoin.address);

  return {
    deployer,
    operator,
    user1,
    stableCoin,
    multiWallet,
    publicClient,
  }}



describe('MultiWalletAccount', function () {
  describe('Deployment', () => {
    it('should require one operator and a base token to deploy', async () => {
      const { stableCoin, multiWallet } = await loadFixture(deployContracts);

      // eslint-disable-next-line
      expect(stableCoin).to.be.ok;
      // eslint-disable-next-line
      expect(multiWallet).to.be.ok;
    });

    it('should have the correct operator && stable coin address', async () => {
      const { operator, multiWallet, stableCoin } = await loadFixture(deployContracts);

      // eslint-disable-next-line
      // @ts-ignore
      expect(await multiWallet.read.operator()).to.equal(
        getAddress(operator.account.address)
      );

      // eslint-disable-next-line
      // @ts-ignore
      expect(await multiWallet.read.baseToken()).to.equal(getAddress(stableCoin.address));
    });
  });


  // describe('Only Operator functions', function () => {
  //
  // })


})
