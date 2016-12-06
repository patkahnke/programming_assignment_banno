myApp.service('updateVideosService', ['YouTubeFactory', function (YouTubeFactory) {
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
