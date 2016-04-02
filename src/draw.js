(function (exports) {
  'use strict';

  function Draw(base) {
    var main = document.getElementById('main');

    /*
    y1 = 700
    y2 = 1000

    - s
    |
    |
    - y1
    |
    - y2
    |
    |
    - s + h

=> y1 - s = (s + h) - y2
=> y1 + y2 - h = 2 * s
*/

    main.scrollTop = (700 + 1000 - window.innerHeight)/2;

    var draw = SVG('bart');
    var image = draw.image('img/BARTMapDay.svg');
    image.size(2200, 2200).y(-200).x(-100);

    var text = '🚈';
    draw.text(text).x(780).y(300).rotate(-30);
    draw.text(text).x(800).y(308).rotate(180-30);

  }

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
    span.style.top = convertLocToPx(train.location) + 'px';
  }

  function convertLocToPx(loc) {
    return loc * 20 + 200;
  }

  var crElem = function(elem){
    return document.createElement(elem);
  };

  exports.Draw = Draw;
})(this);
