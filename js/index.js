/* jshint esversion: 6 */
class Config {
  constructor() {
    this.RENDER = {
      ctx: this.getContext(),
      calc: {
        ticks: 0
      }
    };

    this.PLAYER = {
      _1: new Player({name: 'Player 1'})
    };

    this.TILES = {
      _1: [
        new Tile({x: 100, y: 100, width: 30, height: 30, type: 'block', collision: true}),
        new Tile({x: 200, y: 200, width: 30, height: 30, type: 'block', collision: true}),
        new Tile({x: 300, y: 300, width: 30, height: 30, type: 'block', collision: true})
      ]
    };
  }

  getContext() {
    const canvas = document.getElementById('canvas');
    return canvas.getContext('2d');
  }
}

const Game = new Config();

const Render = () => {
  Game.RENDER.ctx.clearRect(0, 0, 1200, 800);
  Game.RENDER.calc.ticks += 1;

  $('#dev--data').text(`Frames: ${Game.RENDER.calc.ticks}`);

  Game.PLAYER._1.render();

  // Game.TILES._1[0]._.move += 5;

  Game.TILES._1.forEach((tile) => {
    // tile._.move += 5;
    tile.render();
  });

  Game.RENDER.ctx.fillRect(0, 555, 1200, 30);

  window.requestAnimationFrame(Render);
};

const Init = () => {
  Game.RENDER.ctx.imageSmoothingEnabled = true;
  window.requestAnimationFrame(Render);
};

Init();
