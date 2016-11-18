//Inject $sce (Strict Contextual Escaping) dependency, in order to allow for the embed
//urls from YouTube to be trusted by AngularJS. $sce is called within the buildEmbedVideos function
myApp.controller('searchController',
                ['$scope', '$http', '$sce', '$filter',
                'EnvironmentVarsFactory',
                'HttpRequestFactory',
        function ($scope, $http, $sce, $filter,
                  EnvironmentVarsFactory,
                  HttpRequestFactory) {

    //Factories
    var environmentVarsFactory = EnvironmentVarsFactory;
    $scope.httpRequestFactory = HttpRequestFactory;

    //Variables
    $scope.favorites = setFavorites();
    console.log('$scope.favorites: ', $scope.favorites);
    $scope.favoriteAdded = false;
    $scope.selectedVideo = null;
    $scope.videos = undefined;

    //set up the sortBy object for the drop-down menu
    $scope.sortBy = {};
    $scope.parameters = [
      { parameter: 'date' },
      { parameter: 'rating' },
      { parameter: 'relevance' },
    ];

    //set up the YouTube API key
    if (environmentVarsFactory.factoryGetYoutubeKey() === undefined) {
      environmentVarsFactory.factoryRefreshEnvironmentVars().then(function () {
        key = environmentVarsFactory.factoryGetYoutubeKey();
      });
    } else {
      key = environmentVarsFactory.factoryGetYoutubeKey();
    }

console.log('key: ', key);
    //Scope functions

    //"getVideos"
    // main search function that is called on click. YouTube Data API is constructed such that:
    // 1 - an initial request must be made for individual video resources that
    //    match the search parameters, then
    // 2 - a second request is made for specific videos, using the IDs
    //    that are sent in the first response.
    $scope.getVideos = function (favoritesIds) {
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
console.log('request: ', request);

      //chain two promises together:
      //1 - make the request for relevant videos, including IDs, then upon receipt of the response
      //2 - call the embedVideos function, which includes another request and promise within
      //    the getEmbedVideos function. the embedVideos function requests more detailed
      //    data on the videos, then prepares the videos for display on the page
      $http.jsonp(request).then(
        function (response) {

        //drill down into the response object for the array of video resources
        var videoList = response.data.items;
        console.log('response: ', response);
        console.log('videolist: ', videoList);
        embedVideos(videoList, favoritesIds);
      }

        //close the $http.jsonp request
      );

      //close the $scope.getVideos function
    };

    //"addFavorite"
    //
    $scope.addFavorite = function (video) {
      var favorite = {};
      favorite.title = video.snippet.title;
      favorite.videoId = video.id;
      favorite.thumbnail = video.snippet.thumbnails.high.url;
      favorite.date_added = $filter('date')(new Date(), 'medium');
      console.log('favorite: ', favorite);

      $http.post('/favorites', favorite).then(addFavoriteMsg(video), failedFavoriteMsg);
    };

    checkIfFavorite = function (videos) {
      favorites = $scope.favorites;
      console.log('checkIfFavorite is being called');
      console.log('favorites: ', favorites);
      for (var i = 0; i < videos.length; i++) {
        videos[i].isFavorite = false;
      };

      for (var i = 0; i < videos.length; i++) {
        for (var j = 0; j < favorites.length; j++) {
          if (videos[i].videoid === favorites[j].videoid) {
            videos[i].isFavorite = true;
          };
        };
      };

      return videos;
    };

    function addFavoriteMsg(video) {
      $scope.favoriteAdded = true;
      $scope.selectedVideo = video.id;
      console.log('favorite supposedly added');
    }

    function failedFavoriteMsg() {
      console.log('favorite not added');
    }

    //using the list of videos from the initial response, request more detailed
    //    data on the videos, then prepare the videos for display on the page
    embedVideos = function (videoList, favoritesIds) {
      var queryIdList = buildQueryIdList(videoList);
      getEmbedVideos(queryIdList, favoritesIds);
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
    getEmbedVideos = function (queryIdList, favoritesIds) {
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
        });

      setFavorites().then(function () {
        $scope.videos = checkIfFavorite($scope.videos);
      });
    };

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

    function setFavorites() {
      if ($scope.httpRequestFactory.factoryGetFavorites() === undefined) {
        $scope.httpRequestFactory.factoryRefreshFavorites().then(function () {
          $scope.favorites = $scope.httpRequestFactory.factoryGetFavorites();
        });
      } else {
        $scope.favorites = $scope.httpRequestFactory.factoryGetFavorites();
      }
    }

    //Close search controller
  },
]);
