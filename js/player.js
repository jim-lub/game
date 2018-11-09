/* jshint esversion: 6 */
class Player {
  constructor({name}) {
    this.name = name;

    this.CONST = {
      actions: ['idle', 'run', 'jump', 'slide'],
      _: {
        size: {
          width: 0,
          height: 0
        },
        idle: {},
        run: {
          velocity: {left: -4, right: 4}
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

    this.CTRLS = new PlayerControls();
    this.ACTIONS = new PlayerActions(this.CONST.actions);
    this.ANIMATIONS = new PlayerAnimations(this.CONST.actions);
    // this.COLLISION = new CollisionDetection();

    this.POS = {
      _: {x: 0, y: 300},
      motion: {horizontal: 0, vertical: 0},
      direction: 'R' // or 'L' --> Direction player is facing
    };

  }

  /*****************************************************
  * MOVEMENT LOGIC
  *
  *
  *****************************************************/
  move() {
    let CTRLS = this.CTRLS;
    let ACTIONS = this.ACTIONS;

    if (CTRLS.isActive('a') || CTRLS.isActive('d')) {
      ACTIONS.setToActive('run');

      // Check which if A or D was pressed last
      if (CTRLS.lastKeyPressed('a', 'd')) {
        this.POS.motion.horizontal = this.CONST._.run.velocity.left;
      }

      if (CTRLS.lastKeyPressed('d', 'a')) {
        this.POS.motion.horizontal = this.CONST._.run.velocity.right;
      }

    } else {
      ACTIONS.setToActive('idle');
      this.POS.motion.horizontal = 0;
    }

    this.POS._.x += this.POS.motion.horizontal;
    this.POS._.y += this.POS.motion.vertical;
  }

  /*****************************************************
  * RENDER PLAYER
  *
  *
  *****************************************************/
  render() {
    let ACTIONS = this.ACTIONS;
    let ANIMATIONS = this.ANIMATIONS;

    this.move();

    if (ACTIONS.idle.active) ANIMATIONS.play({action: 'idle'});
    if (ACTIONS.run.active) ANIMATIONS.play({action: 'run'});
    if (ACTIONS.jump.active) ANIMATIONS.play({action: 'jump'});
    if (ACTIONS.slide.active) ANIMATIONS.play({action: 'slide'});

    let currentFrame = this.ANIMATIONS.FRAME;
  	this.test({logControls: false});
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
      if (this.CTRLS.KEY.w.active) console.log('W');
      if (this.CTRLS.KEY.a.active) console.log('A');
      if (this.CTRLS.KEY.s.active) console.log('S');
      if (this.CTRLS.KEY.d.active) console.log('D');
      if (this.CTRLS.KEY.space.active) console.log('SPACEBAR');
      if (this.CTRLS.MOUSE.leftClick.active) console.log('leftMouse');
      if (this.CTRLS.MOUSE.middleClick.active) console.log('middleMouse');
      if (this.CTRLS.MOUSE.rightClick.active) console.log('rightMouse');
    }
  }
}
