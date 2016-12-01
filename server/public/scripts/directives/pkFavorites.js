myApp.directive('pkFavorites', function () {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'views/templates/pkFavoritesSearch.html',
    controller: 'pkFavoritesController',
  };
});
