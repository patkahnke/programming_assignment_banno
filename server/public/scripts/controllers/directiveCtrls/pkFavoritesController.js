myApp.controller('pkFavoritesController',
                ['$scope',
        function ($scope) {

    // Scope variables (Specific to this directive)
    $scope.favVideos;

    // Scope functions
    $scope.deleteFavorite = function (favVideo) {
      $scope.databaseFactory.deleteFavorite(favVideo.favorite_id).then(function () {
        $scope.databaseFactory.refreshFavorites($scope.searchWord).then(function () {
          $scope.getFavorites();
          console.log('$scope.searchWord: ', $scope.searchWord);
        });
      });
    };

    $scope.showFavoriteVideo = function (video) {
      $scope.selectedId = video.videoid;
    };
  },
]);
