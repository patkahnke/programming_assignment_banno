myApp.directive('pkYouTubeSearch', function () {
  return {
    restrict: 'E',
    replace: false,
    templateUrl: 'views/templates/pkYouTubeSearch.html',
    controller: 'pkYouTubeSearchController',
  };
});
