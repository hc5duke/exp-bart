(function (exports) {
  'use strict';

  exports.DEBUG_MODE = 'local';

  // setup html
  var bart = document.getElementById('bart');
  var draw = new Draw(bart);

  var stations = ['woak', 'embr', 'mont', 'powl', 'civc', '16th', '24th'];
  var bobo = new Bobo();

  // fetch station status
  draw.setStatus('network...');
  draw.addStations(stations);
  bobo.fetch(stations).

    // set status
    then(draw.setStatus.bind(draw, 'processing')).

    // process data when everything comes back
    then(bobo.processTrains.bind(bobo)).

    // set status
    then(draw.setStatus.bind(draw, 'finished')).

    then(function () {
      var lineDiv;

      for (var color in bobo.lines) {
        lineDiv = draw.makeLine(color);

        var line = bobo.lines[color];
        for (var dir in line) {
          var trainsDiv = draw.makeTrack(lineDiv, line[dir]);
          lineDiv.appendChild(trainsDiv);
        }
      }

    });

  exports.bobo = bobo;
})(this);
