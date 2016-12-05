myApp.controller('pkFavoritesController',
                ['$scope',
        function ($scope) {

    $scope.shownFavoriteID;

    // Scope functions
    $scope.deleteFavorite = function (favVideo) {
      $scope.databaseFactory.deleteFavorite(favVideo.favorite_id).then(function () {
        $scope.databaseFactory.refreshFavorites($scope.searchWord).then(function () {
          $scope.getFavorites();
        });
      });
    };

    $scope.showFavoriteVideo = function (video) {
      $scope.shownFavoriteID = video.videoid;
    };
  },
]);
