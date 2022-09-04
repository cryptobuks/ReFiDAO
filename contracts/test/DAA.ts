import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Libraries } from "hardhat/types";

interface DaaMock {
  contracts: Record<string, Contract>
  addresses: Record<string, SignerWithAddress>
}

const timelimitGADate = 1209600;
const timeLimitExpelMember = 604800;
const initialHashedStatute = "0x766173696c65696f730000000000000000000000000000000000000000000000";


describe("Daa", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContracts() {

    const [
      initiator,
      delegate,
      whitelister1,
      whitelister2,
    ] = await ethers.getSigners();

    const deployContract = async <K extends Contract>(name: string, args: any[] = [], signer = initiator, libraries?: Libraries): Promise<K> => {
      console.log(`Deploying contract ${name}`)
      const Contract = await ethers.getContractFactory(name, {
        signer,
        libraries
      });
      const c = (await Contract.deploy(...args)) as unknown as K
      await c.deployed()
      console.log(`Deployed contract ${name} with address=${c.address}`)
      return c
    }

    const Membership = await deployContract('Membership', [
      await delegate.getAddress(),
      await whitelister1.getAddress(),
      await whitelister2.getAddress(),
    ]);
    const TallyClerkLib = await deployContract('TallyClerkLib');
    const libs = { TallyClerkLib: TallyClerkLib.address }

    const ProposalManager = await deployContract('ProposalManager', [
      Membership.address, timelimitGADate, timeLimitExpelMember
    ], initiator, libs);
    const GAManager = await deployContract('GAManager', [
      Membership.address, ProposalManager.address, initialHashedStatute,
    ], initiator, libs);
    // const Accessible = await deployContract('Accessible');
    const Wallet = await deployContract('Wallet');
    const ExternalWallet = await deployContract('ExternalWallet', [
      ProposalManager.address
    ]);
    const Treasury = await deployContract('Treasury', [
      Wallet.address,
      ExternalWallet.address,
      Membership.address,
      ProposalManager.address,
    ]);
    const DAA = await deployContract('DAA', [
      Membership.address,
      ProposalManager.address,
      GAManager.address,
      Treasury.address,
      Wallet.address,
      ExternalWallet.address,
    ]);

    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const ONE_GWEI = 1_000_000_000;

    const lockedAmount = ONE_GWEI;
    const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

    await Membership.connect(initiator).transferOwnership(DAA.address)
    await ProposalManager.connect(initiator).transferOwnership(DAA.address)
    await GAManager.connect(initiator).transferOwnership(DAA.address)
    await Treasury.connect(initiator).transferOwnership(DAA.address)

    await DAA.connect(initiator).finishDeployment()

    // Contracts are deployed using the first signer/account by default
    return {
      addresses: {
        initiator,
        delegate,
        whitelister1,
        whitelister2,
      },
      contracts: {
        Membership,
        TallyClerkLib,
        ProposalManager,
        GAManager,
        // Accessible,
        Wallet,
        ExternalWallet,
        Treasury,
        DAA
      }
    };
  }

  describe("Deployment", function () {
    it("Should load contracts", async function () {
      const { addresses, contracts } = await loadFixture(deployContracts);

      // expect(await lock.unlockTime()).to.equal(unlockTime);
    });
  });

});
