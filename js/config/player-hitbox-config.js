/* jshint esversion: 6 */
class PlayerHitBoxes_config {
  constructor() {}

  idle() {
    return {
      width: 156,
      height: 248,
      offsetX: 60,
      offsetY: 10,
      pointsPerEdge: {left: 10, top: 10, right: 10, bottom: 10},
      visible: true
    };
  }

  run() {
    return {
      width: 206,
      height: 248,
      offsetX: 60,
      offsetY: 10,
      pointsPerEdge: {left: 10, top: 10, right: 10, bottom: 10},
      visible: true
    };
  }

  jump() {
    return {
      width: 156,
      height: 248,
      offsetX: 60,
      offsetY: 10,
      pointsPerEdge: {left: 10, top: 10, right: 10, bottom: 10},
      visible: true
    };
  }

  slide() {
    return {
      width: 156,
      height: 248,
      offsetX: 60,
      offsetY: 10,
      pointsPerEdge: {left: 10, top: 10, right: 10, bottom: 10},
      visible: true
    };
  }

}
