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
    $scope.searchWordToDelete;

    // Database Search select menu
    $scope.searchWord;
    $scope.databaseSearchWords;

    // Scope functions
    $scope.getFavorites = function (searchWord) {
      databaseFactory.refreshFavorites(searchWord).then(function () {
        $scope.favVideos = databaseFactory.getFavorites();
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

    $scope.getSearchWords = function () {
      databaseFactory.refreshSearchWords().then(function () {
        $scope.databaseSearchWords = databaseFactory.getSearchWords();
      });
    };

    $scope.assignSearchWord = function (searchWord, favVideo) {
      databaseFactory.assignSearchWord(searchWord, favVideo);
      $scope.searchWord = undefined;
    };

    $scope.addSearchWord = function () {
      databaseFactory.createSearchWord($scope.newSearchWord).then(function () {
        databaseFactory.refreshSearchWords().then(function () {
            $scope.searchWord = undefined;
            $scope.getSearchWords();
          });
      });
    };

    $scope.deleteSearchWord = function () {
      databaseFactory.deleteSearchWord($scope.searchWordToDelete).then(function () {
        databaseFactory.refreshSearchWords().then(function () {
            $scope.searchWord = undefined;
            $scope.getSearchWords();
          });
      });
    };

    $scope.getSearchWords();

    //Close search controller
  },
]);
