myApp.directive('pkFavoritesSearch', function () {
  return {
    restrict: 'E',
    replace: false,
    templateUrl: 'views/templates/pkFavoritesSearch.html',
    controller: 'pkFavoritesSearchController',
  };
});
