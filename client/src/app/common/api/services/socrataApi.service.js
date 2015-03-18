(function() {
  'use strict';

  angular
    .module('app.api')

    /**
     * Factory that handles the SODA API call that returns inspection results
     * for a restaurant.
     */
    .factory('SocrataRestaurants', searchByPhone)

    /**
     * Factory that handles the SODA API call that returns a list of restaurants
     * either scoring best or worst for food inspections.
     */
    .factory('SocrataList', listByZip)

    /**
     * Service that processes the results from the SODA API call for a business.
     */
    .service('SocrataRestaurantResultService', processInspectionResults)

    /**
     * Service that processes the results from the SODA API call for the list of
     * businesses.
     */
    .service('SocrataListResultService', processListResults);

    // TODO: Check func doc
    /* @ngInject */
    /**
     * Client API call to server for SODA food inspection results for a restaurant.
     * @param $resource
     * @returns {*}
     */
    function searchByPhone($resource) {
      return $resource('/api/socrata/biz/:phone/', {}, {
        search: {
          method: 'GET',
          isArray: true
        }
      })
    }

    /**
     * Returns a list of either the best or worst rated restaurants by zipcode.
     *
     * @param $resource
     * @returns {*}
     */
    function listByZip($resource) {
      return $resource('/api/socrata/list/:zip/', { best: true }, {
        getlistInspectionResults: {
          method: 'GET',
          isArray: true
        }
      })
    }

  // TODO: Check func doc
  /**
   * Process the inspection results from the SODA API call.
   *
   * @param SocrataRestaurants
   */
  function processInspectionResults(SocrataRestaurants) {
    this.getResults = function(phone, restaurant, callback) {
      console.log('here', phone);

      var onSuccess = function(response) {
        console.log(response);

        response.forEach(function(inspection, index, array) {
          if (inspection.hasOwnProperty("inspection_date")) {
            inspection.inspection_date = Date.parse(inspection.inspection_date);
          }
        });

        restaurant.inspections = response;

        callback(true, restaurant);
      };

      var onError = function(error) {
        callback(false, error);
      };

      SocrataRestaurants.search({ phone: phone })
        .$promise
        .then(onSuccess, onError);
    }
  }

  function processListResults(SocrataList) {
    this.getList = function(zip, returnTopRestaurants, callback) {
      console.log('processListResults', zip, returnTopRestaurants);

      var onSuccess = function(response) {
        console.log(response);

        // Set min_score and max_score to just score.
        response.forEach(function(restaurant, index, array) {
          if (restaurant.hasOwnProperty("min_score")) {
            restaurant.score = parseInt(restaurant.min_score);
          }

          if (restaurant.hasOwnProperty("max_score")) {
            restaurant.score = parseInt(restaurant.max_score);
          }
        });

        callback(true, response);
      };

      var onError = function(error) {
        callback(false, error);
      };

      SocrataList.getlistInspectionResults({ zip: zip, best: returnTopRestaurants })
        .$promise
        .then(onSuccess, onError);
    }
  }

})();