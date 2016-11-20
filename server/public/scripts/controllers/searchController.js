//Inject $sce (Strict Contextual Escaping) dependency, in order to allow for the embed
//urls from YouTube to be trusted by AngularJS. $sce is called within the buildEmbedVideos function
myApp.controller('searchController',
                ['$scope', '$http',
                'YoutubeFactory',
                'DatabaseFactory',
                'addFavoriteService',
        function ($scope, $http,
                  YoutubeFactory,
                  DatabaseFactory,
                  addFavoriteService) {

  //Factories
  var youtubeFactory = YoutubeFactory;
  var databaseFactory = DatabaseFactory;

  //Variables
  $scope.favoriteAdded = false;
  $scope.videos = undefined;

  //set up the sortBy object for the drop-down menu
  $scope.sortBy = {};
  $scope.parameters = [
    { parameter: 'date' },
    { parameter: 'rating' },
    { parameter: 'relevance' },
  ];

  //Scope functions
  $scope.getVideos = function () {
    $scope.videos = youtubeFactory.getYoutubeVideos($scope.keywords, $scope.sortBy);
    console.log('$scope.videos: ', $scope.videos);
  };

  $scope.addFavorite = function (video) {
    databaseFactory.createFavorite(video).then(function () {
      $scope.favoriteAdded = true;
      $scope.selectedVideo = video.id;
      $scope.videos = addFavoriteService.updateVideos(video, $scope.videos);
    });
  };

  function failedFavoriteMsg() {
    console.log('favorite not added');
  }
},
]);
