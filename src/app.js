(function () {
  'use strict';

  function init () {
    window.DEBUG_MODE = 'local';

    // set up svg
    var draw = new Draw();

    // fetch station status
    var bart = new Bart();
    var stations = ['woak', 'embr', 'mont', 'powl', 'civc', '16th', '24th'];
    bart.fetch(stations).
      then(bart.processTrains.bind(bart)). // process data when everything comes back
      then(drawTrains).                    // draw!
      then(done);                          // done?

    function drawTrains() {
      for (var color in bart.lines) {
        var line = bart.lines[color];
        for (var dir in line) {
          var track = line[dir];
          for (var t in track) {
            var train = track[t];
            //log(train);
          }

          //log(train);
        }
      }
    }

    function done() {
      log('idk my bff jill?');      // done?
    }

    window.bart = bart;
  }

  function log() {
    if (window.DEBUG_MODE) {
      console.log.apply(console, arguments);
    }
  }
  // wait for dom i guess?
  $(init);
})();
