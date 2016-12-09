(function () {
'use strict';

describe('youTubeKeyService', function () {
  var youTubeKeyService;
  var result;

  // Load MyApp module
  beforeEach(angular.mock.module('myApp'));

  // Inject youTubeKeyService
  beforeEach(inject(function (_youTubeKeyService_) {
    youTubeKeyService = _youTubeKeyService_;
  }));

  // Confirm that youTubeKeyService exists
  it('should exist', function () {
    expect(youTubeKeyService).toBeDefined();
  });

  // Confirm that youTubeKeyService.getAPIKey exists
  it('getAPIKey should exist', function () {
    expect(youTubeKeyService.getAPIKey).toBeDefined();
  });

  it('should return a string', function () {
    youTubeKeyService.getAPIKey()
    .then(function (res) {
      result = res;
      expect(result.data.youTubeAPIKey).toEqual(jasmine.any('String'));
    });
  });
});
})();
