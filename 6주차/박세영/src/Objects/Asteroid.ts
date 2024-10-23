import { BoundingBox } from "../Common/BoundingBox";
import { Position } from "../Common/Position";

export class Asteroid {
  ctx;
  img;
  speed = 0.13;
  ang = 0;

  boundingBox: BoundingBox;

  constructor(ctx: CanvasRenderingContext2D, point: Position) {
    this.ctx = ctx;

    this.img = new Image();
    this.img.src = "images/asteroid.png";

    this.boundingBox = new BoundingBox(
      point.x,
      point.y,
      this.img.width,
      this.img.height
    );
  }

  move(deltaTime: number) {
    this.boundingBox.x -= this.speed * deltaTime;
  }

  render(deltaTime: number) {
    this.ctx.save();

    this.ctx.translate(
      this.boundingBox.x + this.boundingBox.width / 2,
      this.boundingBox.y + this.boundingBox.height / 2
    );
    this.ctx.rotate((Math.PI / 180) * (this.ang += 1));
    this.ctx.translate(
      -(this.boundingBox.x + this.boundingBox.width / 2),
      -(this.boundingBox.y + this.boundingBox.height / 2)
    );

    this.ctx.drawImage(this.img, this.boundingBox.x, this.boundingBox.y);
    this.ctx.restore();

    this.move(deltaTime);
  }
}
