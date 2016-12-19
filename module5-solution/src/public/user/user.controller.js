(function () {
"use strict";

angular.module('public')
.controller('UserController', UserController);

UserController.$inject = ['UserSignupService', 'MenuService','ApiPath'];
function UserController(UserSignupService, MenuService, ApiPath) {
  var $ctrl = this;
  $ctrl.UserSignupService = UserSignupService;
  $ctrl.ApiPath = ApiPath;
  var userSigned = false;
  var infoSaved = false;
  var user = {};
  var favoriteInfo;

  $ctrl.signUser = function(){
    $ctrl.infoSaved = false;
    UserSignupService.setUser($ctrl.user);
    $ctrl.fetchFavoriteInfo($ctrl.user.favorite);
    $ctrl.userSigned = true;
    $ctrl.infoSaved = true;
  }

  $ctrl.fetchFavoriteInfo = function (fav){
    MenuService.getMenuItemByShortName(fav)
    .then(function (response) {
       if (response !== null){
         $ctrl.favoriteInfo = response;
       }
    });
  }

  $ctrl.$onInit = function () {
     $ctrl.user = UserSignupService.getUser();
     if ($ctrl.user !== null){
       if ($ctrl.user.favorite && $ctrl.user.favorite.trim().length > 0){
         $ctrl.fetchFavoriteInfo($ctrl.user.favorite);
       }
       $ctrl.userSigned = true;
     } else {
       $ctrl.user = {
         firstName: "",
         lastName: "",
         email: "",
         phone: "",
         favorite: "",
       };
     }
  };

}

})();
