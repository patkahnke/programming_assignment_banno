myApp.factory('YoutubeFactory', ['$http', '$filter', '$sce',
                                'KeyFactory',
                                'DatabaseFactory',
                        function ($http, $filter, $sce,
                                KeyFactory,
                                DatabaseFactory) {

  // PRIVATE

  // Factories
  var keyFactory = KeyFactory;
  var databaseFactory = DatabaseFactory;

  //  Global Variables
  var youtubeAPIKey;
  var favorites;
  var videoIdsObject = {};
  var videoDataObject = {};

  setKey();
  setFavorites();

  // Main Request Functions
  function youtubeRequestOne(rawKeywords, sortBy) {
    // Makes initial request for relevant videos, by keywords
    var keywords;
    var requestOne;

    // replace spaces between keywords with "+" and build the request
    keywords = formatKeywords(rawKeywords);
    requestOne = buildRequestOne(keywords, sortBy, youtubeAPIKey);

    // make the request
    var promise = $http.jsonp(requestOne).then(
      function (response) {
        videoIdsObject = response;
      });

    return promise;
  }

  function youtubeRequestTwo(videoIdsObject) {
    // makes a second request to YouTube, by video id, for more data on videos in list
    var request;
    var queryIdList;
    var vidList = videoIdsObject.data.items;

    // build a request with a list of all returned video resource ids
    queryIdList = buildQueryIdList(vidList);
    request = buildRequestTwo(queryIdList);

    var promise = $http.jsonp(request).then(
      function (response) {
        videoDataObject = response;
      });

    return promise;
  }

  function createEmbedVideos() {
    var videosToEmbed = videoDataObject.data.items;
    var embedVideos = buildEmbedUrls(videosToEmbed);
    embedVideos = checkIfFavorite(embedVideos);
    return embedVideos;
  }

  // Utility functions
  function setKey() {
    // retrieve the YouTube API Key from the KeyFactory
    if (keyFactory.getYoutubeKey() === undefined) {
      keyFactory.refreshKey().then(function () {
        youtubeAPIKey = keyFactory.getYoutubeKey();
      });
    } else {
      youtubeAPIKey = keyFactory.getYoutubeKey();
    };
  }

  function setFavorites() {
    // retrieve all favorited videos from the database
    databaseFactory.refreshFavorites().then(function () {
      favorites = databaseFactory.getFavorites();
    });
  }

  function formatKeywords(keywords) {
    var newString = keywords.replace(/ /g, '+');
    return newString;
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
    query += '&key=' + youtubeAPIKey;
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
      return youtubeRequestTwo(videoIdsObject);
    },

    formatVideosData: function () {
      return createEmbedVideos(videoDataObject);
    },

    refreshFavorites: function (searchBy) {
      return setFavorites(searchBy);
    },
  };

  return publicApi;
},
]);
