myApp.directive('pkYouTube', function () {
  return {
    restrict: 'E',
    replace: false,
    templateUrl: 'views/templates/pkYouTube.html',
    controller: 'pkYouTubeController',
  };
});
