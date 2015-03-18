(function() {
  'use strict';

  /* ---------------------------------------------------------------------------
   * Define Socrata API Factories and Services for app.api module.
   * -------------------------------------------------------------------------*/
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

  /* ---------------------------------------------------------------------------
   * Factory functions
   * -------------------------------------------------------------------------*/
    /**
     * Client API call to server for SODA food inspection results for a
     * restaurant.
     *
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

  /* ---------------------------------------------------------------------------
   * Service functions
   * -------------------------------------------------------------------------*/

  /**
   * Process the inspection results from the SODA API call.
   *
   * @param SocrataRestaurants
   */
  function processInspectionResults(SocrataRestaurants) {
    /**
     * Service getResults function().
     *
     * @param phone
     * @param restaurant
     *  Restaurant object
     * @param callback
     */
    this.getResults = function(phone, restaurant, callback) {

      /**
       * Success callback function for SocrataRestaurants.search().
       *
       * @param response
       */
      var onSuccess = function(response) {
        // Parse inspection dates for each inspection.
        response.forEach(function(inspection, index, array) {
          if (inspection.hasOwnProperty("inspection_date")) {
            inspection.inspection_date = Date.parse(inspection.inspection_date);
          }
        });

        restaurant.inspections = response;

        callback(true, restaurant);
      };

      /**
       * Error callback function for SocrataRestaurants.search().
       *
       * @param error
       */
      var onError = function(error) {
        // TODO: Handle error.
        callback(false, error);
      };

      // Get inspection data for the restaurant.
      SocrataRestaurants.search({ phone: phone })
        .$promise
        .then(onSuccess, onError);
    }
  }

  /**
   * Process the restaurant results returned from SODA SocrataList factory call.
   *
   * @param SocrataList
   */
  function processListResults(SocrataList) {
    this.getList = function(zip, returnTopRestaurants, callback) {
      /**
       * Success callback function for SocrataList.getlistInspectionResults().
       * @param response
       */
      var onSuccess = function(response) {
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

      /**
       * Error callback function for SocrataList.getlistInspectionResults().
       *
       * @param error
       */
      var onError = function(error) {
        callback(false, error);
      };

      // Get the lists!
      SocrataList.getlistInspectionResults({ zip: zip, best: returnTopRestaurants })
        .$promise
        .then(onSuccess, onError);
    }
  }

})();