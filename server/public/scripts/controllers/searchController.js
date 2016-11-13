myApp.controller('searchController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
    var key = 'AIzaSyB9HNxzV2ntrgM9dPh_77blD4HNe3sNPbY';

    $scope.videos = undefined;
    $scope.sortBy = {};
    $scope.parameters = [
      { parameter: 'date' },
      { parameter: 'rating' },
      { parameter: 'relevance' },
    ];

    $scope.getVideos = function () {
      var baseURL = 'https://www.googleapis.com/youtube/v3/search';
      var keywordSearchString = $scope.keywords.replace(/ /g, '+');
      var query = '?part=snippet';
      query += '&q=' + keywordSearchString;
      query += '&type=video';
      query += '&order=' + $scope.sortBy.parameter;
      query += '&maxResults=10';
      query += '&key=' + key;
      query += '&callback=JSON_CALLBACK';

      var request = baseURL + encodeURI(query);
      console.log(request);

      $http.jsonp(request).then(
        function (response) {
          $scope.videos = response.data.items;
          console.log(response.data.items);
        }
      );

      //Close getVideos function
    };

    function embedVideos(response) {
      var videoList = response;

      var queryIdList = buildQueryIdList(videoList);


    }

    function buildQueryIdList(videoList) {
      var queryIdList = '';

      for (var i = 0; i < videoList.length - 1; i++) {
        queryIdList += videoList[i].id.videoId + ',';
      }

      queryIdList += videoList[videoList.length - 1].id.videoId;

      return queryIdList;
    }

    getEmbedVideos = function (videoIdList) {
      var baseURL = 'https://www.googleapis.com/youtube/v3/videos';
      var query = '?id=' + videoIdList;
      query += '&part=statistics';
      query += '&key=' + key;
      query += '&callback=JSON_CALLBACK';

      var request = baseURL + encodeURI(query);
      console.log(request);

      $http.jsonp(request).then(
        function (response) {
          console.log(response);
          $scope.selectedId = videoId;
          var embedUrl = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1';
          $scope.embedUrl = $sce.trustAsResourceUrl(embedUrl);
          console.log('$scope.embedUrl', $scope.embedUrl);
        }
      );

      //Close showVideo function
    };

    //Close search controller
  },
]);
