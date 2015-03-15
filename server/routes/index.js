/**
 * Main Route for Angular Application (index).
 *
 * Handles routing for the Angular Application.
 *
 * server/routes/index.js
 */

/* -----------------------------------------------------------------------------
 * Module dependencies
 * ---------------------------------------------------------------------------*/
var express = require('express');
var router = express.Router();


/* -----------------------------------------------------------------------------
 * API Routes
 * ---------------------------------------------------------------------------*/
/*
 * GET main angular app index page.
 */
router.get('/', function(request, response, next) {
  request.render('index', { title: 'YelpRestaurantFoodInspections' });
});

module.exports = router;
