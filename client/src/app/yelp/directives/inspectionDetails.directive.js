(function() {
  'use strict';

  angular
    .module('app.yelp')
    .directive('inspectionDetails', inspectionDetails);

  /* @ngInspect */
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