(function (exports) {
  'use strict';

  function Bobo() {
    var cb = function (er, bd) {
      console.log(er, bd);
    };

    for (var st in stations) {
      var station = stations[st];
      var url = station;
      fetch(url, cb);
    }

  }

  var stations = [
    'embr',
    'mont',
    'powl',
  ];

  function fetch(url, callback) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = callback;
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }

  exports.Bobo = Bobo;
})(this);

Bobo();
