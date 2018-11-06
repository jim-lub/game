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
          left: -1,
          right: 1
        },
        jump: {
          up: -1,
          down: 1
        }
      }
    };
  }

  render() {
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
