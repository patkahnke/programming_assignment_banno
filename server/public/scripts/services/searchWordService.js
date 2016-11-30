myApp.service('searchWordService', function () {

    this.isSearchWord = function (databaseSearchWords, searchWord) {
      for (var i = 0, l = databaseSearchWords.length; i < l; i++) {
        if (databaseSearchWords[i].parameter === searchWord) {
          return true;
        };
      };

      return false;
    };
  });
