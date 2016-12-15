(function () {
'use strict';

myApp.controller('homeController',
                ['$scope',
        function ($scope) {

  // Main objects containing Favorite videos and YouTube videos
  $scope.favVideos;
  $scope.youTubeVideos;

  $scope.videoListIndex;
  $scope.isEndOfList;

  $scope.increaseIndex = function (videos) {
    $scope.videoListIndex += 10;
    $scope.isEndOfList = $scope.videoListIndex >= videos.length - 10 ? true : false;
  };
},
]);
})();
