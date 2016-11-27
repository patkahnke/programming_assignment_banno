myApp.controller('searchController',
                ['$scope',
                'YoutubeFactory',
                'DatabaseFactory',
                'updateVideosService',
        function ($scope,
                  YoutubeFactory,
                  DatabaseFactory,
                  updateVideosService) {
                    
console.log('searchController is running');
  //Factories
  youtubeFactory = YoutubeFactory;
  databaseFactory = DatabaseFactory;

  // Scope Variables
  $scope.videos;
  $scope.favoriteAdded = false;
  $scope.searchBy = 1;

  // Database Search select menu
  $scope.searchWord = {};
  $scope.databaseSearchParams;

  // YouTube Search select menu
  $scope.sortBy = {};
  $scope.youtubeSearchParams = [
    { parameter: 'date' },
    { parameter: 'rating' },
    { parameter: 'relevance' },
  ];

  //Scope functions
  $scope.getYoutubeVideos = function () {
    youtubeFactory.getVideoIds($scope.keywords, $scope.sortBy).then(function () {
      youtubeFactory.getVideosData().then(function () {
        $scope.videos = youtubeFactory.formatVideosData();
      });
    });
  };

  $scope.addFavorite = function (video) {
    databaseFactory.createFavorite(video).then(function () {
      $scope.favoriteAdded = true;
      $scope.selectedVideo = video.id;
      $scope.videos = updateVideosService.updateVids(video, $scope.videos, $scope.searchWord);
    });
  };

  $scope.getSearchParams = function () {
    databaseFactory.refreshSearchWords().then(function () {
      $scope.databaseSearchParams = databaseFactory.getSearchWords();
    });
  };

  $scope.assignSearchWord = function (searchWord, video) {
    databaseFactory.assignSearchWord(searchWord, video);
  };

  $scope.getSearchParams();
},
]);
