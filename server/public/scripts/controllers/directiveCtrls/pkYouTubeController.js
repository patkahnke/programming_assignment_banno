(function () {
'use strict';

myApp.controller('pkYouTubeController',
                ['$scope', '$timeout',
                'updateVideosService',
                'DatabaseFactory',
        function ($scope, $timeout,
                  updateVideosService,
                  DatabaseFactory) {

  var databaseFactory = DatabaseFactory;

  $scope.selectedVideoID;
  $scope.shownVideoID;
  $scope.favoriteAdded;
  $scope.isAlreadyFav;

  // Scope functions
  $scope.addFavorite = function (video) {
    databaseFactory.createFavorite(video).then(function () {
      $scope.favoriteAdded = true;
      $scope.selectedVideoID = video.id;
      $scope.youTubeVideos = updateVideosService.updateVids(video, $scope.youTubeVideos);
    });
  };

  $scope.alreadyFavorite = function (video) {
    $scope.selectedVideoID = video.id;
    $scope.isAlreadyFav = true;
    $timeout(function () {
        $scope.isAlreadyFav = false;
      }, 1500);
  };

  $scope.showYouTubeVideo = function (video) {
    $scope.shownVideoID = video.id;
  };
},
]);
})();
