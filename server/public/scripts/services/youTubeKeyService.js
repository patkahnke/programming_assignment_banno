myApp.service('youTubeKeyService', ['$http', function ($http) {
    this.getAPIKey = function () {
      return $http.get('/youtubeAPIKey');
    };
  },
]);
