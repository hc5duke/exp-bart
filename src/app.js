(function (exports) {
  'use strict';

  exports.DEBUG_MODE = 'local';

  var stations = ['mont', 'powl', 'civc', '16th'];
  var bobo = new Bobo();
  bobo.fetch(stations).
    then(bobo.processTrains.bind(bobo));
  exports.bobo = bobo;
})(this);
