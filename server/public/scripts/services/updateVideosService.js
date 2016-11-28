myApp.service('updateVideosService', ['YoutubeFactory', function (YoutubeFactory) {
    var youtubeFactory = YoutubeFactory;

    this.updateVids = function (video, scopeVideos, searchBy) {
      console.log('searchBy in updateVids: ', searchBy);
      for (var i = 0, l = scopeVideos.length; i < l; i++) {
        if (scopeVideos[i].id === video.id) {
          scopeVideos[i].isFavorite = true;
        };
      };

      youtubeFactory.refreshFavorites(searchBy);
      return scopeVideos;
    };
  },
]);
