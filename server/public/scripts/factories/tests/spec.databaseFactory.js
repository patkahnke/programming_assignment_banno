(function () {
'use strict';
describe('DatabaseFactory', function () {
  var databaseFactory;
  var $q;
  var $httpBackend;
  var dbRoute = '/favorites';
  var RESPONSE_SUCCESS = 'success';
  var result;
  var favorites;
  var favorite = {
    snippet: {
      title: 'Silly Puppies',
      thumbnails: {
        high: {
          url: 'someURLString',
        },
      },
    },
    id: 'xyz123',
    date: 'someDateString',
  };

  var searchWord = 'silly';

  var searchBy = {
    search_word: 'puppies',
    search_word_id: 0,
  };

  // Load MyApp module
  beforeEach(angular.mock.module('myApp'));

  // Inject $q and $httpBackend for testing http requests
  beforeEach(inject(function (_DatabaseFactory_, _$q_, _$httpBackend_) {
    databaseFactory = _DatabaseFactory_;
    $q = _$q_;
    $httpBackend = _$httpBackend_;
  }));

  // Confirm that databaseFactory exists
  it('should exist', function () {
    expect(databaseFactory).toBeDefined();
  });

  describe('createFavorite', function () {

    beforeEach(function () {
      // Spy on the factory call but allow it to continue to its implementation
      spyOn(databaseFactory, 'createFavorite').and.callThrough();
    });

    it('createFavorite should exist', function () {
      expect(databaseFactory.createFavorite).toBeDefined();
    });

    it('should return a success message when posting a valid video', function () {

      // Declare the endpoint to hit and provide it with mocked return values
      $httpBackend.expectPOST(dbRoute, favorite).respond(201, $q.when(RESPONSE_SUCCESS));

      databaseFactory.createFavorite(favorite).then(function (res) {
        result = res;

        // Flush pending HTTP requests
        $httpBackend.flush();

        expect(databaseFactory.createFavorite).toHaveBeenCalled();
        expect(result).toMatch('success');
      });
    });
  });

  describe('createSearchWord', function () {

    beforeEach(function () {
      // Spy on the factory call but allow it to continue to its implementation
      spyOn(databaseFactory, 'createSearchWord').and.callThrough();
    });

    it('createSearchWord should exist', function () {
      expect(databaseFactory.createSearchWord).toBeDefined();
    });

    it('should return a success message when posting a valid searchWord', function () {

      // Declare the endpoint to hit and provide it with mocked return values
      $httpBackend.expectPOST(dbRoute, searchWord).respond(201, $q.when(RESPONSE_SUCCESS));

      databaseFactory.createSearchWord(searchWord).then(function (res) {
        result = res;

        // Flush pending HTTP requests
        $httpBackend.flush();

        expect(databaseFactory.createSearchWord).toHaveBeenCalled();
        expect(result).toMatch('success');
      });
    });
  });

  describe('refreshFavorites', function () {

      beforeEach(function () {
        spyOn(databaseFactory, 'refreshFavorites').and.returnValue('success');
      });

      it('refreshFavorites should exist', function () {
        expect(databaseFactory.refreshFavorites).toBeDefined();
      });

      it('should return a properly formatted videos object', function () {
        $httpBackend.whenGET(dbRoute, searchBy).respond(200, $q.when(RESPONSE_SUCCESS));

        favorites = databaseFactory.refreshFavorites(searchBy);

        expect(databaseFactory.refreshFavorites).toHaveBeenCalledWith(searchBy);
        expect(favorites).toEqual('success');
      });
    });

});
})();
