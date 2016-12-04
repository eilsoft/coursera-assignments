(function() {
    'use strict';

    angular.module('data')
        .controller('CategoriesController', CategoriesController);


    CategoriesController.$inject = ['items'];
    function CategoriesController(items) {
        var list = this;
        list.items = items;
    }

})();
