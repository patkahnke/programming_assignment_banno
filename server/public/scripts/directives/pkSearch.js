myApp.directive('pkSearch', function () {
  return {
    restrict: 'E',
    replace: false,
    templateUrl: 'views/templates/pkSearch.html',
    controller: 'pkSearchController',
  };
});
