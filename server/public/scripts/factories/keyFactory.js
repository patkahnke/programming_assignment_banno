myApp.factory('KeyFactory', ['$http', '$q', function ($http, $q) {
  //
  // var youtubeAPIKey;

  function factoryGetAPIKey() {
    var deferred = $q.defer();
    var promise = getKey(deferred);
    return deferred.promise;
  }

  function getKey(deferred) {
    $http.get('/youtubeAPIKey').then(function (response) {
      deferred.resolve(response.data.youTubeAPIKey);
    });
  }

  var publicAPI = {
    getAPIKey: function () {
      return factoryGetAPIKey();
    },
  };

  return publicAPI;

},
]);
