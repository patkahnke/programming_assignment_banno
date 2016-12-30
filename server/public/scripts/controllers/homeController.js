(function () {
'use strict';

myApp.controller('homeController',
                ['$scope', '$http', '$location',
        function ($scope, $http, $location) {

  // Main objects containing Favorite videos and YouTube videos
  $scope.favVideos;
  $scope.youTubeVideos;

  $scope.videoListIndex;
  $scope.isEndOfList;
  $scope.userName;

  console.log('checking user');
  $http.get('/user').then(function(response) {
      if(response.data.username) {
          // user has a current session on the server
          $scope.userName = response.data.username;
          console.log('User Data: ', $scope.userName);
      } else {
          // user has no session, bounce them back to the login page
          $location.path('/login');
      }
  });

  $scope.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path('/login');
    });
  }

  $scope.increaseIndex = function (videos) {
    $scope.videoListIndex += 10;
    $scope.isEndOfList = $scope.videoListIndex >= videos.length - 10 ? true : false;
  };
},
]);
})();
