/* jshint esversion: 6 */
const Game = new configureGame();

const Render = () => {
  Game.RENDER.ctx.clearRect(0, 0, 1200, 800);
  Game.RENDER.val.currentFrame += 1;

  $('#dev--data').text(`Frames: ${Game.RENDER.val.currentFrame}`);

  Game.PLAYER._1_.render();
  Game.RENDER.ctx.fillRect(0, 555, 1200, 30);

  window.requestAnimationFrame(Render);
};

const Init = () => {
  Controls.init();
  Game.RENDER.ctx.imageSmoothingEnabled = true;
  window.requestAnimationFrame(Render);
};

Init();
