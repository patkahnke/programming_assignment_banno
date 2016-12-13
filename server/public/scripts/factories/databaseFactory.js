(function () {
'use strict';
myApp.factory('DatabaseFactory',
              ['$http', '$filter',
              'buildEmbedUrlsService',
              'getFavoriteIDService',
              'getSearchWordIDService',
    function ($http, $filter,
              buildEmbedUrlsService,
              getFavoriteIDService,
              getSearchWordIDService) {

  // PRIVATE

  // Global Variables
  var favorites;
  var searchWords = [];
  factoryRefreshFavorites();
  factoryRefreshSearchWords();

  // Database CRUD functions
  function factoryCreateFavorite(video) {

    // Build a "favorite" object in the database format
    var favorite = {
      title: video.snippet.title,
      videoId: video.id,
      thumbnail: video.snippet.thumbnails.high.url,
      date_added: $filter('date')(new Date(), 'medium'),
    };

    // post the favorite to the database "favorites" table
    var promise = $http.post('/favorites', favorite).then(function (response) {
      if (response.status == 201) {
        console.log('favorite added to database');
      } else {
        console.log('Error', response.data);
      }
    });

    return promise;
  }

  function factoryCreateSearchWord(searchWord) {

    // Wrap a new search word in an object so it is able to be included in a "post" request
    var searchWordObject = {
      searchWord: searchWord.toLowerCase(),
    };

    // Post the new search word to the database "search_words" table
    var promise = $http.post('/searchWords', searchWordObject).then(function (response) {
      if (response.status == 201) {
        console.log('searchWord added to database');
      } else {
        console.log('Error', response.data);
      }
    });

    return promise;
  }

  function factoryRefreshFavorites(searchBy) {
    // Request all favorites from the database "favorites" table
    var searchID = searchBy ? searchBy.search_word_id : 0;

    // Request favorites (filtered by "searchID") from the database "favorites" table
    var promise = $http.get('/favorites?search=' + searchID).then(function (response) {

      // Build embeddable urls
      favorites = buildEmbedUrlsService.buildEmbedUrls(response.data);
      console.log('favorites: ', favorites);
    });

    return promise;
  };

  function factoryRefreshSearchWords() {
    // Request all searchwords from the database "search_words" table
    var promise = $http.get('/searchWords').then(function (response) {

        // Empty the global "searchWords" array
        searchWords.length = 0;

        // Populate the "searchWords" array with properly formatted searchWord objects
        for (var i = 0, l = response.data.length; i < l; i++) {
          var searchWord = {
                        parameter: response.data[i].search_word,
                        search_word_id: response.data[i].search_word_id,
                      };
          searchWords.push(searchWord);
        }
      });

    return promise;
  };

  function factoryDeleteFavorite(id) {
    // Delete a favorite, by id, from the database "favorites" table
    var promise = $http.delete('/favorites/' + id, id).then(function (response) {
      if (response.status == 200) {
        console.log('favorite deleted');
      } else {
        console.log('Error', response.data);
      }
    });

    return promise;
  }

  function factoryDeleteSearchWord(searchWord) {
    // Delete a searchWord, by id, from the database "search_words" table
    var id = searchWord.search_word_id;
    var promise = $http.delete('/searchWords/' + id, id).then(function (response) {
      if (response.status == 200) {
        console.log('searchWord deleted');
      } else {
        console.log('Error', response.data);
      }
    });

    return promise;
  }

  function factoryAssignSearchWord(searchWord, favorite) {

    // Build an object that contains primary keys for a favorite/searchWord pair
    var pairing = {
      favoriteID: getFavoriteIDService.getFavoriteID(favorite, favorites),
      searchWordID: getSearchWordIDService.getSearchWordID(searchWord, searchWords),
    };

    // Post the favorite/searchWord pair to the database "favorites_search_words" table
    $http.post('/favoritesSearchWords', pairing).then(function (response) {
      if (response.status == 201) {
        console.log('pairing added to database');
      } else {
        console.log('Error', response.data);
      }
    });
  }

  // PUBLIC
  var publicApi = {
    createFavorite: function (video) {
      return factoryCreateFavorite(video);
    },

    createSearchWord: function (searchWord) {
      return factoryCreateSearchWord(searchWord);
    },

    refreshFavorites: function (searchBy) {
      return factoryRefreshFavorites(searchBy);
    },

    getFavorites: function () {
      return favorites;
    },

    deleteFavorite: function (id) {
      return factoryDeleteFavorite(id);
    },

    refreshSearchWords: function () {
      return factoryRefreshSearchWords();
    },

    getSearchWords: function () {
      return searchWords;
    },

    deleteSearchWord: function (id) {
      return factoryDeleteSearchWord(id);
    },

    assignSearchWord: function (searchWord, video) {
      return factoryAssignSearchWord(searchWord, video);
    },
  };

  return publicApi;
},
]);
})();
