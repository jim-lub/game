/* jshint esversion: 6 */
const Game = new configureGame();

const Render = () => {
  Game.RENDER.ctx.clearRect(0, 0, 800, 800);
  Game.RENDER.val.currentFrame += 1;

  $('#dev--data').text(`Frames: ${Game.RENDER.val.currentFrame}`);

  Game.PLAYER._1_.render();
  Game.RENDER.ctx.fillRect(0, 555, 800, 30);

  window.requestAnimationFrame(Render);
};

const Init = () => {
  Controls.init();
  window.requestAnimationFrame(Render);
};

Init();
