mainApp.controller('searchController', ['$scope', '$http', function ($scope, $http) {
    var key = 'AIzaSyB9HNxzV2ntrgM9dPh_77blD4HNe3sNPbY';
    var baseURL = 'https://www.googleapis.com/youtube/v3/search';
    var keywordSearchString = $scope.keywords.replace(/ /g, '+');

    $scope.sortBy = {};
    $scope.parameters = [
      { parameter: 'date' },
      { parameter: 'rating' },
      { parameter: 'relevance' },
    ];

    $scope.getVideos = function () {
      var query = '?part=snippet';
      query += '&q=' + keywordSearchString;
      query += '&type=video';
      query += 'key=' + key;

      var request = baseURL + encodeURI(query);

      $http.jsonp(request).then(
        function (response) {
          $scope.title = 'test';
          console.log('response');
        }
      );
    };
  },
]);
