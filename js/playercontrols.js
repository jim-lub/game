/* jshint esversion: 6 */
class PlayerControls {
  constructor() {
    this.KEY = {
      _name: ['w', 'a', 's', 'd', 'space'], //  array with key NAMES
      _code: [87, 65, 83, 68, 32], // array with key CODES
      w: {
        active: false,
        disabled: false,
        timestamp: {keyDown: null, keyUp: null}
      },
      a: {
        active: false,
        disabled: false,
        timestamp: {keyDown: null, keyUp: null}
      },
      s: {
        active: false,
        disabled: false,
        timestamp: {keyDown: null, keyUp: null}
      },
      d: {
        active: false,
        disabled: false,
        timestamp: {keyDown: null, keyUp: null}
      },
      space: {
        active: false,
        disabled: false,
        timestamp: {keyDown: null, keyUp: null}
      },
    };

    this.MOUSE = {
      _name: ['leftClick', 'middleClick', 'rightClick'], // array with mouse NAMES
      _code: [1, 2, 3], // arrray with mouse CODES
      leftClick: {
        active: false,
        disabled: false,
        timestamp: {mouseDown: null, mouseUp: null}
      },
      middleClick: {
        active: false,
        disabled: false,
        timestamp: {mouseDown: null, mouseUp: null}
      },
      rightClick: {
        active: false,
        disabled: false,
        timestamp: {mouseDown: null, mouseUp: null}
      }
    };

    this.eventListener_keyDown(this.KEY);
    this.eventListener_keyUp(this.KEY);
    this.eventListener_mouseDown(this.MOUSE);
    this.eventListener_mouseUp(this.MOUSE);
    this.eventListener_mouseOut(this.MOUSE);
  }

  eventListener_keyDown(KEY) {
    $('body').keydown(function(event) {

      KEY._name.forEach((key, index) => { // loop over all keys specified in this.KEY._name array

        if (KEY._code[index] == event.which) { // check which key is triggered
          KEY[key].active = true;
          if (!KEY[key].timestamp.keyDown) KEY[key].timestamp.keyDown = Date.now();
        }
      });
    });
  }

  eventListener_keyUp(KEY) {
    $('body').keyup(function(event) {

      KEY._name.forEach((key, index) => { // loop over all keys specified in this.KEY._name array

        if (KEY._code[index] == event.which) { // check which key is triggered
          KEY[key].active = false;
          KEY[key].timestamp.keyDown = null;
          KEY[key].timestamp.keyUp = Date.now();
        }
      });
    });
  }

  eventListener_mouseDown(MOUSE) {
    $('body').mousedown(function(event) {

      MOUSE._name.forEach((mouse, index) => {

        if (MOUSE._code[index] == event.which) {
          MOUSE[mouse].active = true;
          if (!MOUSE[mouse].timestamp.mouseDown) MOUSE[mouse].timestamp.mouseDown = Date.now();
        }
      });
    });
  }

  eventListener_mouseUp(MOUSE) {
    $('body').mouseup(function(event) {

      MOUSE._name.forEach((mouse, index) => {

        if (MOUSE._code[index] == event.which) {
          MOUSE[mouse].active = false;
          MOUSE[mouse].timestamp.mouseDown = null;
          MOUSE[mouse].timestamp.mouseUp = Date.now();
        }
      });
    });
  }

  eventListener_mouseOut(MOUSE) {
    $('body').mouseout(function(event) {

      MOUSE._name.forEach((mouse, index) => {

        if (MOUSE._code[index] == event.which) {
          MOUSE[mouse].active = false;
          MOUSE[mouse].timestamp.mouseDown = null;
          MOUSE[mouse].timestamp.mouseUp = Date.now();
        }
      });
    });
  }
}


















//
