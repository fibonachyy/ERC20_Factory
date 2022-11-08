// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./myToken.sol";
contract myFactory is Pausable, Ownable {
  mapping(uint256 => IERC20) private _tokenList;
  uint256 public _tokenCount;

  mapping(address => IERC20[]) private _userTokenList;
  constructor() Pausable() {
  }


  function getTokenByIndex(uint256 tokenId) 
  external view returns(IERC20){
    return _tokenList[tokenId];
  }

  function getUserTokenList(address _user) external view returns(IERC20[] memory _userTokens){
    return _userTokenList[_user];
  }


  function newToken(string calldata _name,string calldata _symbol, uint256 _initialSupply)
  external whenNotPaused returns(uint256 tokenIndex){
    IERC20 deployedToken = new myToken(_name, _symbol, _initialSupply);
    _tokenList[_tokenCount] = deployedToken;
    _userTokenList[_msgSender()].push(deployedToken);
    tokenIndex = _tokenCount;
    _tokenCount += 1;
  }

  function pause() external onlyOwner{
    _pause();
  }
  function unpause() external onlyOwner{
    _unpause();
  }
}
