myApp.controller('favoritesController',
                ['$scope', '$sce',
                'DatabaseFactory',
        function ($scope, $sce,
                DatabaseFactory) {

    var databaseFactory = DatabaseFactory;

    $scope.favVideos;
    $scope.selectedId;
    $scope.newKeyword;
    $scope.keywords;

    //set up the sortBy object for the drop-down menu
    $scope.sortBy = {};

    $scope.getFavorites = function () {
      databaseFactory.refreshFavorites($scope.sortBy).then(function () {
        $scope.favVideos = databaseFactory.getFavorites();
      });
    };

    $scope.deleteFavorite = function (favVideo) {
      console.log('favVideo.favorite_id: ', favVideo.favorite_id);
      databaseFactory.deleteFavorite(favVideo.favorite_id).then(function () {
        databaseFactory.refreshFavorites().then(function () {
          $scope.getFavorites();
        });
      });
    };

    // $scope.showVideo = function (favVideo) {
    //   $scope.selectedId = favVideo.videoid;
    // };

    $scope.addKeyword = function () {
      databaseFactory.createKeyWord($scope.newKeyword).then(function () {
        databaseFactory.refreshKeywords().then(function () {
            $scope.getKeywords();
          });
      });
    };

    $scope.getKeywords = function () {
      databaseFactory.refreshKeywords().then(function () {
        $scope.keywords = databaseFactory.getKeywords();
        $scope.parameters = $scope.keywords;
        console.log('$scope.keywords: ', $scope.keywords);
      });
    };

    $scope.getKeywords();

    //Close search controller
  },
]);
