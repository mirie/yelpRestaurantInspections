(function() {
  'use strict';

  /* ---------------------------------------------------------------------------
   * Define Controllers for app.list module.
   * -------------------------------------------------------------------------*/
  angular
    .module('app.list')
    .controller('List', TopWorstList);

  /* ---------------------------------------------------------------------------
   * Controller functions
   * -------------------------------------------------------------------------*/

  /**
   * Sets up List controller.
   *
   * @param SocrataListResultService
   * @constructor
   */
  function TopWorstList(SocrataListResultService)  {
    var self = this;

    // Shows the loading animation when true.
    self.loading = false;

    // Array of restaurant results returned from the processed Socrata search.
    self.topRestaurants = [];
    self.worstRestaurants = [];

    /**
     * Searches Socrata for the max 50 cleanest and dirtiest restaurants in a
     * given zip code.
     */
    var filter = function() {
      // Allow the view to set the loading animation.
      self.loading = !self.loading;

      if (self.filterForm.zip != undefined) {
        // TODO Make sure zip is a integer and 5 digits in length.

        /**
         * Callback function for Service call that gets the lowest scoring
         * restaurants returned from Socrata for the given zip code.
         *
         * @param isValid
         *  True if the data is valid, otherwise False.
         * @param results
         *  Processed search results from the service.
         */
        var onCompletionTopRestaurants = function(isValid, results) {
          // TODO: Handle isValid.
console.log(results);
          self.topRestaurants = results;
        }

        /**
         * Callback function for Service call that gets the highest scoring
         * restaurants returned from Socrata for the given zip code.
         *
         * @param isValid
         *  True if the data is valid, otherwise False.
         * @param results
         *  Processed search results from the service.
         */
        var onCompletionWorstRestaurants = function(isValid, results) {
          // TODO: Handle isValid.
          console.log(results);
          self.worstRestaurants = results;

          // Allow the view to stop the loading animation.
          self.loading = !self.loading;
        }

        SocrataListResultService.getList(self.filterForm.zip, true, onCompletionTopRestaurants);
        SocrataListResultService.getList(self.filterForm.zip, false, onCompletionWorstRestaurants);
      }
    };

    // Set the filter function as a property of the controller.
    self.filter = filter;
  }
})();