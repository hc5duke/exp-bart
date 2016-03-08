(function (exports) {
  'use strict';

  function Bobo() {
    this.stations = {};
  }

  Bobo.prototype.fetch = function() {
    var calls = [];
    for (var st in stations) {
      var station = stations[st];
      var url = station;
      var promise = fetch(url).then(this.processStation)//.bind(this));
      calls.push(promise);
    }

    return Promise.all(calls);
  };

  Bobo.prototype.processStation = function (data) {
    var station = data.getElementsByTagName("station")[0];
    var name = station.getElementsByTagName("abbr")[0].textContent;
    console.log(name);
    //this.stations.push(station);
    return this;
    //return data;
  };

  var stations = [
    'embr',
    'mont',
    'powl',
    'civc',
  ];

  exports.Bobo = Bobo;
})(this);
