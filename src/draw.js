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
    return lineDiv;
  };

  var DISTANCES = exports.consts.DISTANCES;
  Draw.prototype.addStations = function(stations) {
    this.stations = stations;
  };

  Draw.prototype.addTrains = function(trackDiv, trains, color) {
  };

  function locate(train, span) {
    span.style.top = convertLocToPx(train.location) + 'px';
  }

  function convertLocToPx(loc) {
    return loc * 20 + 200;
  }

  var crElem = function(elem){
    return document.createElement(elem);
  };

  exports.Draw = Draw;
})(this);
