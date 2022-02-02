pragma solidity ^0.5.7;

import '../core/Ownable.sol';
import '../accessControl/ConsumerRole.sol';
import '../accessControl/DistributorRole.sol';
import '../accessControl/ProducerRole.sol';
import '../accessControl/RetailerRole.sol';


contract SupplyChain is Ownable, ConsumerRole, DistributorRole, ProducerRole, RetailerRole {

  address payable owner;

  uint  upc;

  mapping (uint => Item) items;

  // Define enum 'State' with the following values:
  enum State {
    FishedOut, // 0
    Processed, // 1
    Packed, // 2
    Delivered, // 3
    Received, // 4
    Shipped, // 5
    Purchased, // 6
    Sold, // 7
    Bought //8
  }

  State constant defaultState = State.FishedOut;

  struct Item {
    uint upc;
    string fishName; 
    string originLatitude; 
    string originLongitude;  
    uint fishPrice; 
    State itemState; 
    address ownerID;
    address producerID;  
    address distributorID;  
    address retailerID; 
    address payable consumerID; 
  }

  event FishedOut(uint upc);
  event Processed(uint upc);
  event Packed(uint upc);
  event Delivered(uint upc);
  event Reveived(uint upc);
  event Shipped(uint upc);
  event Received(uint upc);
  event Purchased(uint upc);
  event Sold(uint upc);
  event Bought(uint upc);

  modifier verifyCaller (address _address) {
    require(msg.sender == _address, "Could not verify the caller.");
    _;
  }

  modifier paidEnough(uint _price) {
    require(msg.value >= _price, "The amount paid is not sufficient to cover the price.");
    _;
  }

  // Define a modifier that checks the price and refunds the remaining balance
  modifier checkValue(uint _upc) {
    _;
    uint _price = items[_upc].fishPrice;
    uint amountToReturn = msg.value - _price;
    items[_upc].consumerID.transfer(amountToReturn);
  }

  modifier fishedOut(uint _upc) {
    require(items[_upc].itemState == State.FishedOut, "Fish is not in 'Fished Out' state");
    _;
  }

  modifier processed(uint _upc) {
    require(items[_upc].itemState == State.Processed, "Fish is not in 'Processed' state");
    _;
  }

  modifier packed(uint _upc) {
    require(items[_upc].itemState == State.Packed, "Fish is not in 'Packed' state");
    _;
  }

  modifier delivered(uint _upc) {
    require(items[_upc].itemState == State.Delivered, "Fish is not in 'Delivered' state");
    _;
  }

  modifier received(uint _upc) {
    require(items[_upc].itemState == State.Received, "Fish is not in 'Received' state");
    _;
  }

  modifier shipped(uint _upc) {
    require(items[_upc].itemState == State.Shipped, "Fish is not in 'Shipped' state");
    _;
  }

  modifier purchased(uint _upc) {
    require(items[_upc].itemState == State.Purchased, "Fish is not in 'Purchased' state");
    _;
  }

  modifier sold(uint _upc) {
    require(items[_upc].itemState == State.Sold, "Fish is not in 'Sold' state");
    _;
  }

    modifier bought(uint _upc) {
    require(items[_upc].itemState == State.Bought, "Fish is not in 'Bought' state");
    _;
  }

  constructor() public payable {
    owner = msg.sender;
    upc = 1;
  }

  function kill() public {
    if (msg.sender == owner) {
      selfdestruct(owner);
    }
  }

  function fishOut (
    uint _upc,
    address _producerID,
    string memory _fishName,
    string memory _originLatitude,
    string memory _originLongitude)
    public
    onlyProducer
  {
     
      items[_upc].upc = _upc;
      items[_upc].ownerID = _producerID;
      items[_upc].fishName = _fishName;
      items[_upc].producerID = _producerID;
      items[_upc].originLatitude = _originLatitude;
      items[_upc].originLongitude = _originLongitude;
      items[_upc].itemState = State.FishedOut;
      
      emit FishedOut(_upc);
  }

  function processFish(uint _upc) public
    fishedOut(_upc)
    verifyCaller(items[_upc].ownerID)
    onlyProducer
  {
    items[_upc].itemState = State.Processed;
    emit Processed(_upc);
  }

  function packFish(uint _upc) public
    processed(_upc)
    verifyCaller(items[_upc].ownerID)
    onlyProducer
  {
    items[_upc].itemState = State.Packed;
    emit Packed(_upc);
  }

  function deliverFish(uint _upc, uint _price) public
    packed(_upc)
    verifyCaller(items[_upc].ownerID)
    onlyProducer
  {
    items[_upc].fishPrice = _price;
    items[_upc].itemState = State.Delivered;
    emit Delivered(_upc);
  }

  function receiveFish(uint _upc) public payable
    delivered(_upc)
    paidEnough(items[_upc].fishPrice)
    checkValue(_upc)
    onlyDistributor
  {
    items[_upc].ownerID = msg.sender;
    items[_upc].distributorID = msg.sender;
    items[_upc].itemState = State.Received;
    // doubt
    msg.sender.transfer(items[_upc].fishPrice);
    emit Received(_upc);
  }

  function shipFish(uint _upc) public
    received(_upc)
    verifyCaller(items[_upc].ownerID)
    onlyDistributor
  {
    items[_upc].itemState = State.Shipped;
    emit Shipped(_upc);
  }

  function purchaseFish(uint _upc) public
    shipped(_upc)
    onlyRetailer
  {
    items[_upc].ownerID = msg.sender;
    items[_upc].retailerID = msg.sender;
    items[_upc].itemState = State.Purchased;
    emit Purchased(_upc);
  }

  function sellFish(uint _upc) public
    purchased(_upc)
    onlyRetailer
    {
    items[_upc].itemState = State.Sold;
    emit Sold(_upc);
  }

    function buyFish(uint _upc) public
    sold(_upc)
    onlyConsumer
    {
    items[_upc].ownerID = msg.sender;
    items[_upc].consumerID = msg.sender;
    items[_upc].itemState = State.Bought;
    emit Bought(_upc);
  }

  function trackFish(uint _upc) public view returns (
    uint fishUPC,
    address ownerID,
    address producerID,
    address distributorID,
    address retailerID,
    address consumerID,
    string memory fishName,
    string memory originLatitude,
    string memory originLongitude
  )
  {

    fishUPC = items[_upc].upc;
    ownerID = items[_upc].ownerID;
    producerID = items[_upc].producerID;
    distributorID = items[_upc].distributorID;
    retailerID = items[_upc].retailerID;
    consumerID = items[_upc].consumerID;
    fishName = items[_upc].fishName;
    originLatitude = items[_upc].originLatitude;
    originLongitude = items[_upc].originLongitude;
  }

}
