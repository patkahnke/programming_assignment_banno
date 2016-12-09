(function () {
'use strict';

myApp.service('buildEmbedUrlsService', ['$sce', function ($sce) {

      // build embedded urls rather than accessing them from the YouTube API in order
      // to have more control over parameters (i.e. "autoplay")
      this.buildEmbedUrls = function (vids) {
        for (var i = 0, l = vids.length; i < l; i++) {

          // Account for different names for the YouTube video ID between a database video resource
          // and a YouTube API video resource
          var videoID = vids[i].videoid || vids[i].id;

          //As a security measure, AngularJS' Strict Contextual Escaping does not allow binding of
          //arbitrary HTML that is controlled by the user, such as the embedded url below.
          //$sce.trustAsResourceUrl lets AngularJS know the url is safe.
          var embedUrl = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + videoID + '?rel=0;&autoplay=1');

          vids[i].embedUrl = embedUrl;
        }

        return vids;
      };
    },
  ]);
})();
