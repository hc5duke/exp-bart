'use strict';

describe('test', function () {
  it('test', function (done) {
    fetch.files.embr = './fixtures/embr.xml';
    fetch.files.mont = './fixtures/mont.xml';
    fetch.files.powl = './fixtures/powl.xml';
    fetch.files.civc = './fixtures/civc.xml';
    var bobo = new Bobo();
    var allStations = ['embr', 'mont', 'powl', 'civc'];
    bobo.fetch().then(function () {
      expect(bobo.stations.length).to.eq(4);
      for (var s in bobo.stations) {
        var station = bobo.stations[s];
        for (var t in station.estimates) {
          console.log(station[t]);
        }
        expect(allStations).to.include(station.abbr.toLowerCase());
      }
      //console.log(bobo.stations[0]);
      done();
    }).catch(function (e) {
      console.dir(e);
      done('some conditions were not met');
    });
  });
});
