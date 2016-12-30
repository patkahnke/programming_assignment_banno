var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: '/views/home.html',
      controller: 'homeController',
    })
    .when('/login', {
      templateUrl: '/views/login.html',
      controller: 'loginController',
    })
    .when('/register', {
      templateUrl: '/views/register.html',
      controller: "loginController"
    })
    .otherwise({
      redirectTo: 'login',
    });
},
]);
