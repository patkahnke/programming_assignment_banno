myApp.controller('homeController',
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
  $scope.youTubeVideos;
  $scope.index;
  $scope.limitReached;
  $scope.favoriteAdded;
  $scope.selectedID;
  $scope.already;
  $scope.youTubeSearchParams = [
    { parameter: 'relevance' },
    { parameter: 'date' },
    { parameter: 'rating' },
  ];
  $scope.sortBy = $scope.youTubeSearchParams[0];

  // Scope functions
  $scope.getYouTubeVideos = function () {
    databaseFactory.refreshFavorites().then(function () {
      youTubeFactory.getYouTubeVideos($scope.keywords, $scope.sortBy).then(function (response) {
        $scope.favVideos = undefined;
        $scope.youTubeVideos = response;
        $scope.index = 0;
        $scope.limitReached = response.length <= 10 ? true : false;
      });
    });
  };

  $scope.addFavorite = function (video) {
    databaseFactory.createFavorite(video).then(function () {
      $scope.favoriteAdded = true;
      $scope.selectedVideo = video.id;
      $scope.youTubeVideos = updateVideosService.updateVids(video, $scope.youTubeVideos);
    });
  };

  $scope.increaseIndex = function (videos) {
    $scope.index += 10;
    console.log('$scope.index: ', $scope.index);
    console.log('videos.length: ', videos.length);
    if ($scope.index >= (videos.length - 10)) {
      $scope.limitReached = true;
    };
  };

  $scope.alreadyFavorite = function (video) {
    $scope.selectedID = video.id;
    $scope.already = true;
    $timeout(function(){$scope.already = false}, 1500);
  };
},
]);
