myApp.service('getFavoriteIDService', function () {

    this.getFavoriteID = function (video, favorites) {
      console.log('video inside getFavoriteIDService: ', video);
      console.log('favorites inside getFavoriteIDService:', favorites);
      for (var i = 0, l = favorites.length; i < l; i++) {
        if (favorites[i].videoid === video.id) {
          return favorites[i].favorite_id;
        };
      };
    };
  });
