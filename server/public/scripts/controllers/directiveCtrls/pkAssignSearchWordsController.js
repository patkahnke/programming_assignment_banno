myApp.controller('pkAssignSearchWordsController',
                ['$scope', '$timeout',
                'DatabaseFactory',
        function ($scope, $timeout,
                  DatabaseFactory) {

  // Factories
  databaseFactory = DatabaseFactory;

  // Scope Variables
  $scope.assigned;

  // Scope Functions
  $scope.assignSearchWord = function (searchWord, video) {
    databaseFactory.assignSearchWord(searchWord, video);
    $scope.selectedID = video.id;
    $scope.assigned = true;
    $scope.searchWord = undefined;
    $timeout(function(){$scope.assigned = false}, 1500);
  };
},
]);
