(function () {
'use strict';

myApp.controller('pkFavoritesSearchController',
                ['$scope', '$timeout',
                'DatabaseFactory',
                'searchWordService',
        function ($scope, $timeout,
                  DatabaseFactory,
                  searchWordService) {

  // // Factories
  // var databaseFactory = DatabaseFactory;

  // Object containing searchWords for the select list
  $scope.searchWords;

  $scope.searchWord;
  $scope.newSearchWord;
  $scope.searchWordMessage;
  $scope.isAlreadySearchWord;
  $scope.isAdded;
  $scope.isDeleted;

  // Scope functions
  $scope.getSearchWords = function () {
    $scope.databaseFactory.refreshSearchWords().then(function () {
      $scope.searchWords = $scope.databaseFactory.getSearchWords();
    });
  };

  $scope.getFavorites = function (searchWord) {
    $scope.databaseFactory.refreshFavorites(searchWord).then(function () {
      $scope.resetScope();
      $scope.favVideos = $scope.databaseFactory.getFavorites();
      $scope.isEndOfList = $scope.favVideos.length <= 10 ? true : false;
      $scope.searchWordMessage = !searchWord ? 'All' : searchWord.parameter;
    });
  };

  $scope.addSearchWord = function () {
    $scope.isAlreadySearchWord = searchWordService.isSearchWord($scope.searchWords, $scope.newSearchWord);
    if (!$scope.isAlreadySearchWord) {
      $scope.databaseFactory.createSearchWord($scope.newSearchWord).then(function () {
        $scope.databaseFactory.refreshSearchWords().then(function () {
          $scope.getSearchWords();
          $scope.isAdded = searchWordService.isSearchWord($scope.searchWords, $scope.newSearchWord);
          $timeout(function(){$scope.isAdded = false}, 1500);
          $scope.newSearchWord = null;
        });
      });
    } else {
      $timeout(function(){$scope.isAlreadySearchWord = false}, 1500);
      $scope.newSearchWord = null;
    }
  };

  $scope.deleteSearchWord = function () {
    $scope.databaseFactory.deleteSearchWord($scope.searchWordToDelete).then(function () {
      $scope.databaseFactory.refreshSearchWords().then(function () {
          $scope.searchWord = null;
          $scope.getSearchWords();
          $scope.isDeleted = !searchWordService.isSearchWord($scope.searchWords, $scope.newSearchWord);
          $timeout(function(){$scope.isDeleted = false}, 1500);
        });
    });
  };

  $scope.getSearchWords();
},
]);
})();
