// SPDX-License-Identifier: Apache-2.0

/**
 * @title Membership interface
 * @notice This contract stores basic modifiers which control the membership
 * @dev
 */
pragma solidity 0.8;

abstract contract Accessible {
    enum membershipStatus {
        nonMember,
        requesting,
        whitelistedByOne,
        whitelistedByTwo,
        isMember
    } // whitelister could also be a member. A delegate should be elected from a member.
    address public delegate;
    uint256 constant MINIMUM_WHITELISTER = 2;
    uint256 public whitelisterListLength = 2; // By default there are (at least) two whitelisters.
    mapping(uint256 => address) internal whitelisterList;
    mapping(address => membershipStatus) internal membershipList;

    modifier delegateOnly() {
        require(msg.sender == delegate);
        _;
    }

    // modifier hasDelegate {
    //     require(delegate != 0x0);
    //     _;
    // }

    modifier memberOnly() {
        require(membershipList[msg.sender] == membershipStatus.isMember);
        _;
    }

    modifier whitelisterOnly() {
        require(isWhitelister(msg.sender) == true);
        _;
    }

    function isWhitelister(address _adr) public view returns (bool) {
        bool check = false;
        for (uint256 i = 0; i < whitelisterListLength; i++) {
            if (whitelisterList[i] == _adr) {
                check = true;
                break;
            }
        }
        return check;
    }

    function checkIsMember(address _adr) external view virtual returns (bool);

    function checkIsDelegate(address _adr) external view virtual returns (bool);

    function checkIsWhitelistedByTwo(address _adr)
        external
        view
        virtual
        returns (bool);

    function reachDesiredValue(uint256 _value)
        external
        pure
        virtual
        returns (bool);

    function hasDelegate() external view virtual returns (bool);

    function getWhitelisterNumber() public view virtual returns (uint256);

    function getTotalMemberNumber() public view virtual returns (uint256);

    function addNewMember(address _newMember) public virtual;

    function testFuncGetWhitelistersLength()
        public
        view
        virtual
        returns (uint256)
    {
        return whitelisterListLength;
    }

    function testFuncGetWhitelister(uint256 _i) public view returns (address) {
        return whitelisterList[_i];
    }

    function setDelegate(address _adr) public virtual;
}
