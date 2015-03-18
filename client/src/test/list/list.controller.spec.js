'use strict';

describe('app.list', function(){
  var scope, controller, $httpBackend;
  var sampleTopRestaurantData =
    [
      {
        "min_score": "10",
        "dba": "MCDONALD'S"
      },
      {
        "min_score": "2",
        "dba": "ALMASRY RESTAURANT"
      },
      {
        "min_score": "12",
        "dba": "DYLAN'S BROOKLYN CAFE & RESTAURANT"
      },
      {
        "min_score": "2",
        "dba": "NEW JOHN GARDEN"
      },
      {
        "min_score": "7",
        "dba": "JC MAR RESTAURANT"
      },
      {
        "min_score": "12",
        "dba": "PATTIE HUT"
      },
      {
        "min_score": "9",
        "dba": "EUGENE & CO"
      },
    ];

  var sampleWorstRestaurantData =
    [
      {
        "dba": "NEW NO. 1 RESTAURANT",
        "max_score": "52"
      },
      {
        "dba": "KENTUCKY FRIED CHICKEN",
        "max_score": "28"
      },
      {
        "dba": "TASTEE PATTEE",
        "max_score": "45"
      },
      {
        "dba": "ABU'S HOMESTYLE BAKERY",
        "max_score": "59"
      },
      {
        "dba": "MCDONALD'S",
        "max_score": "43"
      },
      {
        "dba": "MCDONALDS",
        "max_score": "33"
      }
    ];

  beforeEach(function() {
    module('app.api');
    module('app.list');
  });

  describe('Initialize List Controller', function() {
    beforeEach(inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      controller = $controller('List', {
        '$scope': scope
      });
    }));

    it('should be created successfully', function () {
      expect(controller).toBeDefined();
    });

    it('should have an empty array of top and worst restaurants initially', function () {
      expect(angular.isArray(controller.topRestaurants)).toBeTruthy();
      expect(controller.topRestaurants.length == 0).toBeTruthy();

      expect(angular.isArray(controller.worstRestaurants)).toBeTruthy();
      expect(controller.worstRestaurants.length == 0).toBeTruthy();
    });
  });

  describe('List Controller: filter()', function() {
    beforeEach(inject(function($injector, $rootScope, $controller, _$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $httpBackend
        .when("GET", "/api/socrata/list/11216?best=true")
        .respond(200, sampleTopRestaurantData);

      $httpBackend
        .when("GET", "/api/socrata/list/11216?best=false").respond(200, sampleWorstRestaurantData);

      scope = $rootScope.$new();
      controller = $controller('List', {
        '$scope': scope
      });
    }));

    it('should have an array of top and worst restaurants after filter is called', function() {
      expect(angular.isArray(controller.topRestaurants)).toBeTruthy();
      expect(controller.topRestaurants.length == 0).toBeTruthy();
      expect(angular.isArray(controller.worstRestaurants)).toBeTruthy();
      expect(controller.worstRestaurants.length == 0).toBeTruthy();

      controller.searchForm = {
        zip: '11216'
        };

      controller.filter();
      $httpBackend.flush();

      expect(angular.isArray(controller.topRestaurants)).toBeTruthy();
      expect(controller.topRestaurants.length > 0).toBeTruthy();
      expect(angular.isArray(controller.worstRestaurants)).toBeTruthy();
      expect(controller.worstRestaurants.length > 0).toBeTruthy();
    });

    it('should have restaurant information after filter is called', function() {
      controller.searchForm = {
        zip: '11216'
      };

      controller.filter();
      $httpBackend.flush();

      // TODO: Tests to confirm the output for the directive
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  });
});
