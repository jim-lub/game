/* jshint esversion: 6 */
class Player {
  constructor(name) {
    this.name = name;
    this.POS = {
      x: 0,
      y: 300
    };
    this.MOVE = {
      horizontal: 0,
      vertical: 0
    };
    this.KEY = {
      w: {
        active: false,
        timestamp_keyDown: null,
        timestamp_keyUp: null
      },
      a: {
        active: false,
        timestamp_keyDown: null,
        timestamp_keyUp: null
      },
      s: {
        active: false,
        timestamp_keyDown: null,
        timestamp_keyUp: null,
        trigger: null
      },
      d: {
        active: false,
        timestamp_keyDown: null,
        timestamp_keyUp: null
      },
      space: {
        active: false,
        timestamp_keyDown: null,
        timestamp_keyUp: null
      },
      leftMouse: {
        active: false,
        timestamp_keyDown: null,
        timestamp_keyUp: null
      },
      rightMouse: {
        active: false,
        timestamp_keyDown: null,
        timestamp_keyUp: null
      }
    };
    this.ACTION = {
      idle: true,
      run: false,
      jump: false,
      fall: false,
      slide: false,
      shoot: false,
      melee: false,
      dead: false
    };
    this.EXT = {
      Animation: new Animations_player()
    };
    this.DEFAULTS = {
      size: {
        width: 50,
        height: 50
      },
      speed: {
        run: {
          left: -6,
          right: 3
        },
        jump: {
          up: -1,
          down: 2,
          left: 1,
          right: 1
        },
        slide: {
          left: -2.5,
          right: 4,
        }
      },
      jump: {
        height: 10,
        increment: 0,
        speed: {
          fall: 0.6, // increases jump.increment on each tick
          run: 0.7, // increases horizontal speed if jumping while already running
          left: -1.5,
          right: 1.5
        }
      },
      slide: {
        timestamp: null,
        timelock: 1400,
        time: 700,
        speed: {
          left: -2.5,
          right: 2.5
        }
      }
    };
  }

  touchFloor() {
    if (this.POS.y <= 300) {
      this.DEFAULTS.jump.increment += this.DEFAULTS.jump.speed.fall;

      return false;
    } else {
      this.DEFAULTS.jump.increment = 0;

      return true;
    }
  }

  setActionsToFalse() {
    this.ACTION.idle = false;
    this.ACTION.run = false;
    this.ACTION.jump = false;
    this.ACTION.fall = false;
    this.ACTION.slide = false;
    this.ACTION.shoot = false;
    this.ACTION.melee = false;
    this.ACTION.dead = false;
  }

  animationEnded() {
    if (this.EXT.Animation.currentFrame.animationEnd && this.touchFloor()) {
      this.setActionsToFalse();
      this.ACTION.idle = true;
      this.EXT.Animation.currentFrame.animationEnd = false;
    }
  }

  slideAllowed() {
    if (this.DEFAULTS.slide.timestamp === null) {
      this.DEFAULTS.slide.timestamp = Date.now() + this.DEFAULTS.slide.timelock;

      return true;
    } else if (Date.now() > this.DEFAULTS.slide.timestamp) {
      this.DEFAULTS.slide.timestamp = Date.now() + this.DEFAULTS.slide.timelock;

      return true;
    } else {
      if (Date.now() > (this.DEFAULTS.slide.timestamp - (this.DEFAULTS.slide.timelock - this.DEFAULTS.slide.time))) {
        return false;
      } else {
        return true;
      }
    }
  }

  move() {

    // RUN -- a / d -- check if key is pressed
    if (this.KEY.a.active && this.touchFloor() || this.KEY.d.active && this.touchFloor()) {

      // check if sliding
      if (this.KEY.s.active && this.slideAllowed()) {
        // console.log(this.slideAllowed());

        if (this.KEY.a.timestamp_keyDown > this.KEY.d.timestamp_keyDown && this.KEY.a.active) {
          this.MOVE.horizontal = this.DEFAULTS.speed.slide.left;
          this.setActionsToFalse();
          this.ACTION.slide = true;
        }
        if (this.KEY.d.timestamp_keyDown > this.KEY.a.timestamp_keyDown && this.KEY.d.active) {
          this.MOVE.horizontal = this.DEFAULTS.speed.slide.right;
          this.setActionsToFalse();
          this.ACTION.slide = true;
        }

      // if not sliding then run
      } else {

        // RUN -- a / d -- check if a is pressed later than the d key
        if (this.KEY.a.timestamp_keyDown > this.KEY.d.timestamp_keyDown && this.KEY.a.active) {
          // set horizontal movement and animation action
          this.MOVE.horizontal = this.DEFAULTS.speed.run.left;
          this.setActionsToFalse();
          this.ACTION.run = true;
        }

        // RUN -- a / d -- check if d is pressed later than the a key
        if (this.KEY.d.timestamp_keyDown > this.KEY.a.timestamp_keyDown && this.KEY.d.active) {
          // set horizontal movement and animation action
          this.MOVE.horizontal = this.DEFAULTS.speed.run.right;
          this.setActionsToFalse();
          this.ACTION.run = true;
        }

      }

    } else {

      // if touching floor and not moving left and right execute this code block
      if (this.touchFloor()) {

        if (this.KEY.leftMouse.active) {
          this.MOVE.horizontal = 0;
          this.setActionsToFalse();
          this.ACTION.shoot = true;
        } else if (this.KEY.rightMouse.active) {
          this.MOVE.horizontal = 0;
          this.setActionsToFalse();
          this.ACTION.melee = true;
        } else {
          this.MOVE.horizontal = 0;
          this.setActionsToFalse();
          this.ACTION.idle = true;
        }
      }

    }

    // Initiate jump
    if (this.KEY.space.active && this.touchFloor()) {
      this.setActionsToFalse();
      this.ACTION.jump = true;
      this.MOVE.vertical = -this.DEFAULTS.jump.height;
      if (this.MOVE.horizontal > 0) {
          this.MOVE.horizontal += this.DEFAULTS.jump.speed.run;
      }

      if (this.MOVE.horizontal < 0) {
          this.MOVE.horizontal += this.DEFAULTS.jump.speed.run;
      }
    }

    // Air movement
    if (!this.touchFloor()) {
      if (this.MOVE.horizontal > 0) {
        if (this.KEY.a.active) {
          this.MOVE.horizontal = this.DEFAULTS.jump.speed.left;
        }
      }

      if (this.MOVE.horizontal < 0) {
        if (this.KEY.d.active) {
          this.MOVE.horizontal = this.DEFAULTS.jump.speed.right;
        }
      }

      if (this.MOVE.horizontal == 0) {
        if (this.KEY.a.active) {
          this.MOVE.horizontal = this.DEFAULTS.jump.speed.left;
        }
        if (this.KEY.d.active) {
          this.MOVE.horizontal = this.DEFAULTS.jump.speed.right;
        }
      }
    }

    this.POS.x += this.MOVE.horizontal;
    this.POS.y += this.MOVE.vertical;
  }

  /**********
  ****  render() function will be called every frame refresh.
  ****  This function will contain all functions that need to be called on
  ****  every refresh
  **********/
  render() {
    if (!this.touchFloor()) {
      this.MOVE.vertical += this.DEFAULTS.jump.speed.fall * this.DEFAULTS.jump.speed.fall;
    } else {
      this.MOVE.vertical = 0;
    }

    this.move();
    this.animationEnded();

    /**********
    ****  Checking the current player action that is set to TRUE and
    ****  make a call to the external Animations class to request the
    ****  current frame that needs to be rendered.
    **********/
    if (this.ACTION.idle) this.EXT.Animation.start('idle');
    if (this.ACTION.run) this.EXT.Animation.start('run');
    if (this.ACTION.jump) this.EXT.Animation.start('jump');
    if (this.ACTION.slide) this.EXT.Animation.start('slide');
    if (this.ACTION.shoot) this.EXT.Animation.start('shoot');
    if (this.ACTION.melee) this.EXT.Animation.start('melee');
    if (this.ACTION.dead) this.EXT.Animation.start('dead');

    /**********
    ****  Getting the image that is set as the currentFrame in the Animations class
    ****  calling the context and drawing the image with the specified
    ****  positional and size values defined in DEFAULTS
    **********/
    Game.RENDER.ctx.drawImage(this.EXT.Animation.currentFrame.img, this.POS.x, this.POS.y, this.EXT.Animation.currentFrame.img.width / 2, this.EXT.Animation.currentFrame.img.height / 2);

  }
}





















//
