/**
 * Yelp Client and API Functions.
 *
 * Creates the Yelp Client and handles the API calls to the Yelp API.
 *
 * server/models/Yelp.js
 */

/* -----------------------------------------------------------------------------
 * Configuration
 * ---------------------------------------------------------------------------*/

// Load the Yelp API configuration values.
var yelpConfig = require('../config/yelpConfig');

// Create the Yelp Client.
var yelpClient = require("yelp").createClient({
  consumer_key: yelpConfig.consumer_key,
  consumer_secret: yelpConfig.consumer_secret,
  token: yelpConfig.token,
  token_secret: yelpConfig.token_secret
});

/* -----------------------------------------------------------------------------
 * Extending Yelp Client
 *
 * The Yelp library does not support the phone search Yelp API call.
 * Example: http://api.yelp.com/v2/phone_search?phone=5555555555
 * Extending to add this function for our client.
 * ---------------------------------------------------------------------------*/

/*
 Example:
 yelp.phone("2127775500", function(error, data) {});
 http://api.yelp.com/v2/phone_search?phone=5555555555
 Country Code is assumed to be USA.
 Outside of the US and Canada, include the international dialing code
 (e.g. +442079460000)
 */
// TODO: This totally sucks. Figure out another way to extend the node module.
// TODO: write a doc for this function.
yelpClient.phone = function(params, callback) {
  console.log(params);
  return this.get('phone_search', params, callback);
}

/* -----------------------------------------------------------------------------
 * Yelp API Functions
 * ---------------------------------------------------------------------------*/
module.exports = {
  //TODO: finish this function docs.
  /**
   * Returns the search results based on the given terms and location.
   * @param terms
   * @param location
   * @param callback
   */
  getYelpResults: function(terms, location, callback) {
    // TODO: Perhaps add the term "restaurant" to ensure restaurant results?
    // Note: Yelp's API has a max limit of 20.
    yelpClient.search({ term: terms, location: location, limit: 20 },
      function(error, data) {
        console.log('called search', terms, location);
        console.log(error);

        callback(error, data);
      }
    );
  },

  /**
   *
   * @param phone
   * @param callback
   */
  getYelpBiz: function (phone, callback) {
    yelpClient.phone({ phone: phone },
      function (error, data) {
        console.log('called search biz', phone);
        console.log(error);

        callback(error, data);
      }
    );
  }
}