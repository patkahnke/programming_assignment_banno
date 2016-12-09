(function () {
'use strict';

describe('getSearchWordIDService', function () {
  var getSearchWordIDService;

  var testWord = {
    parameter: 'silly',
    search_word_id: 12,
  };

  var word1 = {
    parameter: 'silly',
    search_word_id: 12,
  };

  var word2 = {
    parameter: 'funny',
    search_word_id: 15,
  };

  var searchWords = [word1, word2];

  // Load MyApp module
  beforeEach(angular.mock.module('myApp'));

  // Inject getSearchWordIDService
  beforeEach(inject(function (_getSearchWordIDService_) {
    getSearchWordIDService = _getSearchWordIDService_;
  }));

  // Confirm that getSearchWordIDService exists
  it('should exist', function () {
    expect(getSearchWordIDService).toBeDefined();
  });

  // Confirm that getSearchWordIDService.getSearchWordID exists
  it('getSearchWordID should exist', function () {
    expect(getSearchWordIDService.getSearchWordID).toBeDefined();
  });

  // Confirm that getSearchWordID returns the correct ID
  it('returns the correct ID', function () {
    expect(getSearchWordIDService.getSearchWordID(testWord, searchWords)).toEqual(12);
  });
});
})();
