(function (exports) {
  'use strict';

  exports.DEBUG_MODE = 'local';

  var stations = ['mont', 'powl', 'civc', '16th'];
  var bobo = new Bobo();
  bobo.fetch(stations).then(function (body) {
    console.log(bobo.trains);
  });
  exports.bobo = bobo;
})(this);
