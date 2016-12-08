describe('buildEmbedUrlsService', function () {
  var buildEmbedUrlsService;

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

  var videos = [video1, video2];

  // Load MyApp module
  beforeEach(angular.mock.module('myApp'));

  // Inject buildEmbedUrlsService
  beforeEach(inject(function (_buildEmbedUrlsService_) {
    buildEmbedUrlsService = _buildEmbedUrlsService_;
  }));

  // Confirm that buildEmbedUrlsService exists
  it('should exist', function () {
    expect(buildEmbedUrlsService).toBeDefined();
  });

  // Confirm that buildEmbedUrlsService.buildEmbedUrls exists
  it('buildEmbedUrls should exist', function () {
    expect(buildEmbedUrlsService.buildEmbedUrls).toBeDefined();
  });

  // Confirm that buildEmbedUrls returns an object called 'vids'
  it('returns an array called "vids"', function () {
    expect(buildEmbedUrlsService.buildEmbedUrls(videos)).toEqual(videos);
  });

  // Confirm that buildEmbedUrls creates a property "embedUrl" on the "videos" object
  it('adds the "embedUrl" property to the video objects', function () {
    expect(videos[0].embedUrl).toBeDefined();
  });
});
