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



  //   async function deployOneYearLockFixture() {
  //   const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  //
  //   const lockedAmount = parseGwei("1");
  //   const unlockTime = BigInt((await time.latest()) + ONE_YEAR_IN_SECS);
  //
  //   // Contracts are deployed using the first signer/account by default
  //   const [owner, otherAccount] = await hre.viem.getWalletClients();
  //
  //   const lock = await hre.viem.deployContract("Lock", [unlockTime], {
  //     value: lockedAmount,
  //   });
  //
  //   const publicClient = await hre.viem.getPublicClient();
  //
  //   return {
  //     lock,
  //     unlockTime,
  //     lockedAmount,
  //     owner,
  //     otherAccount,
  //     publicClient,
  //   };
  // }
  //
  // describe("Deployment", function () {
  //   it("Should set the right unlockTime", async function () {
  //     const {lock, unlockTime} = await loadFixture(deployOneYearLockFixture);
  //
  //     expect(await lock.read.unlockTime()).to.equal(unlockTime);
  //   });
  // });

})
