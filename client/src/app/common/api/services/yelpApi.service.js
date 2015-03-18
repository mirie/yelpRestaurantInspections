(function() {
  'use strict';

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

    // TODO: Check func doc
    /* @ngInject */
    /**
     * Client API call to server for yelp restaurant search results.
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

    // TODO: Check func doc
    /**
     * Process the search results from the Yelp Restaurant search API call.
     *
     * Also makes a subsequent call to the SODA API to get the food inspection
     * results for each restaurant returned.
     *
     * @param YelpRestaurantSearchFactory
     */
    function processSearchResults(YelpRestaurantSearchFactory, SocrataRestaurantResultService) {
      this.getResults = function(terms, location, callback) {
        console.log('here', terms, location);

        // Final processed array of restaurants.
        var processedRestaurants = [];

        /* Utility Functions fo this Service. */
        var addInspectionInfo = function(isValid, restaurant) {
          processedRestaurants.push(restaurant);
        }

        var getInspectionResults = function(response) {
          var yelpResults = response.businesses;

          yelpResults.forEach(function(restaurant, index, array) {
            console.log(restaurant);
            SocrataRestaurantResultService.getResults(restaurant.phone, restaurant, addInspectionInfo); //.$promise;
          });
        }


        var onSuccess = function(response) {
          //console.log(response);
          callback(true, processedRestaurants);
        };

        var onError = function(error) {
          callback(false, error);
        };

        YelpRestaurantSearchFactory.search({terms: terms, location: location})
          .$promise
          .then(getInspectionResults)
          .then(onSuccess)
          .catch(onError);
      }
    }
})();