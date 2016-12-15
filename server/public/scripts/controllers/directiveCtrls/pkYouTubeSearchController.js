(function () {
'use strict';

myApp.controller('pkYouTubeSearchController',
                ['$scope', 'YouTubeFactory',
        function ($scope, YouTubeFactory) {

  var youTubeFactory = YouTubeFactory;

  $scope.keywords;
  $scope.youTubeSearchParams = [
    { parameter: 'relevance' },
    { parameter: 'date' },
    { parameter: 'rating' },
  ];
  $scope.sortBy = $scope.youTubeSearchParams[0];

  // Scope functions
  $scope.resetScope = function () {
    $scope.shownFavoriteID = null;
    $scope.shownVideoID = null;
    $scope.youTubeVideos = null;
    $scope.favVideos = null;
    $scope.videoListIndex = 0;
  };

  $scope.getYouTubeVideos = function () {
    youTubeFactory.getYouTubeVideos($scope.keywords, $scope.sortBy).then(function (response) {
      $scope.resetScope();
      $scope.youTubeVideos = response;
      $scope.isEndOfList = response.length <= 10 ? true : false;
    });
  };
},
]);
})();
