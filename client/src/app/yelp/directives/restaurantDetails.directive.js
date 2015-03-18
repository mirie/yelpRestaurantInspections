(function() {
  'use strict';

  angular
    .module('app.yelp')
    .directive('restaurantDetails', restaurantDetails);

  /* @ngInspect */
  function restaurantDetails() {
    var directive = {
      templateUrl: 'app/yelp/partials/_restaurantDetails.html',
      restrict: 'A',
      scope: {
        restaurant: "="
      }
    };

    return directive;
  }
})();