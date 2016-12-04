myApp.directive('pkFavorites', function () {
  return {
    restrict: 'E',
    replace: false,
    templateUrl: 'views/templates/pkFavorites.html',
    controller: 'pkFavoritesController',
  };
});
