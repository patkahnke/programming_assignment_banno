myApp.service('buildEmbedUrlsService', ['$sce', function ($sce) {

      // build embedded urls rather than accessing them from the YouTube API in order
      // to have more control over parameters (i.e. "autoplay")
      this.buildEmbedUrls = function (videosObject, autoplay) {
        for (var i = 0; i < videosObject.length; i++) {

          // Account for different names for the YouTube video ID between a database video resource
          // and a YouTube API video resource
          if (videosObject[i].videoid === undefined) {
            var videoID = videosObject[i].id;
          } else {
            var videoID = videosObject[i].videoid;
          };

          //As a security measure, AngularJS' Strict Contextual Escaping does not allow binding of
          //arbitrary HTML that is controlled by the user, such as the embedded url below.
          //$sce.trustAsResourceUrl lets AngularJS know the url is safe.
          embedUrl = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + videoID + autoplay);

          //add "embedUrl" to the videos object and populate it with the new embedUrls
          videosObject[i].embedUrl = embedUrl;
        }

        return videosObject;
      };
    },
  ]);
