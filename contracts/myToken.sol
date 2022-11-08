// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract myToken is ERC20, Ownable, ERC20Burnable{
    constructor(string memory name_, string memory symbol_, uint256 initialSupply_) ERC20(name_ , symbol_){
        _transferOwnership(tx.origin);
        _mint(owner() , initialSupply_);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}