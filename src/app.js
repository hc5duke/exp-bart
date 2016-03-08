(function (exports) {
  'use strict';

  function Bobo() {
    this.stations = [];
  }

  Bobo.prototype.fetch = function() {
    var calls = [];

    for (var st in stations) {
      var station = stations[st];
      var url = station;
      var promise = fetch(url).
        then(this.processStation.bind(this));
      calls.push(promise);
    }

    return Promise.all(calls);
  };

  //var _getTagText = function (tagGetter, tag) { return tagGetter(tag)[0].textContent; };
  Bobo.prototype.processStation = function (data) {
    var station = data.getElementsByTagName("station")[0];
    var etds = {};
    var etdData = station.getElementsByTagName('etd');
    console.log('xxxx');
    // build etds
    for (var e in etdData) {
      var d = etdData[e];
    }
    this.stations.push({
      name: station.getElementsByTagName("name")[0].textContent,
      abbr: station.getElementsByTagName("abbr")[0].textContent,
      //etds: etds,
    });
  };

  var stations = [
    'embr',
    'mont',
    'powl',
    'civc',
  ];

  exports.Bobo = Bobo;
})(this);
