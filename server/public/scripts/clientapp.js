var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function ($routeProvider) {
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
