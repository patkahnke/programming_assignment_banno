myApp.factory('HttpRequestFactory', ['$http', function ($http) {
  console.log('HttpRequestFactory is running');

  // PRIVATE
  var favorites = undefined;

  //CRUD functions
  function getFavorites() {
    var promise = $http.get('/favorites').then(function (response) {
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

  function deleteFavorite(id) {
    var promise = $http({
      type: 'DELETE',
      url: '/favorites/' + id,
      success: function (data) {
        console.log('favorite deleted');
      },
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

    factoryDeleteFavorite: function (id) {
      return deleteFavorite(id);
    }
  };

  return publicApi;

}]);
