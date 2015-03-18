(function () {
  'use strict';

  //angular.module('yelpInspectionGrade', ['ngAnimate', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap', 'InfoModule'])
  angular.module('app', ['ui.router', 'app.yelp', 'app.list'])
    .config(function ($stateProvider, $urlRouterProvider) {
      // the routes for the app
      // Search page with a List of Results for the restaurants with the inspection grade for each result
      // A page describing the meaning of the food inspection grades and what they mean.
      // a page with the top 25 best and 25 worst offenders when filtering by zip code or borough (just involves the nyc gov data api, not yelp). -- search form

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'app/yelp/partials/_search.html',
          controller: 'Yelp',
          controllerAs: 'yelpSearch'
        })

        //page describing the app
        .state('info', {
          url: '/about',
          templateUrl: 'app/about/partials/_about.html'//,
          //controller: 'InfoController',
          //controllerAs: 'aboutCtrl'
        })

        //page describing meaning of the food inspection grades and what they mean
        .state('grades', {
          url: '/about/food-inspections',
          //.state('grades', {
          //   url: '/food-inspections',
          templateUrl: 'app/about/partials/_inspections.html'
          //controller: 'InfoController',
          //controllerAs: 'aboutCtrl'
        })

        //a page with the top 25 best and 25 worst offenders when filtering by zip code or borough (just involves the nyc gov data api, not yelp). -- search form
        .state('lists', {
          url: '/25-top-worst-restaurants',
          templateUrl: 'app/list/partials/_byInspection.html',
          controller: 'List',
          controllerAs: 'list'
        });
      $urlRouterProvider.otherwise('/');
    })
  ;

})();
