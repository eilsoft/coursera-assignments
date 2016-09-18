(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.dishes = "";
  $scope.feedbackMsg = "";
  $scope.statusColor = "";

  $scope.checkLunch = function () {
    var msg, color;
    var noOfDishes = getNumberOfDishes($scope.dishes);
    if (noOfDishes == 0){
      msg = "Please enter data first"
      color = "error"
    } else {
      color = "success"
      if (noOfDishes <= 3){
        msg = "Enjoy!";
      } else {
          msg = "Too much!!";
      }
    }
    $scope.feedbackMsg = msg;
    $scope.statusColor = color;
   };
}
})();

function getNumberOfDishes(dishes){
  var noOfDishes = 0;
  var dishesArr = dishes.split(",");
    if (dishes != ""){
        for (index in dishesArr){
          if (dishesArr[index].trim() != "") {
            noOfDishes++;
          }
        }
    }    
    return noOfDishes;
}
