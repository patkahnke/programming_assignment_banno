myApp.factory('AdditionFactory', function () {

  // PRIVATE
  function helloWorld() {
    return 'Hello World';
  }

  // PUBLIC
  var publicApi = {
    Hello: function () {
      return helloWorld();
    },
  };

  return publicApi;
});
