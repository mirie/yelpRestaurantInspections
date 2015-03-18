(function() {
  'use strict';

  angular
    .module('app.list')
    .directive('restaurantItem', restaurantItem);

  /* @ngInspect */
  function restaurantItem() {
    var directive = {
      templateUrl: 'app/list/partials/_restaurantItem.html',
      restrict: 'A',
      scope: {
        restaurant: "="
      }
    };

    return directive;
  }
})();