(function() {
  'use strict';

  /* ---------------------------------------------------------------------------
   * Define Controllers for app.yelp module.
   * -------------------------------------------------------------------------*/
  angular
    .module('app.yelp')
    .controller('Yelp', YelpResults);

  /* ---------------------------------------------------------------------------
   * Controller functions
   * -------------------------------------------------------------------------*/

  /**
   * Sets up Yelp controller.
   *
   * @param YelpSearchResultService
   * @constructor
   */
  function YelpResults(YelpSearchResultService)  {
    var self = this;

    // Shows the loading animation when true.
    self.loading = false;

    // Array of restaurant results returned from the processed Yelp search.
    self.restaurants = [];

    /**
     * Searches Yelp for matching restaurants for the term(s) and location.
     *
     * Sets the restaurants array with the processed Yelp search results.
     * Results have the most recent 10 food inspection results attached to each
     * restaurant if inspection data is available.
     */
    var search = function() {
      // Allow the view to set the loading animation.
      self.loading = !self.loading;

      if (self.searchForm.terms != undefined || self.searchForm.location != undefined) {
        // TODO: Make sure the search terms consist of letters.

        // Make sure we are limiting search to restaurants.
        var terms = self.searchForm.terms + ' restaurant';

        /**
         * Callback function for Service call that gets the processed Yelp
         * search results.
         *
         * @param isValid
         *  True if the data is valid, otherwise False.
         * @param results
         *  Processed search results from the service.
         */
        var onCompletion = function(isValid, results) {
          // TODO: Handle isValid.

          self.restaurants = results;

          // Allow the view to stop the loading animation.
          self.loading = !self.loading;
        }

        YelpSearchResultService.getResults(terms, self.searchForm.location, onCompletion);
      }
    }

    // Set the search function as a property of the controller.
    self.search = search;
  }
})();