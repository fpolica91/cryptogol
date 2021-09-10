pragma solidity ^0.8.3;
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private tokenIds;
    // marketplace must be deployed before this contract
    address marketplaceAdress;

    constructor(address _marketplaceaddress)
        ERC721("Choe's Marketplace", "CHLO")
    {
        marketplaceAdress = _marketplaceaddress;
    }

    function createToken(string memory tokenURI) public returns (uint256) {
        tokenIds.increment();
        uint256 newItemId = tokenIds.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        setApprovalForAll(marketplaceAdress, true);
        return newItemId;
    }
}

contract NFTMarket is ReentrancyGuard {
    // ReentrancyGuard helps prevent recursive attacks during contract execution
    using Counters for Counters.Counter;
    Counters.Counter private _itemsIds;
    Counters.Counter private _itemsSold;
    address payable owner;
    uint256 listingPrice = 0.01 ether;

    constructor() {
        owner = payable(msg.sender);
    }

    struct MarketItem {
        uint256 itemId;
        address nftContractAddress;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
    }

    mapping(uint256 => MarketItem) private ImarketItem;

    event MarketItemCreate(
        uint256 indexed itemId,
        address indexed nftContractAddress,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price
    );

    function createMarketItem(
        address nftContractAddress,
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant {
        require(price > 0, "price must be greater than 0");
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );
        _itemsIds.increment();
        uint256 itemID = _itemsIds.current();
        ImarketItem[itemID] = MarketItem(
            itemID,
            nftContractAddress,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            price
        );

        IERC721(nftContractAddress).transferFrom(
            msg.sender,
            address(this),
            tokenId
        );
    }

    function createMakertSale(address nftContractAddress, uint256 itemID)
        public
        payable
        nonReentrant
    {
        uint256 price = ImarketItem[itemID].price;
        uint256 tokenId = ImarketItem[itemID].tokenId;

        require(
            msg.value == price,
            "Please submit asking price to complete the purchase"
        );
        // send the bread from person buying to owner.
        ImarketItem[itemID].seller.transfer(msg.value);

        // transfer from market to person paying
        IERC721(nftContractAddress).transferFrom(
            address(this),
            msg.sender,
            tokenId
        );

        ImarketItem[itemID].owner = payable(msg.sender);
        _itemsSold.increment;
        // transfer listing free to owner;
        payable(owner).transfer(listingPrice);
    }

    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint256 itemCount = _itemsIds.current();
        uint256 unsoldItemCount = _itemsIds.current() - _itemsSold.current();
        uint256 currentIndex = 0;
        // lists need to have size specified.
        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            // address 0 is empty address item listed but not bought
            if (ImarketItem[i + 1].owner == address(0)) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = ImarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }
        return items;
    }
}
