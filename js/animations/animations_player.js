/* jshint esversion: 6 */
class Animations_player {
  constructor() {
    this.currentFrame = {
      img: null,
      animationEnd: false
    };
    this.VAL = {
      tickCount: 0,
      frameIndex: 0,
      curFrame: null
    };
    this._ = new Animations_player_frames();
    this.PRELOAD = {
      idle: this.init('idle'),
      run: this.init('run'),
      jump: this.init('jump'),
      slide: this.init('slide'),
      shoot: this.init('shoot'),
      melee: this.init('melee'),
      dead: this.init('dead')
    };
  }

  loadImage(imageName) {
    let image = new Image();
    image.src = `./sprites/player/${imageName}`;
    return image;
  }

  /**********
  ****
  ****
  ****
  **********/
  init(action) {
    // Load in the object from Animations_frames as specified in parameter.
    let obj = (action === 'idle') ? this._.idle()
            : (action === 'run') ? this._.run()
            : (action === 'jump') ? this._.jump()
            : (action === 'slide') ? this._.slide()
            : (action === 'shoot') ? this._.shoot()
            : (action === 'melee') ? this._.melee()
            : (action === 'dead') ? this._.dead()
            : null;

    // Define an empty array which will be filled with objects containing frame information;
    let framesArray = [];

    // Loop over the loaded frames object and:
    // - Preload the image;
    // - Calculate the starting tick count;
    // - Calculate the ending tick count;
    obj.frames.forEach((cur, index) => {
      framesArray.push({
        name: cur.name,
        image: this.loadImage(cur.image),
        start: index * obj.settings.ticksPerFrame,
        end: ((index + 1) * obj.settings.ticksPerFrame) - 1
      });
    });

    // Return the updated object to PRELOAD.<action> variable
    return {
      settings: obj.settings,
      frames: framesArray
    };
  }

  /**********
  ****  This function gets called by parent class Player on each rendered frame.
  ****  Tickcount will increase each time start() is called and will be reset once an
  ****  animation cycle is full completed.
  **********/
  start(action) {
    let obj = (action === 'idle') ? this.PRELOAD.idle
            : (action === 'run') ? this.PRELOAD.run
            : (action === 'jump') ? this.PRELOAD.jump
            : (action === 'slide') ? this.PRELOAD.slide
            : (action === 'shoot') ? this.PRELOAD.shoot
            : (action === 'melee') ? this.PRELOAD.melee
            : (action === 'dead') ? this.PRELOAD.dead
            : null;

    this.VAL.tickCount += 1;

    obj.frames.forEach((cur) => {
      if (this.VAL.tickCount >= cur.start && this.VAL.tickCount <= cur.end && this.VAL.curFrame != cur.name) {
        this.currentFrame.img = cur.image;
        this.VAL.curFrame = cur.name;
      }
    });

    if (this.VAL.tickCount > obj.settings.ticksTotal && obj.settings.loop === true) {
      this.VAL.tickCount = 0;
      this.VAL.curFrame = null;
      this.currentFrame.animationEnd = false;
    }
    if (this.VAL.tickCount > obj.settings.ticksTotal && obj.settings.loop === false) {
      this.VAL.tickCount = obj.settings.ticksTotal - 1;
      this.currentFrame.animationEnd = true;
    }

  }

}
