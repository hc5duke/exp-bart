(function (exports) {
  'use strict';

  /**
   * hijack network fetch call
   */
  function fetch(url) {
    var file = fetch.files[url];
    if (file) {
      return loadFile(file);
    } else {
      throw "unexpected network call at " + url;
    }
  }

  function loadFile(path) {
    return new Promise(function (fulfill, reject){
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          fulfill(xhr.responseXML);
        }
      };
      xhr.open("GET", path, true);
      xhr.send();
    });
  }
  fetch.files = {};
  exports.fetch = fetch;
})(this);
