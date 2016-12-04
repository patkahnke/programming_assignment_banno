myApp.controller('pkFavoritesSearchController',
                ['$scope', '$timeout',
                'DatabaseFactory',
                'searchWordService',
        function ($scope, $timeout,
                  DatabaseFactory,
                  searchWordService) {

  // Factories
  databaseFactory = DatabaseFactory;

  // Scope Variables
  $scope.searchWordAdded;
  $scope.alreadySearchWord;
  $scope.newSearchWord;
  $scope.searchWords;
  $scope.added;

  // Scope functions
  $scope.getSearchWords = function () {
    databaseFactory.refreshSearchWords().then(function () {
      $scope.searchWords = databaseFactory.getSearchWords();
    });
  };

    $scope.getFavorites = function (searchWord) {
      $scope.selectedId = undefined;
      $scope.databaseFactory.refreshFavorites(searchWord).then(function () {
        $scope.youTubeVideos = undefined;
        $scope.favVideos = $scope.databaseFactory.getFavorites();
        $scope.limitReached = $scope.favVideos.length <= 10 ? true : false;
        $scope.index = 0;
        $scope.searchWordMessage = searchWord === undefined || searchWord === null ? 'All' : searchWord.parameter;
      });
    };

  $scope.addSearchWord = function () {
    $scope.alreadySearchWord = searchWordService.isSearchWord($scope.searchWords, $scope.newSearchWord);
    if (!$scope.alreadySearchWord) {
      databaseFactory.createSearchWord($scope.newSearchWord).then(function () {
        databaseFactory.refreshSearchWords().then(function () {
          $scope.getSearchWords();
          $scope.added = searchWordService.isSearchWord($scope.searchWords, $scope.newSearchWord);
          $scope.newSearchWord = undefined;
          $timeout(function(){$scope.added = undefined}, 1500);
        });
      });
    } else {
      $timeout(function(){$scope.alreadySearchWord = undefined}, 1500);
      $scope.newSearchWord = undefined;
    };
  };

  $scope.deleteSearchWord = function () {
    databaseFactory.deleteSearchWord($scope.searchWordToDelete).then(function () {
      databaseFactory.refreshSearchWords().then(function () {
          $scope.searchWord = undefined;
          $scope.getSearchWords();
          $scope.deleted = !searchWordService.isSearchWord($scope.searchWords, $scope.newSearchWord);
          $timeout(function(){$scope.deleted = undefined}, 1500);
        });
    });
  };

  $scope.getSearchWords();
},
]);
