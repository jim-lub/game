/* jshint esversion: 6 */
let Controls = (function () {

  let addEventListeners = () => {

    // set an array containing all allowed keyboard keys -- make sure Config.DEFAULTS.keys is updated aswell
    const keysArray = ['w', 'a', 's', 'd', 'space'];

    /**********
    ****  listen for keyDOWN event for all keys defined in keysArray.
    ****  if key is triggered sets KEY.active to TRUE for the Player
    ****  -->
    **********/
    $('body').keydown(function(event) {
      // loop over the keys
      keysArray.forEach((cur) => {
        // set an if statement to check which key is pressed
        if (Game.DEFAULTS.keys[cur] == event.which) {
          // set KEY.active to true
          Game.PLAYER._1_.KEY[cur].active = true;
          // update the timestamp
          Game.PLAYER._1_.KEY[cur].timestamp = Date.now();
          if (!Game.PLAYER._1_.KEY[cur].timestamp_keyDown) {
            Game.PLAYER._1_.KEY[cur].timestamp_keyDown = Date.now();
          }
        }
      });
    });

    /**********
    ****  listen for keyUP event for all keys defined in keysArray.
    ****  if key is triggered sets KEY.active to FALSE for the Player
    ****  -->
    **********/
    $('body').keyup(function(event) {
      // loop over the keys
      keysArray.forEach((cur) => {
        // set an if statement to check which key is pressed
        if (Game.DEFAULTS.keys[cur] == event.which) {
          // set KEY.active to false
          Game.PLAYER._1_.KEY[cur].active = false;
          // update the timestamp
          Game.PLAYER._1_.KEY[cur].timestamp_keyUp = Date.now();
          Game.PLAYER._1_.KEY[cur].timestamp_keyDown = null;
        }
      });
    });

  };


  return {
    init: function () {
      addEventListeners();
    }
  };

})();
