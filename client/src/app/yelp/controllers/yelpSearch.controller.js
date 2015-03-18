(function() {
  'use strict';

  angular
    .module('app.yelp')
    .controller('Yelp', YelpResults);

  /* @ngInject */
  /**
   *
   * @param $scope
   * @param YelpSearchResultService
   * @constructor
   */
  function YelpResults($scope, YelpSearchResultService)  {
    var self = this;

    self.loading = false;
    self.restaurants = [];

    var search = function() {
      self.loading = !self.loading;
      var yelpRestaurants = [];

      if (self.searchForm.terms != undefined || self.searchForm.location != undefined) {
        var terms = self.searchForm.terms + ' restaurant';

        var onCompletion = function(isValid, results) {
          self.restaurants = results;
          self.loading = !self.loading;
        }

        YelpSearchResultService.getResults(terms, self.searchForm.location, onCompletion);
      }
    }

    self.search = search;
  }
})();