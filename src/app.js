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

    // build etds
    for (var i = 0; i < etdData.length; i++) {
      var d = etdData[i];
      var dest = d.getElementsByTagName('abbreviation')[0].textContent.toLowerCase();
      var etd = {
        destination: dest,
        estimates: [],
      };
      var estimates = d.getElementsByTagName('estimate');
      for (var j = 0; j < estimates.length; j++) {
        var est = estimates[j];
        var estimate = {
          minutes: est.getElementsByTagName('minutes')[0].textContent,
          platform: est.getElementsByTagName('platform')[0].textContent,
          direction: est.getElementsByTagName('direction')[0].textContent,
          length: est.getElementsByTagName('length')[0].textContent,
          color: est.getElementsByTagName('color')[0].textContent,
        };
        etd.estimates.push(estimate);
      }
      etds[dest] = etd;
    }

    this.stations.push({
      name: station.getElementsByTagName("name")[0].textContent,
      abbr: station.getElementsByTagName("abbr")[0].textContent,
      etds: etds,
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
