myApp.factory('KeyFactory', ['$http', function ($http) {

  var youtubeAPIKey = undefined;

  function retrieveYoutubeAPIKey() {
    var promise = $http.get('/youtubeAPIKey').then(function (response) {
      youtubeAPIKey = response.data.youtubeAPIKey;
    });

    return promise;
  };

  var publicAPI = {
    refreshKey: function () {
      return retrieveYoutubeAPIKey();
    },

    getYoutubeKey: function () {
      return youtubeAPIKey;
    },
  };

  return publicAPI;

},
]);
