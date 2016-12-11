(function () {
'use strict';
describe('DatabaseFactory', function () {
  var databaseFactory;
  var $q;
  var $httpBackend;
  var FAVORITES_RESPONSE_SUCCESS = [{
      title: 'Silly Puppies',
      videoId: 'AplhZ3Dpcwc',
      thumbnail: 'someURLString',
      date_added: 'Dec 2, 2016 5:22:00 PM',
    }];

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
    id: 'AplhZ3Dpcwc',
    date: 'Dec 2, 2016 5:22:00 PM',
  };

  var searchWord = 'silly';

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

  describe('refreshFavorites', function () {
    var result;

    beforeEach(function () {
      result = {};

      spyOn(databaseFactory, 'refreshFavorites').and.callThrough();
    });

    it('should exist', function () {
      expect(databaseFactory.refreshFavorites).toBeDefined();
    });

    it('should return a properly formatted videos object', function () {
      var searchBy = {
        search_word: 'puppies',
        search_word_id: 0,
      };
      var dbRoute = '/favorites?search=' + searchBy.search_word_id;
      $httpBackend.whenGET(dbRoute).respond(200, $q.when(FAVORITES_RESPONSE_SUCCESS));

      expect(databaseFactory.refreshFavorites).not.toHaveBeenCalled();
      expect(result).toEqual({});

      databaseFactory.refreshFavorites(searchBy)
     .then(function (response) {
        result = response;
        console.log('response: ', response);
      });

      // Flush pending HTTP requests
      $httpBackend.flush();

      expect(databaseFactory.refreshFavorites).toHaveBeenCalledWith(searchBy);
      expect(result[0].title).toEqual('Silly Puppies');
      expect(result[0].videoId).toEqual('AplhZ3Dpcwc');
      expect(result[0].thumbnail).toEqual('someURLString');
      expect(result[0].date_added).toEqual('Dec 2, 2016 5:22:00 PM');

    });
  });

});
})();
