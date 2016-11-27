myApp.controller('favoritesController',
                ['$scope',
                'DatabaseFactory',
        function ($scope,
                DatabaseFactory) {

    var databaseFactory = DatabaseFactory;

    // Scope variables
    $scope.favVideos;
    $scope.selectedId;
    $scope.newSearchWord;

    // Database search select menu
    $scope.searchBy = {};
    $scope.searchWords;

    // Scope functions
    $scope.getFavorites = function (searchBy) {
      databaseFactory.refreshFavorites(searchBy).then(function () {
        $scope.favVideos = databaseFactory.getFavorites();
      });
    };

    $scope.deleteFavorite = function (favVideo) {
      databaseFactory.deleteFavorite(favVideo.favorite_id).then(function () {
        databaseFactory.refreshFavorites().then(function () {
          $scope.getFavorites();
        });
      });
    };

    // $scope.showVideo = function (favVideo) {
    //   $scope.selectedId = favVideo.videoid;
    // };

    $scope.addSearchWord = function () {
      databaseFactory.createSearchWord($scope.newSearchWord).then(function () {
        databaseFactory.refreshSearchWords().then(function () {
            $scope.getSearchWords();
          });
      });
    };

    $scope.getSearchWords = function () {
      databaseFactory.refreshSearchWords().then(function () {
        $scope.searchWords = databaseFactory.getSearchWords();
      });
    };

    $scope.getSearchWords();

    //Close search controller
  },
]);
