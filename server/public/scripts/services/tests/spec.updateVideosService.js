(function () {
'use strict';

describe('updateVideosService', function () {
  var updateVideosService;
  var video = {
    isFavorite: false,
    title: 'Some Other Title',
    id: 67890,
  };

  var video1 = {
    isFavorite: false,
    title: 'Some Title',
    id: 12345,
  };

  var video2 = {
    isFavorite: false,
    title: 'Some Other Title',
    id: 67890,
  };

  var scopeVideos = [video1, video2];

  // Load MyApp module
  beforeEach(angular.mock.module('myApp'));

  // Inject updateVideosService
  beforeEach(inject(function (_updateVideosService_) {
    updateVideosService = _updateVideosService_;
  }));

  // Confirm that updateVideosService exists
  it('should exist', function () {
    expect(updateVideosService).toBeDefined();
  });

  // Confirm that updateVideosService.updateVids exists
  it('updateVids should exist', function () {
    expect(updateVideosService.updateVids).toBeDefined();
  });

  // Confirm that updateVids returns an object called scopeVideos
  it('returns an object called scopeVideos', function () {
    expect(updateVideosService.updateVids(video, scopeVideos)).toEqual(scopeVideos);
  });

  // Confirm that updateVids changes the selected video's 'isFavorite' to true
  it('selected video isFavorite should be true', function () {
    expect(scopeVideos[1].isFavorite).toEqual(true);
  });

  // Confirm that updateVids does not change the other videos in the array
  it('unselected videos should be false', function () {
    expect(scopeVideos[0].isFavorite).toEqual(false);
  });
});
})();
