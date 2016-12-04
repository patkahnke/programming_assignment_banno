myApp.directive('pkSearchWordsEdit', function () {
  return {
    restrict: 'E',
    replace: false,
    templateUrl: 'views/templates/pkSearchWordsEdit.html',
    controller: 'pkSearchWordsEditController',
  };
});
