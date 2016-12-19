(function () {
"use strict";

angular.module('public')
.directive('menuItemValid', function() {
  return {
    require: 'ngModel',
    controller: ItemValidationController,
    controllerAs: 'itemValidator',
    link: function(scope, element, attr, ctrl) {
      function itemExistsValidation(value) {
        if (value.trim().length === 0 ) {
          ctrl.$setValidity('menuItemExists', true);
        } else {
          scope.itemValidator.menuItemExists(value)
          .then(function (response) {
             if (response !== null){
               ctrl.$setValidity('menuItemExists', true);
             } else {
               ctrl.$setValidity('menuItemExists', false);
             }
          }, function (error) {
            ctrl.$setValidity('menuItemExists', false);
          });
        }
        return value;
      }
      ctrl.$parsers.push(itemExistsValidation);
    }
  };
})

ItemValidationController.$inject = ['MenuService'];
function ItemValidationController(MenuService){
  var itemValidator = this;

  itemValidator.menuItemExists = function(shortName){
    return  MenuService.getMenuItemByShortName(shortName);
  }

}

})();
