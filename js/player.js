/* jshint esversion: 6 */
class Player {
  constructor({name}) {
    this.name = name;

    this.ACTIONS = {
      idle: new Idle(),
      run: new Run(),
      jump: new Jump(),
      slide: new Slide()
    };

    this.POS = {
      _: {x: 0, y: 300},
      motion: {horizontal: 0, vertical: 0},
      direction: 'R' // or 'L' --> Direction player is facing
    };

    this.CONST = {
      actions: undefined,
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

    this.createPlayerActionsArray();

    this.ANIMATIONS = new PlayerAnimations(this.CONST.actions);
    this.CTRLS = new PlayerControls();
    // this.COLLISION = new CollisionDetection();

  }

  // Loop over all actions defined in this.ACTIONS and create an array
  createPlayerActionsArray() {
    let newPlayersActionsArray = [];
    Object.keys(this.ACTIONS).forEach((cur) => newPlayersActionsArray.push(cur) );
    this.CONST.actions = newPlayersActionsArray;
  }

  setActiveActionsToFalse() {
    this.CONST.actions.forEach(cur => this.ACTIONS[cur].active = false );
  }

  /*****************************************************
  * All logic for moving the player are in this function.
  *
  *
  *****************************************************/
  move() {
    let CTRLS = this.CTRLS;
    let ACTIONS = this.ACTIONS;

    if (CTRLS.isActive('a') || CTRLS.isActive('d')) {
      this.setActiveActionsToFalse();
      ACTIONS.run.setToActive();

      // Check which if A or D was pressed last
      if (CTRLS.lastKeyPressed('a', 'd')) {
        this.POS.motion.horizontal = this.CONST._.run.velocity.left;
      }

      if (CTRLS.lastKeyPressed('d', 'a')) {
        this.POS.motion.horizontal = this.CONST._.run.velocity.right;
      }

    } else {
      this.setActiveActionsToFalse();
      ACTIONS.idle.setToActive();
      this.POS.motion.horizontal = 0;
    }

    this.POS._.x += this.POS.motion.horizontal;
    this.POS._.y += this.POS.motion.vertical;
  }

  /*****************************************************
  * All logic for rendering the player on the screen are
  * in this function.
  *
  *****************************************************/
  render() {
    let ACTIONS = this.ACTIONS;
    let ANIMATIONS = this.ANIMATIONS;

    this.move();

    if (ACTIONS.idle.active) ANIMATIONS.play({action: 'idle'});
    if (ACTIONS.run.active) ANIMATIONS.play({action: 'run'});

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
