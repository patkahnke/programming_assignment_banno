myApp.factory('DatabaseFactory', ['$http', '$filter', '$sce', function ($http, $filter, $sce) {

  // PRIVATE
  var favorites = undefined;

  // Database CRUD functions
  function retrieveFavs() {
    var promise = $http.get('/favorites').then(function (response) {
      favorites = response.data;
    });

    return promise;
  };

  function createFav(video) {
    var favorite = {};
    favorite.title = video.snippet.title;
    favorite.videoId = video.id;
    favorite.thumbnail = video.snippet.thumbnails.high.url;
    favorite.date_added = $filter('date')(new Date(), 'medium');
    var promise = $http.post('/favorite', favorite).then(function (response) {
      if (response.status == 201) {
        return console.log('Added to favorites: ', favorite.title);
      } else {
        console.log('Error', response.data);
      }
    });

    return promise;
  }

  function deleteFav(id) {
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
    createFavorite: function (video) {
      return createFav(video);
    },

    refreshFavorites: function () {
      return retrieveFavs();
    },

    getFavorites: function () {
      return favorites;
    },

    deleteFavorite: function (id) {
      return deleteFav(id);
    },
  };

  return publicApi;
},
]);
