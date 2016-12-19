(function () {
"use strict";

angular.module('public')
.service('UserSignupService', UserSignupService);

function UserSignupService (){
  var service = this;
  var user;
  service.user = null;

  service.getUser = function (){
    return service.user;
  }

  service.setUser = function(currentUser){
    service.user = currentUser;
  }

}


})();
