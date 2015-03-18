(function() {
  'use strict';

  /* ---------------------------------------------------------------------------
   * Define Yelp API Factories and Services for app.api module.
   * -------------------------------------------------------------------------*/
  angular
    .module('app.api')
    /**
     * Factory that handles the yelp restaurant search API call.
     */
    .factory('YelpRestaurantSearchFactory', search)

    /**
     * Service that processes the results from the yelp restaurant search API
     * call.
     */
    .service('YelpSearchResultService', processSearchResults);

  /* ---------------------------------------------------------------------------
   * Factory functions
   * -------------------------------------------------------------------------*/

  /**
   * Client API call to server for Yelp restaurant search results.
   * @param $resource
   * @returns {*}
   */
  function search($resource) {
    return $resource('/api/yelp/search/:terms/:location', {}, {
      search: {
        method: 'GET',
        isArray: false
      }
    })
  }

  /* ---------------------------------------------------------------------------
   * Service functions
   * -------------------------------------------------------------------------*/

  /**
   * Process the search results from the Yelp Restaurant search API call.
   *
   * Also makes a subsequent call to the SODA API to get the food inspection
   * results for each restaurant returned.
   *
   * @param YelpRestaurantSearchFactory
   */
  function processSearchResults(YelpRestaurantSearchFactory, SocrataRestaurantResultService) {
    /**
     * Service getResults function().
     *
     * @param terms
     *  Terms can have spaces
     * @param location
     *  Location is a string
     * @param callback
     */
    this.getResults = function(terms, location, callback) {
      // Final processed array of restaurants.
      var processedRestaurants = [];

      /* Utility Functions fo this Service. */

      /**
       * Callback function for SODA API call.
       *
       * @param isValid
       * @param restaurant
       */
      var addInspectionInfo = function(isValid, restaurant) {
        // TODO: Handle isValid.
        processedRestaurants.push(restaurant);
      }

      /**
       * Get Inspection results from SODA API for each restaurant returned from
       * the Yelp Search factory call.
       *
       * @param response
       */
      var getInspectionResults = function(response) {
        var yelpResults = response.businesses;

        yelpResults.forEach(function(restaurant, index, array) {
          SocrataRestaurantResultService.getResults(restaurant.phone, restaurant, addInspectionInfo); //.$promise;
        });
      }

      /**
       * Success callback function for YelpRestaurantSearchFactory.search().
       *
       * @param response
       */
      var onSuccess = function(response) {
        callback(true, processedRestaurants);
      };

      /**
       * Error callback function for YelpRestaurantSearchFactory.search().
       *
       * @param error
       */
      var onError = function(error) {
        // TODO: error handling.
        callback(false, error);
      };

      // Start our Search!
      YelpRestaurantSearchFactory.search({terms: terms, location: location})
        .$promise
        .then(getInspectionResults)
        .then(onSuccess)
        .catch(onError);
    }
  }
})();