/* jshint esversion: 6 */
class CollisionDetection {
  constructor() {
    this.x = false;
    this.y = false;
    this.status = {
      isTouchingFloor: false
    };
  }

  init(tiles) {
    this.STATIC_TILES = tiles;
  }

  hit(axis) {
    return (this[axis] === true) ? true : false;
  }

  isFloor() {
    return (this.y === true && this.status.isTouchingFloor === true) ? true : false;
  }

  pointCollision({HITBOX, TILE}, offsetX, offsetY) {
    let collisionX = HITBOX.x + offsetX >= TILE.x && HITBOX.x + offsetX <= TILE.x + TILE.width;
    let collisionY = HITBOX.y + offsetY >= TILE.y && HITBOX.y + offsetY <= TILE.y + TILE.height;

    if (collisionX && collisionY) {
      return true;
    }
    return false;
  }

  boxCollision({HITBOX, TILE}) {
    let w = HITBOX.width;
    let h = HITBOX.height;
    let pointsPerEdge = 14; // set how much hitpoints there should be on each edge
    let collision = false;

    // offset values for corners
    const offset = [
      {x: 0, y: 0},
      {x: 0, y: h},
      {x: w, y: 0},
      {x: w, y: h}
    ];

    // offset values for points on the edges
    for(let j = 0; j < pointsPerEdge; j ++) {
      let value = j / (pointsPerEdge + 1);
      offset.push(
        {x: h * value, y: 0},
        {x: 0, y: h * value},
        {x: w * value, y: 0},
        {x: w, y: h * value}
      );
    }

    for (let i = 0; i < offset.length; i++) {
      if(this.pointCollision({HITBOX, TILE}, offset[i].x, offset[i].y)) {
        collision = true;
        break;
      }
    }

    if (collision) {
      return true;
    }
    return false;
  }

  loop({POS, HITBOX}, axis) {
    let offsetX = (axis == 'x') ? POS.motion.horizontal : 0;
    let offsetY = (axis == 'y') ? POS.motion.vertical : 0;
    let collision = [];

    this.STATIC_TILES.forEach(tile => {
      if (
        this.boxCollision({
          HITBOX: {
            x: POS.c.x + offsetX,
            y: POS.c.y + offsetY,
            width: HITBOX.size.width,
            height: HITBOX.size.height
          },
          TILE: {
            x: tile.POS.c.x,
            y: tile.POS.c.y,
            width: tile.SIZE.width,
            height: tile.SIZE.height
          }
        })
      ) {
        collision.push(true);
      }
    });

    return (collision.length > 0) ? true : false;
  }

  listen({POS, HITBOX}) {
    if ((this.loop({POS, HITBOX}, 'x'))) {
      this.x = true;
    } else {
      this.x = false;
    }

    if ((this.loop({POS, HITBOX}, 'y'))) {
      this.y = true;
      this.status.isTouchingFloor = true;
    } else {
      this.y = false;
    }
  }

}
