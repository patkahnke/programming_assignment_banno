describe('AdditionFactory', function () {
  var AdditionFactory;

  beforeEach(angular.mock.module('myApp'));

  beforeEach(inject(function (_AdditionFactory_) {
    AdditionFactory = _AdditionFactory_;
  }));

  it('should exist', function () {
    expect(AdditionFactory).toBeDefined();
  });
});
