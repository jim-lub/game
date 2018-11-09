/* jshint esversion: 6 */
class PlayerAnimations {
  constructor(playerActions) {
    this.playerActions = playerActions;

    this.FRAME = {
      image: null,
      endOfSequence: false
    };

    this.VAR = {
      tickCount: 0,
      currentFrame: null
    };

    this.CONFIG = new PlayerAnimations_config();

    this.LOAD = {}; // Result of preloadAnimations will be stored in this object

    this.preloadAnimations(this.playerActions, this.CONFIG);
  }

  loadImage({file, folder}) {
    let image = new Image();
    image.src = `./sprites${folder}/${file}`;
    return image;
  }

  preloadAnimations(playerActions, CONFIG) {
    playerActions.forEach((action, index) => {

      let frameSequence = [];
      let config = CONFIG[action]();
      let frameStart, frameEnd;

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

      this.LOAD[action] = {
        defaults: config.defaults,
        sequence: frameSequence
      };

    });
  }

  play({action}) {
    this.VAR.tickCount++;

    let defaults = this.LOAD[action].defaults;
    let sequence = this.LOAD[action].sequence;
    let ticks = this.VAR.tickCount;
    let currentFrame = this.VAR.currentFrame;

    sequence.forEach((cur) => {

      // Checks if the sequence is between the current tickCount && is not already active
      if (ticks >= cur.start && ticks <= cur.end && currentFrame != cur.name) {
        this.FRAME.image = cur.image;
        this.VAR.currentFrame = cur.name;
      }

      // If the sequence ends && loop == TRUE
      if (ticks > defaults.ticksToEndSequence && defaults.loop === true) {
        this.VAR.tickCount = 0;
        this.VAR.currentFrame = null;
        this.FRAME.endOfSequence = false;
      }

      // if the sequence ends && loop == FALSE
      if (ticks > defaults.ticksToEndSequence && defaults.loop === false) {
        this.VAR.tickCount = defaults.ticksToEndSequence - 1;
        this.FRAME.endOfSequence = true;
      }
    });
  }
}
