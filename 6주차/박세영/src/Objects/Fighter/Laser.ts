import { BoundingBox } from "../../Common/BoundingBox";
import { Position } from "../../Common/Position";

export class Laser {
  ctx;
  img;
  speed = 5;

  point: Position;
  boundingBox: BoundingBox;

  constructor(ctx: CanvasRenderingContext2D, point: Position) {
    this.ctx = ctx;

    this.img = new Image();
    this.img.src = "images/laser.png";

    this.point = point;
    this.boundingBox = new BoundingBox(this.img.width, this.img.height);
  }

  move() {
    this.point.x += this.speed;
  }

  render() {
    this.move.call(this);
    this.ctx.drawImage(this.img, this.point.x, this.point.y);
  }
}