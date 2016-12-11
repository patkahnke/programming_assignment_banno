(function () {
'use strict';

// I need help with this - tried implementing $httpBackend, with little success. This current
// implementation of Jasmine with spies doesn't throw any errors, but also doesn't seem to be
// testing anything useful.

describe('DatabaseFactory', function () {
  var databaseFactory;
  var $q;
  var $httpBackend;
  var FAVORITES_RESPONSE_SUCCESS = [{
      title: 'Silly Puppies',
      videoId: 'AplhZ3Dpcwc',
      thumbnail: 'someURLString',
      date_added: 'Dec 2, 2016 5:22:00 PM',
    },
  ];

  var SEARCHWORDS_RESPONSE_SUCCESS = {
      search_word: 'puppies',
      search_word_id: 0,
    };

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

  beforeEach(function () {
  });

  describe('refreshSearchWords', function () {

    beforeEach(function () {

      spyOn(databaseFactory, 'refreshSearchWords').and.returnValue(SEARCHWORDS_RESPONSE_SUCCESS);

    });

    it('should exist', function () {
      expect(databaseFactory.refreshSearchWords).toBeDefined();
    });

    it('should return a properly formatted searchWord object', function () {

      expect(databaseFactory.refreshSearchWords).not.toHaveBeenCalled();

      var response = databaseFactory.refreshSearchWords();

      expect(databaseFactory.refreshSearchWords).toHaveBeenCalled();
      expect(response.search_word).toEqual('puppies');
      expect(response.search_word_id).toEqual(0);
    });
  });

  describe('refreshFavorites', function () {

    beforeEach(function () {
      spyOn(databaseFactory, 'refreshFavorites').and.returnValue(FAVORITES_RESPONSE_SUCCESS);
    });

    it('should exist', function () {
      expect(databaseFactory.refreshFavorites).toBeDefined();
    });

    it('should return a properly formatted videos object', function () {
      var searchBy = {
        search_word: 'puppies',
        search_word_id: 0,
      };

      expect(databaseFactory.refreshFavorites).not.toHaveBeenCalled();

      var result = databaseFactory.refreshFavorites(searchBy);

      expect(databaseFactory.refreshFavorites).toHaveBeenCalledWith(searchBy);
      expect(result[0].title).toEqual('Silly Puppies');
      expect(result[0].videoId).toEqual('AplhZ3Dpcwc');
      expect(result[0].thumbnail).toEqual('someURLString');
      expect(result[0].date_added).toEqual('Dec 2, 2016 5:22:00 PM');
    });
  });
});
})();
