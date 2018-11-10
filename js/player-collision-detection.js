/* jshint esversion: 6 */
class CollisionDetection {
  constructor() {
    this.x = false;
    this.y = false;
  }

  init(tiles) {
    this.TILES = tiles;
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
    let topLeft = this.pointCollision({HITBOX, TILE}, 0, 0);
    let topRight = this.pointCollision({HITBOX, TILE}, HITBOX.width, 0);
    let bottomLeft = this.pointCollision({HITBOX, TILE}, 0, HITBOX.height);
    let bottomRight = this.pointCollision({HITBOX, TILE}, HITBOX.width, HITBOX.height);

    if (topLeft || topRight || bottomLeft || bottomRight) {
      return true;
    }
    return false;
  }

  loop({POS, HITBOX}, axis) {
    let offsetX = (axis == 'x') ? POS.motion.horizontal : 0;
    let offsetY = (axis == 'y') ? POS.motion.vertical : 0;
    let detection = [];

    this.TILES.forEach(tile => {
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
        detection.push(true);
      }
    });

    return (detection.length > 0) ? true : false;
  }

  listen({POS, HITBOX}) {
    this.x = (this.loop({POS, HITBOX}, 'x')) ? true : false;
    this.y = (this.loop({POS, HITBOX}, 'y')) ? true : false;
  }

}
