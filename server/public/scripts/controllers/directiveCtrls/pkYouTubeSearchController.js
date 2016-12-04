myApp.controller('pkYouTubeSearchController',
                ['$scope',
        function ($scope) {

  // Scope Variables (specific to this directive)
  $scope.selectedID;
  $scope.keywords;
  $scope.youTubeSearchParams = [
    { parameter: 'relevance' },
    { parameter: 'date' },
    { parameter: 'rating' },
  ];
  $scope.sortBy = $scope.youTubeSearchParams[0];

  // Scope functions
  $scope.getYouTubeVideos = function () {
    $scope.selectedId = undefined;
    $scope.youTubeFactory.getYouTubeVideos($scope.keywords, $scope.sortBy).then(function (response) {
      $scope.favVideos = undefined;
      $scope.youTubeVideos = response;
      $scope.index = 0;
      $scope.limitReached = response.length <= 10 ? true : false;
    });
  };
},
]);
