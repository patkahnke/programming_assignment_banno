myApp.service('youTubeKeyService', ['$http', '$q', function ($http, $q) {
    this.getAPIKey = function () {
        var deferred = $q.defer();
        var promise = getKey(deferred);
        return deferred.promise;
      };

    function getKey(deferred) {
      $http.get('/youtubeAPIKey').then(function (response) {
        deferred.resolve(response.data.youTubeAPIKey);
      });
    }
  },
]);
