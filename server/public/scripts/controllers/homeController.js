myApp.controller('homeController',
                ['$scope',
                'YouTubeFactory',
                'DatabaseFactory',
        function ($scope,
                  YouTubeFactory,
                  DatabaseFactory) {

  // Factories
  $scope.youTubeFactory = YouTubeFactory;
  $scope.databaseFactory = DatabaseFactory;

  // Main objects containing Favorite videos and YouTube videos
  $scope.favVideos;
  $scope.youTubeVideos;

  // Scope Variables used in more than one directive
  $scope.searchWord;
  $scope.videoListIndex;
  $scope.isEndOfList;

  // Scope function used in more than one directive
  $scope.increaseIndex = function (videos) {
    $scope.videoListIndex += 10;
    if ($scope.videoListIndex >= (videos.length - 10)) {
      $scope.isEndOfList = true;
    };
  };
},
]);
