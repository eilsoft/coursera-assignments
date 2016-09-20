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
}

AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
  var boughtItems = this;
  boughtItems.items = ShoppingListCheckOffService.getBoughtItems();
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
}

})();
