// SPDX-License-Identifier: Apache-2.0

/** * @title DAO Token
 * @notice This contract stores token of the DAO
 * @dev
 */
pragma solidity 0.8;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract DAOToken is ERC20, Ownable {
    uint256 public cap;

    /**
     *@notice Create The DAO token
     *@param _name The name of the token
     *@param _symbol The symbol of the token
     *@param _cap The cap of the token, can also without cap (if cap=0)
     */
    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _cap // ???
    ) ERC20(_name, _symbol) {
        cap = _cap;
        // _mint(msg.sender, _initialSupply);
    }

    /**
     * @dev Function to mint tokens
     * @param _to The address that will receive the minted tokens.
     * @param _amount The amount of tokens to mint.
     */
    function mint(address _to, uint256 _amount) public onlyOwner {
        require(cap == 0 || (cap > 0 && (totalSupply() + _amount) <= cap));
        _mint(_to, _amount);
    }
}
