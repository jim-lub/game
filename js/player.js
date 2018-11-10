/* jshint esversion: 6 */
class Player {
  constructor({name}) {
    this.name = name;

    this.CONST = {
      actions: ['idle', 'run', 'jump', 'slide'],
      _: {
        size: {
          width: 320, // 641
          height: 271 // 542
        },
        idle: {},
        run: {
          velocity: {left: -10, right: 10}
        },
        jump: {
          velocity: {left: -1.5, right: 1.5, run: 0.7, fall: 0.3},
          altitude: 12,
        },
        slide: {
          velocity: {left: -2.5, right: -2.5},
          delay: {interruption: 1400, stopAnimation: 700}
        }
      }
    };

    this.POS = {
      c: {x: 50, y: 250},
      motion: {horizontal: 0, vertical: 0},
      direction: 'R' // or 'L' --> Direction player is facing
    };

    this.CTRLS = new PlayerControls();
    this.ACTIONS = new PlayerActions(this.CONST.actions);
    this.ANIMATIONS = new PlayerAnimations(this.CONST.actions);
    this.COLLISION = new CollisionDetection();
  }

  /*****************************************************
  * Move
  *****************************************************/
  move({CTRLS, ACTIONS, COLLISION, POS, CONST}) {
    if (!COLLISION.hit('x')) POS.c.x += POS.motion.horizontal;
    if (!COLLISION.hit('y')) POS.c.y += POS.motion.vertical;

    if (CTRLS.isActive('a') || CTRLS.isActive('d')) {
      ACTIONS.setToActive('run');

      // Check which if A or D was pressed last
      if (CTRLS.lastKeyPressed('a', 'd')) {
        POS.motion.horizontal = CONST._.run.velocity.left;
      }

      if (CTRLS.lastKeyPressed('d', 'a')) {
        POS.motion.horizontal = CONST._.run.velocity.right;
      }

    } else {
      ACTIONS.setToActive('idle');
      POS.motion.horizontal = 0;
    }

    if (CTRLS.isActive('space') && !ACTIONS.jump.active && COLLISION.isFloor()) {
      POS.motion.vertical = 0;
      ACTIONS.setToActive('jump');
      POS.motion.vertical -= CONST._.jump.altitude;
    }

    if (!COLLISION.isFloor()) {
      POS.motion.vertical += CONST._.jump.velocity.fall;
    }

  }

  /*****************************************************
  * Collision
  *****************************************************/
  collision({COLLISION, POS, ACTIONS}) {
    let action = 'idle';
    if (ACTIONS.idle.active) action = 'idle';
    if (ACTIONS.run.active) action = 'run';
    if (ACTIONS.jump.active) action = 'jump';
    if (ACTIONS.slide.active) action = 'slide';

    COLLISION.listen({POS}, action);
  }

  /*****************************************************
  * Animations
  *****************************************************/
  animate({ACTIONS, ANIMATIONS}) {
    if (ACTIONS.idle.active) ANIMATIONS.play({action: 'idle'});
    if (ACTIONS.run.active) ANIMATIONS.play({action: 'run'});
    if (ACTIONS.jump.active) ANIMATIONS.play({action: 'jump'});
    if (ACTIONS.slide.active) ANIMATIONS.play({action: 'slide'});
  }

  /*****************************************************
  * Render
  *****************************************************/
  render() {
    this.collision({
      COLLISION: this.COLLISION,
      POS: this.POS,
      ACTIONS: this.ACTIONS
    });

    this.move({
      CTRLS: this.CTRLS,
      ACTIONS: this.ACTIONS,
      POS: this.POS,
      CONST: this.CONST,
      COLLISION: this.COLLISION
    });

    this.animate({
      ACTIONS: this.ACTIONS,
      ANIMATIONS: this.ANIMATIONS
    });

    let currentFrame = this.ANIMATIONS.FRAME;
  	this.test({logCollision: false});

    Game.RENDER.ctx.globalAlpha = 0.2;
    Game.RENDER.ctx.fillRect(this.POS.c.x, this.POS.c.y, this.CONST._.size.width, this.CONST._.size.height);
    Game.RENDER.ctx.globalAlpha = 1;

    Game.RENDER.ctx.drawImage(currentFrame.image, this.POS.c.x, this.POS.c.y, this.CONST._.size.width, this.CONST._.size.height);
  }

  /************************
  * Tests for development only.
  * Call this.test() with an object as argument
  * set key to true to enable test
  ************************/
  test({logControls, logCollision}) {

    // Log CollisionDetection
    if (logCollision) {
      console.log(this.COLLISION.x, this.COLLISION.y);
      if (this.CTRLS.MOUSE.middleClick.active) console.log(this.COLLISION.HITBOX.idle.collisionPoints);
    }

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
