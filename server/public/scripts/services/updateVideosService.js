myApp.service('updateVideosService', function () {
    this.updateVids = function (video, scopeVideos) {
      var scopeVideos = scopeVideos;
      for (var i = 0; i < scopeVideos.length; i++) {
        if (scopeVideos[i].id === video.id) {
          scopeVideos[i].isFavorite = true;
        };
      };

      console.log('favorite supposedly added');
      return scopeVideos;
    };
  });
