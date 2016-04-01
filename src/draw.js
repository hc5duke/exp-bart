(function (exports) {
  'use strict';

  function Draw(base) {
    this.base = base;
    var statusDiv = crElem('div');
    statusDiv.innerText = 'Status: ';
    this.status = crElem('span');
    statusDiv.appendChild(this.status);
    statusDiv.className = 'status';
    base.appendChild(statusDiv);
  }

  Draw.prototype.setStatus = function (stat) {
    this.status.innerText = stat;
  };

  Draw.prototype.makeLine = function(color) {
    // lineOuter contains colorName and lineDiv
    var lineOuter = crElem('div');
    this.base.appendChild(lineOuter);

    // line stations and trains
    var lineDiv = crElem('div');
    lineDiv.className = 'line';
    console.log(lineDiv);

    var stationsDiv = crElem('div');
    lineDiv.appendChild(stationsDiv);

    for (var s in this.stations) {
      var station = this.stations[s];

      var stationDiv = crElem('span');
      stationDiv.className = 'station';
      stationDiv.innerText = station;

      var loc = DISTANCES[color].south[station];

      console.log(station, color, loc);
      stationDiv.style.left = convertLocToPx(loc) + 'px';
      stationsDiv.appendChild(stationDiv);
    }

    lineOuter.appendChild(lineDiv);

    // add tracks
    var south = crElem('div');
    var north = crElem('div');
    south.className = 'track';
    north.className = 'track';
    lineDiv.appendChild(south);
    lineDiv.appendChild(north);

    lineDiv.tracks = {
      south: south,
      north: north,
    };

    return lineDiv;
  };

  var DISTANCES = exports.consts.DISTANCES;
  Draw.prototype.addStations = function(stations) {
    this.stations = stations;
  };

  Draw.prototype.addTrains = function(trackDiv, trains, color) {
    for (var t in trains) {
      var train = trains[t];
      var trainDiv = crElem('div');
      trainDiv.className = 'train ' + color;
      if (train.direction === 'south') {
        trainDiv.className += ' reverse';
      }
      locate(train, trainDiv);
      trainDiv.innerText = '🚈';
      trainDiv.title = [
        '-> ', train.location, ':', train.dest, '\n',
        train.minutes, 'm from ', train.viewer
      ].join('');
      for (var x in train.similar) {
        var sim = train.similar[x];
        trainDiv.title += ['\n', sim.minutes, 'm from ', sim.viewer].join('');
      }

      trackDiv.appendChild(trainDiv);
    }

    return trackDiv;
  };

  function locate(train, span) {
    span.style.left = convertLocToPx(train.location) + 'px';
  }

  function convertLocToPx(loc) {
    return 400 + loc * 30;
  }

  var crElem = function(elem){
    return document.createElement(elem);
  };

  exports.Draw = Draw;
})(this);
