myApp.controller('pkYouTubeSearchController',
                ['$scope',
        function ($scope) {

  $scope.keywords;
  $scope.youTubeSearchParams = [
    { parameter: 'relevance' },
    { parameter: 'date' },
    { parameter: 'rating' },
  ];
  $scope.sortBy = $scope.youTubeSearchParams[0];

  // Scope functions
  $scope.getYouTubeVideos = function () {
    $scope.youTubeFactory.getYouTubeVideos($scope.keywords, $scope.sortBy).then(function (response) {
      $scope.shownVideoID = null;
      $scope.favVideos = null;
      $scope.youTubeVideos = response;
      $scope.videoListIndex = 0;
      $scope.isEndOfList = response.length <= 10 ? true : false;
    });
  };
},
]);
