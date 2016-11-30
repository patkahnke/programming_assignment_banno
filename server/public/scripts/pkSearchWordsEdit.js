myApp.directive('pkSearchWordsEdit', function () {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'views/templates/pkSearchWordsEdit.html',
    controller: 'pkSearchWordsEditController',
  };
});
