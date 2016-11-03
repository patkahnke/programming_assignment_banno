myApp.controller('searchController', ['$scope', '$http', function ($scope, $http) {
    var key = 'AIzaSyB9HNxzV2ntrgM9dPh_77blD4HNe3sNPbY';
    var baseURL = 'https://www.googleapis.com/youtube/v3/search';

    $scope.sortBy = {};
    $scope.parameters = [
      { parameter: 'date' },
      { parameter: 'rating' },
      { parameter: 'relevance' },
    ];

    $scope.getVideos = function () {
      var keywordSearchString = $scope.keywords.replace(/ /g, '+');
      var query = '?part=snippet,statistics';
      query += '&fields=items(id, snippet, statistics)';
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
          $scope.title = 'test';
          console.log(response);
          //console.log(response.data.items[0].id.videoId, response.data.items[0].snippet.title);
        }
      );
    };
  },
]);
