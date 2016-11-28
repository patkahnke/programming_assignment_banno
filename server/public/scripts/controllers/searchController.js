myApp.controller('searchController',
                ['$scope',
                'YoutubeFactory',
                'DatabaseFactory',
                'updateVideosService',
        function ($scope,
                  YoutubeFactory,
                  DatabaseFactory,
                  updateVideosService) {

  //Factories
  youtubeFactory = YoutubeFactory;
  databaseFactory = DatabaseFactory;

  // Scope Variables
  $scope.videos;
  $scope.favoriteAdded = false;

  // Database Search select menu
  $scope.searchWord;
  $scope.databaseSearchWords;

  // YouTube Search select menu
  $scope.sortBy;
  $scope.youtubeSearchParams = [
    { parameter: 'date' },
    { parameter: 'rating' },
    { parameter: 'relevance' },
  ];

  // Scope functions
  $scope.getYoutubeVideos = function () {
    youtubeFactory.getVideoIds($scope.keywords, $scope.sortBy).then(function () {
      youtubeFactory.getVideosData().then(function () {
        $scope.videos = youtubeFactory.formatVideos();
      });
    });
  };

  $scope.addFavorite = function (video) {
    databaseFactory.createFavorite(video).then(function () {
      $scope.favoriteAdded = true;
      $scope.selectedVideo = video.id;
      $scope.videos = updateVideosService.updateVids(video, $scope.videos);
    });
  };

  $scope.getSearchWords = function () {
    databaseFactory.refreshSearchWords().then(function () {
      $scope.databaseSearchWords = databaseFactory.getSearchWords();
    });
  };

  $scope.addSearchWord = function () {
    databaseFactory.createSearchWord($scope.newSearchWord).then(function () {
      databaseFactory.refreshSearchWords().then(function () {
          $scope.searchWord = undefined;
          $scope.getSearchWords();
        });
    });
  };

  $scope.deleteSearchWord = function () {
    databaseFactory.deleteSearchWord($scope.searchWordToDelete).then(function () {
      databaseFactory.refreshSearchWords().then(function () {
          $scope.searchWord = undefined;
          $scope.getSearchWords();
        });
    });
  };

  $scope.assignSearchWord = function (searchWord, video) {
    databaseFactory.assignSearchWord(searchWord, video);
    $scope.searchWord = undefined;
  };

  $scope.getSearchWords();
},
]);
