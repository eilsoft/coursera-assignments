(function() {
    'use strict';

    angular.module('data')
        .component('categories', {
            templateUrl: 'src/menu/templates/categories.template.html',
            bindings: {
                items: '<'
            }
        });

})();
