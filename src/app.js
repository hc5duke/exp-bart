(function (exports) {
  'use strict';

  //  exports.DEBUG_MODE = 'local';

  // setup html
  var bart = document.getElementById('bart');
  var statusDiv = document.createElement('div');
  var status = document.createElement('span');
  statusDiv.appendChild(status);
  statusDiv.className = 'status';
  bart.appendChild(statusDiv);

  var stations = ['woak', 'embr', 'mont', 'powl', 'civc', '16th', '24th'];
  var bobo = new Bobo();

  // fetch station status
  setStatus('network...');
  bobo.fetch(stations).

    // set status
    then(setStatus.bind(this, 'processing')).

    // process data when everything comes back
    then(bobo.processTrains.bind(bobo)).

    // set status
    then(setStatus.bind(this, 'finished')).

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

  function setStatus(stat) {
    status.innerText = stat;
  }

  exports.bobo = bobo;
})(this);
