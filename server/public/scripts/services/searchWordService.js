myApp.service('searchWordService', function () {

    this.isSearchWord = function (searchWords, searchWord) {
      if (searchWord != undefined) {
        var newSearchWord = searchWord.toLowerCase();
      };

      for (var i = 0, l = searchWords.length; i < l; i++) {
        if (searchWords[i].parameter === newSearchWord) {
          return true;
        };
      };

      return false;
    };
  });
