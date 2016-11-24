myApp.factory('DatabaseFactory', ['$http', '$filter', '$sce', function ($http, $filter, $sce) {

  // PRIVATE

  // Global Variables
  var favorites;
  var keywords = [];
  retrieveFavs();
  retrieveKeywords();

  // Database CRUD functions
  function createFav(video) {
    var favorite = {};
    favorite.title = video.snippet.title;
    favorite.videoId = video.id;
    favorite.thumbnail = video.snippet.thumbnails.high.url;
    favorite.date_added = $filter('date')(new Date(), 'medium');

    // post favorite to database
    var promise = $http.post('/favorites', favorite).then(function (response) {
      if (response.status == 201) {
        console.log('favorite added to database');
      } else {
        console.log('Error', response.data);
      }
    });

    return promise;
  }

  function createKeyword(keyword) {
    var keywordObject = {};
    keywordObject.keyword = keyword;
console.log('keywordObject inside creatKeyword factory: ', keywordObject);
    // post keyword to database
    var promise = $http.post('/keywords', keywordObject).then(function (response) {
      if (response.status == 201) {
        console.log('keyword added to database');
      } else {
        console.log('Error', response.data);
      }
    });

    return promise;
  }

  function retrieveFavs() {
    var promise = $http.get('/favorites').then(function (response) {
      favorites = buildEmbedUrls(response.data);
      console.log('favorites inside retrieveFavs: ', favorites);
    });

    return promise;
  };

  function retrieveKeywords() {
    var promise = $http.get('/keywords').then(function (response) {
        keywords.length = 0;
        for (var i = 0, l = response.data.length; i < l; i++) {
          var param = { parameter: response.data[i].keyword };
          keywords.push(param);
        }

        console.log('response.data: ', response.data);
        console.log('keywords inside retrieveKeywords: ', keywords);
      });

    return promise;
  };

  function updateFav(event) {
    event.preventDefault();

    var id;

    $.ajax({
      type: 'PUT',
      url: '/favorites/' + id,
      data: preparedData,
      success: function (data) {
        getFavorites();
      },
    });
  }

  function deleteFav(id) {
    var promise = $http.delete('/favorites/' + id, id).then(function (response) {
      if (response.status == 200) {
          console.log('favorite deleted');
      } else {
        console.log('Error', response.data);
      }
    });

    return promise;
  }

  function deleteKeyword(id) {
    var promise = $http.delete('/keywords/' + id, id).then(function (response) {
      if (response.status == 200) {
          console.log('keyword deleted');
      } else {
        console.log('Error', response.data);
      }
    });

    return promise;
  }

  function buildEmbedUrls(videosObject) {
    // build embedded urls rather than accessing them from the YouTube API in order
    // to have more control over parameters
    for (var i = 0; i < videosObject.length; i++) {
      var videoId = videosObject[i].videoid;

      //As a security measure, AngularJS' Strict Contextual Escaping does not allow binding of
      //arbitrary HTML that is controlled by the user, such as the embedded url below.
      //$sce.trustAsResourceUrl lets AngularJS know the url is safe.
      embedUrl = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + videoId + '?rel=0;&autoplay=1');

      //add "embedUrl" to the videos object and populate it with the new embedUrls
      videosObject[i].embedUrl = embedUrl;
    }

    return videosObject;
  }

  // PUBLIC
  var publicApi = {
    createFavorite: function (video) {
      return createFav(video);
    },

    refreshFavorites: function (sortBy) {
      return retrieveFavs();
    },

    getFavorites: function () {
      return favorites;
    },

    deleteFavorite: function (id) {
      return deleteFav(id);
    },

    createKeyWord: function (keyword) {
      return createKeyword(keyword);
    },

    refreshKeywords: function () {
      return retrieveKeywords();
    },

    getKeywords: function () {
      return keywords;
    },

    deleteKeyWord: function (id) {
      return deleteKeyword(id);
    },
  };

  return publicApi;
},
]);
