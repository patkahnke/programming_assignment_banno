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
      user = environmentVarsFactory.factoryGetDatabaseVars().user;
      password = environmentVarsFactory.factoryGetDatabaseVars().password;
    }

    //set $scope.videos to "undefined" so search page is blank until a search is made
    $scope.videos = undefined;

    //set up the sortBy object for the drop-down menu
    $scope.sortBy = {};
    $scope.parameters = [
      { parameter: 'date' },
      { parameter: 'title' },
    ];

    /**-------- AJAX FUNCTIONS --------**/
    $scope.getFavorites = function () {
        $.ajax({
          type: 'GET',
          url: '/favorites',
          success: function (favorites) {
            console.log(favorites);
            $scope.videos = favorites;
          },
        });
      }

  function putFavorite(event) {
    event.preventDefault();

    var preparedData = dataPrep($(this));
    var movieId = getMovieId($(this));

    $.ajax({
      type: 'PUT',
      url: '/favorites/' + id,
      data: preparedData,
      success: function (data) {
        getFavorites();
      },
    });
  }

  function deleteFavorite(event) {
    event.preventDefault();

    var id = getFavoriteId($(this));

    $.ajax({
      type: 'DELETE',
      url: '/favorites/' + id,
      success: function (data) {
        getFavorites();
      },
    });
  }

  function postFavorite(event) {
    event.preventDefault();

    var favorite = {};

    $.each($('#movieForm').serializeArray(), function (i, field) {
      movie[field.name] = field.value;
    });

    $.ajax({
      type: 'POST',
      url: '/favorites',
      data: favorite,
      success: function (data) {
        getFavorites();
      },
    });
  }

    //Close search controller
  },
]);
