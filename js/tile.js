/* jshint esversion: 6 */
class Tile {
  constructor({x, y, width, height}) {
    this._ = {
      move: 0
    };
    this.POS = {
      _: {x: x, y: y}
    };
    this.SIZE = {
      _: {w: width, h: height}
    };
  }

  render() {
    Game.RENDER.ctx.fillRect(this.POS._.x + this._.move, this.POS._.y, this.SIZE._.w, this.SIZE._.h);
  }
}
