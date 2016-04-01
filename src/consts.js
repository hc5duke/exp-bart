(function (exports) {
  'use strict';

  var DISTANCES = {
    // color
    blue: {
      // direction
      south: {
        woak:    0,
        embr:    7,
        mont:    8,
        powl:    9,
        civc:   10,
        '16th': 13,
        '24th': 15,
      },
      north: {
        oppositeDirection: 'south',
      },
    },
    green: {
      // direction
      south: {
        woak:    0,
        embr:    7,
        mont:    8,
        powl:    9,
        civc:   10,
        '16th': 13,
        '24th': 15,
      },
      north: {
        oppositeDirection: 'south',
      },
    },
    red: {
      // direction
      south: {
        woak:    0,
        embr:    7,
        mont:    8,
        powl:    9,
        civc:   10,
        '16th': 13,
        '24th': 15,
      },
      north: {
        oppositeDirection: 'south',
      },
    },
    yellow: {
      // direction
      south: {
        woak:    0,
        embr:    7,
        mont:    8,
        powl:    9,
        civc:   10,
        '16th': 13,
        '24th': 15,
      },
      north: {
        oppositeDirection: 'south',
      },
    },
    orange: {
      // direction
      south: {
        rich: 0,
        deln: 4,
        plza: 7,
        nbrk: 10,
        dbrk: 13,
      },
      north: {
        oppositeDirection: 'south',
      },
    },
  };

  exports.consts = {
    DISTANCES: DISTANCES,
  };
})(this);
