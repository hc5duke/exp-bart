'use strict';

describe('test', function () {
  it('test', function (done) {
    var allStations = ['woak', 'embr', 'mont', 'powl', 'civc', '16th', '24th'];
    for (var s in allStations) {
      var station = allStations[s];
      fetch.files[station] = './fixtures/' + station + '.xml';
    }

    var bobo = new Bobo();
    bobo.fetch().then(function () {
      expect(bobo.stations.length).to.eq(allStations.length);
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
      //console.log(bobo.stations[0]);
      done();
    }).catch(function (e) {
      console.dir(e);
      done('some conditions were not met');
    });
  });
});

describe('.similarity', function () {
  it('different lines return 0', function () {
    expect(Bobo.similarity({color: 'red'}, {color: 'blue'})).to.eq(0);
  });

  it('same trains return 1', function () {
    var train1 = {"from":"woak","minutes":2,"platform":"1","direction":"South","length":"9","color":"blue"};
    var train2 = {"from":"embr","minutes":9,"platform":"1","direction":"South","length":"9","color":"blue"};
    expect(Bobo.similarity(train1, train2)).to.eq(1);
  });

  it('trains with same time but different station return 0', function () {
    var train1 = {"from":"woak","minutes":2,"platform":"1","direction":"South","length":"9","color":"blue"};
    var train2 = {"from":"embr","minutes":2,"platform":"1","direction":"South","length":"9","color":"blue"};
    expect(Bobo.similarity(train1, train2)).to.eq(0);
  });

  it('almost same (wrong direction) trains return 0', function () {
    var train1 = {"from":"woak","minutes":2,"platform":"1","direction":"South","length":"9","color":"blue"};
    var train2 = {"from":"embr","minutes":9,"platform":"1","direction":"North","length":"9","color":"blue"};
    expect(Bobo.similarity(train1, train2)).to.eq(0);
  });

  it('almost same (wrong length) trains return 0', function () {
    var train1 = {"from":"woak","minutes":2,"platform":"1","direction":"South","length":"9","color":"blue"};
    var train2 = {"from":"embr","minutes":9,"platform":"1","direction":"North","length":"8","color":"blue"};
    expect(Bobo.similarity(train1, train2)).to.eq(0);
  });
});
