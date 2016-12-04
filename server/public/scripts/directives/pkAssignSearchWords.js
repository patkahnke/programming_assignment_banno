myApp.directive('pkAssignSearchWords', function () {
  return {
    restrict: 'E',
    replace: false,
    templateUrl: 'views/templates/pkAssignSearchWords.html',
    controller: 'pkAssignSearchWordsController',
  };
});
