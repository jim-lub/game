/* jshint esversion: 6 */
class Tile {
  constructor({x, y, width, height}) {
    this._ = {
      move: 0
    };
    this.POS = {
      c: {x: x, y: y}
    };
    this.SIZE = {
      width: width,
      height: height
    };
  }

  render() {
    Game.RENDER.ctx.fillRect(this.POS.c.x, this.POS.c.y, this.SIZE.width, this.SIZE.height);
  }
}
