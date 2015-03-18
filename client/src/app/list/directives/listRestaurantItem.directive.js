(function() {
  'use strict';

  /* ---------------------------------------------------------------------------
   * Define Directives for app.list module.
   * -------------------------------------------------------------------------*/
  angular
    .module('app.list')
    .directive('restaurantItem', restaurantItem);


  /* ---------------------------------------------------------------------------
   * Directive functions
   * -------------------------------------------------------------------------*/

  /**
   * Sets up restaurantItem directive.
   *
   * @returns {{templateUrl: string, restrict: string, scope: {restaurant: string}}}
   */
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