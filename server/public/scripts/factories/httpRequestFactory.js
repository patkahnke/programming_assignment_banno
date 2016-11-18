myApp.factory('HttpRequestFactory', ['$http', function ($http) {
  console.log('HttpRequestFactory is running');

  // PRIVATE
  var favorites = undefined;

  //CRUD functions
  function getFavorites() {
    var promise = $http.get('/favorites').then(function (response) {
      console.log('favoritesId data returned: ', response.data);
      favorites = response.data;
    });

    return promise;
  };

  function saveFavorite(newFav) {
    var promise = $http.post('/favorite', newFav).then(function(response) {
      if (response.status == 201) {
        return getFavorites();
      } else {
        console.log('Error', response.data);
      }
    });

    return promise;
  }

  // PUBLIC
  var publicApi = {
    factoryRefreshFavorites: function () {
      return getFavorites();
    },

    factoryGetFavorites: function () {
      return favorites;
    },

    factorySaveFavorite: function (newFavorite) {
      return saveFavorite(newFavorite);
    },
  };

  return publicApi;

}]);
