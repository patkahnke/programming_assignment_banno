myApp.factory('YoutubeFactory',
              ['$http', '$filter', '$sce', '$q',
              'ConfigFactory',
              'DatabaseFactory',
    function ($http, $filter, $sce, $q,
              ConfigFactory,
              DatabaseFactory) {

  // PRIVATE

  // Factories
  var configFactory = ConfigFactory;
  var databaseFactory = DatabaseFactory;

  // Set up variables
  var key;
  setKey();
  var favorites = setFavorites();
  var videoIdsObject = {};
  var videoDataObject = {};

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
    var keywords;
    var requestOne;

    // replace spaces between keywords with "+" and build the request
    keywords = formatKeywords(rawKeywords);
    requestOne = buildRequestOne(keywords, sortBy, key);

    // make the request for relevant videos, by keywords
    var promise = $http.jsonp(requestOne).then(
      function (response) {
        console.log('response1: ', response);
        videoIdsObject = response;
      });

    return promise;
  }

  function youtubeRequestTwo(videoIdsObject) {
    var request;
    var queryIdList;
    var vidList = videoIdsObject.data.items;

    // build a request with a list of all returned video resource ids
    queryIdList = buildQueryIdList(vidList);
    request = buildRequestTwo(queryIdList);

    var promise = $http.jsonp(request).then(
      function (response) {
        videoDataObject = response;
        console.log('response request two: ', response);
      });

    return promise;
  }

  function createEmbedVideos() {
    var videosToEmbed = videoDataObject.data.items;
    var embedVideos;
    var embedFavVideos;
    console.log('createEmbedVideos called');
      console.log('data before buildEmbedurls: ', videosToEmbed);
      var embedVideos = buildEmbedUrls(videosToEmbed);
      console.log('embedVideos after buildembedvideos: ', embedVideos);
      var embedFavVideos = checkIfFavorite(embedVideos);
      console.log('embedVideos after checkIfFavoeite: ', embedFavVideos);
      return embedFavVideos;
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

  function buildEmbedUrls(videosObject) {
    // build embedded urls rather than accessing them from the YouTube API in order
    // to have more control over parameters
    for (var i = 0; i < videosObject.length; i++) {
      var videoId = videosObject[i].id;

      //As a security measure, AngularJS' Strict Contextual Escaping does not allow binding of
      //arbitrary HTML that is controlled by the user, such as the embedded url below.
      //$sce.trustAsResourceUrl lets AngularJS know the url is safe.
      embedUrl = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + videoId);

      //add "embedUrl" to the videos object and populate it with the new embedUrls
      videosObject[i].embedUrl = embedUrl;
    }

    return videosObject;
  }

  function checkIfFavorite(vidsObject) {
    for (var i = 0; i < vidsObject.length; i++) {
      vidsObject[i].isFavorite = false;
    };

    for (var i = 0; i < vidsObject.length; i++) {
      for (var j = 0; j < favorites.length; j++) {
        if (vidsObject[i].id === favorites[j].videoid) {
          vidsObject[i].isFavorite = true;
          vidsObject[i].databaseId = favorites[j].id;
        };
      };
    }

    return vidsObject;
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
    getVideoIds: function (keywords, sortBy) {
      return youtubeRequestOne(keywords, sortBy);
    },

    getVideosData: function () {
      console.log(videoIdsObject);
      return youtubeRequestTwo(videoIdsObject);
    },

    formatVideosData: function () {
      return createEmbedVideos(videoDataObject);
    },
  };

  return publicApi;
},
]);
