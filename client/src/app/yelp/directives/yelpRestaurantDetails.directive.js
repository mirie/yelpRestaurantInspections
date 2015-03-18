(function() {
  'use strict';

  /* ---------------------------------------------------------------------------
   * Define Directives for app.yelp module.
   * -------------------------------------------------------------------------*/
  angular
    .module('app.yelp')
    .directive('restaurantDetails', restaurantDetails)
    .directive('inspectionDetails', inspectionDetails);

  /* ---------------------------------------------------------------------------
   * Directive functions
   * -------------------------------------------------------------------------*/

  /**
   * Sets up restaurantDetails directive.
   *
   * @returns {{templateUrl: string, restrict: string, scope: {restaurant: string}}}
   */
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

  /**
   * Sets up inspectionDetails directive.
   *
   * @returns {{templateUrl: string, restrict: string, scope: {inspection: string}}}
   */
  function inspectionDetails() {
    var directive = {
      templateUrl: 'app/yelp/partials/_inspectionDetails.html',
      restrict: 'A',
      scope: {
        inspection: "="
      }
    };

    return directive;
  }
})();