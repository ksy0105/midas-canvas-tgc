import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../global.config";
import { BoundingBox } from "../Common/BoundingBox";
import { Position } from "../Common/Position";
import { keyManager } from "../Common/KeyManager/KeyManager";
import { Direction, DIRECTION } from "../Common/direction";

export class Fighter {
  ctx;
  img;
  speed = 3;

  point: Position;
  boundingBox: BoundingBox;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;

    this.img = new Image();
    this.img.src = "images/fighter.png";

    this.point = new Position(40, CANVAS_HEIGHT / 2);
    this.boundingBox = new BoundingBox(this.img.width, this.img.height);
  }

  controller() {
      if (keyManager.isPressed("w")) 
        this.move.call(this, DIRECTION.UP)
      if (keyManager.isPressed("s")) 
        this.move.call(this, DIRECTION.DOWN)
      if (keyManager.isPressed("a"))
        this.move.call(this, DIRECTION.LEFT)
      if (keyManager.isPressed("d"))
        this.move.call(this, DIRECTION.RIGHT)
  }

  move(direction: Direction) {
    switch(direction) {
      case DIRECTION.UP:
        if(this.point.y < 0) return;
        this.point.y -= this.speed;
        break;
      case DIRECTION.DOWN:
        if(this.point.y > CANVAS_HEIGHT - this.boundingBox.height) return;
        this.point.y += this.speed;
        break;
      case DIRECTION.LEFT:
        if(this.point.x < 0) return;
        this.point.x -= this.speed;
        break;
      case DIRECTION.RIGHT:
        if(this.point.x > CANVAS_WIDTH - this.boundingBox.width) return;
        this.point.x += this.speed;
        break;
    }
  }

  render() {
    this.controller.call(this);
    this.ctx.drawImage(this.img, this.point.x, this.point.y);
  }
}