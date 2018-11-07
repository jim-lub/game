/* jshint esversion: 6 */
class configureGame {
  constructor() {
    this.RENDER = {
      val: {
        frameRate: 60,
        tickRate: 0,
        currentFrame: 0
      },
      ctx: this.getContext()
    };
    this.PLAYER = {
      _1_: new Player('Player 1')
    };
    this.DEFAULTS = {
      keys: {
        w: 87,
        a: 65,
        s: 83,
        d: 68,
        space: 32,
        leftMouse: 1,
        rightMouse: 3
      }
    };
  }

  getContext() {
    const canvas = document.getElementById('canvas');
    return canvas.getContext('2d');
  }
}
