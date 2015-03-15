/**
 * Socrata API Functions.
 *
 * Handles the API calls to the SODA API.
 *
 * Dataset: https://data.cityofnewyork.us/resource/xx67-kt59.json
 *
 * server/models/Socrata.js
 */

/* -----------------------------------------------------------------------------
 * Configuration
 * ---------------------------------------------------------------------------*/
// Load the Socrata API configuration values.
//var socrataConfig = require('../config/socrataConfig');

var request = require("request");
//var socrataConfig = require('../config/socrata');
//var Socrata = require('node-socrata');
//var soda = new Socrata(socrataConfig);
//
//var params = {
//  $select: ['inspection_date','score','violation_description','critical_flag','grade'],
//  $where: 'phone=7182304941',
//  $order: 'inspection_date DESC',
//  $limit: 15
//}
//
//soda.get(params, function(err, response, data) {
//  console.log(data);
//});

//
//Client.prototype.get = function(resource, params, callback) {
//  return this.oauth.get(
//    base_url + resource + '?' + querystring.stringify(params),
//    this.oauthToken,
//    this.oauthTokenSecret,
//    function(error, data, response) {
//      if(!error) data = JSON.parse(data);
//      callback(error, data, response);
//    }
//  );
//}

const SOCRATA_BASE_URL = "https://data.cityofnewyork.us/resource/xx67-kt59.json";

module.exports = {
  // TODO: finish function docs.

  /**
   * Returns the inspection results based if there's matches for the given phone
   * number.
   *
   * Limit of results = 10.
   *
   * @param phone
   * @param response
   * @param callback
   */
  getInspectionResults: function(phone, callback) {
    var select = '$select=dba,inspection_date,score,violation_description,critical_flag,grade';
    //TODO: check that phone is acceptable.
    var where = 'phone=' + phone;
    var order = '$order=inspection_date%20DESC';
    var limit = '$limit=10';

    // Construct the path for our API call.
    var path = SOCRATA_BASE_URL + '?' + select + '&' + where + '&' + order + '&' + limit;

    request(path, function (error, response, body) {
      callback(error, body);
    });
  },

  /**
   * Returns a list of the best or worst restuarants in a given zipcode.
   *
   * @param zip
   * @param returnBest
   * @param callback
   */
  getListInspectionResults: function(zip, returnBest, callback) {
    console.log('returnBest', returnBest);

    var where = 'zipcode=' + zip;
    var limit = '$limit=50';

    if (returnBest) {
      // Get Top 50 Perfect Restaurants
      //var select = '$select=dba,inspection_date,score,violation_description,critical_flag,grade';
      var select = '$select=dba,MIN(score)';
      where += '&$where=score<14';
      //where += '&score=0&grade=A&critical_flag=Not%20Applicable';
      var order = '$order=inspection_date%20DESC';
    }
    else {
      // Get Top 50 Worst Restaurants
      //https://data.cityofnewyork.us/resource/xx67-kt59.json?$select=dba,MAX(score)&zipcode=11216&$where=score>=27&$order=inspection_date ASC&$$pipe=false&$limit=50&$group=dba
      var select = '$select=dba,MAX(score)';
      where += '&$where=score>=27';
      var order = '$order=inspection_date%20DESC';
    }

    var path = SOCRATA_BASE_URL + '?' + select + '&' + where + '&' + order + '&' + limit;

    // This is needed because of the group by clause. This is a known issue.
    path += '&$$pipe=false&$group=dba';

    console.log(path);

    request(path, function (error, response, body) {
       callback(error, body);
    });
  }
}