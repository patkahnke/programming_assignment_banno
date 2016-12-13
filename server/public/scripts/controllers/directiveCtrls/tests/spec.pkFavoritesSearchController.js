describe('pkFavoritesSearchController', function () {
  var $controller;
  var $httpBackend;
  var pkFavoritesSearchController;
  var $scope;
  var $timeout;
  var databaseFactory;
  var searchWordService;
  var videosResponse = [{
          title: 'Silly Puppies',
          videoId: 'AplhZ3Dpcwc',
          thumbnail: 'someURLString',
          date_added: 'Dec 2, 2016 5:22:00 PM',
        },
      ];
  var searchWordsResponse = {
      search_word: 'puppies',
      search_word_id: 0,
    };

  // beforeEach(angular.mock.module('ngRoute'));
  beforeEach(angular.mock.module('myApp'));

  beforeEach(inject(function (_$controller_, _$httpBackend_, $rootScope, _$timeout_, _DatabaseFactory_, _searchWordService_) {
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
  }));

  it('should exist', function () {
    var controller = createController();
    expect(controller).toBeDefined();
  });

  // afterEach(function () {
  //     $httpBackend.verifyNoOutstandingExpectation();
  //     $httpBackend.verifyNoOutstandingRequest();
  //   });

  describe('getFavorites', function () {

    it('should exist', function () {
      var controller = createController();
      expect($scope.getFavorites).toBeDefined();
    });

    // Spy and force the return value when UsersFactory.all() is called
    spyOn($scope.databaseFactory, 'all').and.callFake(function() {
      return videosResponse;
    });

    it ('should get favorites', function () {
      var controller = createController();

      $scope.searchWord = 'silly';

        $httpBackend.expect('GET', '/favorites')
            .respond(200, videosResponse);

        $scope.$apply(function () {
            $scope.getFavorites($scope.searchWord);
          });

          $httpBackend.flush();

        expect($scope.favVideos).toEqual(videosResponse);
    })

      // expect(scope.retrievedUrls).toEqual(["http://www.google.com", "http://angularjs.org", "http://amazon.com"]);
      // expect(scope.parseOriginalUrlStatus).toEqual('waiting');
      // expect(scope.doneScrapingOriginalUrl).toEqual(true);
    });


});
