(function (exports) {
  'use strict';

  function Draw(base) {
    this.base = base;
    var statusDiv = document.createElement('div');
    statusDiv.innerText = 'Status: ';
    this.status = document.createElement('span');
    statusDiv.appendChild(this.status);
    statusDiv.className = 'status';
    base.appendChild(statusDiv);
  }

  Draw.prototype.setStatus = function (stat) {
    this.status.innerText = stat;
  };

  Draw.prototype.makeLine = function(label) {
    var lineDiv  = document.createElement('div');
    var colorName = document.createElement('h3');
    colorName.innerText = label;
    colorName.style.color = label;
    lineDiv.appendChild(colorName);
    this.base.appendChild(lineDiv);

    return lineDiv;
  };

  Draw.prototype.makeTrack = function(lineDiv, trains) {
    var trackDiv = document.createElement('div');
    for (var t in trains) {
      var train = trains[t];
      var trainSpan = document.createElement('span');
      trainSpan.innerText = '[' + train.location + ']';
      trainSpan.title = [
        '-> ', train.dest, '\n',
        train.minutes, 'm from', train.viewer
      ].join('');
      for (var x in train.similar) {
        var sim = train.similar[x];
        trainSpan.title += ['\n', sim.minutes, 'm from', sim.viewer].join('');
      }

      trackDiv.appendChild(trainSpan);
    }

    return trackDiv;
  };

  exports.Draw = Draw;
})(this);
