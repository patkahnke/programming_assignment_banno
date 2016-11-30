myApp.controller('searchController',
                ['$scope', '$timeout',
                'YouTubeFactory',
                'DatabaseFactory',
                'updateVideosService',
        function ($scope, $timeout,
                  YouTubeFactory,
                  DatabaseFactory,
                  updateVideosService) {

  // Factories
  youTubeFactory = YouTubeFactory;
  databaseFactory = DatabaseFactory;

  // Scope Variables
  $scope.keywords;
  $scope.videos;
  $scope.index;
  $scope.limitReached;
  $scope.favoriteAdded;
  $scope.selectedID;
  $scope.youtubeSearchParams = [
    { parameter: 'relevance' },
    { parameter: 'date' },
    { parameter: 'rating' },
  ];
  $scope.sortBy = $scope.youtubeSearchParams[0];

  // Scope functions
  $scope.getYouTubeVideos = function () {
    youTubeFactory.getYouTubeVideos($scope.keywords, $scope.sortBy).then(function (response) {
      $scope.videos = response;
      $scope.index = 0;
      $scope.limitReached = false;
    });
  };

  $scope.addFavorite = function (video) {
    databaseFactory.createFavorite(video).then(function () {
      $scope.favoriteAdded = true;
      $scope.selectedVideo = video.id;
      $scope.videos = updateVideosService.updateVids(video, $scope.videos);
    });
  };
  //
  // $scope.assignSearchWord = function (searchWord, video) {
  //   databaseFactory.assignSearchWord(searchWord, video);
  //   $scope.selectedID = video.id;
  //   $scope.assigned = true;
  //   $scope.searchWord = undefined;
  //   $timeout(function(){$scope.assigned = false}, 1500);
  // };

  $scope.increaseIndex = function () {
    $scope.index += 10;
    if ($scope.index === 40) {
      $scope.limitReached = true;
    };
  };
},
]);
