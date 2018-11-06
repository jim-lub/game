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
        timestamp: null
      },
      a: {
        active: false,
        timestamp: null
      },
      s: {
        active: false,
        timestamp: null,
        trigger: null
      },
      d: {
        active: false,
        timestamp: null
      },
      space: {
        active: false,
        timestamp: null
      },
    };
    this.BLOCK = false;
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
          left: -2,
          right: 2
        },
        jump: {
          up: -1,
          down: 2
        }
      }
    };
  }

  touchFloor() {
    return (this.POS.y <= 300) ? false : true;
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

  move() {

    if (this.KEY.d.active) {
      this.MOVE.horizontal = this.DEFAULTS.speed.run.right;
      if (this.KEY.s.active) {
        this.setActionsToFalse();
        this.ACTION.slide = true;
      } else if (!this.ACTION.run && this.touchFloor()) {
        this.setActionsToFalse();
        this.ACTION.run = true;
      }
    } else if (this.KEY.a.active) {
      this.MOVE.horizontal = this.DEFAULTS.speed.run.left;
      if (!this.ACTION.run && this.touchFloor()) {
        this.setActionsToFalse();
        this.ACTION.run = true;
      }
    } else {
      if (this.touchFloor()) {
        this.MOVE.horizontal = 0;
        this.setActionsToFalse();
        this.ACTION.idle = true;
      }
    }

    if (this.KEY.space.active) {
      this.setActionsToFalse();
      this.ACTION.jump = true;
      this.POS.y -= 5;
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
    this.move();
    this.animationEnded();

    if (!this.touchFloor()) {
      this.MOVE.vertical = this.DEFAULTS.speed.jump.down;
    } else {
      this.MOVE.vertical = 0;
    }

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
    Game.RENDER.ctx.drawImage(this.EXT.Animation.currentFrame.img, this.POS.x, this.POS.y, 641 / 2, 542 / 2);
  }
}
