(function () {
'use strict';

myApp.controller('pkFavoritesSearchController',
                ['$scope', '$timeout',
                'DatabaseFactory',
                'searchWordService',
        function ($scope, $timeout,
                  DatabaseFactory,
                  searchWordService) {

  // Factories
  var databaseFactory = DatabaseFactory;

  // Object containing searchWords for the select list
  $scope.searchWords;

  $scope.searchWord;
  $scope.newSearchWord;
  $scope.searchWordMessage;
  $scope.isAlreadySearchWord;
  $scope.isAdded;
  $scope.isDeleted;

  // Scope functions
  $scope.resetScope = function () {
    $scope.shownFavoriteID = null;
    $scope.shownVideoID = null;
    $scope.youTubeVideos = null;
    $scope.favVideos = null;
    $scope.videoListIndex = 0;
  };

  $scope.getSearchWords = function () {
    databaseFactory.refreshSearchWords().then(function () {
      $scope.searchWords = databaseFactory.getSearchWords();
    });
  };

  $scope.getFavorites = function (searchWord) {
    databaseFactory.refreshFavorites(searchWord).then(function () {
      $scope.resetScope();
      $scope.favVideos = databaseFactory.getFavorites();
      $scope.isEndOfList = $scope.favVideos.length <= 10 ? true : false;
      $scope.searchWordMessage = !searchWord ? 'All' : searchWord.parameter;
    });
  };

  $scope.addSearchWord = function () {
    $scope.isAlreadySearchWord = searchWordService.isSearchWord($scope.searchWords, $scope.newSearchWord);
    if (!$scope.isAlreadySearchWord) {
      databaseFactory.createSearchWord($scope.newSearchWord).then(function () {
        databaseFactory.refreshSearchWords().then(function () {
          $scope.getSearchWords();
          $scope.isAdded = searchWordService.isSearchWord($scope.searchWords, $scope.newSearchWord);
          $scope.newSearchWord = null;
          $timeout(function () {
              $scope.isAdded = false;
            }, 1500);
        });
      });
    } else {
      $scope.newSearchWord = null;
      $timeout(function () {
          $scope.isAlreadySearchWord = false;
        }, 1500);
    }
  };

  $scope.deleteSearchWord = function () {
    databaseFactory.deleteSearchWord($scope.searchWordToDelete).then(function () {
      databaseFactory.refreshSearchWords().then(function () {
          $scope.searchWord = null;
          $scope.getSearchWords();
          $scope.isDeleted = !searchWordService.isSearchWord($scope.searchWords, $scope.newSearchWord);
          $timeout(function () {
              $scope.isDeleted = false;
            }, 1500);
        });
    });
  };

  $scope.getSearchWords();
},
]);
})();
