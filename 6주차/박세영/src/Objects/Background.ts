import { CANVAS_WIDTH } from "../global.config";

export class Background {
  x = 0;
  ctx;
  img;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = "images/space.png";
  }

  render() {
    this.x -= 1;
    if (this.x <= -CANVAS_WIDTH) this.x = 0;
    this.ctx.drawImage(this.img, this.x, 0);
    this.ctx.drawImage(this.img, this.x + CANVAS_WIDTH, 0);
  }
}
