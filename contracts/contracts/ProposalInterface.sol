// SPDX-License-Identifier: Apache-2.0

/**
 * @title The interface to check basic proposals
 * @notice This contract is used when proposals are stored as structs but not created as individual contract by the factory.
 */
pragma solidity 0.8;

import "./Accessible.sol";
import "./TimedLib.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract ProposalInterface is Ownable {
    function isProposalVotable(bytes32 _proposalID)
        external
        view
        virtual
        returns (bool);

    function isProposalConcludable(bytes32 _proposalID)
        external
        view
        virtual
        returns (bool);

    function isProposalConcluded(bytes32 _proposalID)
        external
        view
        virtual
        returns (bool);

    function isProposalNotEndYet(bytes32 _proposalID)
        external
        view
        virtual
        returns (bool);

    function getProposalType(bytes32 _proposalID)
        external
        view
        virtual
        returns (bool);

    function getProposalFinalResult(bytes32 _proposalID)
        external
        view
        virtual
        returns (bool);

    function canExternalParticipate(bytes32 _proposalID)
        public
        view
        virtual
        returns (bool);

    function getProposaldestinationAddress(bytes32 _proposalID)
        public
        view
        virtual
        returns (address);

    function getProposalStatute(bytes32 _proposalID)
        public
        view
        virtual
        returns (bytes32);

    function getProposalAllowance(bytes32 _proposalID)
        external
        view
        virtual
        returns (uint256);

    function getProposalProposedDate(bytes32 _proposalID)
        external
        view
        virtual
        returns (uint256);

    function getProposalProposedAdr(bytes32 _proposalID)
        external
        view
        virtual
        returns (address);

    function getProposalProposedWalletAddress(bytes32 _proposalID)
        external
        view
        virtual
        returns (address payable, address payable);

    function checkActionIsUpdateWallet(bytes32 _proposalID)
        public
        view
        virtual
        returns (bool);

    function checkActionIsDissolution(bytes32 _proposalID)
        public
        view
        virtual
        returns (bool);

    function checkActionIsStatute(bytes32 _proposalID)
        public
        view
        virtual
        returns (bool);

    function checkActionIsSuccessfulGA(bytes32 _proposalID)
        public
        view
        virtual
        returns (bool);

    function checkActionIsExpel(bytes32 _proposalID)
        public
        view
        virtual
        returns (bool);

    function updateMembershipContractAddress(address _newAccessible)
        public
        virtual;

    function updateGAContractAddress(address _newGA) public virtual;

    // function updateContractAddress(address _newAccessible, address _newGA) public;

    function linkContract(address _gaManager, address _daa) public virtual;
}
