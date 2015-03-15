/**
 * Server
 *
 * The main server app.
 *
 *  server/server.js
 */

/* -----------------------------------------------------------------------------
 * Module dependencies
 * ---------------------------------------------------------------------------*/
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/* -----------------------------------------------------------------------------
 * Routes
 * ---------------------------------------------------------------------------*/
// Our main application route.
var routes = require('./routes/index');

// Yelp API routes.
var yelpApi = require('./routes/yelpApi');

// Socrata API routes.
var socrataApi = require('./routes/socrataApi');

var app = express();

/* -----------------------------------------------------------------------------
 * Configuration
 * ---------------------------------------------------------------------------*/

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/* -----------------------------------------------------------------------------
 * Development Settings
 * ---------------------------------------------------------------------------*/
if (app.get('env') === 'development') {
  // This will change in production since we'll be using the dist folder
  app.use(express.static(path.join(__dirname, '../client')));
  // This covers serving up the index page
  app.use(express.static(path.join(__dirname, '../client/.tmp/serve')));
  app.use(express.static(path.join(__dirname, '../client/src')));

  app.use('/api/yelp', yelpApi);
  app.use('/socrata', socrataApi);

  // Error Handling
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

/* -----------------------------------------------------------------------------
 * Production Settings
 * ---------------------------------------------------------------------------*/
if (app.get('env') === 'production') {

  // changes it to use the optimized version for production
  app.use(express.static(path.join(__dirname, '/dist')));
  app.use('/api/yelp', yelpApi);
  app.use('/socrata', socrataApi);

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
}

module.exports = app;
