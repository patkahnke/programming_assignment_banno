myApp.service('getFavoriteIDService', function () {
    // Given a favorite and the complete list of favorites, match the YouTube video ID of the
    // favorite with a YouTube video ID in the list of favorites, then return the
    // database primary key (favorite_id) for the matched video ID.

    this.getFavoriteID = function (favorite, favorites) {
      for (var i = 0, l = favorites.length; i < l; i++) {
        if (favorites[i].videoid === favorite.id || favorites[i].videoid === favorite.videoid) {
          return favorites[i].favorite_id;
        };
      };
    };
  });
