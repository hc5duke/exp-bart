(function (exports) {
  'use strict';

  function Draw(base) {
    var main = document.getElementById('main');

    // scroll to keep sf downtown in focus
    main.scrollTop = (700 + 1000 - window.innerHeight)/2;
    main.scrollLeft = (100 + 400 - window.innerWidth)/2;

    var draw = SVG('bart');
    this.draw = draw;

    var image = draw.image('img/BARTMapDay.svg');
    image.size(2200, 2200).y(-200).x(-100);

    // legend
    draw.rect(250, 100).x(10).y(550).radius(4);
    draw.rect(246,  96).x(12).y(552).radius(3).fill('#f8f8f8');
    draw.text('Train Locator\nan experiment by @hc5duke').x(30).y(580);
    //rect.animate('.5s').fill('#f8f8f8');

    // test this out
    var train = new Train({
      direction: 'north',
      color:     'yellow',
      location:  10,
    });

    this.addTrain(train);
  }

  var trainEmoji = '🚈';
  Draw.prototype.addTrain = function() {
    //
    var x = 300;
    var y = 870;
    var t = -30;
    this.draw.text(trainEmoji).x(x).y(y).scale(-1, 1).rotate(43);
  };

  Draw.prototype.setStatus = function (stat) {
    this.status.innerText = stat;
  };

  Draw.prototype.makeLine = function(color) {
    var lineDiv = crElem('div');
    return lineDiv;
  };

  var DISTANCES = exports.consts.DISTANCES;
  Draw.prototype.addStations = function(stations) {
    this.stations = stations;
  };

  Draw.prototype.addTrains = function(trackDiv, trains, color) {
  };

  function locate(train, span) {
    span.style.top = convertLocToPx(train.avgLocation()) + 'px';
  }

  function convertLocToPx(loc) {
    return loc * 20 + 200;
  }

  var crElem = function(elem){
    return document.createElement(elem);
  };

  exports.Draw = Draw;
})(this);
