(function (exports) {
  'use strict';

  exports.DEBUG_MODE = 'local';

  var bart = document.getElementById('bart');
  var stations = ['woak', 'embr', 'mont', 'powl', 'civc', '16th', '24th'];
  var bobo = new Bobo();
  bobo.fetch(stations).
    then(bobo.processTrains.bind(bobo)).
    then(function () {
      for (var b in bobo.lines) {
        var lineDiv  = document.createElement('div');
        var color = document.createElement('h3');
        color.innerText = b;
        lineDiv.appendChild(color);

        var line = bobo.lines[b];
        for (var dir in line) {
          var trains = line[dir];
          var trainsDiv = document.createElement('div');
          for (var t in trains) {
            var train = trains[t];
            var trainSpan = document.createElement('span');
            trainSpan.innerText = '[' + train.location + ']';
            trainsDiv.appendChild(trainSpan);
          }
          lineDiv.appendChild(trainsDiv);
        }
        bart.appendChild(lineDiv);
        //bobo[b]
      }

    });
  exports.bobo = bobo;
})(this);
