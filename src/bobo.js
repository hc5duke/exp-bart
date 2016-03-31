(function (exports) {
  'use strict';

  function Bobo() {
    this.stations = [];
  }

  Bobo.prototype.fetch = function(stations) {
    var calls = [];

    for (var st in stations) {
      var station = stations[st];
      var url = "http://api.bart.gov/api/etd.aspx?cmd=etd&orig=" + station + "&key=MW9S-E7SL-26DU-VV8V";
      if (exports.DEBUG_MODE === 'local') {
        url = "http://127.0.0.1:8000/fixtures/" + station + ".xml";
      } else if (exports.DEBUG_MODE === 'test') {
        url = station;
      }
      console.log([!!fetch, url]);
      var promise = fetch(url).
        then(this.processStation.bind(this)).
        then(this.processTrains.bind(this));
      calls.push(promise);
    }

    return Promise.all(calls);
  };

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
          dest:      dest,
          minutes:   Number(min) || 0,
          platform:  Number(est.getElementsByTagName('platform')[0].textContent),
          direction: est.getElementsByTagName('direction')[0].textContent.toLowerCase(),
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


  Bobo.prototype.processTrains = function () {
    var dest, est, estimates, etds, s;
    this.lines = {};
    for (s in this.stations) {
      etds = this.stations[s].etds;
      for (dest in etds) {
        estimates = etds[dest].estimates;
        for (var t in estimates) {
          est = estimates[t];
          if (! this.lines[est.color]) {
            this.lines[est.color] = {};
          }
          if (! this.lines[est.color][est.direction]) {
            this.lines[est.color][est.direction] = [];
          }
          this.lines[est.color][est.direction].push(est);
        }
      }
    }

  };


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
        '16th': 13,
        '24th': 15,
      },
      north: {
        oppositeDirection: 'south',
      },
    },
    yellow: {
      // direction
      south: {
        woak:    0,
        embr:    7,
        mont:    8,
        powl:    9,
        civc:   10,
        '16th': 13,
        '24th': 15,
      },
      north: {
        oppositeDirection: 'south',
      },
    },
  };

  function similarity(train1, train2) {
    if (train1.length    != train2.length  ||
        train1.color     != train2.color   ||
        train1.direction != train2.direction) {
      return 0;
    }

    // identical trains!
    if (
      train1.minutes  === train2.minutes  &&
      train1.viewer   === train2.viewer   &&
      train1.dest     === train2.dest     &&
      train1.platform === train2.platform
    ) {
      return 1;
    }

    var diffs = DISTANCES[train1.color];
    var direction = train1.direction;
    var multiplier = 1;
    if (diffs[direction].oppositeDirection) {
      direction = diffs[direction].oppositeDirection;
      multiplier = -1;
    }
    var diff = diffs[direction][train2.viewer] - diffs[direction][train1.viewer];
    var adjustedTrain2Minutes = train2.minutes - multiplier * diff;
    var offBy = Math.abs(train1.minutes - adjustedTrain2Minutes);

    // almost certainly same train
    if (offBy === 0) {
      return 0.99;
    }

    // probably same train
    if (offBy === 1) {
      return 0.90;
    }

    return 0;
  }

  Bobo.similarity = similarity;

  exports.Bobo = Bobo;
})(this);
