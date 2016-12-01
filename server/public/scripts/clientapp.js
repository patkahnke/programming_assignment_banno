var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/search', {
      templateUrl: '/views/youTubeSearch.html',
      controller: 'searchController',
    })
    // .when('/favorites', {
    //   templateUrl: '/views/favoritesSearch.html',
    //   controller: 'favoritesController',
    // })
    .otherwise({
      redirectTo: 'search',
    });
},
]);
