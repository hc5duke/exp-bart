(function (exports) {
  'use strict';

  exports.DEBUG_MODE = 'local';

  // set up d3
  var draw = new Draw();

  // fetch station status
  var bart = new Bart();
  var stations = ['woak', 'embr', 'mont', 'powl', 'civc', '16th', '24th'];
  bart.fetch(stations).

    // process data when everything comes back
    then(bart.processTrains.bind(bart)).

    then(function () {
      console.log(bart);
      for (var color in bart.lines) {

        var line = bart.lines[color];
        for (var dir in line) {
          //var track = lineDiv.tracks[dir];
          //draw.addTrains(track, line[dir], color);
        }
      }

    });

  exports.bart = bart;
})(this);
