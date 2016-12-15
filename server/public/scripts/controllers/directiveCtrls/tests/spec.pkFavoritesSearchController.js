describe('pkFavoritesSearchController', function () {
  var $controller;
  var $httpBackend;
  var pkFavoritesSearchController;
  var $scope;
  var $timeout;
  var databaseFactory;
  var searchWordService;
  var videosResponse = [{
          title: 'Ryan Adams - Lucky Now',
          videoid: 'bp064T7rQSk',
          thumbnail: 'https://i.ytimg.com/vi/bp064T7rQSk/hqdefault.jpg',
          date_added: 'Dec 2, 2016 5:22:00 PM',
        },
      ];
  var searchWordsResponse = [{
      search_word: 'puppies',
      search_word_id: 0,
    },
    {
      search_word: 'silly',
      search_word_id: 1,
    },
  ];

  beforeEach(angular.mock.module('myApp'));

  beforeEach(inject(function (_$controller_, _$httpBackend_, $rootScope, _$timeout_,
                              _DatabaseFactory_, _searchWordService_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    $scope = $rootScope.$new();
    $timeout = _$timeout_;
    databaseFactory = _DatabaseFactory_;
    searchWordService = _searchWordService_;

    createController = function () {
      return $controller('pkFavoritesSearchController', {
        $scope: $scope,
        $timeout: $timeout,
        databaseFactory: databaseFactory,
        searchWordService: searchWordService,
      });
    };

    $httpBackend.when('GET', '/favorites?search=0').respond(200, videosResponse);
    $httpBackend.when('GET', '/searchWords').respond(200, searchWordsResponse);
    $httpBackend.when('POST', '/searchWords').respond(201);
    $httpBackend.flush();
  }));

  afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

  it('should exist', function () {
    var controller = createController();
    expect(controller).toBeDefined();
    $httpBackend.flush();
  });

  describe('getFavorites', function () {
      it('should exist', function () {
        var controller = createController();
        $httpBackend.flush();
        expect($scope.getFavorites).toBeDefined();
      });

      it('should get embeddable favorites', function () {
        var controller = createController();
        $scope.getFavorites($scope.searchWord);
        $httpBackend.flush();
        expect($scope.favVideos[0].title).toBe('Ryan Adams - Lucky Now');
        expect($scope.favVideos[0].embedUrl).toBeDefined();
        expect($scope.isEndOfList).toBe(true);
        expect($scope.searchWordMessage).toBe('All');
        expect($scope.shownFavoriteID).toBe(null);
        expect($scope.shownVideoID).toBe(null);
        expect($scope.youTubeVideos).toBe(null);
        expect($scope.videoListIndex).toBe(0);
      });
    });

  describe('addSearchWord', function () {
      it('should exist', function () {
        var controller = createController();
        $httpBackend.flush();
        expect($scope.addSearchWord).toBeDefined();
      });
    });
});
