// SPDX-License-Identifier: Apache-2.0

/**
 * @title The contract that manages the creation and voting of the DAA.
 * @notice This contract is used when proposals are stored as structs but not created as individual contract by the factory.
 */
pragma solidity 0.8;

abstract contract DAAInterface {
    function changeActivity(bool _activity) external virtual;
}
