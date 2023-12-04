// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LockableNFT is ERC721, Ownable {
    uint256 public price;
    string public imageLink;

    uint256 public lockStartTime;
    uint256 public lockEndTime;

    // Fix: No arguments passed to the base constructor. Specify the arguments or mark "TimelyLockableNFT" as abstract
    constructor(
        string memory _name, 
        string memory _symbol, 
        string memory _imageLink, 
        uint256 _price, 
        address _owner
    ) ERC721(_name, _symbol) Ownable(_owner) {
        imageLink = _imageLink;
        price = _price;
        _mint(_owner, 1);
    }
    function lock(uint256 duration) public onlyOwner returns (uint256) {
        lockStartTime = block.timestamp;
        lockEndTime = block.timestamp + duration;
        return lockEndTime;
    }

    function unlock() public onlyOwner {
        lockStartTime = 0;
        lockEndTime = 0;
    }

    function isLocked() public view returns (bool) {
        if (lockStartTime == 0 || lockEndTime == 0) {
            return false;
        }
        return block.timestamp >= lockStartTime && block.timestamp <= lockEndTime;
    }

    function setPrice(uint256 _price) public onlyOwner {
        require(!isLocked(), "NFT is locked");
        price = _price;
    }

    function buy() public payable {
        require(msg.value >= price, "Incorrect price");
        require(!isLocked(), "NFT is locked");
        require(ownerOf(1) != msg.sender, "Owner cannot buy their own NFT");

        address owner = ownerOf(1);
        _transfer(owner, msg.sender, 1);
        payable(owner).transfer(msg.value);

        _transferOwnership(msg.sender);
    }

    function setImageLink(string memory _imageLink) public onlyOwner {
        imageLink = _imageLink;
    }

    function blockTimestamp() public view returns (uint256) {
        return block.timestamp;
    }
}
