import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

interface DaaMock {
  contracts: Record<string, Contract>
  addresses: Record<string, SignerWithAddress>
}

describe("Daa", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    
    const [
      initiator,
      delegate,
      whitelister1,
      whitelister2,
    ] = await ethers.getSigners();

    const getContract = async <K=Contract>(name:string, ...args: any[]) : Promise<K> => {
      const Contract = await ethers.getContractFactory(name);
      return (await Contract.deploy(...args)) as unknown as K
    }

    const Membership = await getContract('Membership');
    const TallyClerkLib = await getContract('TallyClerkLib');
    const ProposalManager = await getContract('ProposalManager');
    const GAManager = await getContract('GAManager');
    const Accessible = await getContract('Accessible');
    const Wallet = await getContract('Wallet');
    const ExternalWallet = await getContract('ExternalWallet');
    const Treasury = await getContract('Treasury');
    const DAA = await getContract('DAA');

    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const ONE_GWEI = 1_000_000_000;

    const lockedAmount = ONE_GWEI;
    const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

    // Contracts are deployed using the first signer/account by default

    const Lock = await ethers.getContractFactory("Lock");
    const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

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
        Accessible,
        Wallet,
        ExternalWallet,
        Treasury,
        DAA
      } 
    };
  }

  describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {
      const { addresses, contracts } = await loadFixture(deployOneYearLockFixture);

      // expect(await lock.unlockTime()).to.equal(unlockTime);
    });
  });
  
});
