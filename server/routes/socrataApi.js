/**
 * Socrata API Routes for Angular Application.
 *
 * Routes the API calls to the SODA API based on requests from the Angular
 * Application.
 *
 * Reference: http://dev.socrata.com/ and
 * https://data.cityofnewyork.us/Health/DOHMH-New-York-City-Restaurant-Inspection-Results/xx67-kt59?
 *
 * Dataset: https://data.cityofnewyork.us/resource/xx67-kt59.json
 *
 * server/routes/socrataApi.js
 */

/* -----------------------------------------------------------------------------
 * Module dependencies
 * ---------------------------------------------------------------------------*/
var express = require('express');
var router = express.Router();
var Socrata = require('../models/Socrata');


/* -----------------------------------------------------------------------------
 * Route Middleware
 * ---------------------------------------------------------------------------*/

/**
 * Route middleware that will happen on every request.
 */
router.use(function(request, response, next) {
  console.log('SocrataAPI: yooooo');
  // log each request to the console
  console.log(request.method, request.url);

  // continue doing what we were doing and go to the route
  next();
});

// TODO: Complete validation for params.
/**
 * Route middleware that will validate the :phone param.
 */
router.param('phone', function(request, response, next, phone) {
  // do validation on phone here
  // blah blah validation
  // log something so we know its working
  console.log('SocrataAPI: doing location validations on ' + phone);

  // once validation is done save the new item in the req
  request.phone = phone;
  // go to the next thing
  next();
});

/**
 * Route middleware that will validate the :zip param.
 */
router.param('zip', function(request, response, next, zip) {
  // do validation on zip here
  // blah blah validation
  // log something so we know its working
  console.log('SocrataAPI: doing zip validations on ' + zip);

  // once validation is done save the new item in the req
  request.zip = zip;
  // go to the next thing
  next();
});

/* -----------------------------------------------------------------------------
 * API Routes
 * ---------------------------------------------------------------------------*/

 /**
  * Get List of restaurants based on zip that either scored the best or worst in
  * food inspections.
  *
  * Returns a max of 50 restaurants.
 */
router.route('/list/:zip')
  .get(function(request, response) {
    var zip = request.params.zip;

    // Should we return the top or the worst list.
    var returnBest = (request.query.best === 'true');

    console.log('calling socrata list');

    Socrata.getListInspectionResults(zip, returnBest, function(results, error) {
      if (error) {
        response.send(error);
      }
      else {
        response.send(results);
      }
    });
  }
);


/**
 * Get Food Inspection results for a restaurant based on the phone number parameter.
 */
router.route('/biz/:phone')
  .get(function(request, response) {
    var phone = request.params.phone;

    console.log('calling socrata biz');

    Socrata.getInspectionResults(phone, function(results, error) {
      if (error) {
        response.send(error);
      }
      else {
        response.send(results);
      }
    });
  }
);

module.exports = router;