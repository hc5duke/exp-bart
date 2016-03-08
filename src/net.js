(function (exports) {
  'use strict';

  function fetch(url) {
    return new Promise(function (fulfill, reject){
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
          if(xmlhttp.status == 200) {
            fulfill(xmlhttp.responseXML);
          } else {
            reject("status:" + xmlhttp.status);
          }
        }
      };
      xmlhttp.open("GET", url, true);
      xmlhttp.send();
    });
  }

  exports.fetch = fetch;
})(this);
