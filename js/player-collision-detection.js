/* jshint esversion: 6 */
class CollisionDetection {
  constructor() {
    this.x = false;
    this.y = false;
    this.status = {
      isTouchingFloor: false
    };

    this.HITBOX_CONFIG = new PlayerHitBoxes_config();
    this.HITBOX = {};
  }

  init(tiles) {
    this.STATIC_TILES = tiles;
  }

  /*******************************************
  * PLAYER FUNCTIONS
  * These functions can be called from the player
  * class to check ..
  *******************************************/
  hit(axis) {
    return (this[axis] === true) ? true : false;
  }

  isFloor() {
    return (this.y === true && this.status.isTouchingFloor === true) ? true : false;
  }

  /*******************************************
  * LISTEN FUNCTION
  * Parent function for updating collision points
  * and checking for collisions
  *******************************************/
  listen({POS}, action) {
    let POINTS, TILES, MOTION_H, MOTION_V;

    this.set_update({POS}, action);

    this.drawCollisionPoints(action);
    this.drawHitBox(action);

    POINTS = this.HITBOX[action].collisionPoints;
    TILES = this.STATIC_TILES;
    MOTION_H = POS.motion.horizontal;
    MOTION_V = POS.motion.vertical;

    this.x = (this.get_update({POINTS, TILES, MOTION_H})) ? true : false;

    if ((this.get_update({POINTS, TILES, MOTION_V}))) {
      this.y = true;
      this.status.isTouchingFloor = true;
    } else {
      this.y = false;
    }

  }

  /*******************************************
  * COLLISIONS
  * These functions will check if there is
  * a collision.
  *******************************************/
  get_update({POINTS, TILES, MOTION_H = 0, MOTION_V = 0}) {
    let isColliding = [];
    let motion_h = MOTION_H;
    let motion_v = MOTION_V;

    TILES.forEach(TILE => {
      if (this.get_boxCollision({POINTS, TILE}, motion_h, motion_v)) isColliding.push(true);
    });

    // console.log(isColliding);
    return (isColliding.length > 0) ? true : false;
  }

  get_boxCollision({POINTS, TILE}, motion_h, motion_v) {
    let isColliding = false;

    for (let i = 0; i < POINTS.length; i++) {
      if (this.get_pointCollision({POINT: POINTS[i], TILE}, motion_h, motion_v)) {
        isColliding = true;
        break;
      }
    }

    return (isColliding) ? true : false;
  }

  get_pointCollision({POINT, TILE}, motion_h, motion_v) {
    let collisionX = POINT.x + motion_h >= TILE.POS.x && POINT.x + motion_h <= TILE.POS.x + TILE.SIZE.width;
    let collisionY = POINT.y + motion_v >= TILE.POS.y && POINT.y + motion_v <= TILE.POS.y + TILE.SIZE.height;

    return (collisionX && collisionY) ? true : false;
  }


  /*******************************************
  * SET AND UPDATE COLLISION POINTS
  * These functions are used to set collision
  * points for the current player position
  *******************************************/
  set_update({POS}, action) {
    let CONFIG = this.HITBOX_CONFIG[action]();
    let _ = {
      x: POS.c.x + CONFIG.offsetX,
      y: POS.c.y + CONFIG.offsetY,
      w: CONFIG.width,
      h: CONFIG.height,
      p: {
        l: CONFIG.pointsPerEdge.left,
        t: CONFIG.pointsPerEdge.top,
        r: CONFIG.pointsPerEdge.bottom,
        b: CONFIG.pointsPerEdge.right,
      }
    };

    let collisionPoints = [
      ...this.set_CollisionPointsOnCorners({_}),
      ...this.set_CollisionPointsOnEdge({_}, _.p.l, 'left'),
      ...this.set_CollisionPointsOnEdge({_}, _.p.t, 'top'),
      ...this.set_CollisionPointsOnEdge({_}, _.p.r, 'right'),
      ...this.set_CollisionPointsOnEdge({_}, _.p.b, 'bottom')
    ];

    this.HITBOX[action] = {
      POS: {x: _.x, y: _.y},
      SIZE: {w: _.w, h: _.h},
      collisionPoints
    };
  }

  set_CollisionPointsOnEdge({_}, n, edge) {
    let collisionPoints = [];
    for (let i = 1; i < (n + 1); i++) {
      let offsetW, offsetH;
      if (edge == 'left') {
        offsetW = 0;
        offsetH = _.h * (i / (n + 1));
      }
      if (edge == 'top') {
        offsetW = _.w * (i / (n + 1));
        offsetH = 0;
      }
      if (edge == 'right') {
        offsetW = _.w;
        offsetH = _.h * (i / (n + 1));
      }
      if (edge == 'bottom') {
        offsetW = _.w * (i / (n + 1));
        offsetH = _.h;
      }

      collisionPoints.push({x: _.x + offsetW, y: _.y + offsetH});
    }
    return collisionPoints;
  }

  set_CollisionPointsOnCorners({_}) {
    let collisionPoints = [];

    collisionPoints.push(
      {x: _.x, y: _.y},
      {x: _.x, y: (_.y + _.h)},
      {x: (_.x + _.w), y: _.y},
      {x: (_.x + _.w), y: (_.y + _.h)}
    );

    return collisionPoints;
  }


  /****************************************
  *
  * TESTING ONLY
  *
  ****************************************/
  drawHitBox(action) {
    let x = this.HITBOX[action].POS.x;
    let y = this.HITBOX[action].POS.y;
    let w = this.HITBOX[action].SIZE.w;
    let h = this.HITBOX[action].SIZE.h;
    Game.RENDER.ctx.globalAlpha = 0.2;
    Game.RENDER.ctx.fillStyle = 'green';
    Game.RENDER.ctx.fillRect(x, y, w, h);
    Game.RENDER.ctx.fillStyle = 'black';
    Game.RENDER.ctx.globalAlpha = 1;
  }

  drawCollisionPoints(action) {
    Game.RENDER.ctx.fillStyle = 'red';
    this.HITBOX[action].collisionPoints.forEach(point => {
      Game.RENDER.ctx.fillRect(point.x - 2, point.y - 2, 4, 4);
    });
    Game.RENDER.ctx.fillStyle = 'black';
  }


}
