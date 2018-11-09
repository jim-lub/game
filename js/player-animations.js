/* jshint esversion: 6 */
class PlayerAnimations {
  constructor(playerActions) {
    this.FRAME = {
      image: null,
      endOfLoop: false
    };

    this.VAR = {
      tickCount: 0,
      currentFrame: null
    };

    this.CONFIG = new PlayerAnimations_config();

    this.LOAD = {
      // idle: this.load({idle: true}),
      // run: this.load({run: true}),
      // jump: this.load({jump: true}),
      // slide: this.load({slide: true})
    };

    this.preloadAnimations(playerActions, this.CONFIG);
  }

  loadImage({file, folder}) {
    let image = new Image();
    image.src = `./sprites/${folder}/${file}`;
    return image;
  }

  preloadAnimations(playerActions, CONFIG) {
    playerActions.forEach((action, index) => {

      let frameSequence = [];
      let config = CONFIG[action]();
      let frameStart, frameEnd;

      console.log(config);

      config.frames.forEach((cur, index) => {
        let frameStart, frameEnd;

        if (config.overrideDefaults) {
          frameStart = cur.override.start;
          frameEnd = cur.override.end;
        } else {
          frameStart = index * config.defaults.ticksPerFrame;
          frameEnd = ((index + 1) * config.defaults.ticksPerFrame) - 1;
        }

        frameSequence.push({
          name: cur.name,
          image: this.loadImage({file: cur.file, folder:cur.folder}),
          start: frameStart,
          end: frameEnd
        });
      });

      console.log(frameSequence);
    });
  }

  startAnimation({action}) {

  }
}
