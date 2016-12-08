describe('searchWordService', function () {
  var searchWordService;
  var testWord1 = 'silly';
  var testWord2 = 'weird';

  var word1 = {
    parameter: 'funny',
  };

  var word2 = {
    parameter: 'silly',
  };

  var searchWords = [word1, word2];

  // Load MyApp module
  beforeEach(angular.mock.module('myApp'));

  // Inject searchWordService
  beforeEach(inject(function (_searchWordService_) {
    searchWordService = _searchWordService_;
  }));

  // Confirm that searchWordService exists
  it('should exist', function () {
    expect(searchWordService).toBeDefined();
  });

  // Confirm that searchWordService.isSearchWord exists
  it('isSearchWord should exist', function () {
    expect(searchWordService.isSearchWord).toBeDefined();
  });

  // Confirm that isSearchWord returns "true" correctly
  it('returns "true" correctly', function () {
    expect(searchWordService.isSearchWord(searchWords, testWord1)).toEqual(true);
  });

  // Confirm that isSearchWord returns "false" correctly
  it('returns "false" correctly', function () {
    expect(searchWordService.isSearchWord(searchWords, testWord2)).toEqual(false);
  });
});
