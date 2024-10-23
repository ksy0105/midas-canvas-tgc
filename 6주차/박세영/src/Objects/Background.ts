import { CANVAS_WIDTH } from "../global.config";

export class Background {
  x = 0;
  speed = 0.03;
  ctx;
  img;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = "images/space.png";
  }

  render(deltaTime: number) {
    this.x -= this.speed * deltaTime;
    if (this.x <= -CANVAS_WIDTH) this.x = 0;
    this.ctx.drawImage(this.img, this.x, 0);
    this.ctx.drawImage(this.img, this.x + CANVAS_WIDTH, 0);
  }
}
