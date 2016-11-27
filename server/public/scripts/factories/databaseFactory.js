myApp.factory('DatabaseFactory',
              ['$http', '$filter', '$sce',
              'getFavoriteIDService',
              'getSearchWordIDService',
    function ($http, $filter, $sce,
              getFavoriteIDService,
              getSearchWordIDService) {

  // PRIVATE

  // Global Variables
  var favorites;
  var searchWords = [];
  retrieveFavs(1);
  retrieveSearchWords();

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

  function createSearchWord(searchWord) {
    var searchWordObject = {};
    searchWordObject.searchWord = searchWord;

    var promise = $http.post('/searchWords', searchWordObject).then(function (response) {
      if (response.status == 201) {
        console.log('searchWord added to database');
      } else {
        console.log('Error', response.data);
      }
    });

    return promise;
  }

  function retrieveFavs(searchBy) {
    console.log('searchBy in retrieveFavs: ', searchBy);
    if (searchBy === undefined) {
      var searchID = null;
      console.log('searchID in retrieveFavs null?: ', searchID);
    } else {
      var searchID = searchBy.search_word_id;
      console.log('searchID in retrieveFavs notnull?: ', searchID);
    };
    console.log('searchID output in retrieveFavs: ', searchID);
    var promise = $http.get('/favorites', { params: { search: searchID } }).then(function (response) {
      favorites = buildEmbedUrls(response.data);
    });

    return promise;
  };

  // function retrieveFavs() {
  //   var promise = $http.get('/favorites').then(function (response) {
  //     favorites = buildEmbedUrls(response.data);
  //   });
  //
  //   return promise;
  // };

  function retrieveSearchWords() {
    var promise = $http.get('/searchWords').then(function (response) {
        searchWords.length = 0;
        for (var i = 0, l = response.data.length; i < l; i++) {
          var param = {
                        parameter: response.data[i].search_word,
                        search_word_id: response.data[i].search_word_id,
                      };
          searchWords.push(param);
        }
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

  function deleteSearchword(id) {
    var promise = $http.delete('/searchWords/' + id, id).then(function (response) {
      if (response.status == 200) {
        console.log('searchWord deleted');
      } else {
        console.log('Error', response.data);
      }
    });

    return promise;
  }

  function assignSearchword(searchWord, video) {
    var pairing = {};
    pairing.favoriteID = getFavoriteIDService.getFavoriteID(video, favorites);
    pairing.searchWordID = getSearchWordIDService.getSearchWordID(searchWord, searchWords);
    $http.post('/favoritesSearchWords', pairing).then(function (response) {
      if (response.status == 201) {
        console.log('pairing added to database');
      } else {
        console.log('Error', response.data);
      }
    });
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

    refreshFavorites: function (searchBy) {
      return retrieveFavs(searchBy);
    },

    getFavorites: function () {
      return favorites;
    },

    deleteFavorite: function (id) {
      return deleteFav(id);
    },

    createSearchWord: function (searchWord) {
      return createSearchWord(searchWord);
    },

    refreshSearchWords: function () {
      return retrieveSearchWords();
    },

    getSearchWords: function () {
      return searchWords;
    },

    deleteSearchWord: function (id) {
      return deleteSearchword(id);
    },

    assignSearchWord: function (searchWord, video) {
      return assignSearchword(searchWord, video);
    },
  };

  return publicApi;
},
]);
