(function () {
'use strict';

myApp.service('searchWordService', function () {
    // Given a new searchWord and the entire list of searchWords, check to see if the
    // new searchWord is already in the list
    var newSearchWord;

    this.isSearchWord = function (searchWords, searchWord) {
      if (searchWord) {
        newSearchWord = searchWord.toLowerCase();
      }

      for (var i = 0, l = searchWords.length; i < l; i++) {
        if (searchWords[i].parameter === newSearchWord) {
          return true;
        }
      }

      return false;
    };
  });
})();
