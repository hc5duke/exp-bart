(function (exports) {
  'use strict';

  function Bart() {
    this.stations = [];
  }

  Bart.prototype.fetch = function(stations) {
    var calls = [];

    for (var st in stations) {
      var station = stations[st];
      var url = "http://api.bart.gov/api/etd.aspx?cmd=etd&orig=" + station + "&key=MW9S-E7SL-26DU-VV8V";
      if (exports.DEBUG_MODE === 'local') {
        url = "http://127.0.0.1:8000/fixtures/" + station + ".xml";
      } else if (exports.DEBUG_MODE === 'test') {
        url = station;
      }
      var promise = fetch(url).
        then(this.processStation.bind(this));
      calls.push(promise);
    }

    return Promise.all(calls);
  };

  Bart.prototype.processStation = function (data) {
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
      var estimate, estimates;
      estimates = d.getElementsByTagName('estimate');
      for (var j = 0; j < estimates.length; j++) {
        estimate = makeEstimate(estimates[j], abbr, dest);
        estimate.viewer = abbr;
        estimate.dest   = dest;
        normalizeTrain(estimate);
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


  Bart.prototype.processTrains = function () {
    var dest, est, estimates, etds, found, s, t, thisLine, tr, train;
    this.lines = {};
    var colors = ['red', 'blue', 'yellow', 'green', 'orange'];
    var directions = ['south', 'north'];
    for (var c in colors) {
      this.lines[colors[c]] = {south: [], north: []};
    }

    for (s in this.stations) {
      etds = this.stations[s].etds;
      for (dest in etds) {
        estimates = etds[dest].estimates;
        for (t in estimates) {
          est = new Train(estimates[t]);
          thisLine = this.lines[est.color][est.direction] || [];
          found = false;
          for (tr in thisLine) {
            train = thisLine[tr];
            // close enough
            if (similarity(train, est) > 0.7) {
              // closer to est
              if (est.minutes < train.minutes) {
                est.similar = train.similar || [];
                est.similar.push(train);
                train.similar = undefined;
                thisLine[tr] = est;
              } else { // closer to train
                train.similar || (train.similar = []);
                train.similar.push(est);
              }
              // mark this train
              found = true;
              break;
            }
          }
          if (!found) {
            thisLine.push(est);
          }
        }
      }
    }

    // sort trains and similar trains list
    var color, line, dir, trains;
    for (color in this.lines) {
      line = this.lines[color];
      for (dir in line) {
        trains = line[dir];
        trains.sort(trainSort.bind(this, 'location'));

        // this part is for debugging only
        for (var tt in trains) {
          var similar = trains[tt].similar;
          similar && similar.sort(trainSort.bind(this, 'minutes'));
        }
      }
    }
  };

  function trainSort(field, t1, t2) {
    return t1[field] - t2[field];
  }

  /**
   * normalize!
   */
  function makeEstimate(est) {
    var estimate = {
      minutes:   _getNumText(est.getElementsByTagName('minutes'  )[0]),
      length:    _getNumText(est.getElementsByTagName('length'   )[0]),
      platform:  _getNumText(est.getElementsByTagName('platform' )[0]),
      direction:  _getLoText(est.getElementsByTagName('direction')[0]),
      color:      _getLoText(est.getElementsByTagName('color'    )[0]),
    };
    return estimate;
  }

  function _getNumText(obj) {
    return Number(obj.textContent) || 0;
  }

  function _getLoText(obj) {
    return obj.textContent.toLowerCase();
  }

  function normalizeTrain(train) {
    var color, dir, sttn, offset, offsets;

    color   = train.color;
    dir     = train.direction;
    sttn    = train.viewer;
    offsets = DISTANCES[color][dir];

    if (offsets.oppositeDirection) {
      offsets = DISTANCES[color][offsets.oppositeDirection];
      //return - offsets[sttn]; // correct
      train.location = train.minutes + offsets[sttn];
    } else {
      //return - offsets[sttn];
      train.location = offsets[sttn] - train.minutes;
    }
  }

  var DISTANCES = exports.consts.DISTANCES;

  function similarity(train1, train2) {

    // not even close
    if (train1.length    != train2.length  ||
        train1.color     != train2.color   ||
        train1.dest      != train2.dest    ||
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

    var offBy = Math.abs(train2.location - train1.location);

    // almost certainly same train
    if (offBy === 0) {
      return 0.99;
    }

    // similar but definitely different
    if (train1.viewer === train2.viewer) {
      return 0;
    }

    // ¯\_(ツ)_/¯
    // 1: 90%
    // 2: 80%
    // 3: 20%
    // 4: 10%
    // 5+: 0%
    switch (offBy) {
      case 1:
        return 0.90;
      case 2:
        return 0.80;
      case 3:
        return 0.20;
      case 4:
        return 0.10;
      default:
        return 0;
    }
  }

  Bart.similarity = similarity;

  function Train(data) {
    for (var d in data) {
      this[d] = data[d];
    }
  }

  Train.prototype.avgLocation = function() {
    if (!this.similar) {
      return this.location;
    }

    var locSum = this.location;
    for (var s in this.similar) {
      locSum += this.similar[s].location;
    }
    return locSum / (1 + this.similar.length);
  };


  exports.Bart = Bart;

  // for testing
  exports.Bart.normalizeTrain = normalizeTrain;
})(this);
