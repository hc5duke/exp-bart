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
    var lineDiv = crElem('div');
    lineDiv.className = 'line';
    var colorName = crElem('h3');
    colorName.innerText = color;
    colorName.className = color;
    lineDiv.appendChild(colorName);

    for (var s in this.stations) {
      var station = this.stations[s];
      var loc = DISTANCES[color].south[station];

      var stationDiv = crElem('span');
      stationDiv.className = 'station';
      stationDiv.innerText = station;
      stationDiv.style.left = convertLocToPx(loc) + 'px';
      lineDiv.appendChild(stationDiv);
      console.log(station, loc);
    }

    this.base.appendChild(lineDiv);

    return lineDiv;
  };

  var DISTANCES = exports.consts.DISTANCES;
  Draw.prototype.addStations = function(stations) {
    this.stations = stations;
  };

  Draw.prototype.makeTrack = function(lineDiv, trains) {
    var trackDiv = crElem('div');
    trackDiv.className = 'track';
    for (var t in trains) {
      var train = trains[t];
      var trainSpan = crElem('span');
      trainSpan.className = 'train';
      locate(train, trainSpan);
      trainSpan.innerText = '[' + train.location + ']';
      trainSpan.title = [
        '-> ', train.dest, '\n',
        train.minutes, 'm from ', train.viewer
      ].join('');
      for (var x in train.similar) {
        var sim = train.similar[x];
        trainSpan.title += ['\n', sim.minutes, 'm from ', sim.viewer].join('');
      }

      trackDiv.appendChild(trainSpan);
    }

    return trackDiv;
  };

  function locate(train, span) {
    span.style.left = convertLocToPx(train.location) + 'px';
    span.style.top  = '3px';
  }

  function convertLocToPx(loc) {
    return 400 + loc * 30;
  }

  var crElem = function(elem){
    return document.createElement(elem);
  };

  exports.Draw = Draw;
})(this);
