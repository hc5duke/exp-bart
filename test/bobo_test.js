'use strict';

/* globals Bobo, fetch */

describe('Bobo', function () {
  it('parses station data', function (done) {
    var allStations = ['woak', 'embr', 'mont', 'powl', 'civc', '16th', '24th'];
    for (var s in allStations) {
      var station = allStations[s];
      fetch.files[station] = './fixtures/' + station + '.xml';
    }

    var bobo = new Bobo();
    bobo.fetch(allStations).then(function () {
      expect(bobo.stations.length).to.eq(allStations.length);

      // debug logging
      /*
      for (var s in bobo.stations) {
        var station = bobo.stations[s];
        console.log(station.abbr);
        for (var t in station.etds) {
          console.log('\t', station.abbr + " => " + station.etds[t].destination);
          for (var u in station.etds[t].estimates) {
            console.log('\t\t', station.etds[t].estimates[u]);
          }
        }
        expect(allStations).to.include(station.abbr.toLowerCase());
      }
      console.log(bobo.stations[0]);
      */
      done();
    }).catch(function (e) {
      console.dir(e);
      done('some conditions were not met');
    });
  });
});

describe('.similarity', function () {
  context('same trains', function () {
    it('same trains return 1', function () {
      var train1 = {"viewer":"woak","minutes":2,"platform":"1","direction":"south","length":"9","color":"blue"};
      expect(Bobo.similarity(train1, train1)).to.eq(1);
    });
  });

  context('almost same trains', function () {
    it('almost certainly same trains return 1', function () {
      var train1 = {"viewer":"civc","minutes":13,"platform":1,"direction":"south","length":"9","color":"blue"};
      var train2 = {"viewer":"16th","minutes":16,"platform":1,"direction":"south","length":"9","color":"blue"};
      expect(Bobo.similarity(train1, train2)).to.be.above(0.9);
    });

    it('probably same trains return a value greater than 0', function () {
      var train1 = {"viewer":"16th","dest":"pitt","minutes":40,"platform":2,"direction":"north","length":"10","color":"yellow"};
      var train2 = {"viewer":"24th","dest":"pitt","minutes":39,"platform":2,"direction":"north","length":"10","color":"yellow"};
      expect(Bobo.similarity(train1, train2)).to.be.above(0.8);
    });
  });

  context('different trains', function () {
    it('different lines return 0', function () {
      expect(Bobo.similarity({color: 'red'}, {color: 'blue'})).to.eq(0);
    });

    it('trains with same time but different station return 0', function () {
      var train1 = {"viewer":"woak","minutes":2,"platform":"1","direction":"south","length":"9","color":"blue"};
      var train2 = {"viewer":"embr","minutes":2,"platform":"1","direction":"south","length":"9","color":"blue"};
      expect(Bobo.similarity(train1, train2)).to.eq(0);
    });

    it('almost same (wrong direction) trains return 0', function () {
      var train1 = {"viewer":"woak","minutes":2,"platform":"1","direction":"south","length":"9","color":"blue"};
      var train2 = {"viewer":"embr","minutes":9,"platform":"1","direction":"north","length":"9","color":"blue"};
      expect(Bobo.similarity(train1, train2)).to.eq(0);
    });

    it('almost same (wrong length) trains return 0', function () {
      var train1 = {"viewer":"woak","minutes":2,"platform":"1","direction":"south","length":"9","color":"blue"};
      var train2 = {"viewer":"embr","minutes":9,"platform":"1","direction":"north","length":"8","color":"blue"};
      expect(Bobo.similarity(train1, train2)).to.eq(0);
    });
  });
});
