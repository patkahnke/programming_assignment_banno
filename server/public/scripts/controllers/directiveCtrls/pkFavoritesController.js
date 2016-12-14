(function () {
'use strict';

myApp.controller('pkFavoritesController',
                ['$scope', 'DatabaseFactory',
        function ($scope, DatabaseFactory) {

    var databaseFactory = DatabaseFactory;

    $scope.shownFavoriteID;

    // Scope functions
    $scope.deleteFavorite = function (favVideo) {
      databaseFactory.deleteFavorite(favVideo.favorite_id).then(function () {
          $scope.getFavorites($scope.searchWord);
        });
    };

    $scope.showFavoriteVideo = function (video) {
      $scope.shownFavoriteID = video.videoid;
    };
  },
]);
})();
