myApp.controller('pkFavoritesController',
                ['$scope',
        function ($scope) {

    $scope.shownFavoriteID;

    // Scope functions
    $scope.deleteFavorite = function (favVideo) {
      $scope.databaseFactory.deleteFavorite(favVideo.favorite_id).then(function () {
          $scope.getFavorites($scope.searchWord);
        });
    };

    $scope.showFavoriteVideo = function (video) {
      $scope.shownFavoriteID = video.videoid;
    };
  },
]);
