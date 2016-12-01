myApp.controller('pkYouTubeController',
                ['$scope', '$timeout',
                'updateVideosService',
        function ($scope, $timeout,
                  updateVideosService) {

  // Scope Variables (Specific to this directive)
  $scope.youTubeVideos;
  $scope.index;
  $scope.limitReached;
  $scope.favoriteAdded;
  $scope.already;

  // Scope functions
  $scope.addFavorite = function (video) {
    $scope.databaseFactory.createFavorite(video).then(function () {
      $scope.favoriteAdded = true;
      $scope.selectedVideo = video.id;
      $scope.youTubeVideos = updateVideosService.updateVids(video, $scope.youTubeVideos);
    });
  };

  $scope.increaseIndex = function (videos) {
    $scope.index += 10;
    if ($scope.index >= (videos.length - 10)) {
      $scope.limitReached = true;
    };
  };

  $scope.alreadyFavorite = function (video) {
    $scope.selectedID = video.id;
    $scope.already = true;
    $timeout(function(){$scope.already = false}, 1500);
  };

  $scope.showYouTubeVideo = function (video) {
    $scope.selectedId = video.id;
  };
},
]);
