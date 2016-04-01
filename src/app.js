(function (exports) {
  'use strict';

  exports.DEBUG_MODE = 'local';

  // setup html
  var bart = document.getElementById('bart');
  var draw = new Draw(bart);

  var stations = ['woak', 'embr', 'mont', 'powl', 'civc', '16th', '24th'];
  var bart = new Bart();

  // fetch station status
  draw.setStatus('network...');
  draw.addStations(stations);

  var lineDiv = draw.makeLine('red');

  bart.fetch(stations).

    // set status
    then(draw.setStatus.bind(draw, 'processing')).

    // process data when everything comes back
    then(bart.processTrains.bind(bart)).

    // set status
    then(draw.setStatus.bind(draw, 'loaded')).

    then(function () {
      for (var color in bart.lines) {

        var line = bart.lines[color];
        for (var dir in line) {
          var track = lineDiv.tracks[dir];
          draw.addTrains(track, line[dir], color);
        }
      }

    });

  exports.bart = bart;
})(this);
