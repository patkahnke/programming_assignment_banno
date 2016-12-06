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

  // Scope functions used in both pkYouTube and pkFavorites directives
  $scope.resetScope = function () {
    $scope.shownFavoriteID = null;
    $scope.youTubeVideos = null;
    $scope.favVideos = null;
    $scope.videoListIndex = 0;
  };

  $scope.increaseIndex = function (videos) {
    $scope.videoListIndex += 10;
    $scope.isEndOfList = $scope.videoListIndex >= videos.length - 10 ? true : false;
  };
},
]);
