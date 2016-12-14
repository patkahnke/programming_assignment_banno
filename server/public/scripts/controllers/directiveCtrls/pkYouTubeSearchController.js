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
