myApp.factory('DatabaseFactory',
              ['$http', '$filter', '$sce',
              'ConfigFactory',
    function ($http, $filter, $sce,
              ConfigFactory) {

  // PRIVATE

  // Factories
  var configFactory = ConfigFactory;

  // Set up variables
  var key = setKey();
  var favorites = retrieveFavs();

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

  // YouTube API functions

  //"getVideos"
  // main search function that is called on click. YouTube Data API is constructed such that:
  // 1 - an initial request must be made for individual video resources that
  //    match the search parameters, then
  // 2 - a second request is made for specific videos, using the IDs
  //    that are sent in the first response.
  function getYoutubeVids(keywords, sortBy) {
    var keywords = keywords.replace(/ /g, '+');
    var request = buildRequestOne(keywords, sortBy);

    //chain two promises together:
    //1 - make the request for relevant videos, including IDs, then upon receipt of the response
    //2 - call the embedVideos function, which includes another request and promise within
    //    the getEmbedVideos function. the embedVideos function requests more detailed
    //    data on the videos, then prepares the videos for display on the page
    $http.jsonp(request).then(
      function (response) {

      //drill down into the response object for the array of video resources
      var videoList = response.data.items;
      embedVideos(videoList);
    }
    );
  };

  // Utility functions

  // set up the YouTube API key
  function setKey() {
    var key;
    if (configFactory.getYoutubeKey() === undefined) {
      configFactory.refreshConfig().then(function () {
        key = configFactory.getYoutubeKey();
      });
    } else {
      key = configFactory.getYoutubeKey();
    }

    return key;
  }

  //using the list of videos from the initial YouTube response, request more detailed
  //    data on the videos, then prepare the videos for display on the page
  embedVideos = function (videoList) {
    var queryIdList = buildQueryIdList(videoList);
    getEmbedVideos(queryIdList);
  };

  //build a comma-separated list of the returned video IDs to insert into the request URL
  function buildQueryIdList(videoList) {
    var queryIdList = '';

    for (var i = 0; i < videoList.length - 1; i++) {
      queryIdList += (videoList[i].id.videoId + ',');
    }

    queryIdList += videoList[videoList.length - 1].id.videoId;

    return queryIdList;
  }

  //request the additional info on the returned video resources, then prepare the videos
  //for embedding on the search page
  function getEmbedVideos(queryIdList) {
    var baseURL = 'https://www.googleapis.com/youtube/v3/videos';
    var query = '?id=' + queryIdList;

    //statistics returns meta data such as number of views, likes, and dislikes
    query += '&part=statistics,snippet';
    query += '&key=' + key;
    query += '&callback=JSON_CALLBACK';

    var request = baseURL + encodeURI(query);

    $http.jsonp(request).then(
      function (response) {

        //drill down into the response object to return the array of video resources
        var videos = response.data.items;
        var embedVideos = buildEmbedUrls(videos);
        embedVideos = checkIfFavorite(embedVideos);
        youtubeVideos = embedVideos;
        console.log('youtubeVideos: ', youtubeVideos);
      });
  }


  function buildEmbedUrls(videos) {
    // build embedded urls rather than accessing them from the YouTube API in order
    // to have more control over parameters
    for (var i = 0; i < videos.length; i++) {
      var videoId = videos[i].id;

      //As a security measure, AngularJS' Strict Contextual Escaping does not allow binding of
      //arbitrary HTML that is controlled by the user, such as the embedded url below.
      //$sce.trustAsResourceUrl lets AngularJS know the url is safe.
      embedUrl = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + videoId);

      //add the property "embedUrl" to the videos object and populate it with the new embedUrls
      videos[i].embedUrl = embedUrl;
    }

    return videos;
  }

  function checkIfFavorite(embedVideos) {
    for (var i = 0; i < embedVideos.length; i++) {
      embedVideos[i].isFavorite = false;
    };

    for (var i = 0; i < embedVideos.length; i++) {
      for (var j = 0; j < favorites.length; j++) {
        if (embedVideos[i].id === favorites[j].videoid) {
          embedVideos[i].isFavorite = true;
          embedVideos[i].databaseId = favorites[j].id;
        };
      };
    }

    return embedVideos;
  }

  function buildRequestOne(keywordSearchString, sortBy) {
    var baseURL = 'https://www.googleapis.com/youtube/v3/search';

    var query = '?part=snippet';
    query += '&q=' + keywordSearchString;
    query += '&type=video';
    query += '&order=' + sortBy.parameter;
    query += '&maxResults=10';
    query += '&key=' + key;
    query += '&callback=JSON_CALLBACK';

    var request = baseURL + encodeURI(query);

    return request;
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

    getYoutubeVideos: function (keywordSearchString, sortBy, favorites) {
      getYoutubeVids(keywordSearchString, sortBy, favorites);
    },
  };

  return publicApi;

},
]);
