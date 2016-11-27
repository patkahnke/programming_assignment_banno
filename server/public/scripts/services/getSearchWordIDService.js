myApp.service('getSearchWordIDService', function () {

    this.getSearchWordID = function (searchWord, searchWords) {
      console.log('searchWords inside getSearchWordIDService:', searchWords);
      console.log('searchWord inside getSearchWordIDService: ', searchWord);
      for (var i = 0, l = searchWords.length; i < l; i++) {
        if (searchWords[i].parameter === searchWord.parameter) {
          return searchWords[i].search_word_id;
        };
      };
    };
  });
