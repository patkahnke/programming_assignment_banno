myApp.controller('pkAssignSearchWordsController',
                ['$scope', '$timeout',
                'DatabaseFactory',
        function ($scope, $timeout,
                  DatabaseFactory) {

  // Factories
  databaseFactory = DatabaseFactory;

  // Scope Variables (Specific to this directive)
  $scope.assigned;

  // Scope Functions
  $scope.assignSearchWord = function (searchWord, video) {
    databaseFactory.assignSearchWord(searchWord, video);
    $scope.selectedID = video.id;
    $scope.assigned = true;
    $scope.searchWord = undefined;
    $timeout($scope.assigned = undefined, 1500);
  };
},
]);
