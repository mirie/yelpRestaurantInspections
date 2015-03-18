(function() {
  'use strict';

  angular
    .module('app.list')
    .controller('List', TopWorstList);

  /* @ngInject */
  function TopWorstList(SocrataListResultService)  {
    var self = this;

    self.loading = false;
    self.topRestaurants = [];
    self.worstRestaurants = [];

    var filter = function() {
      self.loading = !self.loading;

      var results = [];

      if (self.filterForm.zip != undefined) {
        // TODO and if zip is a integer or a specific length

        var onCompletionTopRestaurants = function(isValid, results) {
          self.topRestaurants = results;
        }

        var onCompletionWorstRestaurants = function(isValid, results) {
          self.worstRestaurants = results;
          self.loading = !self.loading;
        }

        SocrataListResultService.getList(self.filterForm.zip, true, onCompletionTopRestaurants);
        SocrataListResultService.getList(self.filterForm.zip, false, onCompletionWorstRestaurants);
      }
    };

    self.filter = filter;
  }
})();