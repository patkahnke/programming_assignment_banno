(function () {
'use strict';

describe('getFavoriteIDService', function () {
  var getFavoriteIDService;

  var testVideo = {
    isFavorite: true,
    title: 'Some Title',
    favorite_id: 12345,
    videoid: 'hysow243',
  };

  var video1 = {
    isFavorite: true,
    title: 'Some Title',
    favorite_id: 12345,
    videoid: 'hysow243',
  };

  var video2 = {
    isFavorite: false,
    title: 'Some Other Title',
    favorite_id: 67890,
    videoid: '76hywko98',
  };

  var videos = [video1, video2];

  // Load MyApp module
  beforeEach(angular.mock.module('myApp'));

  // Inject getFavoriteIDService
  beforeEach(inject(function (_getFavoriteIDService_) {
    getFavoriteIDService = _getFavoriteIDService_;
  }));

  // Confirm that getFavoriteIDService exists
  it('should exist', function () {
    expect(getFavoriteIDService).toBeDefined();
  });

  // Confirm that getFavoriteIDService.getFavoriteID exists
  it('getFavoriteID should exist', function () {
    expect(getFavoriteIDService.getFavoriteID).toBeDefined();
  });

  // Confirm that getFavoriteID returns the correct ID
  it('returns the correct ID', function () {
    expect(getFavoriteIDService.getFavoriteID(testVideo, videos)).toEqual(12345);
  });
});
})();
