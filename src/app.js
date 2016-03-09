(function (exports) {
  'use strict';

  function Bobo() {
    this.stations = [];
  }

  Bobo.prototype.fetch = function() {
    var calls = [];

    for (var st in ALL_STATIONS) {
      var station = ALL_STATIONS[st];
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
    var abbr = station.getElementsByTagName("abbr")[0].textContent.toLowerCase();

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
        var min = est.getElementsByTagName('minutes')[0].textContent;
        var estimate = {
          viewer:    abbr,
          minutes:   Number(min) || 0,
          platform:  est.getElementsByTagName('platform')[0].textContent,
          direction: est.getElementsByTagName('direction')[0].textContent,
          length:    est.getElementsByTagName('length')[0].textContent,
          color:     est.getElementsByTagName('color')[0].textContent.toLowerCase(),
        };
        etd.estimates.push(estimate);
      }
      etds[dest] = etd;
    }

    this.stations.push({
      name: station.getElementsByTagName("name")[0].textContent,
      abbr: abbr,
      etds: etds,
    });
  };

  var ALL_STATIONS = [
    'woak',
    'embr',
    'mont',
    'powl',
    'civc',
    '16th',
    '24th',
  ];

  var DISTANCES = {
    // color
    blue: {
      // direction
      south: {
        woak:    0,
        embr:    7,
        mont:    8,
        powl:    9,
        civc:   10,
        '16th': 12,
        '24th': 17,
      },
      north: {
        oppositeDirection: 'south',
      },
    },
  };

  function similarity(est1, est2) {
    if (est1.length    != est2.length  ||
        est1.color     != est2.color   ||
        est1.direction != est2.direction) {
      return 0;
    }

    console.log('>>>>', est1.color); //, est1.color[est1.direction]);
    var diffs = DISTANCES[est1.color];//[est1.direction];
    if (diffs.oppositeDirection) {
      diffs = DISTANCES[est1.color];//[diffs.oppositeDirection];
    }
    var diff = diffs[est2.viewer] - diffs[est1.viewer];
    console.log('diff', diff);
    var adjustedEst2Minutes = est2.minutes - diff;
    return 1;
  }

  Bobo.similarity = similarity;

  exports.Bobo = Bobo;
})(this);
