(function () {
'use strict';

myApp.controller('pkAssignSearchWordsController',
                ['$scope', '$timeout',
                'DatabaseFactory',
        function ($scope, $timeout,
                  DatabaseFactory) {

  // Factories
  var databaseFactory = DatabaseFactory;

  $scope.assignedVideoID;
  $scope.isAssigned;

  // Scope Functions
  $scope.assignSearchWord = function (searchWord, video) {
    databaseFactory.assignSearchWord(searchWord, video);
    $scope.assignedVideoID = video.id;
    $scope.isAssigned = true;
    $scope.searchWord = null;
    $timeout(function(){$scope.isAssigned = false}, 1500);
  };
},
]);
})();
