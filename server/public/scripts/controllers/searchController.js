//Inject $sce (Strict Contextual Escaping) dependency, in order to allow for the embed
//urls from YouTube to be trusted by AngularJS. $sce is called within the buildEmbedVideos function
myApp.controller('searchController', ['$scope', '$http', '$sce', 'EnvironmentVarsFactory', function ($scope, $http, $sce, EnvironmentVarsFactory) {
    console.log('search controller running');

    var environmentVarsFactory = EnvironmentVarsFactory;
    console.log('big console log', environmentVarsFactory.factoryGetYoutubeKey());

    if (environmentVarsFactory.factoryGetYoutubeKey() === undefined) {
      environmentVarsFactory.factoryRefreshEnvironmentVars().then(function () {
        key = environmentVarsFactory.factoryGetYoutubeKey();
      });
    } else {
      key = environmentVarsFactory.factoryGetYoutubeKey();
    }
    
    //set $scope.videos to "undefined" so search page is blank until a search is made
    $scope.videos = undefined;

    //set up the sortBy object for the drop-down menu
    $scope.sortBy = {};
    $scope.parameters = [
      { parameter: 'date' },
      { parameter: 'rating' },
      { parameter: 'relevance' },
    ];

    // main search function that is called on click. YouTube Data API is constructed such that:
    // 1 - an initial request must be made for individual video resources that
    //    match the search parameters, then
    // 2 - a second request is made for specific videos, using the IDs
    //    that are sent in the first response.
    $scope.getVideos = function () {
      var baseURL = 'https://www.googleapis.com/youtube/v3/search';

      //replace spaces in the search string with "+"
      var keywordSearchString = $scope.keywords.replace(/ /g, '+');

      //build the query url
      //the "snippet" part of a YouTube video resource contains basic data, such as title
      var query = '?part=snippet';
      query += '&q=' + keywordSearchString;
      query += '&type=video';
      query += '&order=' + $scope.sortBy.parameter;
      query += '&maxResults=10';
      query += '&key=' + key;
      query += '&callback=JSON_CALLBACK';

      var request = baseURL + encodeURI(query);

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

      //close the $scope.getVideos function
    };

    //using the list of videos from the initial response, request more detailed
    //    data on the videos, then prepare the videos for display on the page
    embedVideos = function (videoList) {
      var queryIdList = buildQueryIdList(videoList);
      getEmbedVideos(queryIdList);
    };

    //build a comma-separated list of the returned video IDs to insert into the request URL
    buildQueryIdList = function (videoList) {
      var queryIdList = '';

      for (var i = 0; i < videoList.length - 1; i++) {
        queryIdList += (videoList[i].id.videoId + ',');
      }

      queryIdList += videoList[videoList.length - 1].id.videoId;

      return queryIdList;
    };

    //request the additional info on the returned video resources, then prepare the videos
    //for embedding on the search page
    getEmbedVideos = function (queryIdList) {
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
          $scope.videos = buildEmbedUrls(videos);
        }
      );

      // build embedded urls rather than accessing them from the YouTube API in order
      // to have more control over parameters
      buildEmbedUrls = function (videos) {
        for (var i = 0; i < videos.length; i++) {
          var videoId = {};
          videoId = videos[i].id;

          //As a security measure, AngularJS' Strict Contextual Escaping does not allow binding of
          //arbitrary HTML that is controlled by the user, such as the embedded url below.
          //$sce.trustAsResourceUrl lets AngularJS know the url is safe.
          embedUrl = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + videoId);

          //add the property "embedUrl" to the videos object and populate it with the new embedUrls
          videos[i].embedUrl = embedUrl;
        }

        return videos;
      };

      //Close showVideo function
    };

    //Close search controller
  },
]);
