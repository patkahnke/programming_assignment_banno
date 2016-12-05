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

  $scope.videoListIndex;
  $scope.isEndOfList;

  // Scope function used in both pkYouTube and pkFavorites directives
  $scope.increaseIndex = function (videos) {
    $scope.videoListIndex += 10;
    $scope.isEndOfList = $scope.videoListIndex >= videos.length - 10 ? true : false;
  };
},
]);
