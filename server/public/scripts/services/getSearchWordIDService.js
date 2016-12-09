(function () {
'use strict';

myApp.service('getSearchWordIDService', function () {

    // Given a word and the complete list of database search words, match the word with one from
    // the database, then return the database primary key (search_word_id) for the matched word.
    this.getSearchWordID = function (searchWord, searchWords) {
      for (var i = 0, l = searchWords.length; i < l; i++) {
        if (searchWords[i].parameter === searchWord.parameter) {
          return searchWords[i].search_word_id;
        };
      };
    };
  });
})();
