var mainApp = angular.module('mainApp', ['ngRoute']);

mainApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: '/views/home.html',
      controller: 'homeController',
    })
    .when('/favoritesPage', {
      templateUrl: '/views/favoritesPage.html',
      controller: 'favoritesPageController',
    })
    .otherwise({
      redirectTo: 'home',
    });
},
]);
