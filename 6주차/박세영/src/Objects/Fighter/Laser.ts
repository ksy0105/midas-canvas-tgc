import { BoundingBox } from "../../Common/BoundingBox";
import { Position } from "../../Common/Position";

export class Laser {
  ctx;
  img;
  speed = 5;

  boundingBox: BoundingBox;

  constructor(ctx: CanvasRenderingContext2D, point: Position) {
    this.ctx = ctx;

    this.img = new Image();
    this.img.src = "images/laser.png";

    this.boundingBox = new BoundingBox(
      point.x,
      point.y,
      this.img.width,
      this.img.height
    );
  }

  move() {
    this.boundingBox.x += this.speed;
  }

  render() {
    this.move.call(this);
    this.ctx.drawImage(this.img, this.boundingBox.x, this.boundingBox.y);
  }
}
