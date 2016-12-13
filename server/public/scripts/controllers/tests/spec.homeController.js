describe('homeController', function () {
    var $scope;
    var $httpBackend;
    var createController;

    beforeEach(inject(function ($rootScope, $httpBackend, $controller) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();

      createController = function () {
        return $controller('homeController', {
          $scope: $scope,
        });
      };
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

    it('should request favorites', function () {
        var controller = createController();
        $scope.urlToScrape = 'success.com';

        $httpBackend.expect('GET', '/slurp?urlToScrape=http:%2F%2Fsuccess.com')
            .respond({
                "success": true,
                "links": ["http://www.google.com", "http://angularjs.org", "http://amazon.com"]
            });

        // have to use $apply to trigger the $digest which will
        // take care of the HTTP request
        $scope.$apply(function () {
            $scope.runTest();
        });

        expect($scope.parseOriginalUrlStatus).toEqual('calling');

        $httpBackend.flush();

        expect(scope.retrievedUrls).toEqual(["http://www.google.com", "http://angularjs.org", "http://amazon.com"]);
        expect(scope.parseOriginalUrlStatus).toEqual('waiting');
        expect(scope.doneScrapingOriginalUrl).toEqual(true);
    });
});
