(function() {
    'use strict';

    angular.module('data')
        .component('menuItems', {
            templateUrl: 'src/menu/templates/items.template.html',
            bindings: {
                items: '<'
            }
        });

})();
