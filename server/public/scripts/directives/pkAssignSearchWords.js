myApp.directive('pkAssignSearchWords', function () {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'views/templates/pkAssignSearchWords.html',
    controller: 'pkAssignSearchWordsController',
  };
});
