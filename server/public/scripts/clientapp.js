var mainApp = angular.module('mainApp', ['ngRoute']);

mainApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/search', {
      templateUrl: '/views/search.html',
      controller: 'searchController',
    })
    .when('/favorites', {
      templateUrl: '/views/favorites.html',
      controller: 'favoritesController',
    })
    .otherwise({
      redirectTo: 'search',
    });
},
]);
