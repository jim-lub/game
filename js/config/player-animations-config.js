/* jshint esversion: 6 */
class PlayerAnimations_config {
  constructor() {}

  // default() {
  //   return {
  //     defaults: {
  //       ticksPerFrame: 0,
  //       ticksUntilLoop: 0,
  //       loop: true
  //     },
  //     overrideDefaults: false,
  //     frames: [
  //       {name: "IDLE1", file: "idle", folder: "FOLDER/FOLDER", override: {start: 0, end: 0}}
  //     ]
  //   };
  // }

  idle() {
    return {
      defaults: {
        ticksPerFrame: 10,
        ticksUntilLoop: 99,
        loop: true
      },
      overrideDefaults: false,
      frames: [
        {name: "IDLE-1", file: "idle-1.png", folder: "player", override: {}},
        {name: "IDLE-2", file: "idle-2.png", folder: "player", override: {}},
        {name: "IDLE-3", file: "idle-3.png", folder: "player", override: {}},
        {name: "IDLE-4", file: "idle-4.png", folder: "player", override: {}},
        {name: "IDLE-5", file: "idle-5.png", folder: "player", override: {}},
        {name: "IDLE-6", file: "idle-6.png", folder: "player", override: {}},
        {name: "IDLE-7", file: "idle-7.png", folder: "player", override: {}},
        {name: "IDLE-8", file: "idle-8.png", folder: "player", override: {}},
        {name: "IDLE-9", file: "idle-9.png", folder: "player", override: {}},
        {name: "IDLE-10", file: "idle-10.png", folder: "player", override: {}}
      ]
    };
  }

  run() {
    return {
      defaults: {
        ticksPerFrame: 8,
        ticksUntilLoop: 63,
        loop: true
      },
      overrideDefaults: false,
      frames: [
        {name: "RUN-1", file: "run-1.png", folder: "player", override: {}},
        {name: "RUN-2", file: "run-2.png", folder: "player", override: {}},
        {name: "RUN-3", file: "run-3.png", folder: "player", override: {}},
        {name: "RUN-4", file: "run-4.png", folder: "player", override: {}},
        {name: "RUN-5", file: "run-5.png", folder: "player", override: {}},
        {name: "RUN-6", file: "run-6.png", folder: "player", override: {}},
        {name: "RUN-7", file: "run-7.png", folder: "player", override: {}},
        {name: "RUN-8", file: "run-8.png", folder: "player", override: {}}
      ]
    };
  }

  jump() {
    return {
      defaults: {
        ticksPerFrame: 8,
        ticksUntilLoop: 79,
        loop: false
      },
      overrideDefaults: false,
      frames: [
        {name: "JUMP-1", file: "jump-1.png", folder: "player", override: {}},
        {name: "JUMP-2", file: "jump-2.png", folder: "player", override: {}},
        {name: "JUMP-3", file: "jump-3.png", folder: "player", override: {}},
        {name: "JUMP-4", file: "jump-4.png", folder: "player", override: {}},
        {name: "JUMP-5", file: "jump-5.png", folder: "player", override: {}},
        {name: "JUMP-6", file: "jump-6.png", folder: "player", override: {}},
        {name: "JUMP-7", file: "jump-7.png", folder: "player", override: {}},
        {name: "JUMP-8", file: "jump-8.png", folder: "player", override: {}},
        {name: "JUMP-9", file: "jump-9.png", folder: "player", override: {}},
        {name: "JUMP-10", file: "jump-10.png", folder: "player", override: {}}
      ]
    };
  }

  slide() {
    return {
      defaults: {
        ticksPerFrame: 5,
        ticksUntilLoop: 24,
        loop: false
      },
      overrideDefaults: false,
      frames: [
        {name: "SLIDE-1", file: "slide-1.png", folder: "player", override: {}},
        {name: "SLIDE-2", file: "slide-2.png", folder: "player", override: {}},
        {name: "SLIDE-3", file: "slide-3.png", folder: "player", override: {}},
        {name: "SLIDE-4", file: "slide-4.png", folder: "player", override: {}},
        {name: "SLIDE-5", file: "slide-5.png", folder: "player", override: {}}
      ]
    };
  }
}
