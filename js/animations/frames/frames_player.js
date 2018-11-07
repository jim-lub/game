/* jshint esversion: 6 */
class Animations_player_frames {
  constructor() {
  }

  idle() {
    const obj = {
      settings: {
        ticksPerFrame: 10,
        ticksTotal: 99,
        loop: true
      },
      frames: [
        { name: "IDLE1", image: "Idle (1).png" },
        { name: "IDLE2", image: "Idle (2).png" },
        { name: "IDLE3", image: "Idle (3).png" },
        { name: "IDLE4", image: "Idle (4).png" },
        { name: "IDLE5", image: "Idle (5).png" },
        { name: "IDLE6", image: "Idle (6).png" },
        { name: "IDLE7", image: "Idle (7).png" },
        { name: "IDLE8", image: "Idle (8).png" },
        { name: "IDLE9", image: "Idle (9).png" },
        { name: "IDLE10", image: "Idle (10).png" }
      ]
    };
    return obj;
  }

  run() {
    const obj = {
      settings: {
        ticksPerFrame: 8,
        ticksTotal: 63,
        loop: true
      },
      frames: [
        { name: "RUN1", image: "Run (1).png" },
        { name: "RUN2", image: "Run (2).png" },
        { name: "RUN3", image: "Run (3).png" },
        { name: "RUN4", image: "Run (4).png" },
        { name: "RUN5", image: "Run (5).png" },
        { name: "RUN6", image: "Run (6).png" },
        { name: "RUN7", image: "Run (7).png" },
        { name: "RUN8", image: "Run (8).png" }
      ]
    };
    return obj;
  }

  jump() {
    const obj = {
      settings: {
        ticksPerFrame: 8,
        ticksTotal: 79,
        loop: false
      },
      frames: [
        { name: "JUMP1", image: "Jump (1).png" },
        { name: "JUMP2", image: "Jump (2).png" },
        { name: "JUMP3", image: "Jump (3).png" },
        { name: "JUMP4", image: "Jump (4).png" },
        { name: "JUMP5", image: "Jump (5).png" },
        { name: "JUMP6", image: "Jump (6).png" },
        { name: "JUMP7", image: "Jump (7).png" },
        { name: "JUMP8", image: "Jump (8).png" },
        { name: "JUMP9", image: "Jump (9).png" },
        { name: "JUMP10", image: "Jump (10).png" }
      ]
    };
    return obj;
  }

  slide() {
    const obj = {
      settings: {
        ticksPerFrame: 5,
        ticksTotal: 24,
        loop: true
      },
      frames: [
        { name: "SLIDE1", image: "Slide (1).png" },
        { name: "SLIDE2", image: "Slide (2).png" },
        { name: "SLIDE3", image: "Slide (3).png" },
        { name: "SLIDE4", image: "Slide (4).png" },
        { name: "SLIDE5", image: "Slide (5).png" }
      ]
    };
    return obj;
  }

  shoot() {
    const obj = {
      settings: {
        ticksPerFrame: 8,
        ticksTotal: 23,
        loop: true
      },
      frames: [
        { name: "SHOOT1", image: "Shoot (1).png" },
        { name: "SHOOT2", image: "Shoot (2).png" },
        { name: "SHOOT3", image: "Shoot (3).png" }
      ]
    };
    return obj;
  }

  melee() {
    const obj = {
      settings: {
        ticksPerFrame: 6,
        ticksTotal: 41,
        loop: true
      },
      frames: [
        { name: "MELEE1", image: "Melee (1).png" },
        { name: "MELEE2", image: "Melee (2).png" },
        { name: "MELEE3", image: "Melee (3).png" },
        { name: "MELEE4", image: "Melee (4).png" },
        { name: "MELEE5", image: "Melee (5).png" },
        { name: "MELEE6", image: "Melee (6).png" },
        { name: "MELEE7", image: "Melee (7).png" },
      ]
    };
    return obj;
  }

  dead() {
    const obj = {
      settings: {
        ticksPerFrame: 7,
        ticksTotal: 69,
        loop: true
      },
      frames: [
        { name: "DEAD1", image: "Dead (1).png" },
        { name: "DEAD2", image: "Dead (2).png" },
        { name: "DEAD3", image: "Dead (3).png" },
        { name: "DEAD4", image: "Dead (4).png" },
        { name: "DEAD5", image: "Dead (5).png" },
        { name: "DEAD6", image: "Dead (6).png" },
        { name: "DEAD7", image: "Dead (7).png" },
        { name: "DEAD8", image: "Dead (8).png" },
        { name: "DEAD9", image: "Dead (9).png" },
        { name: "DEAD10", image: "Dead (10).png" },
      ]
    };
    return obj;
  }
}
