/* jshint esversion: 6 */
class Player {
  constructor({name}) {
    this.name = name;

    this.POS = {
      _: {x: 0, y: 300},
      motion: {horizontal: 0, vertical: 0},
      direction: 'R' // or 'L' --> Direction player is facing
    };

    this.VAR = {
      _: {
        idle: {},
        run: {},
        jump: {increment: 0},
        slide: {timestamp: null}
      }
    };

    this.CONST = {
      actions: ['idle', 'run', 'jump', 'slide'],
      _: {
        size: {
          width: 0,
          height: 0
        },
        idle: {},
        run: {
          velocity: {left: 4, right: 4}
        },
        jump: {
          velocity: {left: -1.5, right: 1.5, run: 0.7},
          altitude: 12
        },
        slide: {
          velocity: {left: -2.5, right: -2.5},
          delay: {interruption: 1400, stopAnimation: 700}
        }
      }
    };

    this.ACTIONS = {
      // idle: new Action('idle'), // this.ACTIONS.idle.active.. etc..
      // run: new Action('run'),
      // jump: new Action('jump'),
      // slide: new Action('slide')
    };

    this._ = {
      Ctrls: new PlayerControls(),
      Animations: new PlayerAnimations(this.CONST.actions),
      // Collision: new CollisionDetection()
    };
  }

  render() {
      this._.Animations.play({action: 'jump'});
      let currentFrame = this._.Animations.FRAME;
    	this.test({logControls: true});

      Game.RENDER.ctx.drawImage(currentFrame.image, this.POS._.x, this.POS._.y, currentFrame.image.width / 2, currentFrame.image.height / 2);
  }


  /************************
  * Tests for development only.
  * Call this.test() with an object as argument
  * set key to true to enable test
  ************************/
  test({logControls}) {

    // Test if controls are registering
    if (logControls) {
      if (this._.Ctrls.KEY.w.active) console.log(this._.Animations.LOAD.idle); // console.log('W');
      if (this._.Ctrls.KEY.a.active) console.log('A');
      if (this._.Ctrls.KEY.s.active) console.log('S');
      if (this._.Ctrls.KEY.d.active) console.log('D');
      if (this._.Ctrls.KEY.space.active) console.log('SPACEBAR');
      if (this._.Ctrls.MOUSE.leftClick.active) console.log('leftMouse');
      if (this._.Ctrls.MOUSE.middleClick.active) console.log('middleMouse');
      if (this._.Ctrls.MOUSE.rightClick.active) console.log('rightMouse');
    }
  }
}
