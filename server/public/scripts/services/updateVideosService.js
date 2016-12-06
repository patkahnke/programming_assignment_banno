myApp.service('updateVideosService', ['YouTubeFactory', function (YouTubeFactory) {
    // Update the saved videos to ensure that any new favorite has been marked as "isFavorite"
    var youTubeFactory = YouTubeFactory;

    this.updateVids = function (video, scopeVideos, searchBy) {
      for (var i = 0, l = scopeVideos.length; i < l; i++) {
        scopeVideos[i].isFavorite = scopeVideos[i].id === video.id ? true : false;
      };

      youTubeFactory.refreshFavorites(searchBy);
      return scopeVideos;
    };
  },
]);
