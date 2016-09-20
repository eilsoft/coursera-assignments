(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController(ShoppingListCheckOffService) {
  var itemBuyer = this;
  itemBuyer.items = ShoppingListCheckOffService.getItemsToBuy();
  itemBuyer.buyItem = function (item, itemIndex) {
    ShoppingListCheckOffService.buyItem(item, itemIndex);
  };
  itemBuyer.noItemsMessage = function (){
    return ShoppingListCheckOffService.allBoughtMessage();
  }
}

AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
  var boughtItems = this;
  boughtItems.items = ShoppingListCheckOffService.getBoughtItems();
  boughtItems.noItemsMessage = function(){
    return ShoppingListCheckOffService.nothingBoughtMessage();
  }
}

function ShoppingListCheckOffService() {
  var service = this;

  // List of items to buy
  var itemsToBuy =  [
    {
      name: "Milk",
      quantity: "1"
    },
    {
      name: "Onions",
      quantity: "4"
    },
    {
      name: "Donuts",
      quantity: "200"
    },
    {
      name: "Cookies",
      quantity: "300"
    },
    {
      name: "Butter",
      quantity: "1"
    },
    {
      name: "Chocolates",
      quantity: "5"
    }
  ];
  var boughtItems = [];

  service.buyItem = function (item, itemIndex) {
    itemsToBuy.splice(itemIndex, 1);
    boughtItems.push(item);
  };

  service.getItemsToBuy = function () {
    return itemsToBuy;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };

  service.allBoughtMessage  = function () {
    return itemsToBuy.length == 0 ? "Everything is bought!" : null;
  };

  service.nothingBoughtMessage  = function () {
    return boughtItems.length == 0 ? "Nothing bought yet." : null;
  };
}

})();
