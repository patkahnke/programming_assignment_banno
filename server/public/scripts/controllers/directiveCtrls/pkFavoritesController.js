myApp.controller('pkFavoritesController',
                ['$scope',
        function ($scope) {

    // Scope variables (Specific to this directive)
    $scope.favVideos;

    // Scope functions
    $scope.getFavorites = function (searchWord) {
      $scope.databaseFactory.refreshFavorites(searchWord).then(function () {
        $scope.youTubeVideos = undefined;
        $scope.favVideos = $scope.databaseFactory.getFavorites();
        $scope.limitReached = $scope.favVideos.length <= 10 ? true : false;
        $scope.index = 0;
        $scope.searchWordMessage = searchWord === undefined || searchWord === null ? 'All' : searchWord.parameter;
      });
    };

    $scope.deleteFavorite = function (favVideo) {
      $scope.databaseFactory.deleteFavorite(favVideo.favorite_id).then(function () {
        $scope.databaseFactory.refreshFavorites().then(function () {
          $scope.searchWord = undefined;
          $scope.getFavorites();
        });
      });
    };

    $scope.showFavoriteVideo = function (video) {
      $scope.selectedId = video.videoid;
    };
  },
]);
