myApp.controller('pkFavoritesController',
                ['$scope',
                'DatabaseFactory',
        function ($scope,
                DatabaseFactory) {

    var databaseFactory = DatabaseFactory;

    // Scope variables
    $scope.favVideos;

    // Scope functions
    $scope.getFavorites = function (searchWord) {
      databaseFactory.refreshFavorites(searchWord).then(function () {
        $scope.youTubeVideos = undefined;
        $scope.limitReached = false;
        $scope.index = 0;
        $scope.favVideos = databaseFactory.getFavorites();
        if (searchWord === undefined || searchWord === null) {
          $scope.searchWordMessage = 'All';
        } else {
          $scope.searchWordMessage = searchWord.parameter;
        };
      });
    };

    $scope.deleteFavorite = function (favVideo) {
      databaseFactory.deleteFavorite(favVideo.favorite_id).then(function () {
        databaseFactory.refreshFavorites().then(function () {
          $scope.searchWord = undefined;
          $scope.getFavorites();
        });
      });
    };

    $scope.showVideo = function (favVideo) {
      $scope.selectedId = favVideo.videoid;
    };
  },
]);
