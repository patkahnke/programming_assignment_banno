myApp.factory('YoutubeFactory',
              ['$http', '$filter', '$sce',
              'ConfigFactory',
              'DatabaseFactory',
    function ($http, $filter, $sce,
              ConfigFactory,
              DatabaseFactory) {

  // PRIVATE

  // Factories
  var configFactory = ConfigFactory;
  var databaseFactory = DatabaseFactory;

  // Set up variables
  var key;
  setKey();
  console.log('key: ', key);
  var favorites = setFavorites();

  // request YouTube video resources and prepare data for embedding
  function getYoutubeVids(rawKeywords, sortBy) {
    return new Promise(function (resolve, reject) {

      // initial request for video resources by keyword
      youtubeRequestOne(rawKeywords, sortBy).then(function (data) {
console.log('data after request one: ', data);
        // second request for more detailed info using the ids of the returned video resources
        return youtubeRequestTwo(data);
      }).then(function (data) {
        console.log('data after request two: ', data);

        // create embeddable urls, and also add boolean value "isFavorite" to videos object
        createEmbedVideos(data);
      }).then(function (data) {
        var embedVideos = data;
        console.log('embedVideos: ', embedVideos);
        resolve(embedVideos);
      });
    });
  }

  // Utility functions

  function setKey() {
    // set up the YouTube API key
    if (configFactory.getYoutubeKey() === undefined) {
      configFactory.refreshConfig().then(function () {
        key = configFactory.getYoutubeKey();
      });
    } else {
      key = configFactory.getYoutubeKey();
    };
  }

  function setFavorites() {
    var favorites = {};
    if (databaseFactory.getFavorites() === undefined) {
      databaseFactory.refreshFavorites().then(function () {
        return favorites = databaseFactory.getFavorites();
      });
    } else {
      return favorites = databaseFactory.getFavorites();
    }
  };

  function formatKeywords(keywords) {
    var newString = keywords.replace(/ /g, '+');
    return newString;
  }

  function youtubeRequestOne(rawKeywords, sortBy) {
    return new Promise(function (resolve, reject) {
      var keywords;
      var request;
      var videoList;

      // replace spaces between keywords with "+" and build the request
      keywords = formatKeywords(rawKeywords);
      request = buildRequestOne(keywords, sortBy, key);
      console.log('requestOne: ', request);

      // make the request for relevant videos, by keywords
      $http.jsonp(request).then(
        function (response) {
          videoList = response.data.items;
          resolve(videoList);
        });
    });
  }

  function youtubeRequestTwo(data) {
    return new Promise(function (resolve, reject) {
      var request;
      var queryIdList;
      var videoList = data;

      // build a request with a list of all returned video resource ids
      queryIdList = buildQueryIdList(videoList);
      request = buildRequestTwo(queryIdList);

      $http.jsonp(request).then(
        function (response) {

          //drill down into the response object to return the array of video resources
          var videos = response.data.items;
          console.log('response.data.items: ', response.data.items);
          console.log('videos before second resolve: ', videos);
          resolve(videos);
        });
    });
  }

  function createEmbedVideos(data) {
    console.log('createEmbedVideos called');
    return new Promise(function (resolve, reject) {
      var videos = data;
      console.log('data before buildEmbedurls: ', data);
      console.log('videos before buildEmbedUrls:', videos);
      var embedVideos = buildEmbedUrls(videos);
      console.log('embedVideos after buildembedvideos: ', embedVideos);
      embedVideos = checkIfFavorite(embedVideos);
      console.log('embedVideos after checkIfFavoeite: ', embedVideos);
      resolve(embedVideos);
    });
  }

  function buildQueryIdList(videoList) {
    //build a comma-separated list of the returned video IDs to insert into the request URL

    var queryIdList = '';
    for (var i = 0; i < videoList.length - 1; i++) {
      queryIdList += (videoList[i].id.videoId + ',');
    }

    queryIdList += videoList[videoList.length - 1].id.videoId;
    return queryIdList;
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

      //add "embedUrl" to the videos object and populate it with the new embedUrls
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

  function buildRequestOne(keywordSearchString, sortBy, key) {
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

  function buildRequestTwo(queryIdList) {
    var baseURL = 'https://www.googleapis.com/youtube/v3/videos';
    var query = '?id=' + queryIdList;

    //statistics returns meta data such as number of views, likes, and dislikes
    query += '&part=statistics,snippet';
    query += '&key=' + key;
    query += '&callback=JSON_CALLBACK';

    var request = baseURL + encodeURI(query);

    return request;
  }

  // PUBLIC
  var publicApi = {
    getYoutubeVideos: function (keywords, sortBy) {
      getYoutubeVids(keywords, sortBy);
    },
  };

  return publicApi;

},
]);
