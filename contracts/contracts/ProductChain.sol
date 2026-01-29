// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ProductChain is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    struct TransferRecord {
        address from;
        address to;
        uint256 timestamp;
        string location; // Optional: can be geo-coordinates or facility name
    }

    struct Product {
        uint256 id;
        string name;
        string manufacturer;
        uint256 manufactureDate;
        TransferRecord[] history;
    }

    mapping(uint256 => Product) public products;

    event ProductCreated(uint256 indexed tokenId, string name, address indexed manufacturer);
    event ProductTransferred(uint256 indexed tokenId, address indexed from, address indexed to, string location);

    constructor() ERC721("ProductChain", "PROD") Ownable(msg.sender) {}

    function createProduct(
        string memory name, 
        string memory manufacturer, 
        string memory tokenURI
    ) public returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);

        Product storage newProduct = products[tokenId];
        newProduct.id = tokenId;
        newProduct.name = name;
        newProduct.manufacturer = manufacturer;
        newProduct.manufactureDate = block.timestamp;
        
        // Initial history record
        newProduct.history.push(TransferRecord({
            from: address(0),
            to: msg.sender,
            timestamp: block.timestamp,
            location: "Manufacturing Facility"
        }));

        emit ProductCreated(tokenId, name, msg.sender);
        return tokenId;
    }

    function transferProduct(address to, uint256 tokenId, string memory location) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        
        _transfer(msg.sender, to, tokenId);

        products[tokenId].history.push(TransferRecord({
            from: msg.sender,
            to: to,
            timestamp: block.timestamp,
            location: location
        }));

        emit ProductTransferred(tokenId, msg.sender, to, location);
    }

    function getProductHistory(uint256 tokenId) public view returns (TransferRecord[] memory) {
        return products[tokenId].history;
    }

    function getProduct(uint256 tokenId) public view returns (
        string memory name,
        string memory manufacturer,
        uint256 manufactureDate,
        address currentOwner
    ) {
        Product storage p = products[tokenId];
        return (p.name, p.manufacturer, p.manufactureDate, ownerOf(tokenId));
    }
}
