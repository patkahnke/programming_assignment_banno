myApp.controller('pkFavoritesSearchController',
                ['$scope', '$timeout',
                'DatabaseFactory',
                'searchWordService',
        function ($scope, $timeout,
                  DatabaseFactory,
                  searchWordService) {

  // Factories
  databaseFactory = DatabaseFactory;

  // Object containing searchWords for the select list
  $scope.searchWords;

  $scope.isAlreadySearchWord;
  $scope.isAdded;
  $scope.isDeleted;
  $scope.newSearchWord;
  $scope.searchWordMessage;

  // Scope functions
  $scope.getSearchWords = function () {
    databaseFactory.refreshSearchWords().then(function () {
      $scope.searchWords = databaseFactory.getSearchWords();
    });
  };

    $scope.getFavorites = function (searchWord) {
      $scope.databaseFactory.refreshFavorites(searchWord).then(function () {
        $scope.shownFavoriteID = null;
        $scope.youTubeVideos = null;
        $scope.favVideos = $scope.databaseFactory.getFavorites();
        $scope.videoListIndex = 0;
        $scope.isEndOfList = $scope.favVideos.length <= 10 ? true : false;
        $scope.searchWordMessage = searchWord === undefined || searchWord === null ? 'All' : searchWord.parameter;
      });
    };

  $scope.addSearchWord = function () {
    $scope.isAlreadySearchWord = searchWordService.isSearchWord($scope.searchWords, $scope.newSearchWord);
    if (!$scope.isAlreadySearchWord) {
      databaseFactory.createSearchWord($scope.newSearchWord).then(function () {
        databaseFactory.refreshSearchWords().then(function () {
          $scope.getSearchWords();
          $scope.isAdded = searchWordService.isSearchWord($scope.searchWords, $scope.newSearchWord);
          $timeout(function(){$scope.isAdded = false}, 1500);
          $scope.newSearchWord = null;
        });
      });
    } else {
      $timeout(function(){$scope.isAlreadySearchWord = false}, 1500);
      $scope.newSearchWord = null;
    };
  };

  $scope.deleteSearchWord = function () {
    databaseFactory.deleteSearchWord($scope.searchWordToDelete).then(function () {
      databaseFactory.refreshSearchWords().then(function () {
          $scope.searchWord = undefined;
          $scope.getSearchWords();
          $scope.isDeleted = !searchWordService.isSearchWord($scope.searchWords, $scope.newSearchWord);
          $timeout(function(){$scope.isDeleted = false}, 1500);
        });
    });
  };

  $scope.getSearchWords();
},
]);
