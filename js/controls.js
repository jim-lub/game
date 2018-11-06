/* jshint esversion: 6 */
let Controls = (function () {

  let toggle = () => {
    $('body').keydown(function(event) {
      if(Game.DEFAULTS.keys.w == event.which) {
        setToFalse();
        Game.PLAYER._1_.ACTION.idle = true;
      }
      if(Game.DEFAULTS.keys.s == event.which) {
        setToFalse();
        Game.PLAYER._1_.ACTION.run = true;
      }
      if(Game.DEFAULTS.keys.d == event.which) {
        setToFalse();
        Game.PLAYER._1_.ACTION.jump = true;
      }
      if(Game.DEFAULTS.keys.a == event.which) {
        setToFalse();
        Game.PLAYER._1_.ACTION.dead = true;
      }
      if(Game.DEFAULTS.keys.space == event.which) {
        setToFalse();
        Game.PLAYER._1_.ACTION.melee = true;
      }
    });
  };

  let setToFalse = () => {
    Game.PLAYER._1_.ACTION.idle = false;
    Game.PLAYER._1_.ACTION.run = false;
    Game.PLAYER._1_.ACTION.jump = false;
    Game.PLAYER._1_.ACTION.fall = false;
    Game.PLAYER._1_.ACTION.slide = false;
    Game.PLAYER._1_.ACTION.shoot = false;
    Game.PLAYER._1_.ACTION.melee = false;
    Game.PLAYER._1_.ACTION.dead = false;
  };

  return {
    init: function () {
      toggle();
    }
  };

})();
