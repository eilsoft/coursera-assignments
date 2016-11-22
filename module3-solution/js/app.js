(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
        .directive('foundItems', FoundItemsDirective);

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                found: '<',
                removeItem: '&onRemove'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };
        return ddo;
    }

    function FoundItemsDirectiveController() {
        var list = this;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var narrowDown = this;
        narrowDown.searchTerm = "";

        narrowDown.getMatchedMenuItems = function() {
            if (narrowDown.searchTerm.trim().length === 0) {
                narrowDown.found = [];
            } else {
                var itemsPromise = MenuSearchService.getMatchedMenuItems(narrowDown.searchTerm);
                itemsPromise.then(function(response) {
                    narrowDown.found = response;
                }).catch(function(error) {
                    console.log("error: " + error);
                });
            }
        }

        narrowDown.removeItem = function (itemIndex) {
          narrowDown.found.splice(itemIndex, 1);
        };
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath']
    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function(searchTerm) {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            }).then(function(result) {
                // process result and only keep items that match
                var foundItems = [];
                var allItems = result.data.menu_items;
                for (var i = 0; i < allItems.length; i++) {
                    var description = allItems[i].description;
                    if (description !== null && description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
                        foundItems.push(allItems[i]);
                    }
                }
                return foundItems;
            });
        };
    }

})();
