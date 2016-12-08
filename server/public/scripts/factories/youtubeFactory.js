myApp.factory('YouTubeFactory', ['$http', '$filter', '$q',
                                'DatabaseFactory',
                                'buildEmbedUrlsService',
                                'youTubeKeyService',
                        function ($http, $filter, $q,
                                DatabaseFactory,
                                buildEmbedUrlsService,
                                youTubeKeyService) {

  // PRIVATE

  // Factories
  var databaseFactory = DatabaseFactory;

  //  Global Variables
  var youTubeAPIKey;
  setKey();

  var favorites;
  setFavorites(null);

  function factoryGetYouTubeVideos(rawKeywords, sortBy) {
    // Main video request function that is called from the "searchController"
    // Final step in the YouTube API request: Format the videos returned from "getVideosData".
    var deferredThree = $q.defer();
    getVideosData(rawKeywords, sortBy).then(function (response) {
      var promise = formatVideos(response, deferredThree);
    });

    return deferredThree.promise;
  }

  function getVideosData(rawKeywords, sortBy) {
    // Step two in the YouTube API request: Get more data on video resources returned from "getVideoIds"
    var deferredTwo = $q.defer();
    getVideoIds(rawKeywords, sortBy).then(function (response) {
        var requestTwo;
        var queryIdList;
        var videoList = response.data.items;

        // build a request with a list of all returned video resource ids
        queryIdList = buildQueryIdList(videoList);
        requestTwo = buildRequestTwo(queryIdList);
        var promise = youtubeRequest(requestTwo, deferredTwo);
      });

    return deferredTwo.promise;
  }

  function getVideoIds(rawKeywords, sortBy) {
    // Step one in the YouTube API request: get a list of video resources based on keyword
    var deferredOne = $q.defer();
    var keywords;
    var requestOne;

    // Replace spaces between keywords and build request
    keywords = formatKeywords(rawKeywords);
    requestOne = buildRequestOne(keywords, sortBy, youTubeAPIKey);

    // Make the request to YouTube
    var promise = youtubeRequest(requestOne, deferredOne);
    return deferredOne.promise;
  }

  function youtubeRequest(requestURL, deferred) {
    // Basic YouTube request: Return a promise for the requested data
    $http.jsonp(requestURL).then(function (response) {
        deferred.resolve(response);
      });
  }

  function formatVideos(videoDataObject, deferredThree) {
    // Build embeddable URLs for video resources and assign an "isFavorite" value of true or false
    var videosToEmbed = videoDataObject.data.items;
    var embedVideos = buildEmbedUrlsService.buildEmbedUrls(videosToEmbed);
    embedVideos = checkIfFavorite(embedVideos);
    deferredThree.resolve(embedVideos);
  }

  function formatKeywords(keywords) {
    return keywords.replace(/ /g, '+');
  }

  function buildQueryIdList(videoList) {
    //build a comma-separated list of the returned video IDs to insert into the request URL
    var queryIdList = '';
    for (var i = 0, l = videoList.length; i < l - 1; i++) {
      queryIdList += (videoList[i].id.videoId + ',');
    }

    queryIdList += videoList[videoList.length - 1].id.videoId;
    return queryIdList;
  }

  function checkIfFavorite(videos) {
    favorites = databaseFactory.getFavorites();
    for (var i = 0, l = videos.length; i < l; i++) {
      videos[i].isFavorite = false;
    };

    for (var i = 0, l = videos.length; i < l; i++) {
      for (var j = 0, k = favorites.length; j < k; j++) {
        if (videos[i].id === favorites[j].videoid) {
            videos[i].isFavorite = true;
          };
      };
    }

    return videos;
  }

  function buildRequestOne(keywordSearchString, sortBy, key, nextPageToken) {
    var baseURL = 'https://www.googleapis.com/youtube/v3/search';

    var query = '?part=snippet';
    query += '&q=' + keywordSearchString;
    query += '&type=video';
    query += '&order=' + sortBy.parameter;
    query += '&maxResults=50';
    query += '&key=' + key;
    query += '&callback=JSON_CALLBACK';

    var request = baseURL + encodeURI(query);

    return request;
  }

  function buildRequestTwo(queryIdList) {
    var baseURL = 'https://www.googleapis.com/youtube/v3/videos';
    var query = '?id=' + queryIdList;

    // "statistics" returns meta data such as number of views, likes, and dislikes
    query += '&part=statistics,snippet';
    query += '&key=' + youTubeAPIKey;
    query += '&callback=JSON_CALLBACK';

    var request = baseURL + encodeURI(query);

    return request;
  }

  function setKey() {
    youTubeKeyService.getAPIKey().then(function (response) {
      youTubeAPIKey = response.data.youTubeAPIKey;
    });
  }

  function setFavorites(searchBy) {
    // retrieve all favorited videos from the database
    databaseFactory.refreshFavorites(searchBy).then(function () {
      favorites = databaseFactory.getFavorites();
    });
  }

  // PUBLIC
  var publicApi = {
    getYouTubeVideos: function (keywords, sortBy) {
      return factoryGetYouTubeVideos(keywords, sortBy);
    },

    refreshFavorites: function (searchBy) {
      return setFavorites(searchBy);
    },
  };

  return publicApi;
},
]);
