'use strict';

describe('app.yelp', function(){
  var scope, controller, $httpBackend;
  var sampleRestaurantData =
    {
      "businesses":
        [
          {
            "is_claimed": true,
            "rating": 4,
            "mobile_url": "http://m.yelp.com/biz/gueros-brooklyn",
            "rating_img_url": "http://s3-media4.fl.yelpcdn.com/assets/2/www/img/c2f3dd9799a5/ico/stars/v1/stars_4.png",
            "review_count": 317,
            "name": "Gueros",
            "snippet_image_url": "http://s3-media4.fl.yelpcdn.com/photo/x3-kDDLZvmY6DET7RoL2zw/ms.jpg",
            "rating_img_url_small": "http://s3-media4.fl.yelpcdn.com/assets/2/www/img/f62a5be2f902/ico/stars/v1/stars_small_4.png",
            "url": "http://www.yelp.com/biz/gueros-brooklyn",
            "menu_date_updated": 1403045047,
            "phone": "7182304941",
            "snippet_text": "Guero's IS the spot. I traverse 40 minute subway rides on the reg just to come here.\nTacos are good but the NACHOS are where it's AT. Steak are the best,...",
            "image_url": "http://s3-media1.fl.yelpcdn.com/bphoto/XzOaF4H7c_WAoteev7TV8g/ms.jpg",
            "inspections": [
              {
                "inspection_date" : "2014-12-26T00:00:00",
                "critical_flag" : "Critical",
                "dba" : "GUEROS BROOKLYN",
                "score" : "19",
                "grade" : "Z",
                "violation_description" : "Evidence of mice or live mice present in facility's food and/or non-food areas."
              },
              {
                "inspection_date" : "2014-12-26T00:00:00",
                "critical_flag" : "Critical",
                "dba" : "GUEROS BROOKLYN",
                "score" : "19",
                "grade" : "Z",
                "violation_description" : "Personal cleanliness inadequate. Outer garment soiled with possible contaminant.  Effective hair restraint not worn in an area where food is prepared."
              },
              {
                "inspection_date" : "2014-12-26T00:00:00",
                "critical_flag" : "Not Critical",
                "dba" : "GUEROS BROOKLYN",
                "score" : "19",
                "grade" : "Z",
                "violation_description" : "Facility not vermin proof. Harborage or conditions conducive to attracting vermin to the premises and/or allowing vermin to exist."
              },
              {
                "inspection_date" : "2014-12-26T00:00:00",
                "critical_flag" : "Not Critical",
                "dba" : "GUEROS BROOKLYN",
                "score" : "19",
                "grade" : "Z",
                "violation_description" : "Non-food contact surface improperly constructed. Unacceptable material used. Non-food contact surface or equipment improperly maintained and/or not properly sealed, raised, spaced or movable to allow accessibility for cleaning on all sides, above and underneath the unit."
              },
              {
                "inspection_date" : "2014-12-26T00:00:00",
                "critical_flag" : "Not Critical",
                "dba" : "GUEROS BROOKLYN",
                "score" : "19",
                "grade" : "Z",
                "violation_description" : "''''Wash hands\u001A sign not posted at hand wash facility."
              },
              {
                "inspection_date" : "2014-12-08T00:00:00",
                "critical_flag" : "Critical",
                "dba" : "GUEROS BROOKLYN",
                "score" : "18",
                "violation_description" : "Evidence of mice or live mice present in facility's food and/or non-food areas."
              },
              {
                "inspection_date" : "2014-12-08T00:00:00",
                "critical_flag" : "Critical",
                "dba" : "GUEROS BROOKLYN",
                "score" : "18",
                "violation_description" : "Live roaches present in facility's food and/or non-food areas."
              },
              {
                "inspection_date" : "2014-12-08T00:00:00",
                "critical_flag" : "Critical",
                "dba" : "GUEROS BROOKLYN",
                "score" : "18",
                "violation_description" : "Food not protected from potential source of contamination during storage, preparation, transportation, display or service."
              },
              {
                "inspection_date" : "2014-12-08T00:00:00",
                "critical_flag" : "Not Critical",
                "dba" : "GUEROS BROOKLYN",
                "score" : "18",
                "violation_description" : "Facility not vermin proof. Harborage or conditions conducive to attracting vermin to the premises and/or allowing vermin to exist."
              },
              {
                "inspection_date" : "2014-05-01T00:00:00",
                "critical_flag" : "Not Applicable",
                "dba" : "GUEROS BROOKLYN"
              }
            ],
            "categories": [
              [
                "Tex-Mex",
                "tex-mex"
              ],
              [
                "Mexican",
                "mexican"
              ]
            ],
            "display_phone": "+1-718-230-4941",
            "rating_img_url_large": "http://s3-media2.fl.yelpcdn.com/assets/2/www/img/ccf2b76faa2c/ico/stars/v1/stars_large_4.png",
            "menu_provider": "eat24",
            "id": "gueros-brooklyn",
            "is_closed": false,
            "location": {
              "cross_streets": "Franklin Ave",
              "city": "Brooklyn",
              "display_address": [
                "605 Prospect Pl",
                "Crown Heights",
                "Brooklyn, NY 11238"
              ],
              "geo_accuracy": 8,
              "neighborhoods": [
                "Crown Heights"
              ],
              "postal_code": "11238",
              "country_code": "US",
              "address": [
                "605 Prospect Pl"
              ],
              "coordinate": {
                "latitude": 40.6751397997141,
                "longitude": -73.9565290510654
              },
              "state_code": "NY"
            }
          },
          {
            "is_claimed": true,
            "rating": 4.5,
            "mobile_url": "http://m.yelp.com/biz/calaca-bedford-stuyvesant",
            "rating_img_url": "http://s3-media2.fl.yelpcdn.com/assets/2/www/img/99493c12711e/ico/stars/v1/stars_4_half.png",
            "review_count": 38,
            "name": "Calaca",
            "snippet_image_url": "http://s3-media1.fl.yelpcdn.com/photo/z0DnjToz0UxgU3JlJ5UmyQ/ms.jpg",
            "rating_img_url_small": "http://s3-media2.fl.yelpcdn.com/assets/2/www/img/a5221e66bc70/ico/stars/v1/stars_small_4_half.png",
            "url": "http://www.yelp.com/biz/calaca-bedford-stuyvesant",
            "phone": "7186220022",
            "snippet_text": "Where to start?! The tacos are just ridiculously good and the ahi tuna tostada is constantly on my mind. It's a small and intimate space, and they recently...",
            "image_url": "http://s3-media4.fl.yelpcdn.com/bphoto/6X-a5_yTT6UXhBnykhaHUA/ms.jpg",
            "inspections": [],
            "categories": [
              [
                "Mexican",
                "mexican"
              ]
            ],
            "display_phone": "+1-718-622-0022",
            "rating_img_url_large": "http://s3-media4.fl.yelpcdn.com/assets/2/www/img/9f83790ff7f6/ico/stars/v1/stars_large_4_half.png",
            "id": "calaca-bedford-stuyvesant",
            "is_closed": false,
            "location": {
              "cross_streets": "Franklin Ave & Claver Pl",
              "city": "Bedford-Stuyvesant",
              "display_address": [
                "139 Putnam Ave",
                "Clinton Hill",
                "Bedford-Stuyvesant, NY 11238"
              ],
              "geo_accuracy": 8,
              "neighborhoods": [
                "Clinton Hill",
                "Bedford Stuyvesant"
              ],
              "postal_code": "11238",
              "country_code": "US",
              "address": [
                "139 Putnam Ave"
              ],
              "coordinate": {
                "latitude": 40.6833145022392,
                "longitude": -73.9566068351269
              },
              "state_code": "NY"
            }
          }
        ]
    };


  beforeEach(function() {
    module('app.api');
    module('app.yelp');
  });

  describe('Initialize Yelp Controller', function() {
    beforeEach(inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      controller = $controller('Yelp', {
        '$scope': scope
      });
    }));

    it('should be created successfully', function () {
      expect(controller).toBeDefined();
    });

    it('should have an empty array of restaurants initially', function () {
      expect(angular.isArray(controller.restaurants)).toBeTruthy();
      expect(controller.restaurants.length == 0).toBeTruthy();
    });
  });

  describe('Yelp Controller: search()', function() {
    beforeEach(inject(function($injector, $rootScope, $controller, _$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $httpBackend
        .when("GET", "/api/yelp/search/taco/11216")
        .respond(200, sampleRestaurantData);

      $httpBackend
        .when("GET", "/api/socrata/biz/7182304941").respond(200, []);

      $httpBackend
        .when("GET", "/api/socrata/biz/7186220022").respond(200, []);


      scope = $rootScope.$new();
      controller = $controller('Yelp', {
        '$scope': scope
      });
    }));

    it('should have an array of restaurants after search is called', function() {
      expect(angular.isArray(controller.restaurants)).toBeTruthy();
      expect(controller.restaurants.length == 0).toBeTruthy();

      controller.searchForm = {
        terms: 'taco',
        location: '11216'
        };

      controller.search();
      $httpBackend.flush();

      expect(angular.isArray(controller.restaurants)).toBeTruthy();
      expect(controller.restaurants.length > 0).toBeTruthy();
    });

    it('should have restaurants information after search is called', function() {
      controller.searchForm = {
        terms: 'taco',
        location: '11216'
      };

      controller.search();
      $httpBackend.flush();

      // TODO: Tests to confirm the output for the directive
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  });
});
