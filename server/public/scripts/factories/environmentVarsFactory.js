myApp.factory('EnvironmentVarsFactory', ['$http', function($http) {
  console.log('EnvironmentVarsFactory running');

  environmentVars = {
    youtubeAPIKey: undefined,
    user: undefined,
    password: undefined,
  };

  function getEnvironmentVars() {
    var promise = $http.get('/environmentVars').then(function (response) {
      console.log('Async data returned: ', response.data);
      environmentVars = response.data;
    });

    return promise;
  };

  var publicAPI = {
    factoryRefreshEnvironmentVars: function () {
      return getEnvironmentVars();
    },

    factoryGetYoutubeKey: function () {
      var key = environmentVars.youtubeAPIKey;
      return key;
    },

    factoryGetDatabaseVars: function () {
      var databaseVars = {
        user: environmentVars.user,
        password: environmentVars.password,
      };

      return databaseVars;
    },
  };

  return publicAPI;

}]);
