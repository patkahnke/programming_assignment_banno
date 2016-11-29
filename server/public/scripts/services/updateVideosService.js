myApp.service('updateVideosService', ['YouTubeFactory', function (YouTubeFactory) {
    var youTubeFactory = YouTubeFactory;

    this.updateVids = function (video, scopeVideos, searchBy) {
      for (var i = 0, l = scopeVideos.length; i < l; i++) {
        if (scopeVideos[i].id === video.id) {
          scopeVideos[i].isFavorite = true;
        };
      };

      youTubeFactory.refreshFavorites(searchBy);
      return scopeVideos;
    };
  },
]);
