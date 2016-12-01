myApp.directive('pkFavorites', function () {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'views/templates/pkFavorites.html',
    controller: 'pkFavoritesController',
  };
});
