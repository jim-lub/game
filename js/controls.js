/* jshint esversion: 6 */
let Controls = (function () {

  let eventListeners = (_p_) => {
    $('body').keydown(function(event) {
      if (Game.DEFAULTS.keys.w == event.which) { _p_.KEY.w.active = true; }
      if (Game.DEFAULTS.keys.a == event.which) { _p_.KEY.a.active = true; }
      if (Game.DEFAULTS.keys.s == event.which) { _p_.KEY.s.active = true; }
      if (Game.DEFAULTS.keys.d == event.which) { _p_.KEY.d.active = true; }
      if (Game.DEFAULTS.keys.space == event.which) { _p_.KEY.space.active = true; }
    });

    $('body').keyup(function(event) {
      if (Game.DEFAULTS.keys.w == event.which) { _p_.KEY.w.active = false; }
      if (Game.DEFAULTS.keys.a == event.which) { _p_.KEY.a.active = false; }
      if (Game.DEFAULTS.keys.s == event.which) { _p_.KEY.s.active = false; }
      if (Game.DEFAULTS.keys.d == event.which) { _p_.KEY.d.active = false; }
      if (Game.DEFAULTS.keys.space == event.which) { _p_.KEY.space.active = false; }
    });
  };

  return {
    init: function () {
      eventListeners(Game.PLAYER._1_);
    }
  };

})();
