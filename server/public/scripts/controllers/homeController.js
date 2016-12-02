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
},
]);
