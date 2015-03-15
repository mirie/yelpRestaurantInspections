/**
 * Yelp API Routes for Angular Application.
 *
 * Routes the API calls to the Yelp API based on requests from the Angular
 * Application.
 *
 * server/routes/yelpApi.js
 */

/* -----------------------------------------------------------------------------
 * Module dependencies
 * ---------------------------------------------------------------------------*/
var express = require('express');
var router = express.Router();
var Yelp = require('../models/Yelp');


/* -----------------------------------------------------------------------------
 * Route Middleware
 * ---------------------------------------------------------------------------*/

/**
 * Route middleware that will happen on every request.
 */
router.use(function(request, response, next) {
  console.log('YelpAPI: yooooo');
  // log each request to the console
  console.log(request.method, request.url);

  // continue doing what we were doing and go to the route
  next();
});

// TODO: Complete validation for params.
/**
 * Route middleware that will validate the :terms param.
 */
router.param('terms', function(request, response, next, terms) {
  // do validation on terms here
  // blah blah validation
  // log something so we know its working
  console.log('YelpAPI: doing terms validations on ' + terms);

  // once validation is done save the new item in the req
  request.terms = terms;
  // go to the next thing
  next();
});

/**
 * Route middleware that will validate the :location param.
 */
router.param('location', function(request, response, next, location) {
  // do validation on location here
  // blah blah validation
  // log something so we know its working
  console.log('YelpAPI: doing location validations on ' + location);

  // once validation is done save the new item in the req
  request.location = location;
  // go to the next thing
  next();
});

/**
 * Route middleware that will validate the :phone param.
 */
router.param('phone', function(request, response, next, phone) {
  // do validation on phone here
  // blah blah validation
  // log something so we know its working
  console.log('YelpAPI: doing location validations on ' + phone);

  // once validation is done save the new item in the req
  request.phone = phone;
  // go to the next thing
  next();
});

/* -----------------------------------------------------------------------------
 * API Routes
 * ---------------------------------------------------------------------------*/

/**
 * Get Yelp restaurant results based on terms and location parameters.
 */
router.route('/search/:terms/:location')
  .get(function(request, response) {
    var terms = request.params.terms;
    var location = request.params.location;

    Yelp.getYelpResults(terms, location, function(results, error) {
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
 * Get Yelp restaurant based on the phone number parameter.
 */
router.route('/phone/:phone')
  .get(function(request, response) {
    var phone = request.params.phone;

    Yelp.getYelpBiz(phone, function(results, error) {
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