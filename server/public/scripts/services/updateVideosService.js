myApp.service('updateVideosService', ['YoutubeFactory', function (YoutubeFactory) {
    var youtubeFactory = YoutubeFactory;

    this.updateVids = function (video, scopeVideos) {
      var scopeVideos = scopeVideos;
      for (var i = 0; i < scopeVideos.length; i++) {
        if (scopeVideos[i].id === video.id) {
          scopeVideos[i].isFavorite = true;
        };
      };

      youtubeFactory.refreshFavorites();
      console.log('favorite supposedly added');
      return scopeVideos;
    };
  },
]);
