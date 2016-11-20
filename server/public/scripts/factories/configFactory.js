myApp.factory('ConfigFactory', ['$http', function ($http) {

  environmentVars = {
    youtubeAPIKey: undefined,
    user: undefined,
    password: undefined,
  };

  function getEnvironmentVars() {
    var promise = $http.get('/environmentVars').then(function (response) {
      environmentVars = response.data;
      console.log('environmentVars: ', environmentVars);
    });

    return promise;
  };

  var publicAPI = {
    refreshConfig: function () {
      return getEnvironmentVars();
    },

    getYoutubeKey: function () {
      var key = environmentVars.youtubeAPIKey;
      return key;
    },

    getDatabaseVars: function () {
      var databaseVars = {
        user: environmentVars.user,
        password: environmentVars.password,
      };

      return databaseVars;
    },
  };

  return publicAPI;

},
]);
