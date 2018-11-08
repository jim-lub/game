/* jshint esversion: 6 */
class Player {
  constructor() {
    this._ = {
      Ctrls: new PlayerControls(this.CONSTANTS.controls),
      Animations: new PlayerAnimations(this.CONSTANTS.actions),
      Collision: new CollisionDetection()
    };
    this.ACTIONS = {
      idle: new Action('idle'), // this.ACTIONS.idle.active.. etc..
      run: new Action('run'),
      jump: new Action('jump'),
      slide: new Action('slide')
    };
    this.POS = {
      _: {x: 0, y: 0},
      motion: {horizontal: 0, vertical: 0},
      direction: 'R' // or 'L' --> Direction player is facing
    };
    this.VAR = {
      _: {
        idle: {},
        run: {},
        jump: {increment: 0},
        slide: {timestamp: null}
      }
    };
    this.CONSTANTS = {
      actions: [{idle}, {run}, {jump}, {slide}],
      controls: [{w}, {a}, {s}, {d}, {space}, {leftMouse}, {rightMouse}],
      _: {
        size: {
          width: 0,
          height: 0
        },
        idle: {},
        run: {
          velocity: {left: 4, right: 4}
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
  }

  render() {

  }
}

Game.PLAYER = new Player();
